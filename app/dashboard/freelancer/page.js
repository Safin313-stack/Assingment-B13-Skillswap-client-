"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function FreelancerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [proposals, setProposals] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [profileForm, setProfileForm] = useState({ name: "", image: "", bio: "", hourlyRate: "", skills: "" });
  const [deliverableModal, setDeliverableModal] = useState(null);
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "freelancer")) {
      router.push(user ? "/" : "/auth");
    }
    if (user) {
      setProfileForm({ name: user.name || "", image: user.image || "", bio: user.bio || "", hourlyRate: user.hourlyRate || "", skills: (user.skills || []).join(", ") });
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user?.role === "freelancer") {
      fetchProposals();
      fetchActiveProjects();
      fetchEarnings();
    }
  }, [user]);

  const fetchProposals = async () => {
    try { const r = await api.get("/api/proposals/my"); setProposals(r.data); } catch {}
  };

  const fetchActiveProjects = async () => {
    try { const r = await api.get("/api/proposals/active"); setActiveProjects(r.data); } catch {}
  };

  const fetchEarnings = async () => {
    try { const r = await api.get("/api/payments/earnings"); setEarnings(r.data); } catch {}
  };

  const handleDeliverableSubmit = async () => {
    if (!deliverableUrl.trim()) return toast.error("Enter a deliverable URL");
    setSubmitting(true);
    try {
      await api.put(`/api/tasks/${deliverableModal}/complete`, { deliverable_url: deliverableUrl });
      toast.success("Deliverable submitted! Task marked as completed.");
      setDeliverableModal(null);
      setDeliverableUrl("");
      fetchActiveProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally { setSubmitting(false); }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await api.put("/api/users/profile", {
        ...profileForm,
        skills: profileForm.skills.split(",").map(s => s.trim()).filter(Boolean),
        hourlyRate: parseFloat(profileForm.hourlyRate) || 0,
      });
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (authLoading) return <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.3)" }}>Loading…</div>;
  if (!user || user.role !== "freelancer") return null;

  const totalEarnings = earnings.reduce((s, e) => s + (e.amount || 0), 0);
  const pending = proposals.filter(p => p.status === "pending").length;
  const accepted = proposals.filter(p => p.status === "accepted").length;

  const inp = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "0.7rem 1rem", color: "#f0f4ff", fontFamily: "Outfit", fontSize: "0.9rem", outline: "none", marginBottom: "1rem" };

  const statusColor = { pending: "#fbbf24", accepted: "#10b981", rejected: "#f472b6" };

  return (
    <div style={{ paddingTop: 64, display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem 2.5rem", overflowX: "hidden" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 800, color: "#f0f4ff" }}>
              Welcome, <span style={{ background: "linear-gradient(135deg,#00f5e4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{user.name}</span> 🚀
            </h1>
            <p style={{ color: "rgba(240,244,255,0.35)", fontSize: "0.85rem", fontFamily: "Space Grotesk", marginTop: 4 }}>Freelancer Dashboard</p>
          </div>
          <a href="/tasks"><button className="btn-primary" style={{ fontSize: "0.875rem" }}>Browse Tasks →</button></a>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Proposals", val: proposals.length, color: "#00f5e4", icon: "📬" },
            { label: "Pending", val: pending, color: "#fbbf24", icon: "⏳" },
            { label: "Accepted", val: accepted, color: "#10b981", icon: "✅" },
            { label: "Total Earnings", val: `$${totalEarnings}`, color: "#8b5cf6", icon: "💰" },
          ].map(({ label, val, color, icon }) => (
            <div key={label} className="glass-card" style={{ borderRadius: 16, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>{icon}</div>
              <div style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 800, color, lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(240,244,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Space Grotesk", marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {[["overview", "Overview"], ["proposals", "My Proposals"], ["active", "Active Projects"], ["earnings", "Earnings"], ["profile", "Edit Profile"]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: "0.6rem 1.1rem", background: "transparent", border: "none",
              borderBottom: activeTab === id ? "2px solid #00f5e4" : "2px solid transparent",
              color: activeTab === id ? "#00f5e4" : "rgba(240,244,255,0.4)",
              fontFamily: "Space Grotesk", fontSize: "0.82rem", fontWeight: 600,
              cursor: "pointer", marginBottom: -1, whiteSpace: "nowrap",
            }}>{label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>Recent Proposals</h2>
            {proposals.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>
                No proposals yet. <a href="/tasks" style={{ color: "#00f5e4" }}>Browse tasks →</a>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {proposals.slice(0, 5).map(p => (
                  <div key={p._id} className="glass-card" style={{ borderRadius: 14, padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontFamily: "Space Grotesk", fontSize: "0.875rem", fontWeight: 600, color: "#f0f4ff" }}>{p.task_id?.title || "Task"}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(240,244,255,0.35)", fontFamily: "Space Grotesk", marginTop: 2 }}>Bid: ${p.proposed_budget} · {p.estimated_days} days</div>
                    </div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: `${statusColor[p.status]}18`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}40`, fontFamily: "Space Grotesk", textTransform: "capitalize" }}>{p.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MY PROPOSALS */}
        {activeTab === "proposals" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>All Proposals ({proposals.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Space Grotesk", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Task Title", "Budget Bid", "Est. Days", "Date Sent", "Status"].map(h => (
                      <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", color: "rgba(240,244,255,0.35)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {proposals.map(p => (
                    <tr key={p._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                      onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "0.875rem 1rem", color: "#f0f4ff", fontWeight: 600 }}>{p.task_id?.title || "—"}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#00f5e4" }}>${p.proposed_budget}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "rgba(240,244,255,0.5)" }}>{p.estimated_days} days</td>
                      <td style={{ padding: "0.875rem 1rem", color: "rgba(240,244,255,0.35)" }}>{new Date(p.submitted_at).toLocaleDateString()}</td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: `${statusColor[p.status]}18`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}40`, textTransform: "capitalize" }}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {proposals.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>No proposals yet.</div>}
            </div>
          </div>
        )}

        {/* ACTIVE PROJECTS */}
        {activeTab === "active" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>Active Projects ({activeProjects.length})</h2>
            {activeProjects.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>No active projects yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {activeProjects.map(p => (
                  <div key={p._id} className="glass-card" style={{ borderRadius: 16, padding: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700, color: "#f0f4ff" }}>{p.task_id?.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.35)", fontFamily: "Space Grotesk", marginTop: 3 }}>
                          {p.task_id?.category} · Budget: ${p.proposed_budget} · Client: {p.task_id?.client_email?.split("@")[0]}
                        </div>
                      </div>
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)", fontFamily: "Space Grotesk", textTransform: "capitalize" }}>
                        {p.task_id?.status}
                      </span>
                    </div>
                    {p.task_id?.status === "in-progress" && (
                      <button onClick={() => setDeliverableModal(p.task_id._id)} className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.5rem 1.25rem" }}>
                        Submit Deliverable
                      </button>
                    )}
                    {p.task_id?.deliverable_url && (
                      <div style={{ marginTop: "0.75rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.4)", fontFamily: "Space Grotesk" }}>Deliverable: </span>
                        <a href={p.task_id.deliverable_url} target="_blank" rel="noreferrer" style={{ fontSize: "0.75rem", color: "#00f5e4" }}>{p.task_id.deliverable_url}</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === "earnings" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>Earnings (${totalEarnings} total)</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Space Grotesk", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Task Title", "Client", "Amount", "Date", "Status"].map(h => (
                      <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", color: "rgba(240,244,255,0.35)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {earnings.map(e => (
                    <tr key={e._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "0.875rem 1rem", color: "#f0f4ff", fontWeight: 600 }}>{e.task_id?.title || "—"}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "rgba(240,244,255,0.5)" }}>{e.client_email?.split("@")[0]}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "#10b981", fontWeight: 700 }}>${e.amount}</td>
                      <td style={{ padding: "0.875rem 1rem", color: "rgba(240,244,255,0.35)" }}>{new Date(e.paid_at).toLocaleDateString()}</td>
                      <td style={{ padding: "0.875rem 1rem" }}><span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>{e.payment_status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {earnings.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>No earnings yet.</div>}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.5rem" }}>Edit Profile</h2>
            <form onSubmit={handleProfileSave}>
              {[["Name", "name", "text", "Your full name"], ["Profile Photo URL", "image", "url", "https://…"], ["Hourly Rate (USD)", "hourlyRate", "number", "e.g. 45"]].map(([label, field, type, ph]) => (
                <div key={field}>
                  <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>{label}</div>
                  <input style={inp} type={type} placeholder={ph} value={profileForm[field]} onChange={e => setProfileForm({ ...profileForm, [field]: e.target.value })} />
                </div>
              ))}
              <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Skills (comma separated)</div>
              <input style={inp} placeholder="React, Figma, Node.js" value={profileForm.skills} onChange={e => setProfileForm({ ...profileForm, skills: e.target.value })} />
              <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Bio</div>
              <textarea style={{ ...inp, minHeight: 100, resize: "vertical" }} placeholder="Tell clients about yourself…" value={profileForm.bio} onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })} />
              <button type="submit" className="btn-primary">Save Profile</button>
            </form>
          </div>
        )}

        {/* Deliverable modal */}
        {deliverableModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <div className="glass-card" style={{ borderRadius: 20, padding: "2rem", maxWidth: 480, width: "100%" }}>
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>Submit Deliverable</h3>
              <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Deliverable URL</div>
              <input className="inp" style={{ marginBottom: "1.25rem" }} type="url" placeholder="https://github.com/your-work or Google Drive link"
                value={deliverableUrl} onChange={e => setDeliverableUrl(e.target.value)} />
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={handleDeliverableSubmit} className="btn-primary" disabled={submitting}>{submitting ? "Submitting…" : "Submit & Complete Task"}</button>
                <button onClick={() => setDeliverableModal(null)} className="btn-ghost">Cancel</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
