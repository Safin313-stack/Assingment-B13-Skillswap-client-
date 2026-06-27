"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalFreelancers: 0, totalClients: 0 });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push(user ? "/" : "/auth");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAll();
    }
  }, [user]);

  const fetchAll = async () => {
    try {
      const [u, t, p, s] = await Promise.all([
        api.get("/api/users/admin/all"),
        api.get("/api/tasks/admin/all"),
        api.get("/api/payments/all"),
        api.get("/api/users/admin/stats"),
      ]);
      setUsers(u.data);
      setTasks(t.data);
      setPayments(p.data);
      setStats(s.data);
    } catch {}
  };

  const handleBlock = async (id, blocked) => {
    try {
      await api.put(`/api/users/admin/${id}/${blocked ? "unblock" : "block"}`);
      toast.success(blocked ? "User unblocked" : "User blocked");
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/api/tasks/admin/${id}`);
      toast.success("Task deleted");
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (authLoading) return <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.3)" }}>Loading…</div>;
  if (!user || user.role !== "admin") return null;

  const totalRevenue = payments.reduce((s, p) => s + (p.amount || 0), 0);
  const activeTasks = tasks.filter(t => t.status !== "completed").length;

  const thStyle = { padding: "0.75rem 1rem", textAlign: "left", color: "rgba(240,244,255,0.35)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, fontFamily: "Space Grotesk" };
  const tdStyle = { padding: "0.875rem 1rem", color: "rgba(240,244,255,0.7)", fontSize: "0.85rem", fontFamily: "Space Grotesk", borderBottom: "1px solid rgba(255,255,255,0.04)" };

  return (
    <div style={{ paddingTop: 64, display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem 2.5rem", overflowX: "hidden" }}>

        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 800, color: "#f0f4ff" }}>
            Admin <span style={{ background: "linear-gradient(135deg,#f472b6,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dashboard</span>
          </h1>
          <p style={{ color: "rgba(240,244,255,0.35)", fontSize: "0.85rem", fontFamily: "Space Grotesk", marginTop: 4 }}>Platform management</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Users", val: stats.totalUsers, color: "#00f5e4", icon: "👥" },
            { label: "Total Tasks", val: tasks.length, color: "#8b5cf6", icon: "📋" },
            { label: "Total Revenue", val: `$${totalRevenue}`, color: "#10b981", icon: "💰" },
            { label: "Active Tasks", val: activeTasks, color: "#fbbf24", icon: "⚡" },
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
          {[["overview", "Overview"], ["users", "Manage Users"], ["tasks", "Manage Tasks"], ["transactions", "Transactions"]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: "0.6rem 1.1rem", background: "transparent", border: "none",
              borderBottom: activeTab === id ? "2px solid #f472b6" : "2px solid transparent",
              color: activeTab === id ? "#f472b6" : "rgba(240,244,255,0.4)",
              fontFamily: "Space Grotesk", fontSize: "0.82rem", fontWeight: 600,
              cursor: "pointer", marginBottom: -1, whiteSpace: "nowrap",
            }}>{label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1rem" }}>Recent Users</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {users.slice(0, 5).map(u => (
                  <div key={u._id} className="glass-card" style={{ borderRadius: 12, padding: "0.875rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "Space Grotesk", fontSize: "0.85rem", fontWeight: 600, color: "#f0f4ff" }}>{u.name}</div>
                      <div style={{ fontSize: "0.68rem", color: "rgba(240,244,255,0.3)", fontFamily: "Space Grotesk" }}>{u.email}</div>
                    </div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: u.role === "admin" ? "rgba(244,114,182,0.1)" : u.role === "freelancer" ? "rgba(139,92,246,0.1)" : "rgba(0,245,228,0.1)", color: u.role === "admin" ? "#f472b6" : u.role === "freelancer" ? "#8b5cf6" : "#00f5e4", border: `1px solid ${u.role === "admin" ? "rgba(244,114,182,0.25)" : u.role === "freelancer" ? "rgba(139,92,246,0.25)" : "rgba(0,245,228,0.25)"}`, fontFamily: "Space Grotesk", textTransform: "capitalize" }}>{u.role}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1rem" }}>Recent Tasks</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {tasks.slice(0, 5).map(t => (
                  <div key={t._id} className="glass-card" style={{ borderRadius: 12, padding: "0.875rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "Space Grotesk", fontSize: "0.85rem", fontWeight: 600, color: "#f0f4ff" }}>{t.title?.substring(0, 35)}…</div>
                      <div style={{ fontSize: "0.68rem", color: "rgba(240,244,255,0.3)", fontFamily: "Space Grotesk" }}>{t.category} · ${t.budget}</div>
                    </div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)", fontFamily: "Space Grotesk", textTransform: "capitalize" }}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MANAGE USERS */}
        {activeTab === "users" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>All Users ({users.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Name", "Email", "Role", "Status", "Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ ...tdStyle, color: "#f0f4ff", fontWeight: 600 }}>{u.name}</td>
                      <td style={tdStyle}>{u.email}</td>
                      <td style={tdStyle}><span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(0,245,228,0.08)", color: "#00f5e4", border: "1px solid rgba(0,245,228,0.2)", textTransform: "capitalize" }}>{u.role}</span></td>
                      <td style={tdStyle}><span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: u.isBlocked ? "rgba(244,114,182,0.1)" : "rgba(16,185,129,0.1)", color: u.isBlocked ? "#f472b6" : "#10b981", border: `1px solid ${u.isBlocked ? "rgba(244,114,182,0.25)" : "rgba(16,185,129,0.25)"}` }}>{u.isBlocked ? "Blocked" : "Active"}</span></td>
                      <td style={tdStyle}>
                        {u.role !== "admin" && (
                          <button onClick={() => handleBlock(u._id, u.isBlocked)} style={{ padding: "0.35rem 0.875rem", borderRadius: 8, border: `1px solid ${u.isBlocked ? "rgba(16,185,129,0.3)" : "rgba(244,114,182,0.3)"}`, background: "transparent", color: u.isBlocked ? "#10b981" : "#f472b6", fontFamily: "Space Grotesk", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>
                            {u.isBlocked ? "Unblock" : "Block"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MANAGE TASKS */}
        {activeTab === "tasks" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>All Tasks ({tasks.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Title", "Category", "Budget", "Status", "Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(t => (
                    <tr key={t._id} onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ ...tdStyle, color: "#f0f4ff", fontWeight: 600, maxWidth: 260 }}>{t.title}</td>
                      <td style={tdStyle}>{t.category}</td>
                      <td style={{ ...tdStyle, color: "#00f5e4" }}>${t.budget}</td>
                      <td style={tdStyle}><span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)", textTransform: "capitalize" }}>{t.status}</span></td>
                      <td style={tdStyle}>
                        <button onClick={() => handleDeleteTask(t._id)} style={{ padding: "0.35rem 0.875rem", borderRadius: 8, border: "1px solid rgba(244,114,182,0.3)", background: "transparent", color: "#f472b6", fontFamily: "Space Grotesk", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TRANSACTIONS */}
        {activeTab === "transactions" && (
          <div>
            <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.1rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.25rem" }}>All Transactions (${totalRevenue} total)</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Client Email", "Freelancer Email", "Amount", "Date", "Status"].map(h => <th key={h} style={thStyle}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p._id} onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                      <td style={tdStyle}>{p.client_email}</td>
                      <td style={tdStyle}>{p.freelancer_email}</td>
                      <td style={{ ...tdStyle, color: "#10b981", fontWeight: 700 }}>${p.amount}</td>
                      <td style={tdStyle}>{new Date(p.paid_at).toLocaleDateString()}</td>
                      <td style={tdStyle}><span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>{p.payment_status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {payments.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "rgba(240,244,255,0.3)" }}>No transactions yet.</div>}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
