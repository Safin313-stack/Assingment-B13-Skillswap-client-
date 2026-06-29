"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import FreelancerCard from "@/components/FreelancerCard";

const demoFreelancers = [
  {
    _id: "demo-f-1",
    name: "Maya Santos",
    email: "maya.santos@example.com",
    bio: "UI/UX designer with a love for polished landing pages.",
    skills: ["Figma", "Web Flow", "Branding"],
    hourlyRate: 40,
    avgRating: 5,
    totalJobs: 24,
  },
  {
    _id: "demo-f-2",
    name: "Ayan Patel",
    email: "ayan.patel@example.com",
    bio: "React developer building fast web apps and component libraries.",
    skills: ["React", "Next.js", "TypeScript"],
    hourlyRate: 45,
    avgRating: 4,
    totalJobs: 18,
  },
  {
    _id: "demo-f-3",
    name: "Sofia Kim",
    email: "sofia.kim@example.com",
    bio: "Content writer specializing in product descriptions and email copy.",
    skills: ["Copywriting", "SEO", "Storytelling"],
    hourlyRate: 32,
    avgRating: 5,
    totalJobs: 30,
  },
  {
    _id: "demo-f-4",
    name: "Daniel Brooks",
    email: "daniel.brooks@example.com",
    bio: "Full-stack freelancer focused on modern web experiences.",
    skills: ["Node.js", "Express", "API Design"],
    hourlyRate: 50,
    avgRating: 4,
    totalJobs: 27,
  },
  {
    _id: "demo-f-5",
    name: "Lina Garcia",
    email: "lina.garcia@example.com",
    bio: "Digital marketer with strong social media campaign results.",
    skills: ["Ads", "Strategy", "Analytics"],
    hourlyRate: 38,
    avgRating: 5,
    totalJobs: 22,
  },
  {
    _id: "demo-f-6",
    name: "Noah Reed",
    email: "noah.reed@example.com",
    bio: "Front-end expert building accessible responsive interfaces.",
    skills: ["HTML", "CSS", "JavaScript"],
    hourlyRate: 36,
    avgRating: 4,
    totalJobs: 20,
  },
  {
    _id: "demo-f-7",
    name: "Mina Shah",
    email: "mina.shah@example.com",
    bio: "Product designer creating elegant user journeys.",
    skills: ["Design Systems", "UX", "Prototyping"],
    hourlyRate: 42,
    avgRating: 5,
    totalJobs: 28,
  },
  {
    _id: "demo-f-8",
    name: "Felix Parker",
    email: "felix.parker@example.com",
    bio: "SEO specialist helping brands rank and convert.",
    skills: ["SEO", "Analytics", "Content"],
    hourlyRate: 34,
    avgRating: 4,
    totalJobs: 19,
  },
  {
    _id: "demo-f-9",
    name: "Zara Lee",
    email: "zara.lee@example.com",
    bio: "Brand strategist helping startups find their voice.",
    skills: ["Branding", "Research", "Positioning"],
    hourlyRate: 46,
    avgRating: 5,
    totalJobs: 21,
  },
  {
    _id: "demo-f-10",
    name: "Ravi Chopra",
    email: "ravi.chopra@example.com",
    bio: "Data analyst turning customer behavior into smart growth moves.",
    skills: ["Data", "SQL", "Insights"],
    hourlyRate: 48,
    avgRating: 5,
    totalJobs: 25,
  },
];

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/users/freelancers")
      .then((r) => setFreelancers(r.data))
      .catch(() => setFreelancers([]))
      .finally(() => setLoading(false));
  }, []);

  const displayedFreelancers = freelancers.length ? freelancers : demoFreelancers;
  const freelancerCount = displayedFreelancers.length;

  return (
    <div className="page-shell">
      <section className="page-hero" style={{ padding: "4.5rem 5% 3rem" }}>
        <div className="hero-content">
          <div className="hero-badge-row" style={{ justifyContent: "center" }}>
            <span className="hero-badge">Verified Talent</span>
            <span className="hero-badge-copy">Browse experts with great ratings and fast delivery</span>
          </div>

          <h1 className="hero-title">
            Browse <span className="grad-text">Freelancers</span>
          </h1>

          <p className="hero-copy" style={{ maxWidth: 700, margin: "0 auto" }}>
            {freelancerCount} verified experts ready to help you finish work faster and with confidence.
          </p>
        </div>
      </section>

      <div className="section-block">
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-muted)" }}>Loading…</div>
        ) : (
          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
            {displayedFreelancers.map((freelancer) => (
              <FreelancerCard key={freelancer._id} freelancer={freelancer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
