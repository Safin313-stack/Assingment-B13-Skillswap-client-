export default function TermsOfServicePage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.75rem", color: "var(--text)" }}>Terms of Service</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
          These terms govern your use of SkillSwap. By using the platform, you agree to our service rules, payment terms, and acceptable use policies.
        </p>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>User conduct</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          Use SkillSwap respectfully, provide honest task information, and respond promptly to proposals and messages.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Payments</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          Payments are handled via secure escrow. Clients fund tasks up front, and freelancers are paid once work is approved.
        </p>
      </section>

      <section>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text)" }}>Dispute handling</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          If a task is not completed as expected, start with the freelancer and use our support process to resolve issues.
        </p>
      </section>
    </main>
  );
}
