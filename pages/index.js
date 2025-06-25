import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>UK Wildlife Adventure</h1>
      <p>
        Explore the UK, encounter wildlife, and try to catch them all!
      </p>
      <Link href="/game">
        <button style={{ fontSize: "1.2rem", padding: "1rem 2rem" }}>
          Start Game
        </button>
      </Link>
    </main>
  );
}
