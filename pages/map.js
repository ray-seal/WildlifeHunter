import UkCountyMap from "../components/UkCountyMap";
import { useState } from "react";

export default function MapPage() {
  const [selectedCounty, setSelectedCounty] = useState("Kent");

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
      <h1>Interactive UK County Map</h1>
      <p>
        Click on a county to select it. Only <b>Kent</b> is unlocked for now.
      </p>
      <UkCountyMap
        onCountyClick={(county) => setSelectedCounty(county.name)}
      />
      <div style={{ marginTop: 32, fontSize: "1.2em" }}>
        <strong>Current selection: {selectedCounty}</strong>
      </div>
    </div>
  );
}
