"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("skillswap-theme");
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.style.colorScheme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("skillswap-theme", nextTheme);
  };

  const getDashboardPath = () => {
    if (!user) return "/auth";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "freelancer") return "/dashboard/freelancer";
    return "/dashboard/client";
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "var(--surface)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)",
      padding: "0 5%",
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 40 40">
            <defs>
              <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5e4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <polygon points="20,2 36,14 36,28 20,38 4,28 4,14" fill="rgba(0,245,228,0.15)" stroke="url(#lg)" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="3" fill="#00f5e4" />
          </svg>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "var(--text)" }}>
            Skill<span style={{ color: "#00f5e4" }}>Swap</span>
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Link href="/" style={{ fontFamily: "Space Grotesk", fontSize: "0.875rem", color: "var(--text-soft)", textDecoration: "none", padding: "0.4rem 0.875rem", borderRadius: 50 }}
            onMouseOver={e => e.target.style.color = "var(--text)"}
            onMouseOut={e => e.target.style.color = "var(--text-soft)"}>
            Home
          </Link>
          <Link href="/tasks" style={{ fontFamily: "Space Grotesk", fontSize: "0.875rem", color: "var(--text-soft)", textDecoration: "none", padding: "0.4rem 0.875rem", borderRadius: 50 }}
            onMouseOver={e => e.target.style.color = "var(--text)"}
            onMouseOut={e => e.target.style.color = "var(--text-soft)"}>
            Browse Tasks
          </Link>
          <Link href="/freelancers" style={{ fontFamily: "Space Grotesk", fontSize: "0.875rem", color: "var(--text-soft)", textDecoration: "none", padding: "0.4rem 0.875rem", borderRadius: 50 }}
            onMouseOver={e => e.target.style.color = "var(--text)"}
            onMouseOut={e => e.target.style.color = "var(--text-soft)"}>
            Browse Freelancers
          </Link>

          <button onClick={toggleTheme} className="theme-toggle" style={{ marginLeft: "0.35rem", fontSize: "0.85rem", fontFamily: "Space Grotesk" }}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          {user ? (
            <>
              <Link href={getDashboardPath()} style={{ fontFamily: "Space Grotesk", fontSize: "0.875rem", color: "#00f5e4", textDecoration: "none", padding: "0.4rem 0.875rem" }}>
                Dashboard
              </Link>
              <button onClick={logout} className="btn-ghost" style={{ padding: "0.45rem 1.1rem", fontSize: "0.85rem" }}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button className="btn-primary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.85rem" }}>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
