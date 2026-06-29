export default function TrustAndSafetyPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.75rem", color: "var(--text)" }}>Trust & Safety</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
          SkillSwap keeps payments secure and helps both clients and freelancers work with confidence.
        </p>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Secure payments</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          All task funds move through escrow so freelancers get paid fairly and clients approve work before release.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Verified profiles</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          We support reviews, ratings, and clear freelancer profiles so clients can hire with confidence.
        </p>
      </section>

      <section>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Support available</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          If something goes wrong, our support process helps resolve disputes and restore trust quickly.
        </p>
      </section>
    </main>
  );
}
