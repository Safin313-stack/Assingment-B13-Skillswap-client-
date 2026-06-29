"use client";
import Link from "next/link";

export default function FreelancerCard({ freelancer }) {
  const stars = Math.round(freelancer.avgRating || 0);

  return (
    <Link href={`/freelancers/${encodeURIComponent(freelancer.email)}`} style={{ textDecoration: "none" }}>
      <div className="hover-lift" style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
      }}>
        <div style={{
          height: 80,
          background: "linear-gradient(135deg,rgba(0,245,228,0.18),rgba(139,92,246,0.14))",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)",
            width: 64, height: 64, borderRadius: "50%",
            border: "3px solid var(--bg)",
            overflow: "hidden", background: "var(--bg)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          }}>
            {freelancer.image ? (
              <img src={freelancer.image} alt={freelancer.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: "linear-gradient(135deg,#00f5e4,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700, color: "#02040f",
              }}>
                {freelancer.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "2rem 1.5rem 1.5rem", textAlign: "center" }}>
          <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>
            {freelancer.name}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-soft)", fontFamily: "Space Grotesk", marginBottom: "1rem" }}>
            {freelancer.bio?.substring(0, 60) || "Top rated freelancer"}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", marginBottom: "1.2rem" }}>
            {(freelancer.skills || []).slice(0, 3).map((s) => (
              <span key={s} style={{
                fontSize: "0.65rem", fontWeight: 700, padding: "5px 10px",
                borderRadius: 999, background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "var(--text-soft)", fontFamily: "Space Grotesk",
              }}>{s}</span>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "1.1rem", fontFamily: "Space Grotesk", fontWeight: 800, color: "var(--cyan)" }}>
                ${freelancer.hourlyRate || 0}
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: 4 }}>/hr</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#fbbf24", fontSize: "0.78rem", letterSpacing: "0.02em" }}>
                {"★".repeat(stars)}{"☆".repeat(5 - stars)}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>
                {freelancer.totalJobs || 0} jobs
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
