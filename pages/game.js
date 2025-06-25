import { useState } from "react";

const wildlifeList = [
  { name: "Smooth Newt", type: "small", region: "England" },
  { name: "Stag Beetle", type: "small", region: "England" },
  { name: "Fox", type: "medium", region: "UK" },
  { name: "Badger", type: "medium", region: "UK" },
  { name: "Welsh Dragon", type: "mythical", region: "Wales" },
];

const tools = {
  small: "Net",
  medium: "Cage",
  mythical: "Chain",
};

function getRandomWildlife(region = "UK") {
  const filtered = wildlifeList.filter(
    (w) => w.region === region || w.region === "UK"
  );
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function Game() {
  const [region, setRegion] = useState("England");
  const [wildlife, setWildlife] = useState(null);
  const [caught, setCaught] = useState([]);

  const handleExplore = () => {
    const found = getRandomWildlife(region);
    setWildlife(found);
  };

  const handleCatch = () => {
    if (!wildlife) return;
    // Simple catch logic
    if (wildlife.name === "Welsh Dragon" && region !== "Wales") {
      alert("The dragon only appears in Wales!");
      return;
    }
    if (Math.random() > 0.4) {
      setCaught([...caught, wildlife]);
      alert(`You caught a ${wildlife.name}!`);
    } else {
      alert(`The ${wildlife.name} escaped!`);
    }
    setWildlife(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <h2>Current Region: {region}</h2>
      <div>
        <button onClick={() => setRegion("England")}>England</button>
        <button onClick={() => setRegion("Scotland")}>Scotland</button>
        <button onClick={() => setRegion("Wales")}>Wales</button>
        <button onClick={() => setRegion("Northern Ireland")}>
          Northern Ireland
        </button>
      </div>
      <hr />
      <button onClick={handleExplore} style={{ margin: "1rem" }}>
        Explore!
      </button>
      {wildlife && (
        <div>
          <h3>You encountered a {wildlife.name}!</h3>
          <button onClick={handleCatch}>
            Use {tools[wildlife.type]}
          </button>
        </div>
      )}
      <hr />
      <h3>Your Collection:</h3>
      <ul>
        {caught.map((w, i) => (
          <li key={i}>{w.name}</li>
        ))}
      </ul>
    </div>
  );
}
