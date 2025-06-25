import { useState } from "react";

// Dummy pixel map as a grid for now; replace with an actual pixel-art map image later.
const counties = [
  {
    name: "London",
    unlocked: true,
    wildlife: ["Red Fox", "Grey Squirrel"],
    placesOfInterest: [
      { name: "Buckingham Palace", type: "landmark", wildlife: ["Mute Swan"], x: 3, y: 2 },
      { name: "O2 Arena", type: "arena", wildlife: ["Pigeon"], x: 5, y: 4 }
    ]
  },
  { name: "Kent", unlocked: false, wildlife: ["Dormouse"], placesOfInterest: [] },
  { name: "Surrey", unlocked: false, wildlife: ["Stag Beetle"], placesOfInterest: [] },
  // add more counties as needed
];

function Map({ counties, onSelectCounty, selectedCounty }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: 240, margin: "2rem auto" }}>
      {counties.map((county, i) => (
        <div
          key={county.name}
          onClick={() => county.unlocked && onSelectCounty(county.name)}
          style={{
            width: 80, height: 80, border: "2px solid black", margin: 2,
            background: county.unlocked ? (county.name === selectedCounty ? "#8ef" : "#dfd") : "#aaa",
            cursor: county.unlocked ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"
          }}
        >
          {county.name}
        </div>
      ))}
    </div>
  );
}

function Places({ places, onVisit }) {
  return (
    <div>
      <h3>Places of Interest</h3>
      {places.length === 0 && <p>No places yet.</p>}
      <ul>
        {places.map((place, i) => (
          <li key={i}>
            <button onClick={() => onVisit(place)}>{place.name} ({place.type})</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Game() {
  const [selectedCounty, setSelectedCounty] = useState("London");
  const [currentPlace, setCurrentPlace] = useState(null);
  const [caught, setCaught] = useState([]);

  const county = counties.find(c => c.name === selectedCounty);

  const handleVisitPlace = (place) => {
    setCurrentPlace(place);
    // For now, just auto-catch wildlife if present
    if (place.wildlife && place.wildlife.length > 0) {
      setCaught([...caught, ...place.wildlife]);
      alert(`You found and caught: ${place.wildlife.join(", ")}!`);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <h2>Wildlife Hunter: UK Map</h2>
      <Map
        counties={counties}
        onSelectCounty={setSelectedCounty}
        selectedCounty={selectedCounty}
      />
      <h3>Exploring: {county.name}</h3>
      <Places
        places={county.placesOfInterest}
        onVisit={handleVisitPlace}
      />
      <hr />
      <h3>Your Collection</h3>
      <ul>
        {caught.length === 0 && <li>(none yet)</li>}
        {caught.map((w, i) => <li key={i}>{w}</li>)}
      </ul>
    </div>
  );
}
