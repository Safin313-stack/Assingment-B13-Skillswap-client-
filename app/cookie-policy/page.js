export default function CookiePolicyPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.75rem", color: "var(--text)" }}>Cookie Policy</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
          SkillSwap uses cookies and similar technologies to improve site performance, remember preferences, and keep sessions secure.
        </p>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Essential cookies</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          These cookies are required for login, task posting, and secure checkout flows.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Analytics cookies</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          We use analytics cookies to understand how people use SkillSwap and improve the marketplace experience.
        </p>
      </section>

      <section>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Your control</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          You can manage your cookie preferences in your browser settings whenever you want.
        </p>
      </section>
    </main>
  );
}
