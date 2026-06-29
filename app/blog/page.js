export default function BlogPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem", color: "var(--text)" }}>Blog</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        Read the latest updates about SkillSwap, new feature launches, and marketplace tips for clients and freelancers.
      </p>
    </main>
  );
}
