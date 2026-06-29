"use client";
import Link from "next/link";

export default function TaskCard({ task }) {
  const categoryColors = {
    Design: { bg: "rgba(0,245,228,0.08)", color: "#00f5e4", border: "rgba(0,245,228,0.2)" },
    Development: { bg: "rgba(139,92,246,0.08)", color: "#8b5cf6", border: "rgba(139,92,246,0.2)" },
    Writing: { bg: "rgba(251,191,36,0.08)", color: "#fbbf24", border: "rgba(251,191,36,0.2)" },
    Marketing: { bg: "rgba(244,114,182,0.08)", color: "#f472b6", border: "rgba(244,114,182,0.2)" },
    Other: { bg: "rgba(255,255,255,0.06)", color: "rgba(240,244,255,0.6)", border: "rgba(255,255,255,0.12)" },
  };

  const cat = categoryColors[task.category] || categoryColors.Other;
  const deadline = new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Link href={`/tasks/${task._id}`} style={{ textDecoration: "none" }}>
      <div className="hover-lift" style={{
        background: "linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 18,
        padding: "1.5rem",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px rgba(0,0,0,0.4)",
      }}
        onMouseOver={e => {
          e.currentTarget.style.borderColor = cat.border;
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = `0 1px 0 rgba(255,255,255,0.08) inset, 0 20px 48px rgba(0,0,0,0.5), 0 0 24px ${cat.bg}`;
        }}
        onMouseOut={e => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px rgba(0,0,0,0.4)";
        }}
      >
        {/* Category badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px",
            borderRadius: 100, background: cat.bg, color: cat.color,
            border: `1px solid ${cat.border}`, fontFamily: "Space Grotesk",
            letterSpacing: "0.04em",
          }}>{task.category}</span>
          <span style={{ fontSize: "0.68rem", color: "rgba(240,244,255,0.3)", fontFamily: "Space Grotesk" }}>
            📅 {deadline}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700,
          color: "#f0f4ff", lineHeight: 1.35,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{task.title}</h3>

        {/* Description */}
        <p style={{
          fontSize: "0.82rem", color: "rgba(240,244,255,0.4)", lineHeight: 1.65,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1,
        }}>{task.description}</p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.875rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <div style={{ fontSize: "1.1rem", fontFamily: "Space Grotesk", fontWeight: 700, color: "#00f5e4" }}>
              ${task.budget}
            </div>
            <div style={{ fontSize: "0.65rem", color: "rgba(240,244,255,0.3)", fontFamily: "Space Grotesk" }}>Budget</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk" }}>
              {task.client_email?.split("@")[0]}
            </div>
            <div style={{ fontSize: "0.65rem", color: "rgba(240,244,255,0.3)", fontFamily: "Space Grotesk" }}>Client</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
