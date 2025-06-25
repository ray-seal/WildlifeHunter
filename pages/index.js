import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem", textAlign: "center" }}>
      <h1>Wildlife Hunter</h1>
      <p>
        Explore the UK, discover wildlife, and fill your journal!
      </p>
      <nav style={{ margin: "2em 0" }}>
        <Link href="/wildlifejournal">
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.7em 1.5em",
              fontSize: "1.1em",
              borderRadius: "8px",
              border: "2px solid #336",
              background: "#e8eaf6",
              cursor: "pointer",
              gap: "0.7em",
              boxShadow: "0 2px 6px #0001"
            }}
          >
            <span style={{ fontSize: "2em" }} role="img" aria-label="open book">📖</span>
            Wildlife Journal
          </button>
        </Link>
      </nav>
      <div style={{marginTop: "2em"}}>
        <h2>Begin Your Adventure!</h2>
        <p>
          Use the map to travel between counties and encounter the diverse wildlife of the UK.<br />
          Unlock new areas and fill out your Wildlife Journal as you explore.
        </p>
      </div>
    </div>
  );
}
