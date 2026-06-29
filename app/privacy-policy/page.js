export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.75rem", color: "var(--text)" }}>Privacy Policy</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
          We respect your privacy and collect only the information needed to provide a safe and reliable SkillSwap experience.
        </p>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>What we collect</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          We collect account details, contact information, and payment records so you can post tasks, hire freelancers, and track deliveries.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>How we use data</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          Your data helps us match clients with freelancers, process payments securely, and improve platform performance over time.
        </p>
      </section>

      <section>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Your choices</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          You can update your account information anytime in settings and opt out of marketing emails if you prefer.
        </p>
      </section>
    </main>
  );
}
