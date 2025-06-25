import React from "react";

// Example wildlife list (expand as needed)
const wildlifeList = [
  // Kent
  { id: "dormouse", name: "Dormouse", type: "small", county: "Kent", habitat: "land", description: "A tiny, nocturnal rodent found in Kent." },
  { id: "nightjar", name: "Nightjar", type: "medium", county: "Kent", habitat: "land", description: "A rare, crepuscular bird seen in Kent's woodlands." },
  { id: "eel", name: "European Eel", type: "medium", county: "Kent", habitat: "freshwater", description: "Migratory fish found in Kent's rivers." },
  { id: "stickleback", name: "Three-spined Stickleback", type: "small", county: "Kent", habitat: "freshwater", description: "Common in streams and ponds." },
  { id: "gull", name: "Herring Gull", type: "medium", county: "Kent", habitat: "saltwater", description: "Common on the Kent coast." },
  // London
  { id: "red_fox", name: "Red Fox", type: "medium", county: "London", habitat: "land", description: "Cunning and adaptable, often spotted in London's parks." },
  { id: "salmon", name: "Atlantic Salmon", type: "medium", county: "London", habitat: "freshwater", description: "Migrates up the Thames." },
  // Essex
  { id: "greyseal", name: "Grey Seal", type: "medium", county: "Essex", habitat: "saltwater", description: "Found along the coast and estuaries." },
  // Add more species and counties as needed!
];

// Get unique county names
const counties = [...new Set(wildlifeList.map(w => w.county))].sort();

function WildlifeTable({ wildlife, title }) {
  if (!wildlife.length) return null;
  return (
    <div style={{ marginBottom: "1.5em" }}>
      <h4 style={{ margin: "0.5em 0" }}>{title}</h4>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#f9f9f9" }}>
        <thead>
          <tr>
            <th style={{borderBottom: "1px solid #bbb", textAlign: "left"}}>Name</th>
            <th style={{borderBottom: "1px solid #bbb", textAlign: "left"}}>Type</th>
            <th style={{borderBottom: "1px solid #bbb", textAlign: "left"}}>Description</th>
          </tr>
        </thead>
        <tbody>
          {wildlife.map(w => (
            <tr key={w.id}>
              <td style={{ padding: "0.3em 0.7em" }}>{w.name}</td>
              <td style={{ padding: "0.3em 0.7em" }}>{w.type}</td>
              <td style={{ padding: "0.3em 0.7em" }}>{w.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WildlifeJournal() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
      <h1>Wildlife Journal</h1>
      <p>
        Explore a full list of UK wildlife by county. Freshwater and saltwater species are shown in their own sections.
      </p>
      {counties.map(county => {
        const land = wildlifeList.filter(w => w.county === county && w.habitat === "land");
        const freshwater = wildlifeList.filter(w => w.county === county && w.habitat === "freshwater");
        const saltwater = wildlifeList.filter(w => w.county === county && w.habitat === "saltwater");
        return (
          <div key={county} style={{ marginBottom: "2.5em", borderBottom: "2px solid #dde", paddingBottom: "1.5em" }}>
            <h2 style={{ marginBottom: "0.5em" }}>{county}</h2>
            <WildlifeTable wildlife={land} title="Land Species"/>
            <WildlifeTable wildlife={freshwater} title="Freshwater Species"/>
            <WildlifeTable wildlife={saltwater} title="Saltwater Species"/>
            {(!land.length && !freshwater.length && !saltwater.length) && <p>No wildlife recorded in this county.</p>}
          </div>
        );
      })}
    </div>
  );
}
