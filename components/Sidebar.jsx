"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const clientLinks = [
  { href: "/dashboard/client", label: "Overview", icon: "⊞" },
  { href: "/dashboard/client/post-task", label: "Post a Task", icon: "＋" },
  { href: "/dashboard/client/my-tasks", label: "My Tasks", icon: "✓" },
  { href: "/dashboard/client/proposals", label: "Proposals", icon: "📬" },
];

const freelancerLinks = [
  { href: "/dashboard/freelancer", label: "Overview", icon: "⊞" },
  { href: "/dashboard/freelancer/proposals", label: "My Proposals", icon: "📬" },
  { href: "/dashboard/freelancer/active", label: "Active Projects", icon: "🚀" },
  { href: "/dashboard/freelancer/earnings", label: "Earnings", icon: "💰" },
  { href: "/dashboard/freelancer/profile", label: "Edit Profile", icon: "👤" },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: "⊞" },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: "👥" },
  { href: "/dashboard/admin/tasks", label: "Manage Tasks", icon: "✓" },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: "💳" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const links =
    user?.role === "admin" ? adminLinks :
    user?.role === "freelancer" ? freelancerLinks :
    clientLinks;

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: "linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))",
      borderRight: "1px solid rgba(255,255,255,0.07)",
      minHeight: "calc(100vh - 64px)",
      padding: "1.5rem 1rem",
      display: "flex", flexDirection: "column", gap: "0.25rem",
    }}>
      {/* User info */}
      <div style={{
        padding: "0.875rem", marginBottom: "1rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg,#00f5e4,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Space Grotesk", fontSize: "0.9rem", fontWeight: 700, color: "#02040f",
            flexShrink: 0,
          }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontFamily: "Space Grotesk", fontSize: "0.85rem", fontWeight: 700, color: "#f0f4ff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.name}
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(240,244,255,0.35)", textTransform: "capitalize" }}>
              {user?.role}
            </div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      {links.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "0.6rem 0.875rem", borderRadius: 10,
              fontFamily: "Space Grotesk", fontSize: "0.84rem", fontWeight: 500,
              color: active ? "#00f5e4" : "rgba(240,244,255,0.45)",
              background: active ? "rgba(0,245,228,0.07)" : "transparent",
              border: active ? "1px solid rgba(0,245,228,0.15)" : "1px solid transparent",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
              onMouseOver={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#f0f4ff"; }}}
              onMouseOut={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(240,244,255,0.45)"; }}}
            >
              <span>{icon}</span>
              {label}
            </div>
          </Link>
        );
      })}

      {/* Logout */}
      <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button onClick={logout} style={{
          width: "100%", padding: "0.6rem 0.875rem",
          background: "transparent", border: "1px solid rgba(244,114,182,0.2)",
          borderRadius: 10, color: "rgba(244,114,182,0.7)",
          fontFamily: "Space Grotesk", fontSize: "0.84rem", fontWeight: 500,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          transition: "all 0.2s",
        }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(244,114,182,0.07)"; e.currentTarget.style.color = "#f472b6"; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(244,114,182,0.7)"; }}
        >
          ↩ Sign Out
        </button>
      </div>
    </aside>
  );
}
