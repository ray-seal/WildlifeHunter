import { useState } from "react";

// Sample pixel county map data (replace with real pixel art and mapping later)
const counties = [
  {
    name: "Kent",
    unlocked: true,
    wildlife: [
      { name: "Dormouse", id: "dormouse", type: "small" },
      { name: "Nightjar", id: "nightjar", type: "medium" }
    ],
    placesOfInterest: [
      { name: "Canterbury Cathedral", type: "landmark", wildlife: ["Nightjar"], x: 2, y: 2 }
    ],
    x: 1,
    y: 2
  },
  { name: "London", unlocked: false, wildlife: [
    { name: "Red Fox", id: "red_fox", type: "medium" }
  ],
    placesOfInterest: [
      { name: "QE2 Bridge", type: "pathway", unlockLevel: 5, x: 2, y: 1 }
    ],
    x: 2,
    y: 1
  },
  // Add more counties...
];

// Pathways unlock after reaching required level
const pathways = [
  { name: "QE2 Bridge", from: "Kent", to: "London", unlockLevel: 5 }
];

// Sample wildlife (expand as needed)
const wildlifeList = [
  { name: "Dormouse", id: "dormouse", type: "small", description: "A tiny, nocturnal rodent found in Kent." },
  { name: "Nightjar", id: "nightjar", type: "medium", description: "A rare, crepuscular bird seen in Kent's woodlands." },
  { name: "Red Fox", id: "red_fox", type: "medium", description: "Cunning and adaptable, often spotted in London's parks." }
];

const playerSprite = "🧑"; // Placeholder: replace with pixel art sprite

function getCountyByCoords(x, y) {
  return counties.find(c => c.x === x && c.y === y);
}

export default function Game() {
  // Player state
  const [player, setPlayer] = useState({ x: 1, y: 2, xp: 0, level: 1, caught: [] });

  // Wildlife Journal: tracks caught wildlife by ID
  const [journal, setJournal] = useState({});

  // Map movement (4-direction, grid-based)
  function move(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    const target = getCountyByCoords(newX, newY);
    if (!target) return alert("Can't go that way!");
    if (!target.unlocked) return alert("This county is locked!");
    setPlayer({ ...player, x: newX, y: newY });
  }

  // Encounter wildlife (randomly for demo)
  function explore() {
    const county = getCountyByCoords(player.x, player.y);
    if (!county) return;
    const wildlife = county.wildlife[Math.floor(Math.random() * county.wildlife.length)];
    if (!wildlife) {
      alert("No wildlife found here.");
      return;
    }
    // Simulate catch mechanic
    const caught = Math.random() > 0.3;
    if (caught) {
      alert(`You caught a ${wildlife.name}!`);
      if (!player.caught.includes(wildlife.id)) {
        const newXP = player.xp + 10;
        const newLevel = Math.floor(newXP / 50) + 1;
        // Unlock pathways/county if reaching new levels
        const newCounties = counties.map(c => {
          if (c.name === "London" && newLevel >= 5) {
            return { ...c, unlocked: true };
          }
          return c;
        });
        // Update journal
        setJournal({ ...journal, [wildlife.id]: true });
        setPlayer({
          ...player,
          xp: newXP,
          level: newLevel,
          caught: [...player.caught, wildlife.id]
        });
        // If unlocking London, notify
        if (newLevel >= 5 && !getCountyByCoords(2, 1).unlocked) {
          alert("The QE2 Bridge is open! London is now accessible.");
        }
      }
    } else {
      alert(`The ${wildlife.name} escaped!`);
    }
  }

  // Wildlife Journal UI
  function WildlifeJournal() {
    return (
      <div style={{ border: "2px solid #333", padding: "1rem", margin: "1rem 0", background: "#eee" }}>
        <h3>Wildlife Journal</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          {wildlifeList.map(w => (
            <div key={w.id} style={{ width: 80, textAlign: "center" }}>
              {journal[w.id]
                ? (
                  <>
                    <strong>{w.name}</strong>
                    <div style={{ fontSize: 32 }}>{w.type === "small" ? "🐭" : w.type === "medium" ? "🦊" : "🐉" }</div>
                    <p>{w.description}</p>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 32, color: "#bbb" }}>❔</span>
                    <div style={{ color: "#bbb" }}>????</div>
                  </>
                )
              }
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render grid as pixel map (placeholder)
  function PixelMap() {
    const grid = [];
    for (let y = 0; y < 4; y++) {
      const row = [];
      for (let x = 0; x < 4; x++) {
        const c = getCountyByCoords(x, y);
        row.push(
          <td
            key={x}
            style={{
              width: 60, height: 60,
              border: "1px solid #444",
              background: c
                ? c.unlocked
                  ? (player.x === x && player.y === y ? "#8ef" : "#dfd")
                  : "#aaa"
                : "#eee",
              position: "relative"
            }}
          >
            {player.x === x && player.y === y && (
              <span style={{ fontSize: 32, position: "absolute", left: 18, top: 12 }}>{playerSprite}</span>
            )}
            <div style={{ fontSize: 10, position: "absolute", bottom: 2, left: 2 }}>{c?.name}</div>
          </td>
        );
      }
      grid.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table style={{ borderCollapse: "collapse", margin: "0 auto" }}>
        <tbody>{grid}</tbody>
      </table>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", textAlign: "center" }}>
      <h2>Wildlife Hunter</h2>
      <div>
        <strong>Level {player.level} | XP: {player.xp}</strong>
      </div>
      <PixelMap />
      <div style={{ margin: "1rem" }}>
        <button onClick={() => move(0, -1)}>↑</button>
        <button onClick={() => move(-1, 0)}>←</button>
        <button onClick={() => move(1, 0)}>→</button>
        <button onClick={() => move(0, 1)}>↓</button>
      </div>
      <button onClick={explore}>Explore this county</button>
      <WildlifeJournal />
    </div>
  );
}
