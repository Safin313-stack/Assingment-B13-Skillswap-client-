"use client";
import Link from "next/link";

export default function TaskCard({ task }) {
  const categoryColors = {
    Design: { bg: "rgba(0,245,228,0.14)", color: "#00f5e4", border: "rgba(0,245,228,0.35)" },
    Development: { bg: "rgba(139,92,246,0.14)", color: "#8b5cf6", border: "rgba(139,92,246,0.35)" },
    Writing: { bg: "rgba(251,191,36,0.14)", color: "#fbbf24", border: "rgba(251,191,36,0.35)" },
    Marketing: { bg: "rgba(244,114,182,0.14)", color: "#f472b6", border: "rgba(244,114,182,0.35)" },
    Other: { bg: "rgba(255,255,255,0.08)", color: "var(--text-soft)", border: "rgba(255,255,255,0.2)" },
  };

  const cat = categoryColors[task.category] || categoryColors.Other;
  const deadline = new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Link href={`/tasks/${task._id}`} style={{ textDecoration: "none" }}>
      <div className="hover-lift" style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        padding: "1.5rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: "0.72rem", fontWeight: 700, padding: "6px 12px",
            borderRadius: 999, background: cat.bg, color: cat.color,
            border: `1px solid ${cat.border}`, fontFamily: "Space Grotesk",
            letterSpacing: "0.04em",
          }}>{task.category}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "Space Grotesk" }}>
            📅 {deadline}
          </span>
        </div>

        <h3 style={{
          fontFamily: "Space Grotesk", fontSize: "1.05rem", fontWeight: 800,
          color: "var(--text)", lineHeight: 1.35,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{task.title}</h3>

        <p style={{
          fontSize: "0.9rem", color: "var(--text-soft)", lineHeight: 1.7,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1,
        }}>{task.description}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.9rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ fontSize: "1.15rem", fontFamily: "Space Grotesk", fontWeight: 800, color: "var(--cyan)" }}>
              ${task.budget}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "Space Grotesk" }}>Budget</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.78rem", color: "var(--text-soft)", fontFamily: "Space Grotesk" }}>
              {task.client_email?.split("@")[0]}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "Space Grotesk" }}>Client</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
