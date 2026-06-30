<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=00f5e4&height=220&section=header&text=SkillSwap&fontSize=70&fontColor=ffffff&fontAlignY=38&desc=Freelance%20Micro-Task%20Platform&descAlignY=58&descSize=22&animation=fadeIn" />

[![Live Site](https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Site-SkillSwap-00f5e4?style=for-the-badge)](https://skillswap-client-lime.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)

</div>

---

## 📌 Project Purpose

**SkillSwap** is a full-stack freelance micro-task marketplace where clients post small, fast jobs — like a logo design, an article, or a quick bug fix — and freelancers apply, get hired, and get paid securely through Stripe escrow.

This project demonstrates real-world full-stack engineering: role-based authentication, JWT middleware, server-side pagination, Stripe payment flows, and three distinct dashboards (Client, Freelancer, Admin) — built with the **Next.js + Express + MongoDB** stack.

---

## 🌐 Live URL

> ### 🔗 [https://skillswap-client-lime.vercel.app/](https://skillswap-client-lime.vercel.app/)

**GitHub (Server):** [Assingment-B13-Skillswap-server](https://github.com/Safin313-stack/Assingment-B13-Skillswap-server)

---

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin1@taskhive.com` | `admin1@taskhive.com` |

---

## ✨ Features

- 🔐 **JWT Authentication** — Email/password login & register with bcrypt password hashing, secure token storage
- 👥 **3 User Roles** — Client, Freelancer, and Admin, each with a dedicated dashboard and route protection
- 📋 **Post & Manage Tasks** — Clients create, edit (while open), and delete tasks with title, category, budget, and deadline
- 📬 **Proposal System** — Freelancers submit bids with cover notes; clients review, accept, or reject proposals
- 💳 **Stripe Checkout & Escrow** — Secure payment flow on proposal acceptance with server-side session confirmation
- 🔍 **Live Task Search & Filtering** — Real-time title search combined with category dropdown filtering
- 📄 **Server-Side Pagination** — Backend-driven pagination (9 tasks per page) on the Browse Tasks page
- 📈 **Freelancer Earnings & Active Projects** — Track accepted proposals, submit deliverables, and view payout history
- 🛡️ **Admin Control Panel** — Manage users (block/unblock), moderate tasks, and view full transaction history
- 🌗 **Dark / Light Theme** — Persistent theme toggle saved across sessions
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🔒 **Protected Routes** — Role-based middleware guards on all `/dashboard/*` paths; sessions persist on refresh
- 🍞 **Toast Notifications** — Clean, non-blocking feedback via `react-hot-toast` (no native `alert()`)

---

## 📦 NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework with App Router |
| `react` / `react-dom` | UI library |
| `axios` | HTTP client for API requests |
| `js-cookie` | JWT token storage in cookies |
| `react-hot-toast` | Toast notification system |
| `tailwindcss` | Utility-first CSS framework |
| `autoprefixer` / `postcss` | CSS vendor prefixing & processing |

---

## 🗂️ Project Structure

```
skillswap-client/
├── app/
│   ├── page.js                       # Home — hero, latest tasks, top freelancers
│   ├── not-found.js                  # Custom 404 page
│   ├── auth/
│   │   └── page.js                   # Login / Register tabs
│   ├── tasks/
│   │   ├── page.js                   # Browse Tasks — search, filter, pagination
│   │   └── [id]/page.js              # Task Detail + proposal form
│   ├── freelancers/
│   │   ├── page.js                   # Browse Freelancers grid
│   │   └── [email]/page.js           # Freelancer public profile + reviews
│   ├── payment/
│   │   └── success/page.js           # Stripe return page
│   └── dashboard/
│       ├── client/page.js            # Client dashboard
│       ├── freelancer/page.js        # Freelancer dashboard
│       └── admin/page.js             # Admin dashboard
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── TaskCard.jsx
│   ├── FreelancerCard.jsx
│   └── Sidebar.jsx
├── context/
│   └── AuthContext.jsx               # Global auth state & JWT handling
├── lib/
│   └── axios.js                      # Axios instance with auth interceptors
└── middleware.js                     # Route protection guard
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| HTTP Client | Axios |
| Auth | JWT + Cookies |
| Payments | Stripe Checkout |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Deployment | Vercel (client) · Render (server) |

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/Safin313-stack/Assingment-B13-Skillswap-client-.git

# Go into the folder
cd Assingment-B13-Skillswap-client-

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local
# Fill in your API URL and Stripe publishable key

# Start development server
npm run dev
```

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

---

## 👨‍💻 Developer

**Saharia Hassan Safin**
CSE Student · Daffodil International University

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Safin313-stack)

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=8b5cf6&height=120&section=footer&animation=fadeIn" />
</div>
