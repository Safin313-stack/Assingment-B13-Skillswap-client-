"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ proposed_budget: "", estimated_days: "", cover_note: "" });

  useEffect(() => {
    api.get(`/api/tasks/${id}`)
      .then(r => setTask(r.data))
      .catch(() => toast.error("Task not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in to submit a proposal"); return router.push("/auth"); }
    if (user.role !== "freelancer") return toast.error("Only freelancers can submit proposals");
    if (!form.proposed_budget || !form.estimated_days || !form.cover_note) return toast.error("Fill in all fields");
    setSubmitting(true);
    try {
      await api.post("/api/proposals", { task_id: id, ...form });
      toast.success("Proposal submitted!");
      setForm({ proposed_budget: "", estimated_days: "", cover_note: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit");
    } finally { setSubmitting(false); }
  };

  if (loading) return <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.4)" }}>Loading…</div>;
  if (!task) return <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.4)" }}>Task not found</div>;

  const deadline = new Date(task.deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2.5rem 5% 5rem" }}>
        {/* Back */}
        <button onClick={() => router.back()} style={{ background: "none", border: "none", color: "rgba(240,244,255,0.4)", cursor: "pointer", fontFamily: "Space Grotesk", fontSize: "0.85rem", marginBottom: "1.5rem", padding: 0 }}>
          ← Back to tasks
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem", alignItems: "start" }}>

          {/* Left */}
          <div>
            {/* Title */}
            <div className="glass-card" style={{ borderRadius: 20, padding: "2rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: "rgba(0,245,228,0.1)", color: "#00f5e4", border: "1px solid rgba(0,245,228,0.25)", fontFamily: "Space Grotesk" }}>{task.category}</span>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)", fontFamily: "Space Grotesk", textTransform: "capitalize" }}>{task.status}</span>
              </div>
              <h1 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#f0f4ff", lineHeight: 1.2, marginBottom: "1rem" }}>{task.title}</h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(240,244,255,0.5)", lineHeight: 1.8 }}>{task.description}</p>
            </div>

            {/* Details */}
            <div className="glass-card" style={{ borderRadius: 20, padding: "1.75rem", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>Task Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  ["Budget", `$${task.budget}`],
                  ["Deadline", deadline],
                  ["Category", task.category],
                  ["Client", task.client_email?.split("@")[0]],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "0.875rem" }}>
                    <div style={{ fontSize: "0.65rem", color: "rgba(240,244,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Space Grotesk", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "Space Grotesk", fontSize: "0.9rem", fontWeight: 600, color: "#f0f4ff" }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Proposal form */}
          <div>
            <div style={{
              background: "linear-gradient(145deg,rgba(0,245,228,0.06),rgba(0,245,228,0.01))",
              border: "1px solid rgba(0,245,228,0.15)",
              borderRadius: 20, padding: "1.75rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}>
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>
                {user?.role === "freelancer" ? "Submit a Proposal" : "Sign in as Freelancer to Apply"}
              </h3>

              {user?.role === "freelancer" ? (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "0.25rem", fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Your Bid (USD)</div>
                  <input className="inp" style={{ marginBottom: "1rem" }} type="number" placeholder="e.g. 350"
                    value={form.proposed_budget} onChange={e => setForm({ ...form, proposed_budget: e.target.value })} />

                  <div style={{ marginBottom: "0.25rem", fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Estimated Days</div>
                  <input className="inp" style={{ marginBottom: "1rem" }} type="number" placeholder="e.g. 3"
                    value={form.estimated_days} onChange={e => setForm({ ...form, estimated_days: e.target.value })} />

                  <div style={{ marginBottom: "0.25rem", fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Cover Note</div>
                  <textarea className="inp" style={{ minHeight: 120, resize: "vertical", marginBottom: "1.25rem" }}
                    placeholder="Explain why you're the best fit for this task…"
                    value={form.cover_note} onChange={e => setForm({ ...form, cover_note: e.target.value })} />

                  <button type="submit" className="btn-primary" style={{ width: "100%", opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Proposal →"}
                  </button>
                </form>
              ) : (
                <div>
                  <p style={{ fontSize: "0.875rem", color: "rgba(240,244,255,0.4)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                    Create a freelancer account to submit proposals on this task.
                  </p>
                  <a href="/auth">
                    <button className="btn-primary" style={{ width: "100%" }}>Sign In / Register →</button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
