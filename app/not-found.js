"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "2rem",
      background: "radial-gradient(ellipse 60% 60% at 50% 40%,rgba(139,92,246,0.06),transparent)",
    }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{
          fontFamily: "Space Grotesk", fontSize: "7rem", fontWeight: 800,
          background: "linear-gradient(135deg,#00f5e4,#8b5cf6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1, marginBottom: "1.5rem",
        }}>404</div>

        <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.75rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "0.875rem" }}>
          Page not found
        </h2>
        <p style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/"><button className="btn-primary">Go Home</button></Link>
          <Link href="/tasks"><button className="btn-ghost">Browse Tasks</button></Link>
        </div>
      </div>
    </div>
  );
}
