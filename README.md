# SkyView Residences — Condominium Booking & Operation Management System

A full-featured condominium management platform built with TanStack Start, React 19, and Tailwind CSS 4. Covers both resident-facing and admin-facing workflows in a single application.

## Features

### Resident Portal
- **Dashboard** — Welcome screen with stats, quick facility booking form, upcoming bookings, announcements
- **Unit Listings** — Browse all units with type/status filters, floor plans, and inquiry modal
- **My Bookings** — View and filter personal booking history
- **Visitors** — Register expected guests, view visitor log for your unit
- **Messages** — Direct chat with building administration

### Admin Portal
- **Overview** — KPI cards (residents, revenue, occupancy, pending), revenue bar chart, unit-mix doughnut, live visitor status
- **Analytics** — Year-over-year revenue comparison, occupancy trend, weekly booking volume, facility usage breakdown
- **Residents** — Full resident table with search/filter, balance, status, inline action menu
- **Booking Management** — All bookings with status tabs, facility filter, one-click status changes
- **Visit Logs** — Gate management — log visitors, check-in / check-out actions, live status board
- **Messages** — Multi-thread admin inbox with real-time chat interface

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (SSR) |
| Routing | TanStack Router v1 (file-based) |
| Frontend | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS Variables |
| Charts | Chart.js 4 + react-chartjs-2 |
| Icons | lucide-react |
| Language | TypeScript 5.7 (strict) |
| Deployment | Netlify |

## Getting Started

```bash
npm install
npm run dev        # dev server on :3000
npm run build      # production build
```

### Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Resident | `resident` | `resident123` |

Auth state is stored in `localStorage` under the key `cboms_user`.
