"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import TaskCard from "@/components/TaskCard";
import FreelancerCard from "@/components/FreelancerCard";

const processSteps = [
  {
    num: "01",
    title: "Post a Task",
    desc: "Describe what you need, set a budget and deadline. Goes live instantly.",
    color: "#00f5e4",
    tone: "Teal",
  },
  {
    num: "02",
    title: "Get Proposals",
    desc: "Freelancers pitch their approach and price. Compare and choose the best fit.",
    color: "#8b5cf6",
    tone: "Violet",
  },
  {
    num: "03",
    title: "Hire & Pay",
    desc: "Pay securely via Stripe escrow. Release payment when you approve the work.",
    color: "#f472b6",
    tone: "Coral",
  },
];

const categories = [
  { icon: "🎨", name: "Design", color: "#00f5e4" },
  { icon: "💻", name: "Development", color: "#8b5cf6" },
  { icon: "✍️", name: "Writing", color: "#fbbf24" },
  { icon: "📣", name: "Marketing", color: "#f472b6" },
  { icon: "🤖", name: "Other", color: "#10b981" },
];

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    api.get("/api/tasks/latest").then((r) => setTasks(r.data)).catch(() => {});
    api.get("/api/users/freelancers/top").then((r) => setFreelancers(r.data)).catch(() => {});
  }, []);

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="animated-orb orb-a" />
        <div className="animated-orb orb-b" />
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="hero-badge">New</span>
            <span className="hero-badge-copy">Instant escrow payments now live</span>
          </div>

          <h1 className="hero-title">
            Get your tasks done by <span className="grad-text">skilled freelancers</span>
          </h1>

          <p className="hero-copy">
            Post a micro-task, collect proposals, hire the best — all with secure escrow payment. Fast, simple, reliable.
          </p>

          <div className="hero-actions">
            <Link href="/dashboard/client/post-task">
              <button className="btn-primary">Post a Task →</button>
            </Link>
            <Link href="/tasks">
              <button className="btn-ghost">Browse Tasks</button>
            </Link>
          </div>

          <div className="stats-grid hover-lift">
            {[
              { value: "12K+", label: "Tasks Done" },
              { value: "850+", label: "Freelancers" },
              { value: "4.9★", label: "Avg Rating" },
              { value: "$2M+", label: "Paid Out" },
            ].map((item, index) => (
              <div key={item.label} className="stat-item" style={{ borderRight: index < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-intro">
          <div className="section-eyebrow">🔥 Featured Tasks</div>
          <h2 className="section-title">Latest open tasks</h2>
        </div>

        {tasks.length === 0 ? (
          <p className="section-copy center-copy">No tasks yet. Be the first to post!</p>
        ) : (
          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))" }}>
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/tasks">
            <button className="btn-ghost">View all tasks →</button>
          </Link>
        </div>
      </section>

      <section className="section-block feature-dark-bg">
        <div className="section-intro">
          <div className="section-eyebrow">⭐ Top Talent</div>
          <h2 className="section-title">Best freelancers</h2>
        </div>

        {freelancers.length === 0 ? (
          <p className="section-copy center-copy">No freelancers yet.</p>
        ) : (
          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
            {freelancers.map((freelancer) => (
              <FreelancerCard key={freelancer._id} freelancer={freelancer} />
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/freelancers">
            <button className="btn-ghost">View all →</button>
          </Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-intro">
          <div className="section-eyebrow">Process</div>
          <h2 className="section-title">How it works</h2>
          <p className="section-copy">Three simple steps to get things done</p>
        </div>

        <div className="cards-grid">
          {processSteps.map(({ num, title, desc, color, tone }) => (
            <div key={num} className="process-step hover-lift" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <div className="process-step-highlight">
                <span className="feature-button" style={{ color, background: `${color}12`, border: `1px solid ${color}30` }}>{tone}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "Space Grotesk" }}>Step {num}</span>
              </div>
              <h3 className="process-step-title">{title}</h3>
              <p className="process-step-copy">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block feature-dark-bg">
        <div className="section-intro">
          <div className="section-eyebrow">Categories</div>
          <h2 className="section-title">Popular categories</h2>
        </div>

        <div className="category-grid">
          {categories.map(({ icon, name }) => (
            <Link key={name} href={`/tasks?category=${name}`} className="category-card">
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
              <div style={{ fontFamily: "Space Grotesk", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>{name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
