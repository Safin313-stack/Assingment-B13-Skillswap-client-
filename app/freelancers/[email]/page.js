"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";

export default function FreelancerProfilePage() {
  const { email } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/users/freelancer/${decodeURIComponent(email)}`)
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.3)" }}>Loading…</div>;
  if (!data) return <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.3)" }}>Freelancer not found</div>;

  const stars = Math.round(data.avgRating || 0);

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 5% 5rem" }}>

        {/* Header card */}
        <div className="glass-card" style={{ borderRadius: 20, overflow: "hidden", marginBottom: "1.5rem" }}>
          {/* Band */}
          <div style={{ height: 120, background: "linear-gradient(135deg,rgba(0,245,228,0.2),rgba(139,92,246,0.15))", position: "relative" }}>
            <div style={{
              position: "absolute", bottom: -32, left: "2.5rem",
              width: 80, height: 80, borderRadius: "50%",
              border: "4px solid rgba(2,4,15,0.9)", overflow: "hidden", background: "#0e1325",
            }}>
              {data.image ? (
                <img src={data.image} alt={data.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#00f5e4,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 700, color: "#02040f" }}>
                  {data.name?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: "3rem 2.5rem 2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 800, color: "#f0f4ff", marginBottom: 4 }}>{data.name}</h1>
                <p style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{data.bio || "Freelancer"}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {(data.skills || []).map(s => (
                    <span key={s} style={{ fontSize: "0.68rem", fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "rgba(0,245,228,0.08)", border: "1px solid rgba(0,245,228,0.2)", color: "#00f5e4", fontFamily: "Space Grotesk" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 800, color: "#00f5e4" }}>
                  ${data.hourlyRate || 0}<span style={{ fontSize: "0.8rem", color: "rgba(240,244,255,0.3)", fontWeight: 400 }}>/hr</span>
                </div>
                <div style={{ color: "#fbbf24", fontSize: "0.85rem", marginTop: 4 }}>
                  {"★".repeat(stars)}{"☆".repeat(5 - stars)} {data.avgRating?.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                ["⭐", data.avgRating?.toFixed(1) || "0.0", "Avg Rating"],
                ["✅", data.reviews?.length || 0, "Reviews"],
                ["💰", `$${data.hourlyRate || 0}`, "Hourly Rate"],
              ].map(([icon, val, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontFamily: "Space Grotesk", fontWeight: 800, color: "#f0f4ff" }}>{icon} {val}</div>
                  <div style={{ fontSize: "0.68rem", color: "rgba(240,244,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Space Grotesk", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {data.reviews?.length > 0 && (
          <div className="glass-card" style={{ borderRadius: 20, padding: "2rem" }}>
            <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.5rem" }}>Reviews ({data.reviews.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {data.reviews.map((r, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div style={{ fontFamily: "Space Grotesk", fontSize: "0.85rem", fontWeight: 600, color: "rgba(240,244,255,0.6)" }}>{r.reviewer_email?.split("@")[0]}</div>
                    <div style={{ color: "#fbbf24", fontSize: "0.8rem" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "rgba(240,244,255,0.45)", lineHeight: 1.7, fontStyle: "italic" }}>"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
