export default function BlogPage() {
  const posts = [
    {
      title: "Launch Faster with Trusted Freelancers",
      date: "June 2026",
      summary: "How to post concise tasks that attract quality proposals from top experts.",
    },
    {
      title: "Building Better Client-Freelancer Relationships",
      date: "May 2026",
      summary: "Best practices for clear brief writing, reliable communication, and faster delivery.",
    },
    {
      title: "Payment Safety on SkillSwap",
      date: "April 2026",
      summary: "Why escrow payments matter and how SkillSwap keeps every milestone protected.",
    },
  ];

  return (
    <main style={{ padding: "5rem 5%", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.75rem", color: "var(--text)" }}>Blog</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
          Read the latest updates about SkillSwap, product improvements, and practical tips for clients and freelancers.
        </p>
      </div>

      <section style={{ display: "grid", gap: "1.5rem" }}>
        {posts.map((post) => (
          <article key={post.title} style={{ padding: "1.75rem", borderRadius: 24, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem", fontFamily: "Space Grotesk", fontWeight: 700 }}>
              {post.date}
            </div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.4rem", marginBottom: "0.75rem", color: "var(--text)" }}>{post.title}</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{post.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
