"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ClientDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [postForm, setPostForm] = useState({ title: "", category: "Design", description: "", budget: "", deadline: "" });
  const [editTask, setEditTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "client")) {
      router.push(user ? "/" : "/auth");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user?.role === "client") {
      fetchTasks();
      fetchProposals();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks/client");
      setTasks(res.data);
    } catch {}
  };

  const fetchProposals = async () => {
    try {
      const res = await api.get("/api/proposals/client/all");
      setProposals(res.data);
    } catch {}
  };

  const handlePostTask = async (e) => {
    e.preventDefault();
    const { title, category, description, budget, deadline } = postForm;
    if (!title || !description || !budget || !deadline) return toast.error("Fill in all fields");
    setSubmitting(true);
    try {
      await api.post("/api/tasks", { title, category, description, budget, deadline });
      toast.success("Task posted!");
      setPostForm({ title: "", category: "Design", description: "", budget: "", deadline: "" });
      fetchTasks();
      setActiveTab("my-tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post");
    } finally { setSubmitting(false); }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot delete");
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/tasks/${editTask._id}`, editTask);
      toast.success("Task updated");
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      const res = await api.put(`/api/proposals/${proposalId}/accept`);
      toast.success("Proposal accepted! Redirecting to payment…");
      // Create stripe checkout
      const checkoutRes = await api.post("/api/payments/create-checkout", { proposalId });
      window.location.href = checkoutRes.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to accept");
    }
  };

  const handleRejectProposal = async (proposalId) => {
    try {
      await api.put(`/api/proposals/${proposalId}/reject`);
      toast.success("Proposal rejected");
      fetchProposals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (authLoading) return <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.3)" }}>Loading…</div>;
  if (!user || user.role !== "client") return null;

  const openTasks = tasks.filter(t => t.status === "open").length;
  const inProgress = tasks.filter(t => t.status === "in-progress").length;
  const totalSpent = proposals.filter(p => p.status === "accepted").reduce((s, p) => s + (p.proposed_budget || 0), 0);

  const inp = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "0.7rem 1rem", color: "#f0f4ff", fontFamily: "Outfit", fontSize: "0.9rem", outline: "none", marginBottom: "1rem" };
  const statusBadge = (s) => {
    const map = { open: ["rgba(16,185,129,0.1)", "#10b981", "rgba(16,185,129,0.25)"], "in-progress": ["rgba(251,191,36,0.1)", "#fbbf24", "rgba(251,191,36,0.25)"], completed: ["rgba(139,92,246,0.1)", "#8b5cf6", "rgba(139,92,246,0.25)"] };
    const [bg, color, border] = map[s] || map.open;
    return <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: bg, color, border: `1px solid ${border}`, fontFamily: "Space Grotesk", textTransform: "capitalize" }}>{s}</span>;
  };

  return (
    <div style={{ paddingTop: 64, display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem 2.5rem", overflowX: "hidden" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 800, color: "#f0f4ff" }}>
              Good day, <span style={{ background: "linear-gradient(135deg,#00f5e4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{user.name}</span> 👋
            </h1>
            <p style={{ color: "rgba(240,244,255,0.35)", fontSize: "0.85rem", fontFamily: "Space Grotesk", marginTop: 4 }}>Client Dashboard</p>
          </div>
          <button className="btn-primary" onClick={() => setActiveTab("post-task")} style={{ fontSize: "0.875rem" }}>+ Post a Task</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Tasks", val: tasks.length, color: "#00f5e4", icon: "📋" },
            { label: "Open Tasks", val: openTasks, color: "#10b981", icon: "🟢" },
            { label: "In Progress", val: inProgress, color: "#fbbf24", icon: "⚙️" },
            { label: "Total Spent", val: `$${totalSpent}`, color: "#8b5cf6", icon: "💸" },
          ].map(({ label, val, color, icon }) => (
            <div key={label} className="glass-card" style={{ borderRadius: 16, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>{icon}</div>
              <div style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 800, color, lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(240,244,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Space Grotesk", marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 0 }}>
          {[["overview", "Overview"], ["post-task", "Post Task"], ["my-tasks", "My Tasks"], ["proposals", "Proposals"]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: "0.6rem 1.1rem", background: "transparent", border: "none",
              borderBottom: activeTab === id ? "2px solid #00f5e4" : "2px solid transparent",
              color: activeTab === id ? "#00f5e4" : "rgba(240,244,255,0.4)",
              fontFamily: "Space Grotesk", fontSize: "0.85rem", fontWeight: 600,
              cursor: "pointer", marginBottom: -1, transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>Recent Tasks</h2>
            {tasks.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>
                No tasks yet. <button onClick={() => setActiveTab("post-task")} style={{ color: "#00f5e4", background: "none", border: "none", cursor: "pointer", fontFamily: "Space Grotesk", fontSize: "0.9rem" }}>Post your first task →</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {tasks.slice(0, 5).map(t => (
                  <div key={t._id} className="glass-card" style={{ borderRadius: 14, padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontFamily: "Space Grotesk", fontSize: "0.9rem", fontWeight: 600, color: "#f0f4ff" }}>{t.title}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(240,244,255,0.35)", fontFamily: "Space Grotesk", marginTop: 3 }}>{t.category} · ${t.budget}</div>
                    </div>
                    {statusBadge(t.status)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* POST TASK TAB */}
        {activeTab === "post-task" && (
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.5rem" }}>Post a New Task</h2>
            <form onSubmit={handlePostTask}>
              <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Task Title</div>
              <input style={inp} placeholder="e.g. Design a SaaS landing page" value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} />

              <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Category</div>
              <select style={{ ...inp, cursor: "pointer" }} value={postForm.category} onChange={e => setPostForm({ ...postForm, category: e.target.value })}>
                {["Design", "Writing", "Development", "Marketing", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>

              <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Description</div>
              <textarea style={{ ...inp, minHeight: 120, resize: "vertical" }} placeholder="Describe what you need in detail…" value={postForm.description} onChange={e => setPostForm({ ...postForm, description: e.target.value })} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Budget (USD)</div>
                  <input style={{ ...inp, marginBottom: 0 }} type="number" placeholder="e.g. 300" value={postForm.budget} onChange={e => setPostForm({ ...postForm, budget: e.target.value })} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.45)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.3rem" }}>Deadline</div>
                  <input style={{ ...inp, marginBottom: 0 }} type="date" value={postForm.deadline} onChange={e => setPostForm({ ...postForm, deadline: e.target.value })} />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: "1.5rem", opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
                {submitting ? "Posting…" : "Post Task →"}
              </button>
            </form>
          </div>
        )}

        {/* MY TASKS TAB */}
        {activeTab === "my-tasks" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>My Tasks ({tasks.length})</h2>
            {tasks.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>No tasks yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {tasks.map(t => (
                  <div key={t._id} className="glass-card" style={{ borderRadius: 14, padding: "1.25rem" }}>
                    {editTask?._id === t._id ? (
                      <form onSubmit={handleEditSave} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <input style={{ ...inp, marginBottom: 0 }} value={editTask.title} onChange={e => setEditTask({ ...editTask, title: e.target.value })} />
                        <textarea style={{ ...inp, minHeight: 80, resize: "vertical", marginBottom: 0 }} value={editTask.description} onChange={e => setEditTask({ ...editTask, description: e.target.value })} />
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button type="submit" className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.5rem 1.25rem" }}>Save</button>
                          <button type="button" className="btn-ghost" onClick={() => setEditTask(null)} style={{ fontSize: "0.82rem", padding: "0.5rem 1.25rem" }}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontFamily: "Space Grotesk", fontSize: "0.95rem", fontWeight: 700, color: "#f0f4ff", marginBottom: 4 }}>{t.title}</div>
                          <div style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.35)", fontFamily: "Space Grotesk" }}>{t.category} · ${t.budget} · Due {new Date(t.deadline).toLocaleDateString()}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          {statusBadge(t.status)}
                          {t.status === "open" && (
                            <>
                              <button onClick={() => setEditTask({ ...t })} style={{ padding: "0.4rem 0.875rem", borderRadius: 8, border: "1px solid rgba(0,245,228,0.2)", background: "transparent", color: "#00f5e4", fontFamily: "Space Grotesk", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>Edit</button>
                              <button onClick={() => handleDeleteTask(t._id)} style={{ padding: "0.4rem 0.875rem", borderRadius: 8, border: "1px solid rgba(244,114,182,0.2)", background: "transparent", color: "#f472b6", fontFamily: "Space Grotesk", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROPOSALS TAB */}
        {activeTab === "proposals" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>Incoming Proposals ({proposals.length})</h2>
            {proposals.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>No proposals yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {proposals.map(p => (
                  <div key={p._id} className="glass-card" style={{ borderRadius: 14, padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontFamily: "Space Grotesk", fontSize: "0.85rem", fontWeight: 700, color: "#f0f4ff" }}>{p.freelancer_email}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(240,244,255,0.35)", fontFamily: "Space Grotesk", marginTop: 2 }}>
                          For: {p.task_id?.title} · Bid: <span style={{ color: "#00f5e4" }}>${p.proposed_budget}</span> · {p.estimated_days} days
                        </div>
                      </div>
                      <span style={{
                        fontSize: "0.62rem", fontWeight: 700, padding: "3px 9px", borderRadius: 100,
                        background: p.status === "pending" ? "rgba(251,191,36,0.1)" : p.status === "accepted" ? "rgba(16,185,129,0.1)" : "rgba(244,114,182,0.1)",
                        color: p.status === "pending" ? "#fbbf24" : p.status === "accepted" ? "#10b981" : "#f472b6",
                        border: `1px solid ${p.status === "pending" ? "rgba(251,191,36,0.25)" : p.status === "accepted" ? "rgba(16,185,129,0.25)" : "rgba(244,114,182,0.25)"}`,
                        fontFamily: "Space Grotesk", textTransform: "capitalize",
                      }}>{p.status}</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "rgba(240,244,255,0.4)", lineHeight: 1.65, marginBottom: "0.875rem" }}>{p.cover_note}</p>
                    {p.status === "pending" && (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => handleAcceptProposal(p._id)} className="btn-primary" style={{ fontSize: "0.78rem", padding: "0.45rem 1.1rem" }}>Accept & Pay</button>
                        <button onClick={() => handleRejectProposal(p._id)} style={{ padding: "0.45rem 1.1rem", borderRadius: 50, border: "1px solid rgba(244,114,182,0.25)", background: "transparent", color: "#f472b6", fontFamily: "Space Grotesk", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
