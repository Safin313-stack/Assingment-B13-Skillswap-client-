"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#060914",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "3rem 5% 2rem",
      marginTop: "4rem",
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <svg width="26" height="26" viewBox="0 0 40 40">
                <defs><linearGradient id="flg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00f5e4" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
                <polygon points="20,2 36,14 36,28 20,38 4,28 4,14" fill="rgba(0,245,228,0.15)" stroke="url(#flg)" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="3" fill="#00f5e4" />
              </svg>
              <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1.1rem", color: "#f0f4ff" }}>
                Skill<span style={{ color: "#00f5e4" }}>Swap</span>
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(240,244,255,0.35)", lineHeight: 1.75, maxWidth: 260 }}>
              A marketplace where clients post micro-tasks and freelancers get hired fast.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.25rem" }}>
              {["𝕏", "in", "GH", "f"].map((s) => (
                <a key={s} href="#" style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700, color: "rgba(240,244,255,0.4)",
                  textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseOver={e => { e.currentTarget.style.color = "#00f5e4"; e.currentTarget.style.borderColor = "rgba(0,245,228,0.3)"; }}
                  onMouseOut={e => { e.currentTarget.style.color = "rgba(240,244,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk", fontSize: "0.82rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Platform</h4>
            {[["Browse Tasks", "/tasks"], ["Browse Freelancers", "/freelancers"], ["Post a Task", "/dashboard/client"], ["How it Works", "/"]].map(([label, href]) => (
              <div key={label} style={{ marginBottom: "0.6rem" }}>
                <Link href={href} style={{ fontSize: "0.85rem", color: "rgba(240,244,255,0.35)", textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#00f5e4"}
                  onMouseOut={e => e.target.style.color = "rgba(240,244,255,0.35)"}>{label}</Link>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk", fontSize: "0.82rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Company</h4>
            {["About Us", "Blog", "Careers", "Contact"].map((label) => (
              <div key={label} style={{ marginBottom: "0.6rem" }}>
                <a href="#" style={{ fontSize: "0.85rem", color: "rgba(240,244,255,0.35)", textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#00f5e4"}
                  onMouseOut={e => e.target.style.color = "rgba(240,244,255,0.35)"}>{label}</a>
              </div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk", fontSize: "0.82rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "1.1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Legal</h4>
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Trust & Safety"].map((label) => (
              <div key={label} style={{ marginBottom: "0.6rem" }}>
                <a href="#" style={{ fontSize: "0.85rem", color: "rgba(240,244,255,0.35)", textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#00f5e4"}
                  onMouseOut={e => e.target.style.color = "rgba(240,244,255,0.35)"}>{label}</a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.25)" }}>© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
          <p style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.25)" }}>contact@skillswap.io</p>
        </div>
      </div>
    </footer>
  );
}
