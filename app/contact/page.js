export default function ContactPage() {
  return (
    <main style={{ padding: "5rem 5%", maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem", color: "var(--text)" }}>Contact</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        Need help with a task, partnership, or support? Reach out to our team and we’ll get back to you shortly.
      </p>
      <div style={{ marginTop: "2.5rem", padding: "2rem", borderRadius: 24, background: "var(--surface)", border: "1px solid var(--border)" }}>
        <p style={{ marginBottom: "0.75rem", color: "var(--text)" }}><strong>Email:</strong> contact@skillswap.io</p>
        <p style={{ color: "var(--text)" }}><strong>Support:</strong> support@skillswap.io</p>
      </div>
    </main>
  );
}
