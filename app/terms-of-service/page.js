export default function TermsOfServicePage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem", color: "var(--text)" }}>Terms of Service</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        These terms govern your use of SkillSwap. By using the platform you agree to our service rules, payment terms, and acceptable use policies.
      </p>
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Usage and conduct</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          Use SkillSwap responsibly, communicate clearly, and follow the task posting and proposal guidelines.
        </p>
      </section>
    </main>
  );
}
