import { Link } from '@tanstack/react-router'
import {
  LayoutDashboard, Building2, CalendarCheck, Users, BarChart3,
  ClipboardList, MessageSquare, LogOut, Home, Menu, X,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  role: 'resident' | 'admin'
  userName: string
  userUnit: string
  onLogout: () => void
}

const residentLinks = [
  { to: '/dashboard', icon: Home, label: 'Dashboard', exact: true },
  { to: '/units', icon: Building2, label: 'Unit Listings', exact: false },
  { to: '/dashboard/bookings', icon: CalendarCheck, label: 'My Bookings', exact: false },
  { to: '/dashboard/visitors', icon: Users, label: 'Visitors', exact: false },
  { to: '/dashboard/messages', icon: MessageSquare, label: 'Messages', exact: false },
]

const adminLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', exact: true },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics', exact: false },
  { to: '/admin/units', icon: Building2, label: 'Units Management', exact: false },
  { to: '/admin/users', icon: Users, label: 'Residents', exact: false },
  { to: '/admin/bookings', icon: CalendarCheck, label: 'Bookings', exact: false },
  { to: '/admin/visits', icon: ClipboardList, label: 'Visit Logs', exact: false },
  { to: '/admin/chat', icon: MessageSquare, label: 'Chatbot', exact: false },
]

export function Sidebar({ role, userName, userUnit, onLogout }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const links = role === 'admin' ? adminLinks : residentLinks

  const isActive = (to: string, exact: boolean) => {
    if (exact) return currentPath === to
    return currentPath === to || currentPath.startsWith(to + '/')
  }

  const NavContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0"
            style={{ background: '#c9a84c', color: '#0f1e42' }}
          >
            S
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">ONE SPATIAL</div>
            <div className="text-xs font-medium" style={{ color: '#c9a84c', letterSpacing: '0.08em' }}>ILOILO</div>
          </div>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-5 pt-4 pb-2">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={
            role === 'admin'
              ? { background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }
              : { background: 'rgba(96,165,250,0.15)', color: '#93c5fd' }
          }
        >
          {role === 'admin' ? 'Administrator' : 'Resident Portal'}
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {links.map(({ to, icon: Icon, label, exact }) => {
          const active = isActive(to, exact)
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium sidebar-link"
              style={
                active
                  ? { background: 'rgba(201,168,76,0.12)', color: '#c9a84c', borderLeft: '2px solid #c9a84c', paddingLeft: '10px' }
                  : { color: '#8899bb', borderLeft: '2px solid transparent', paddingLeft: '10px' }
              }
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="border-t px-4 py-4 mt-auto" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: '#c9a84c', color: '#0f1e42' }}
          >
            {userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">{userName}</div>
            <div className="text-xs truncate" style={{ color: '#6b7a99' }}>{userUnit}</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
          style={{ color: '#6b7a99' }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLButtonElement).style.color = '#f87171'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(248,113,113,0.08)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLButtonElement).style.color = '#6b7a99'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          }}
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 w-64 shadow-2xl"
        style={{ background: '#0f1e42' }}
      >
        <NavContent />
      </aside>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
        style={{ background: '#0f1e42' }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <aside className="w-64 h-full shadow-2xl" style={{ background: '#0f1e42' }}>
            <div className="pt-16 h-full">
              <NavContent />
            </div>
          </aside>
          <div
            className="flex-1"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </>
  )
}
