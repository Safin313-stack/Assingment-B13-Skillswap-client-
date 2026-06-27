# SkillSwap — Freelance Micro-Task Platform (Client)

## Purpose
SkillSwap is a marketplace where clients post small tasks and freelancers apply, get hired, and get paid securely via Stripe escrow.

## Live Site
https://skillswap-client.vercel.app

## GitHub Repos
- **Frontend:** https://github.com/YOUR_USERNAME/skillswap-client
- **Backend:** https://github.com/YOUR_USERNAME/skillswap-server

## Test Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin1@taskhive.com | admin1@taskhive.com |
| Freelancer | freelanceruser3@gmail.com | freelanceruser3@gmail.com |

## Key Features
- 3 roles: Client, Freelancer, Admin
- JWT authentication with cookie storage
- Google OAuth sign-in support
- Client: post tasks, manage proposals, accept & pay
- Freelancer: browse tasks, submit proposals, track earnings
- Admin: manage users (block/unblock), tasks, transactions
- Stripe Checkout with escrow payment flow
- Server-side pagination (9 tasks per page)
- Task search by title + category filter
- Role-based route protection (Next.js middleware)
- Responsive layout — mobile, tablet, desktop
- Custom 404 page

## Pages
| Page | Route |
|------|-------|
| Home | / |
| Browse Tasks | /tasks |
| Task Detail | /tasks/[id] |
| Browse Freelancers | /freelancers |
| Freelancer Profile | /freelancers/[email] |
| Login / Register | /auth |
| Client Dashboard | /dashboard/client |
| Freelancer Dashboard | /dashboard/freelancer |
| Admin Dashboard | /dashboard/admin |
| Payment Success | /payment/success |
| 404 | /not-found |

## NPM Packages Used
| Package | Purpose |
|---------|---------|
| next | React framework |
| react | UI library |
| react-dom | DOM rendering |
| axios | HTTP requests |
| js-cookie | JWT cookie management |
| react-hot-toast | Toast notifications |
| tailwindcss | Utility CSS |
| autoprefixer | CSS vendor prefixes |
| postcss | CSS processing |

## Environment Variables
Create `.env.local` in root:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

## Run Locally
```bash
npm install
npm run dev
```
Open http://localhost:3000
