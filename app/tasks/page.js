"use client";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import TaskCard from "@/components/TaskCard";

const CATEGORIES = ["All", "Design", "Writing", "Development", "Marketing", "Other"];

const demoTasks = [
  {
    _id: "demo-1",
    title: "Design a landing page for a startup",
    description: "Create a clean, responsive homepage with brand visuals and strong CTAs.",
    category: "Design",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 240,
    client_email: "nina@example.com",
  },
  {
    _id: "demo-2",
    title: "Write product descriptions for an e-commerce store",
    description: "Draft short and engaging product copy for 12 items in a new collection.",
    category: "Writing",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 180,
    client_email: "mark@example.com",
  },
  {
    _id: "demo-3",
    title: "Build a React landing page component",
    description: "Develop a reusable hero section with animated buttons and responsive layout.",
    category: "Development",
    deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 320,
    client_email: "alexa@example.com",
  },
  {
    _id: "demo-4",
    title: "Create a social media campaign plan",
    description: "Outline three weekly posts and ad copy for a product launch.",
    category: "Marketing",
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 210,
    client_email: "josh@example.com",
  },
  {
    _id: "demo-5",
    title: "Proofread and polish website content",
    description: "Review existing copy and improve tone, grammar, and clarity.",
    category: "Writing",
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 120,
    client_email: "tara@example.com",
  },
  {
    _id: "demo-6",
    title: "Set up Stripe payments for a freelance service",
    description: "Integrate Stripe checkout with product and pricing details.",
    category: "Development",
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 380,
    client_email: "peter@example.com",
  },
  {
    _id: "demo-7",
    title: "Design a mobile app icon set",
    description: "Create five app icons that work across iOS and Android.",
    category: "Design",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 260,
    client_email: "miya@example.com",
  },
  {
    _id: "demo-8",
    title: "Create a launch email sequence",
    description: "Write three emails to introduce a new product to subscribers.",
    category: "Marketing",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 175,
    client_email: "ada@example.com",
  },
  {
    _id: "demo-9",
    title: "Build a reusable pricing card UI",
    description: "Implement a responsive pricing table for a SaaS homepage.",
    category: "Development",
    deadline: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 300,
    client_email: "kyle@example.com",
  },
  {
    _id: "demo-10",
    title: "Create a brand style guide summary",
    description: "Document visual guidelines, fonts, and color palette for a new startup.",
    category: "Other",
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 140,
    client_email: "nora@example.com",
  },
];

function TasksPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const page = parseInt(searchParams.get("page") || "1");

  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState(search);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 9 });
      if (search) params.append("search", search);
      if (category !== "All") params.append("category", category);

      const res = await api.get(`/api/tasks?${params}`);
      const responseTasks = res.data.tasks || [];
      setTasks(responseTasks);
      setTotal(res.data.total || responseTasks.length);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setTasks([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [search, category, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateQuery = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    params.set("page", "1");
    router.push(`/tasks?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateQuery({ search: searchInput });
  };

  const showDemoTasks = !loading && !search && category === "All" && tasks.length === 0;
  const displayedTasks = showDemoTasks ? demoTasks : tasks;
  const taskCount = showDemoTasks ? demoTasks.length : total;

  return (
    <div style={{ paddingTop: 64, minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          padding: "3rem 5% 2rem",
          textAlign: "center",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%,rgba(0,245,228,0.05),transparent)",
        }}
      >
        <h1
          style={{
            fontFamily: "Space Grotesk",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 800,
            color: "#f0f4ff",
            letterSpacing: "-0.03em",
            marginBottom: "0.5rem",
          }}
        >
          Browse{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#00f5e4,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tasks
          </span>
        </h1>
        <p
          style={{
            color: "rgba(240,244,255,0.4)",
            fontSize: "0.95rem",
            marginBottom: "1.75rem",
          }}
        >
          {taskCount} tasks available right now
          {showDemoTasks ? " — demo preview data shown" : ""}
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            gap: "0.75rem",
          }}
        >
          <input
            className="inp"
            style={{ flex: 1 }}
            type="text"
            placeholder="Search by task title…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: "0.7rem 1.5rem", flexShrink: 0 }}
          >
            Search
          </button>
        </form>
      </div>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 5% 5rem" }}>
        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => updateQuery({ category: c === "All" ? "" : c })}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: 100,
                border:
                  category === c || (c === "All" && !category)
                    ? "1px solid rgba(0,245,228,0.4)"
                    : "1px solid rgba(255,255,255,0.12)",
                background:
                  category === c || (c === "All" && !category)
                    ? "rgba(0,245,228,0.1)"
                    : "transparent",
                color:
                  category === c || (c === "All" && !category)
                    ? "#00f5e4"
                    : "rgba(240,244,255,0.4)",
                fontFamily: "Space Grotesk",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem",
              color: "rgba(240,244,255,0.3)",
            }}
          >
            Loading tasks…
          </div>
        ) : displayedTasks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ color: "rgba(240,244,255,0.3)", fontFamily: "Space Grotesk" }}>
              No tasks found. Try a different search.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: "1.25rem",
            }}
          >
            {displayedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "3rem",
            }}
          >
            <button
              onClick={() => updateQuery({ page: page - 1 })}
              disabled={page <= 1}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: page <= 1 ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)",
                fontFamily: "Space Grotesk",
                fontSize: "0.85rem",
                cursor: page <= 1 ? "not-allowed" : "pointer",
              }}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => updateQuery({ page: p })}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border:
                    p === page
                      ? "1px solid rgba(0,245,228,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  background: p === page ? "rgba(0,245,228,0.1)" : "transparent",
                  color: p === page ? "#00f5e4" : "rgba(240,244,255,0.5)",
                  fontFamily: "Space Grotesk",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => updateQuery({ page: page + 1 })}
              disabled={page >= totalPages}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: page >= totalPages ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)",
                fontFamily: "Space Grotesk",
                fontSize: "0.85rem",
                cursor: page >= totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 64 }}>Loading…</div>}>
      <TasksPageContent />
    </Suspense>
  );
}
