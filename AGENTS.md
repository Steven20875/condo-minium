# AGENTS.md — SkyView Residences CBOMS

Condominium Booking and Operation Management System built on TanStack Start with Netlify deployment.

---

## Architecture

### Auth
Client-side only. Login sets `localStorage.cboms_user` with `{ name, role, unit }`. The `_app.tsx` layout's `beforeLoad` reads this on client-side and redirects to `/` if absent. No server-side session.

Two roles: `admin` and `resident`. The sidebar links differ by role (see `src/components/Sidebar.tsx`).

### Routing — File-based (TanStack Router)

```
src/routes/
  index.tsx                    # /           Login page
  _app.tsx                     # Layout wrapper (sidebar + auth guard)
  _app/
    dashboard.tsx              # /dashboard  Resident home
    dashboard/
      bookings.tsx             # /dashboard/bookings
      visitors.tsx             # /dashboard/visitors
      messages.tsx             # /dashboard/messages
    units.tsx                  # /units      Unit listings (shared)
    admin/
      index.tsx                # /admin      Admin overview
      analytics.tsx            # /admin/analytics
      users.tsx                # /admin/users
      bookings.tsx             # /admin/bookings
      visits.tsx               # /admin/visits
      chat.tsx                 # /admin/chat
```

`_app.tsx` is a *pathless layout route* — it wraps all child routes with the sidebar but adds no URL segment.

### Data Layer
All data is mock (static). Defined in `src/lib/mockData.ts`. Types: `AppUser`, `Unit`, `Booking`, `Visit`, `Announcement`, `Conversation`. For real persistence, replace with Netlify Database (Postgres) via server functions.

### Design System
- **Colors**: Deep navy `#0f1e42` (brand/sidebar), warm gold `#c9a84c` (accents), light `#eef1f8` (bg), white cards.
- **Typography**: `DM Serif Display` (headings via Google Fonts), `Outfit` (body/UI).
- **CSS variables** in `src/styles.css`.
- **No external component library** — all UI built from Tailwind + inline styles.

### Charts (Chart.js)
Each page that uses charts registers ChartJS components locally at the top of the file. Charts render client-side only via `mounted` state (`useEffect(() => setMounted(true), [])`).

## Conventions

- Tailwind for layout/spacing; inline `style=` for brand colors (to avoid Tailwind purge issues with dynamic values).
- SSR-safe: `localStorage` always wrapped in `typeof window !== 'undefined'` guard.
- `fade-in` CSS class (`src/styles.css`) applied to page sections for entry animation.
- Status badges follow pattern: `{ bg, color, label }` record keyed by status string.
- Modal pattern: local `showModal` boolean + conditional render.

## Key Files

| File | Purpose |
|------|---------|
| `src/routes/_app.tsx` | Auth guard + layout shell |
| `src/components/Sidebar.tsx` | Navigation — changes links by role |
| `src/lib/mockData.ts` | All types + fixture data |
| `src/styles.css` | CSS vars + Google Fonts import + animations |
| `netlify.toml` | Build command, publish dir, dev proxy |

---

<!-- Legacy scaffold notes below (kept for reference) -->

## Project Overview

An interactive resume/portfolio application with an AI-powered assistant. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) |
| AI | TanStack AI with multi-provider support |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── Header.tsx  # Header component.
│   │   └── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   ├── routes
│   │   ├── __root.tsx  # Root layout: Header, styles.
│   │   └── index.tsx  # Dashboard home: Bar, Line, Doughnut charts (revenue, users, sales).
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles: Tailwind import plus base body/code font styling.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── netlify.toml  # Netlify deployment config: build command (vite build), publish directory (dist/client), and dev server settings (port 8888, target 3000).
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, Tailwind CSS 4, and Netlify plugin dependencies; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config template: TanStack Start, React, Tailwind, Netlify plugin, and optional add-on integrations; processed by EJS.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, Content Collections |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### Chart.js Dashboard

Analytics dashboard with Chart.js and react-chartjs-2.

**Dependencies:** chart.js, react-chartjs-2

**Chart types:**
- Bar - Revenue by month
- Line - User growth
- Doughnut - Sales by category

**Setup:** Register Chart.js components before use (CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler).

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
