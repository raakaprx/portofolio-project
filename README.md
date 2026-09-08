# 🚀 Muhammad Raka Pradana - Engineering Portfolio

A high-performance, secure, and modern personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**, integrated with **Supabase** and **Vercel Analytics**.

Designed with enterprise-grade engineering principles: strict TypeScript typing (zero `any`), Fail-Closed security architecture, Row Level Security (RLS), SSG & Incremental Static Regeneration (ISR), Next.js Image optimization, and an interactive CMS Admin dashboard.

---

## ✨ Key Features & Architecture

### ⚡ Performance & Core Web Vitals (P2)
- **Next.js 16 App Router & React 19**: Server Components for instant initial paint and minimal JavaScript footprint.
- **SSG & ISR**: Project detail pages use `generateStaticParams` and `revalidate = 3600` for blazing-fast static delivery and on-demand cache revalidation.
- **Next.js Image Optimization**: 100% of images use `<Image />` with automatic WebP/AVIF delivery, responsive sizing, and zero Cumulative Layout Shift (CLS).
- **Vercel Analytics**: Privacy-friendly, real-time performance and audience analytics via `@vercel/analytics`.
- **Zero ORM Overhead**: Direct Supabase SQL queries without heavy ORM runtimes.

### 🛡️ Security & Integrity (P0/P1)
- **Row Level Security (RLS)**: Public role (`anon`) has strictly scoped read-only privileges (`SELECT`), restricted insert to `analytics_events`, and zero administrative mutation privileges.
- **Fail-Closed Architecture**: Middleware redirects unauthenticated requests away from protected `/admin` routes by default.
- **Protected On-Demand Revalidation**: Cache invalidation endpoint (`/api/revalidate`) is authenticated using a timing-safe `Bearer` token check.
- **Strict Environment Validation**: Runtime validation prevents starting with missing or dummy Supabase credentials.
- **Database Standardization**: All database models and queries adhere to standardized `snake_case` naming conventions.

### 💼 Portfolio Sections & CMS
- **Hero & Profile**: Personal branding with responsive visual assets and quick contact hooks.
- **Tech Stack & Skills**: Categorized technical proficiencies with vector brand icons.
- **Featured & Filtered Projects**: Interactive category filtering, engineering benchmarks, and deep-dive architecture views.
- **Project Showcase (`/projects/[slug]`)**: Markdown-rendered case studies with screenshot galleries and interactive lightboxes.
- **Work Experience & Timeline**: Career milestones and measurable achievements.
- **Certificates & Badges**: Verified professional credentials.
- **Admin CMS (`/admin`)**: Real-time project management, media upload to Supabase Storage, and traffic analytics aggregation.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI Library**: React 19
- **Language**: TypeScript (Strict Mode, no `any`)
- **Styling**: Tailwind CSS, PostCSS
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Supabase Auth & Storage)
- **Analytics**: Vercel Analytics (`@vercel/analytics`) + Custom Postgres Event Tracking
- **Icons & Motion**: Lucide React, Simple Icons, Framer Motion
- **Components**: Radix UI primitives / shadcn/ui

---

## 📂 Project Structure

```text
portofolio-project/
├── app/
│   ├── admin/               # Protected CMS Dashboard & CRUD pages
│   ├── api/                 # Secure endpoints (analytics, revalidate, etc.)
│   ├── auth/                # Supabase authentication flows (login, callback)
│   ├── projects/[slug]/     # SSG/ISR dynamic project case studies
│   ├── layout.tsx           # Root layout with Vercel Analytics & ThemeProvider
│   └── page.tsx             # Main portfolio landing page
├── components/
│   ├── admin/               # Admin-specific components (ImageUploader, etc.)
│   ├── layout/              # Global layout components (Navbar, Footer)
│   ├── sections/            # Portfolio sections (Hero, About, Projects, etc.)
│   └── ui/                  # Reusable accessible UI primitives
├── lib/
│   ├── supabase/            # Client, Server, and Middleware Supabase instances
│   ├── portfolio-data.ts    # Resilient data-fetching layer with server logging
│   ├── portfolio-defaults.ts# Offline-first fallback data
│   ├── revalidate.ts        # Client-side cache invalidation triggers
│   └── utils.ts             # Utility functions
├── supabase/
│   └── security_fix_rls_p0.sql # Hardened Row Level Security script
└── public/                  # Static brand assets and profile media
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# ISR Cache Revalidation Secret (Must match on both server and client trigger)
REVALIDATION_SECRET=your_super_secret_revalidation_token_min_32_chars
NEXT_PUBLIC_REVALIDATION_SECRET=your_super_secret_revalidation_token_min_32_chars
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database RLS
Run the SQL script located at `supabase/security_fix_rls_p0.sql` inside your Supabase Project SQL Editor to enforce secure Row Level Security policies.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 👨‍💻 Author

**Muhammad Raka Pradana**
- GitHub: [@raakaprx](https://github.com/raakaprx)
- Portfolio: [raakapradana.dev](https://raakapradana.dev)
