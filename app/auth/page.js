"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", image: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return toast.error("Fill in all fields");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", loginForm);
      login(res.data.token, res.data.user);
      toast.success("Welcome back!");
      const r = res.data.user.role;
      router.push(r === "admin" ? "/dashboard/admin" : r === "freelancer" ? "/dashboard/freelancer" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, image } = registerForm;
    if (!name || !email || !password) return toast.error("Fill in all fields");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", { name, email, password, image, role });
      login(res.data.token, res.data.user);
      toast.success("Account created!");
      router.push(role === "freelancer" ? "/dashboard/freelancer" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  const inp = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10,
    padding: "0.7rem 1rem", color: "#f0f4ff", fontFamily: "Outfit",
    fontSize: "0.9rem", outline: "none", marginBottom: "1rem",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "5rem 1rem", paddingTop: "80px",
      background: "radial-gradient(ellipse 60% 60% at 50% 30%, rgba(0,245,228,0.05), transparent)",
    }}>
      <div style={{
        width: "100%", maxWidth: 460,
        background: "linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24, padding: "2.5rem",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "Space Grotesk", fontSize: "1.5rem", fontWeight: 800, color: "#f0f4ff" }}>
            Skill<span style={{ color: "#00f5e4" }}>Swap</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(240,244,255,0.4)", marginTop: 6 }}>
            {tab === "login" ? "Sign in to your account" : "Create a free account"}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 50, padding: 4, marginBottom: "2rem",
        }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "0.55rem", borderRadius: 50,
              border: "none", cursor: "pointer",
              background: tab === t ? "linear-gradient(135deg,#00f5e4,#00d4c4)" : "transparent",
              color: tab === t ? "#02040f" : "rgba(240,244,255,0.45)",
              fontFamily: "Space Grotesk", fontSize: "0.875rem", fontWeight: 700,
              textTransform: "capitalize", transition: "all 0.25s",
            }}>{t === "login" ? "Sign In" : "Sign Up"}</button>
          ))}
        </div>

        {/* LOGIN FORM */}
        {tab === "login" && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "0.25rem", fontSize: "0.78rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Email</div>
            <input style={inp} type="email" placeholder="you@example.com"
              value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />

            <div style={{ marginBottom: "0.25rem", fontSize: "0.78rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Password</div>
            <input style={inp} type="password" placeholder="••••••••"
              value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />

            <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === "register" && (
          <form onSubmit={handleRegister}>
            {/* Role */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk", fontWeight: 600, marginBottom: "0.5rem" }}>I want to…</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[["client", "💼 Hire Talent"], ["freelancer", "🚀 Find Work"]].map(([r, label]) => (
                  <button key={r} type="button" onClick={() => setRole(r)} style={{
                    padding: "0.875rem", borderRadius: 10, cursor: "pointer",
                    border: role === r ? "1px solid rgba(0,245,228,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    background: role === r ? "rgba(0,245,228,0.08)" : "transparent",
                    color: role === r ? "#00f5e4" : "rgba(240,244,255,0.5)",
                    fontFamily: "Space Grotesk", fontSize: "0.85rem", fontWeight: 600,
                    transition: "all 0.2s",
                  }}>{label}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "0.25rem", fontSize: "0.78rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Full Name</div>
            <input style={inp} type="text" placeholder="Tanvir Islam"
              value={registerForm.name} onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })} />

            <div style={{ marginBottom: "0.25rem", fontSize: "0.78rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Email</div>
            <input style={inp} type="email" placeholder="you@example.com"
              value={registerForm.email} onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })} />

            <div style={{ marginBottom: "0.25rem", fontSize: "0.78rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Profile Photo URL (optional)</div>
            <input style={inp} type="url" placeholder="https://i.ibb.co/your-photo.jpg"
              value={registerForm.image} onChange={e => setRegisterForm({ ...registerForm, image: e.target.value })} />

            <div style={{ marginBottom: "0.25rem", fontSize: "0.78rem", color: "rgba(240,244,255,0.5)", fontFamily: "Space Grotesk", fontWeight: 600 }}>Password</div>
            <input style={inp} type="password" placeholder="Min 6 chars, 1 uppercase, 1 lowercase"
              value={registerForm.password} onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })} />
            <div style={{ fontSize: "0.7rem", color: "rgba(240,244,255,0.3)", marginTop: "-0.75rem", marginBottom: "1rem", fontFamily: "Space Grotesk" }}>
              6+ chars · At least 1 capital · At least 1 lowercase
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
