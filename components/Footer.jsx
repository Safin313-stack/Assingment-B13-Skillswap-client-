"use client";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Platform",
    items: [
      { label: "Browse Tasks", href: "/tasks" },
      { label: "Browse Freelancers", href: "/freelancers" },
      { label: "Post a Task", href: "/dashboard/client" },
      { label: "How it Works", href: "/" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Trust & Safety", href: "/trust-and-safety" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="26" height="26" viewBox="0 0 40 40">
              <defs>
                <linearGradient id="flg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5e4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <polygon points="20,2 36,14 36,28 20,38 4,28 4,14" fill="rgba(0,245,228,0.15)" stroke="url(#flg)" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="3" fill="#00f5e4" />
            </svg>
            <span className="footer-logo-text">
              Skill<span className="footer-logo-accent">Swap</span>
            </span>
          </div>

          <p className="footer-copy">
            Trusted marketplace for fast micro-tasks, secure payments, and top rated freelancers.
          </p>

          <div className="footer-social">
            {["𝕏", "in", "GH", "f"].map((s) => (
              <a key={s} href="#" className="footer-social-link">
                {s}
              </a>
            ))}
          </div>
        </div>

        {FOOTER_LINKS.map((section) => (
          <div className="footer-section" key={section.title}>
            <h4 className="footer-section-title">{section.title}</h4>
            {section.items.map((item) => (
              <Link className="footer-link" key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
        <p>contact@skillswap.io</p>
      </div>
    </footer>
  );
}
