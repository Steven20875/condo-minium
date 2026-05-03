import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Building2, Search, BedDouble, Maximize2, MapPin, CheckCircle2, AlertTriangle, Wrench, ChevronRight, X } from 'lucide-react'
import { mockUnits, type Unit } from '@/lib/mockData'

export const Route = createFileRoute('/_app/units')({
  component: UnitsPage,
})

const typeColors: Record<string, string> = {
  Studio: '#8b5cf6',
  '1BR': '#3b82f6',
  '2BR': '#c9a84c',
  '3BR': '#10b981',
}

const statusConfig = {
  available:   { icon: CheckCircle2, color: '#059669', bg: '#ecfdf5', label: 'Available' },
  occupied:    { icon: Building2,    color: '#6b7a99', bg: '#f8fafc', label: 'Occupied' },
  maintenance: { icon: Wrench,       color: '#d97706', bg: '#fffbeb', label: 'Maintenance' },
}

function UnitCard({ unit, onBook }: { unit: Unit; onBook: (u: Unit) => void }) {
  const st = statusConfig[unit.status]
  const StatusIcon = st.icon
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow fade-in"
      style={{ border: '1px solid #e8edf5' }}
    >
      {/* Visual header */}
      <div
        className="h-36 relative flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${typeColors[unit.type]}18, ${typeColors[unit.type]}08)`,
          borderBottom: `1px solid ${typeColors[unit.type]}22`,
        }}
      >
        {/* Floor plan silhouette */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
          <rect x="8" y="8" width="64" height="64" rx="4" stroke={typeColors[unit.type]} strokeWidth="2" fill="none" />
          <rect x="8" y="8" width="38" height="38" rx="2" fill={typeColors[unit.type]} fillOpacity="0.1" />
          <rect x="50" y="8" width="22" height="22" rx="2" fill={typeColors[unit.type]} fillOpacity="0.08" />
          <rect x="8" y="50" width="64" height="22" rx="2" fill={typeColors[unit.type]} fillOpacity="0.06" />
          <line x1="46" y1="8" x2="46" y2="72" stroke={typeColors[unit.type]} strokeWidth="1" strokeOpacity="0.4" />
          <line x1="8" y1="46" x2="46" y2="46" stroke={typeColors[unit.type]} strokeWidth="1" strokeOpacity="0.4" />
        </svg>

        {/* Type badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
          style={{ background: typeColors[unit.type] }}
        >
          {unit.type}
        </span>

        {/* Status badge */}
        <span
          className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: st.bg, color: st.color }}
        >
          <StatusIcon size={11} />
          {st.label}
        </span>

        {/* Floor */}
        <span
          className="absolute bottom-3 right-3 text-xs font-medium px-2 py-0.5 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.9)', color: '#6b7a99' }}
        >
          Floor {unit.floor}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              Unit {unit.number}
            </h3>
            {unit.tenant && (
              <p className="text-xs mt-0.5" style={{ color: '#9aa3b8' }}>Tenant: {unit.tenant}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-xl font-bold" style={{ color: '#0f1e42' }}>
              ₱{unit.price.toLocaleString()}
            </div>
            <div className="text-xs" style={{ color: '#9aa3b8' }}>/month</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3 text-xs" style={{ color: '#6b7a99' }}>
          <span className="flex items-center gap-1">
            <Maximize2 size={12} />
            {unit.area} sqm
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={12} />
            {unit.type}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            Floor {unit.floor}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {unit.features.map(f => (
            <span
              key={f}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: '#f1f5f9', color: '#6b7a99' }}
            >
              {f}
            </span>
          ))}
        </div>

        <button
          disabled={unit.status !== 'available'}
          onClick={() => unit.status === 'available' && onBook(unit)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={
            unit.status === 'available'
              ? { background: '#0f1e42', color: '#fff' }
              : { background: '#f1f5f9', color: '#9aa3b8', cursor: 'not-allowed' }
          }
        >
          {unit.status === 'available' ? 'Book / Inquire' : unit.status === 'occupied' ? 'Currently Occupied' : 'Under Maintenance'}
        </button>
      </div>
    </div>
  )
}

function BookingModal({ unit, onClose }: { unit: Unit; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', moveIn: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in">
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#e8edf5' }}>
          <div>
            <h3 className="font-bold text-lg" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              Inquire — Unit {unit.number}
            </h3>
            <p className="text-sm" style={{ color: '#6b7a99' }}>₱{unit.price.toLocaleString()}/mo · {unit.type} · {unit.area} sqm</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <X size={18} style={{ color: '#6b7a99' }} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center fade-in">
            <CheckCircle2 size={40} style={{ color: '#059669', margin: '0 auto 12px' }} />
            <p className="font-semibold text-lg" style={{ color: '#0f1e42' }}>Inquiry Submitted!</p>
            <p className="text-sm mt-1 mb-5" style={{ color: '#6b7a99' }}>Admin will contact you within 24 hours.</p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#0f1e42' }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Full Name</label>
                <input required type="text" placeholder="Juan dela Cruz" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Phone</label>
                <input required type="tel" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Email Address</label>
              <input required type="email" placeholder="juan@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Preferred Move-in Date</label>
              <input type="date" value={form.moveIn} onChange={e => setForm(p => ({ ...p, moveIn: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Message</label>
              <textarea rows={3} placeholder="Any questions or special requirements…" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm resize-none" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: '#0f1e42' }}>
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function UnitsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)

  const filtered = mockUnits.filter(u => {
    const matchSearch = u.number.toLowerCase().includes(search.toLowerCase()) ||
      (u.tenant || '').toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All' || u.type === typeFilter
    const matchStatus = statusFilter === 'All' || u.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  const stats = {
    total: mockUnits.length,
    available: mockUnits.filter(u => u.status === 'available').length,
    occupied: mockUnits.filter(u => u.status === 'occupied').length,
    maintenance: mockUnits.filter(u => u.status === 'maintenance').length,
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
          Unit Listings
        </h1>
        <p className="text-sm" style={{ color: '#6b7a99' }}>Browse all condominium units — availability and details</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Units', value: stats.total, color: '#0f1e42' },
          { label: 'Available', value: stats.available, color: '#059669' },
          { label: 'Occupied', value: stats.occupied, color: '#6b7a99' },
          { label: 'Maintenance', value: stats.maintenance, color: '#d97706' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm text-center" style={{ border: '1px solid #e8edf5' }}>
            <div className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#9aa3b8' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-2xl shadow-sm" style={{ border: '1px solid #e8edf5' }}>
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9aa3b8' }} />
          <input
            type="text"
            placeholder="Search unit or tenant…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
            style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Studio', '1BR', '2BR', '3BR'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={typeFilter === t
                ? { background: '#0f1e42', color: '#fff' }
                : { background: '#f1f5f9', color: '#6b7a99' }
              }
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'available', 'occupied', 'maintenance'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
              style={statusFilter === s
                ? { background: '#c9a84c', color: '#fff' }
                : { background: '#f1f5f9', color: '#6b7a99' }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl" style={{ border: '1px solid #e8edf5' }}>
          <Building2 size={40} style={{ color: '#dde3ef', margin: '0 auto 12px' }} />
          <p className="font-medium" style={{ color: '#6b7a99' }}>No units match your filters</p>
          <button onClick={() => { setSearch(''); setTypeFilter('All'); setStatusFilter('All') }}
            className="mt-3 text-sm font-medium" style={{ color: '#c9a84c' }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(unit => (
            <UnitCard key={unit.id} unit={unit} onBook={setSelectedUnit} />
          ))}
        </div>
      )}

      {selectedUnit && <BookingModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />}
    </div>
  )
}
