import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, UserPlus, Clock, LogIn, LogOut, Car, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { mockVisits, type Visit } from '@/lib/mockData'

export const Route = createFileRoute('/_app/admin/visits')({
  component: VisitsPage,
})

type VisitStatus = 'expected' | 'inside' | 'departed'

const statusConfig: Record<VisitStatus, { bg: string; color: string; label: string; icon: React.ElementType }> = {
  expected: { bg: '#fffbeb', color: '#d97706', label: 'Expected', icon: AlertCircle },
  inside:   { bg: '#ecfdf5', color: '#059669', label: 'Inside',   icon: CheckCircle },
  departed: { bg: '#f8fafc', color: '#9aa3b8', label: 'Departed', icon: XCircle },
}

function VisitRow({ visit, onStatusChange }: {
  visit: Visit
  onStatusChange: (id: string, status: VisitStatus) => void
}) {
  const st = statusConfig[visit.status]
  const StatusIcon = st.icon

  return (
    <tr className="border-b transition-colors hover:bg-gray-50" style={{ borderColor: '#f0f4fa' }}>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
            style={{ background: st.color }}
          >
            {visit.visitorName.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: '#1a2040' }}>{visit.visitorName}</div>
            <div className="text-xs" style={{ color: '#9aa3b8' }}>{visit.purpose}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{ background: '#0f1e42', color: '#c9a84c' }}
        >
          Unit {visit.unit}
        </span>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: '#1a2040' }}>
        {visit.resident}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7a99' }}>
          <LogIn size={13} style={{ color: '#059669' }} />
          {visit.checkIn}
        </div>
        {visit.checkOut && (
          <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color: '#9aa3b8' }}>
            <LogOut size={13} style={{ color: '#9aa3b8' }} />
            {visit.checkOut}
          </div>
        )}
      </td>
      <td className="px-4 py-3.5">
        {visit.vehicle ? (
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7a99' }}>
            <Car size={13} />
            {visit.vehicle}
          </div>
        ) : (
          <span className="text-xs" style={{ color: '#d0d7e6' }}>—</span>
        )}
      </td>
      <td className="px-4 py-3.5">
        <span
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
          style={{ background: st.bg, color: st.color }}
        >
          <StatusIcon size={11} />
          {st.label}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex gap-1.5">
          {visit.status === 'expected' && (
            <button
              onClick={() => onStatusChange(visit.id, 'inside')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: '#059669' }}
            >
              Check In
            </button>
          )}
          {visit.status === 'inside' && (
            <button
              onClick={() => onStatusChange(visit.id, 'departed')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: '#6b7a99' }}
            >
              Check Out
            </button>
          )}
          {visit.status === 'departed' && (
            <span className="text-xs" style={{ color: '#d0d7e6' }}>Completed</span>
          )}
        </div>
      </td>
    </tr>
  )
}

function VisitsPage() {
  const [visits, setVisits] = useState(mockVisits)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [newVisitor, setNewVisitor] = useState({ name: '', unit: '', resident: '', purpose: '', vehicle: '' })

  const handleStatusChange = (id: string, status: VisitStatus) => {
    setVisits(prev => prev.map(v => {
      if (v.id !== id) return v
      if (status === 'inside') return { ...v, status, checkIn: new Date().toLocaleString('en-PH', { hour12: false }) }
      if (status === 'departed') return { ...v, status, checkOut: new Date().toLocaleString('en-PH', { hour12: false }) }
      return { ...v, status }
    }))
  }

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault()
    const newV: Visit = {
      id: `v${Date.now()}`,
      visitorName: newVisitor.name,
      unit: newVisitor.unit,
      resident: newVisitor.resident,
      purpose: newVisitor.purpose,
      checkIn: new Date().toLocaleString('en-PH', { hour12: false }),
      status: 'expected',
      vehicle: newVisitor.vehicle || undefined,
    }
    setVisits(prev => [newV, ...prev])
    setShowModal(false)
    setNewVisitor({ name: '', unit: '', resident: '', purpose: '', vehicle: '' })
  }

  const filtered = visits.filter(v => {
    const q = search.toLowerCase()
    const matchSearch = v.visitorName.toLowerCase().includes(q) || v.unit.toLowerCase().includes(q) || v.resident.toLowerCase().includes(q) || v.purpose.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || v.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = {
    all: visits.length,
    inside: visits.filter(v => v.status === 'inside').length,
    expected: visits.filter(v => v.status === 'expected').length,
    departed: visits.filter(v => v.status === 'departed').length,
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            Visit Logs
          </h1>
          <p className="text-sm" style={{ color: '#6b7a99' }}>
            Gate and visitor management
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm"
          style={{ background: '#0f1e42' }}
        >
          <UserPlus size={16} />
          Log Visitor
        </button>
      </div>

      {/* Status badges */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Visitors', value: counts.all, color: '#0f1e42', bg: '#f1f5f9' },
          { label: 'Currently Inside', value: counts.inside, color: '#059669', bg: '#ecfdf5' },
          { label: 'Expected', value: counts.expected, color: '#d97706', bg: '#fffbeb' },
          { label: 'Departed', value: counts.departed, color: '#6b7a99', bg: '#f8fafc' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm text-center" style={{ border: '1px solid #e8edf5' }}>
            <div className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#9aa3b8' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow-sm" style={{ border: '1px solid #e8edf5' }}>
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9aa3b8' }} />
          <input
            type="text"
            placeholder="Search visitor, unit, purpose…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
            style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
          />
        </div>
        <div className="flex gap-2">
          {['All', 'inside', 'expected', 'departed'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
              style={statusFilter === s ? { background: '#0f1e42', color: '#fff' } : { background: '#f1f5f9', color: '#6b7a99' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #e8edf5' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8edf5' }}>
                {['Visitor', 'Unit', 'Resident', 'Check In / Out', 'Vehicle', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 lg:px-5 py-3 text-left text-xs font-semibold" style={{ color: '#9aa3b8' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <VisitRow key={v.id} visit={v} onStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: '#9aa3b8' }}>No visits match your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Log Visitor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in p-6">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              Log New Visitor
            </h3>
            <form onSubmit={handleAddVisitor} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Visitor Name</label>
                  <input required type="text" placeholder="Full name" value={newVisitor.name}
                    onChange={e => setNewVisitor(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Unit to Visit</label>
                  <input required type="text" placeholder="e.g. 4A" value={newVisitor.unit}
                    onChange={e => setNewVisitor(p => ({ ...p, unit: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Resident Name</label>
                <input required type="text" placeholder="Resident being visited" value={newVisitor.resident}
                  onChange={e => setNewVisitor(p => ({ ...p, resident: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Purpose of Visit</label>
                <select required value={newVisitor.purpose} onChange={e => setNewVisitor(p => ({ ...p, purpose: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#fff' }}>
                  <option value="">Select purpose…</option>
                  {['Family Visit', 'Friend Visit', 'Package Delivery', 'Maintenance Work', 'Medical Visit', 'Spouse', 'Business', 'Other'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Vehicle Plate (optional)</label>
                <input type="text" placeholder="e.g. ABC 1234" value={newVisitor.vehicle}
                  onChange={e => setNewVisitor(p => ({ ...p, vehicle: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#f1f5f9', color: '#6b7a99' }}>
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#0f1e42' }}>
                  Log Visitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
