# Condominium Management System - Documentation

## Project Structure

### Source Code
- **Backend**: Express.js API with SQLite database
  - `server.js` - Main Express application
  - `routes/` - API route handlers (auth, users, bookings, units, visits)
  - `db.js` - Database initialization
  
- **Frontend**: React + Vite + TanStack Router
  - `src/` - React components and pages
  - `src/routes/` - File-based routing with TanStack Router
  - `src/components/` - Reusable UI components
  - `src/lib/` - Utility functions and API client

### Database
- `schema.sql` - Database schema with all table definitions
- `condo_management.db` - SQLite database file

### Configuration
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Frontend bundler configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

## Documentation

**Chapter 1-3 (PDF)**: `docs/Documentation_Chapter_1-3.pdf`

See `docs/Chapter_1-3.docx` for the original documentation source.

## Getting Started

### Prerequisites
- Node.js v20+
- npm
- SQLite3

### Installation

```bash
cd condo-minium
npm install
```

### Running the Application

**Backend** (Port 5000):
```bash
npm run dev
```

**Frontend** (Port 5173):
```bash
npx vite
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users` - Get all users
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `GET /api/units` - Get all units
- `GET /api/visits` - Get all visitor records
- `POST /api/visits` - Create visitor record

## Database Tables

1. **users** - User accounts with authentication
2. **units** - Condominium units
3. **facilities** - Common facilities
4. **bookings** - Facility bookings
5. **visits** - Visitor records
6. **messages** - User messaging system

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React 18, TypeScript, Vite
- **Database**: SQLite3
- **UI Components**: Lucide React Icons
- **Charts**: Chart.js, React Chart.js 2
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS
- **Authentication**: JWT, bcryptjs
