export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem", color: "var(--text)" }}>Privacy Policy</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        We respect your privacy and only collect the information needed to make SkillSwap work safely and reliably.
      </p>
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Data use</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          Your personal data is used to manage accounts, process payments, and improve the marketplace experience.
        </p>
      </section>
    </main>
  );
}
