export default function CookiePolicyPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem", color: "var(--text)" }}>Cookie Policy</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        SkillSwap uses cookies and similar technologies to improve the site, remember preferences, and keep sessions secure.
      </p>
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>What we collect</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          We use essential cookies for login and site functionality, and performance cookies to measure how users engage with SkillSwap.
        </p>
      </section>
    </main>
  );
}
