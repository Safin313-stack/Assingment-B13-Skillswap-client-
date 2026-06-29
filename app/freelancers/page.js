"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import FreelancerCard from "@/components/FreelancerCard";

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/users/freelancers")
      .then((r) => setFreelancers(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-shell">
      <section className="page-hero" style={{ padding: "4.5rem 5% 3rem" }}>
        <div className="hero-content">
          <div className="hero-badge-row" style={{ justifyContent: "center" }}>
            <span className="hero-badge">Verified Talent</span>
            <span className="hero-badge-copy">Browse experts with great ratings and fast delivery</span>
          </div>

          <h1 className="hero-title">
            Browse <span className="grad-text">Freelancers</span>
          </h1>

          <p className="hero-copy" style={{ maxWidth: 700, margin: "0 auto" }}>
            {freelancers.length} verified experts ready to help you finish work faster and with confidence.
          </p>
        </div>
      </section>

      <div className="section-block">
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-muted)" }}>Loading…</div>
        ) : freelancers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-muted)" }}>No freelancers yet.</div>
        ) : (
          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
            {freelancers.map((freelancer) => (
              <FreelancerCard key={freelancer._id} freelancer={freelancer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
