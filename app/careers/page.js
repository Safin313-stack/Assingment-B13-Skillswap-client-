export default function CareersPage() {
  const roles = [
    { title: "Front-end Developer", description: "Build polished web experiences and improve our public marketplace." },
    { title: "Product Designer", description: "Design user flows, landing pages, and brand elements for SkillSwap." },
    { title: "Community Growth Lead", description: "Help freelance talent and clients discover new opportunities and resources." },
  ];

  return (
    <main style={{ padding: "5rem 5%", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.75rem", color: "var(--text)" }}>Careers</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
          Join SkillSwap as we build a better marketplace for short-term work. We're looking for curious people who care about design, product, and trusted execution.
        </p>
      </div>

      <section style={{ display: "grid", gap: "1.25rem" }}>
        {roles.map((role) => (
          <div key={role.title} style={{ padding: "1.75rem", borderRadius: 24, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--text)" }}>{role.title}</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.75 }}>{role.description}</p>
          </div>
        ))}
      </section>

      <div style={{ marginTop: "2rem", padding: "1.75rem", borderRadius: 24, background: "rgba(0,245,228,0.08)" }}>
        <p style={{ color: "var(--text)", fontSize: "1rem", lineHeight: 1.75 }}>
          Email your CV and a short note to <strong>careers@skillswap.io</strong> to get started.
        </p>
      </div>
    </main>
  );
}
