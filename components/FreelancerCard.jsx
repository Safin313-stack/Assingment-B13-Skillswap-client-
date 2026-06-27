"use client";
import Link from "next/link";
import Image from "next/image";

export default function FreelancerCard({ freelancer }) {
  const stars = Math.round(freelancer.avgRating || 0);

  return (
    <Link href={`/freelancers/${encodeURIComponent(freelancer.email)}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20, overflow: "hidden", cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.07) inset, 0 10px 32px rgba(0,0,0,0.45)",
      }}
        onMouseOver={e => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "rgba(0,245,228,0.3)";
          e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.1) inset, 0 24px 60px rgba(0,0,0,0.55), 0 0 32px rgba(0,245,228,0.06)";
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.07) inset, 0 10px 32px rgba(0,0,0,0.45)";
        }}
      >
        {/* Top band */}
        <div style={{
          height: 72,
          background: "linear-gradient(135deg,rgba(0,245,228,0.2),rgba(139,92,246,0.15))",
          position: "relative",
        }}>
          {/* Avatar */}
          <div style={{
            position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)",
            width: 56, height: 56, borderRadius: "50%",
            border: "3px solid #02040f",
            overflow: "hidden", background: "#0e1325",
            boxShadow: "0 4px 16px rgba(0,0,0,0.6)",
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

        {/* Body */}
        <div style={{ padding: "2rem 1.25rem 1.5rem", textAlign: "center" }}>
          <h3 style={{ fontFamily: "Space Grotesk", fontSize: "0.975rem", fontWeight: 700, color: "#f0f4ff", marginBottom: 3 }}>
            {freelancer.name}
          </h3>
          <p style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.35)", fontFamily: "Space Grotesk", marginBottom: "0.875rem" }}>
            {freelancer.bio?.substring(0, 50) || "Freelancer"}
          </p>

          {/* Skills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", marginBottom: "1rem" }}>
            {(freelancer.skills || []).slice(0, 3).map((s) => (
              <span key={s} style={{
                fontSize: "0.62rem", fontWeight: 600, padding: "2px 8px",
                borderRadius: 100, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk",
              }}>{s}</span>
            ))}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.875rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700, color: "#00f5e4" }}>
                ${freelancer.hourlyRate || 0}<sub style={{ fontSize: "0.6rem", color: "rgba(240,244,255,0.3)", fontWeight: 400 }}>/hr</sub>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#fbbf24", fontSize: "0.75rem" }}>
                {"★".repeat(stars)}{"☆".repeat(5 - stars)}
                <span style={{ fontSize: "0.72rem", color: "rgba(240,244,255,0.4)", marginLeft: 4 }}>
                  {freelancer.avgRating?.toFixed(1) || "0.0"}
                </span>
              </div>
              <div style={{ fontSize: "0.65rem", color: "rgba(240,244,255,0.3)", fontFamily: "Space Grotesk" }}>
                {freelancer.totalJobs || 0} jobs
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
