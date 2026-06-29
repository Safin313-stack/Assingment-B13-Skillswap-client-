export default function AboutPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem", color: "var(--text)" }}>About SkillSwap</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        SkillSwap is a fast, secure marketplace for posting micro-tasks and connecting with skilled freelancers. We help clients move faster by simplifying proposals, payments, and delivery.
      </p>
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.4rem", marginBottom: "0.75rem", color: "var(--text)" }}>Our mission</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
          We build tools that make short-term work reliable and transparent. Every task is protected by secure payment flow so both clients and freelancers can focus on great outcomes.
        </p>
      </section>
    </main>
  );
}
