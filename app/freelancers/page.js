"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import FreelancerCard from "@/components/FreelancerCard";

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/users/freelancers")
      .then(r => setFreelancers(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh" }}>
      <div style={{ padding: "3rem 5% 2rem", textAlign: "center", background: "radial-gradient(ellipse 60% 60% at 50% 50%,rgba(139,92,246,0.06),transparent)" }}>
        <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#f0f4ff", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          Browse <span style={{ background: "linear-gradient(135deg,#8b5cf6,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Freelancers</span>
        </h1>
        <p style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.95rem" }}>
          {freelancers.length} verified experts ready to work
        </p>
      </div>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 5% 5rem" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "rgba(240,244,255,0.3)" }}>Loading…</div>
        ) : freelancers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "rgba(240,244,255,0.3)" }}>No freelancers yet.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
            {freelancers.map(f => <FreelancerCard key={f._id} freelancer={f} />)}
          </div>
        )}
      </div>
    </div>
  );
}
