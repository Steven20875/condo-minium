import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CalendarCheck, Clock, CheckCircle, XCircle, CheckCheck, Filter } from 'lucide-react'
import { mockBookings } from '@/lib/mockData'

export const Route = createFileRoute('/_app/dashboard/bookings')({
  component: MyBookingsPage,
})

const statusStyle: Record<string, { bg: string; color: string; label: string; icon: React.ElementType }> = {
  confirmed: { bg: '#ecfdf5', color: '#059669', label: 'Confirmed', icon: CheckCircle },
  pending:   { bg: '#fffbeb', color: '#d97706', label: 'Pending',   icon: Clock },
  cancelled: { bg: '#fef2f2', color: '#dc2626', label: 'Cancelled', icon: XCircle },
  completed: { bg: '#eff6ff', color: '#0284c7', label: 'Completed', icon: CheckCheck },
}

function MyBookingsPage() {
  const [filter, setFilter] = useState('All')
  const myBookings = mockBookings.filter(b => b.resident === 'Maria Santos')
  const filtered = filter === 'All' ? myBookings : myBookings.filter(b => b.status === filter.toLowerCase())

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
          My Bookings
        </h1>
        <p className="text-sm" style={{ color: '#6b7a99' }}>All your facility reservations</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={filter === f
              ? { background: '#0f1e42', color: '#fff' }
              : { background: '#f1f5f9', color: '#6b7a99' }
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(b => {
          const st = statusStyle[b.status]
          const StatusIcon = st.icon
          return (
            <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm fade-in flex items-center gap-4" style={{ border: '1px solid #e8edf5' }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#f1f5f9' }}
              >
                <CalendarCheck size={22} style={{ color: '#0f1e42' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base" style={{ color: '#0f1e42' }}>{b.facility}</div>
                <div className="text-sm mt-0.5" style={{ color: '#6b7a99' }}>
                  {b.date} · {b.time} · {b.duration} hour{b.duration > 1 ? 's' : ''}
                </div>
                {b.notes && <div className="text-xs mt-1" style={{ color: '#9aa3b8' }}>{b.notes}</div>}
              </div>
              <span
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
                style={{ background: st.bg, color: st.color }}
              >
                <StatusIcon size={13} />
                {st.label}
              </span>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl" style={{ border: '1px solid #e8edf5' }}>
            <CalendarCheck size={36} style={{ color: '#dde3ef', margin: '0 auto 12px' }} />
            <p style={{ color: '#9aa3b8' }}>No {filter.toLowerCase()} bookings</p>
          </div>
        )}
      </div>
    </div>
  )
}
