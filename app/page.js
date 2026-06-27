"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import TaskCard from "@/components/TaskCard";
import FreelancerCard from "@/components/FreelancerCard";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    api.get("/api/tasks/latest").then(r => setTasks(r.data)).catch(() => {});
    api.get("/api/users/freelancers/top").then(r => setFreelancers(r.data)).catch(() => {});
  }, []);

  return (
    <div style={{ paddingTop: 64 }}>

      {/* HERO */}
      <section style={{
        minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "5rem 5%",
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,245,228,0.06), transparent)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "radial-gradient(rgba(0,245,228,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 16px 5px 6px", borderRadius: 100,
            background: "rgba(0,245,228,0.06)", border: "1px solid rgba(0,245,228,0.2)",
            marginBottom: "2rem",
          }}>
            <span style={{ background: "linear-gradient(135deg,#00f5e4,#8b5cf6)", color: "#02040f", fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase" }}>New</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.7)", fontFamily: "Space Grotesk" }}>Instant escrow payments now live</span>
          </div>

          <h1 style={{
            fontFamily: "Space Grotesk", fontSize: "clamp(2.8rem,6.5vw,5rem)",
            fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em",
            color: "#f0f4ff", marginBottom: "1.5rem",
          }}>
            Get your tasks done by<br />
            <span style={{ background: "linear-gradient(135deg,#00f5e4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              skilled freelancers
            </span>
          </h1>

          <p style={{ fontSize: "1.05rem", color: "rgba(240,244,255,0.5)", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Post a micro-task, collect proposals, hire the best — all with secure escrow payment. Fast, simple, reliable.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard/client/post-task">
              <button className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>Post a Task →</button>
            </Link>
            <Link href="/tasks">
              <button className="btn-ghost" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>Browse Tasks</button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 0,
            marginTop: "3.5rem", maxWidth: 600, margin: "3.5rem auto 0",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20, overflow: "hidden",
          }}>
            {[["12K+", "Tasks Done"], ["850+", "Freelancers"], ["4.9★", "Avg Rating"], ["$2M+", "Paid Out"]].map(([num, label], i, arr) => (
              <div key={label} style={{
                flex: 1, padding: "1.1rem 0.875rem", textAlign: "center",
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <div style={{ fontFamily: "Space Grotesk", fontSize: "1.5rem", fontWeight: 800, color: "#f0f4ff", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: "0.65rem", color: "rgba(240,244,255,0.3)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Space Grotesk" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST TASKS */}
      <section style={{ padding: "5rem 5%" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00f5e4", fontFamily: "Space Grotesk", marginBottom: "0.5rem" }}>
                🔥 Featured Tasks
              </div>
              <h2 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#f0f4ff", letterSpacing: "-0.03em" }}>
                Latest open tasks
              </h2>
            </div>
            <Link href="/tasks" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ fontSize: "0.875rem", padding: "0.6rem 1.5rem" }}>View all tasks →</button>
            </Link>
          </div>

          {tasks.length === 0 ? (
            <p style={{ color: "rgba(240,244,255,0.3)", textAlign: "center", padding: "3rem" }}>No tasks yet. Be the first to post!</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
              {tasks.map(task => <TaskCard key={task._id} task={task} />)}
            </div>
          )}
        </div>
      </section>

      {/* TOP FREELANCERS */}
      <section style={{ padding: "5rem 5%", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8b5cf6", fontFamily: "Space Grotesk", marginBottom: "0.5rem" }}>
                ⭐ Top Talent
              </div>
              <h2 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#f0f4ff", letterSpacing: "-0.03em" }}>
                Best freelancers
              </h2>
            </div>
            <Link href="/freelancers" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ fontSize: "0.875rem", padding: "0.6rem 1.5rem" }}>View all →</button>
            </Link>
          </div>

          {freelancers.length === 0 ? (
            <p style={{ color: "rgba(240,244,255,0.3)", textAlign: "center", padding: "3rem" }}>No freelancers yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
              {freelancers.map(f => <FreelancerCard key={f._id} freelancer={f} />)}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "5rem 5%" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00f5e4", fontFamily: "Space Grotesk", marginBottom: "0.75rem" }}>Process</div>
          <h2 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#f0f4ff", marginBottom: "0.75rem" }}>How it works</h2>
          <p style={{ color: "rgba(240,244,255,0.4)", marginBottom: "3rem" }}>Three simple steps to get things done</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}>
            {[
              { num: "01", title: "Post a Task", desc: "Describe what you need, set a budget and deadline. Goes live instantly.", color: "#00f5e4" },
              { num: "02", title: "Get Proposals", desc: "Freelancers pitch their approach and price. Compare and choose the best fit.", color: "#8b5cf6" },
              { num: "03", title: "Hire & Pay", desc: "Pay securely via Stripe escrow. Release payment when you approve the work.", color: "#f472b6" },
            ].map(({ num, title, desc, color }) => (
              <div key={num} className="glass-card" style={{ borderRadius: 20, padding: "2rem", position: "relative", overflow: "hidden" }}
                onMouseOver={e => e.currentTarget.style.borderColor = `${color}40`}
                onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              >
                <div style={{ fontFamily: "Space Grotesk", fontSize: "4rem", fontWeight: 800, color: `${color}15`, lineHeight: 1, marginBottom: "1.25rem" }}>{num}</div>
                <h3 style={{ fontFamily: "Space Grotesk", fontSize: "1.05rem", fontWeight: 700, color: "#f0f4ff", marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(240,244,255,0.4)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "5rem 5%", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00f5e4", fontFamily: "Space Grotesk", marginBottom: "0.75rem", textAlign: "center" }}>Categories</div>
          <h2 style={{ fontFamily: "Space Grotesk", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#f0f4ff", marginBottom: "2.5rem", textAlign: "center" }}>Popular categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem" }}>
            {[
              { icon: "🎨", name: "Design", color: "#00f5e4" },
              { icon: "💻", name: "Development", color: "#8b5cf6" },
              { icon: "✍️", name: "Writing", color: "#fbbf24" },
              { icon: "📣", name: "Marketing", color: "#f472b6" },
              { icon: "🤖", name: "Other", color: "#10b981" },
            ].map(({ icon, name, color }) => (
              <Link key={name} href={`/tasks?category=${name}`} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{
                  borderRadius: 16, padding: "1.5rem 1rem", textAlign: "center",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <div style={{ fontFamily: "Space Grotesk", fontSize: "0.9rem", fontWeight: 600, color: "#f0f4ff" }}>{name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
