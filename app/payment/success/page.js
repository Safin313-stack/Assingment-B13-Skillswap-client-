"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const proposal_id = searchParams.get("proposal_id");
    if (!session_id) { setError("Invalid session"); setLoading(false); return; }

    api.get(`/api/payments/confirm-session?session_id=${session_id}&proposal_id=${proposal_id}`)
      .then(r => setData(r.data))
      .catch(err => setError(err.response?.data?.message || "Payment verification failed"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ paddingTop: 120, textAlign: "center", color: "rgba(240,244,255,0.4)", fontFamily: "Space Grotesk" }}>
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
      Verifying payment…
    </div>
  );

  if (error) return (
    <div style={{ paddingTop: 120, textAlign: "center", maxWidth: 480, margin: "0 auto", padding: "8rem 2rem" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>❌</div>
      <h2 style={{ fontFamily: "Space Grotesk", fontSize: "1.5rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "0.75rem" }}>Payment Error</h2>
      <p style={{ color: "rgba(240,244,255,0.4)", marginBottom: "2rem" }}>{error}</p>
      <Link href="/dashboard/client"><button className="btn-primary">Go to Dashboard</button></Link>
    </div>
  );

  return (
    <div style={{
      paddingTop: 80, minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse 60% 60% at 50% 40%,rgba(16,185,129,0.06),transparent)",
    }}>
      <div style={{ textAlign: "center", maxWidth: 520, padding: "2rem" }}>
        {/* Success icon with animation */}
        <div style={{ fontSize: "4.5rem", marginBottom: "1.5rem", animation: "popIn 0.6s cubic-bezier(0.22,1,0.36,1)" }}>🎉</div>

        <h1 style={{
          fontFamily: "Space Grotesk", fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 800, color: "#f0f4ff", letterSpacing: "-0.03em", marginBottom: "0.75rem",
        }}>
          Payment <span style={{ background: "linear-gradient(135deg,#10b981,#00f5e4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Successful!</span>
        </h1>

        <p style={{ color: "rgba(240,244,255,0.5)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          Your payment has been confirmed. The freelancer has been notified and will start working on your task.
        </p>

        {/* Details card */}
        <div className="glass-card" style={{ borderRadius: 20, padding: "1.75rem", marginBottom: "2rem", textAlign: "left" }}>
          {[
            ["Freelancer", data?.freelancer_email],
            ["Amount Paid", `$${data?.amount}`],
            ["Task Status", "In Progress"],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize: "0.85rem", color: "rgba(240,244,255,0.4)", fontFamily: "Space Grotesk" }}>{label}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f0f4ff", fontFamily: "Space Grotesk", textTransform: "capitalize" }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: "1rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></div>
            <span style={{ fontSize: "0.78rem", color: "#10b981", fontFamily: "Space Grotesk", fontWeight: 600 }}>Escrow payment secured</span>
          </div>
        </div>

        <Link href="/dashboard/client">
          <button className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2.5rem" }}>
            Go to Dashboard →
          </button>
        </Link>
      </div>

      <style>{`@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
    </div>
  );
}
