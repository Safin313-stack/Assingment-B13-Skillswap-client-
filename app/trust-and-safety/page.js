export default function TrustAndSafetyPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 920, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem", color: "var(--text)" }}>Trust & Safety</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        SkillSwap keeps payments secure and helps both clients and freelancers work with confidence.
      </p>
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Safe experience</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          We use secure escrow, clear dispute steps, and community trust signals to protect every transaction.
        </p>
      </section>
    </main>
  );
}
