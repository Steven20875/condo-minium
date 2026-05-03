import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, CalendarPlus, CheckCircle, Clock, XCircle, CheckCheck, ChevronDown, MoreVertical } from 'lucide-react'
import { mockBookings, type Booking } from '@/lib/mockData'

export const Route = createFileRoute('/_app/admin/bookings')({
  component: BookingsPage,
})

type StatusKey = 'confirmed' | 'pending' | 'cancelled' | 'completed'

const statusConfig: Record<StatusKey, { bg: string; color: string; label: string; icon: React.ElementType }> = {
  confirmed: { bg: '#ecfdf5', color: '#059669', label: 'Confirmed', icon: CheckCircle },
  pending:   { bg: '#fffbeb', color: '#d97706', label: 'Pending',   icon: Clock },
  cancelled: { bg: '#fef2f2', color: '#dc2626', label: 'Cancelled', icon: XCircle },
  completed: { bg: '#eff6ff', color: '#0284c7', label: 'Completed', icon: CheckCheck },
}

const facilities = ['All', 'Swimming Pool', 'Gym', 'Function Hall', 'BBQ Area', 'Study Room']

function BookingRow({ booking, onStatusChange }: {
  booking: Booking
  onStatusChange: (id: string, status: StatusKey) => void
}) {
  const [open, setOpen] = useState(false)
  const st = statusConfig[booking.status as StatusKey]
  const StatusIcon = st.icon

  return (
    <tr className="border-b transition-colors hover:bg-gray-50" style={{ borderColor: '#f0f4fa' }}>
      <td className="px-5 py-3.5">
        <div className="text-xs font-mono font-semibold px-2 py-0.5 rounded" style={{ background: '#f1f5f9', color: '#6b7a99' }}>
          #{booking.id.toUpperCase()}
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="text-sm font-semibold" style={{ color: '#1a2040' }}>{booking.resident}</div>
        <div className="text-xs" style={{ color: '#9aa3b8' }}>Unit {booking.unit}</div>
      </td>
      <td className="px-4 py-3.5">
        <div className="text-sm font-medium" style={{ color: '#1a2040' }}>{booking.facility}</div>
      </td>
      <td className="px-4 py-3.5">
        <div className="text-sm" style={{ color: '#1a2040' }}>{booking.date}</div>
        <div className="text-xs" style={{ color: '#9aa3b8' }}>{booking.time} · {booking.duration}h</div>
      </td>
      <td className="px-4 py-3.5">
        <span
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
          style={{ background: st.bg, color: st.color }}
        >
          <StatusIcon size={12} />
          {st.label}
        </span>
      </td>
      <td className="px-4 py-3.5 max-w-[180px]">
        {booking.notes ? (
          <p className="text-xs truncate" style={{ color: '#9aa3b8' }}>{booking.notes}</p>
        ) : (
          <span className="text-xs" style={{ color: '#d0d7e6' }}>—</span>
        )}
      </td>
      <td className="px-4 py-3.5">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            <MoreVertical size={16} style={{ color: '#9aa3b8' }} />
          </button>
          {open && (
            <div
              className="absolute right-0 top-9 bg-white rounded-xl shadow-xl z-20 py-1 w-36 fade-in"
              style={{ border: '1px solid #e8edf5' }}
            >
              {(['confirmed', 'completed', 'cancelled'] as StatusKey[]).map(s => (
                <button
                  key={s}
                  disabled={booking.status === s}
                  onClick={() => { onStatusChange(booking.id, s); setOpen(false) }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors disabled:opacity-40 capitalize"
                  style={{ color: s === 'cancelled' ? '#dc2626' : '#1a2040' }}
                >
                  Mark {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}

function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [facilityFilter, setFacilityFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const handleStatusChange = (id: string, status: StatusKey) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase()
    const matchSearch = b.resident.toLowerCase().includes(q) || b.facility.toLowerCase().includes(q) || b.unit.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || b.status === statusFilter
    const matchFacility = facilityFilter === 'All' || b.facility === facilityFilter
    return matchSearch && matchStatus && matchFacility
  })

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            Booking Management
          </h1>
          <p className="text-sm" style={{ color: '#6b7a99' }}>{filtered.length} bookings shown</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm"
          style={{ background: '#0f1e42' }}
        >
          <CalendarPlus size={16} />
          Add Booking
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {([
          ['All', counts.all, '#0f1e42'],
          ['pending', counts.pending, '#d97706'],
          ['confirmed', counts.confirmed, '#059669'],
          ['completed', counts.completed, '#0284c7'],
          ['cancelled', counts.cancelled, '#dc2626'],
        ] as const).map(([s, count, color]) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
            style={statusFilter === s
              ? { background: s === 'All' ? '#0f1e42' : statusConfig[s as StatusKey]?.bg ?? '#f1f5f9',
                  color: s === 'All' ? '#fff' : color,
                  border: `1.5px solid ${color}` }
              : { background: '#f1f5f9', color: '#6b7a99', border: '1.5px solid transparent' }
            }
          >
            {s} <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(0,0,0,0.08)' }}>{count}</span>
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow-sm" style={{ border: '1px solid #e8edf5' }}>
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9aa3b8' }} />
          <input
            type="text"
            placeholder="Search resident, facility, unit…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
            style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
          />
        </div>
        <select
          value={facilityFilter}
          onChange={e => setFacilityFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-sm"
          style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#fff' }}
        >
          {facilities.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #e8edf5' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8edf5' }}>
                {['ID', 'Resident', 'Facility', 'Date & Time', 'Status', 'Notes', 'Actions'].map(h => (
                  <th key={h} className="px-4 lg:px-5 py-3 text-left text-xs font-semibold" style={{ color: '#9aa3b8' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <BookingRow key={b.id} booking={b} onStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: '#9aa3b8' }}>No bookings match your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in p-6">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              Create Booking
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Resident Name', placeholder: 'Juan dela Cruz', type: 'text' },
                { label: 'Unit Number', placeholder: '4A', type: 'text' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Facility</label>
                <select className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#fff' }}>
                  {facilities.slice(1).map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Date</label>
                  <input type="date" className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Time</label>
                  <input type="time" className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#f1f5f9', color: '#6b7a99' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#0f1e42' }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
