import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, UserPlus, ChevronDown, MoreVertical, Mail, Phone, CheckCircle, XCircle } from 'lucide-react'
import { mockUsers, type AppUser } from '@/lib/mockData'

export const Route = createFileRoute('/_app/admin/users')({
  component: UsersPage,
})

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('')
}

const avatarColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#c9a84c', '#ef4444', '#0284c7']

function UserRow({ user, index, onAction }: { user: AppUser; index: number; onAction: (u: AppUser) => void }) {
  const [open, setOpen] = useState(false)
  const color = avatarColors[index % avatarColors.length]

  return (
    <tr className="border-b transition-colors hover:bg-gray-50" style={{ borderColor: '#f0f4fa' }}>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
            style={{ background: color }}
          >
            {getInitials(user.name)}
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: '#1a2040' }}>{user.name}</div>
            <div className="text-xs" style={{ color: '#9aa3b8' }}>{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-lg inline-block"
          style={{ background: '#0f1e42', color: '#c9a84c' }}
        >
          Unit {user.unit}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
          style={user.role === 'admin'
            ? { background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }
            : { background: '#eff6ff', color: '#3b82f6' }
          }
        >
          {user.role}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          {user.status === 'active'
            ? <CheckCircle size={14} style={{ color: '#059669' }} />
            : <XCircle size={14} style={{ color: '#dc2626' }} />
          }
          <span className="text-xs font-medium capitalize" style={{ color: user.status === 'active' ? '#059669' : '#dc2626' }}>
            {user.status}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5 text-xs" style={{ color: '#6b7a99' }}>{user.phone}</td>
      <td className="px-4 py-3.5">
        <span
          className="text-xs font-semibold"
          style={{ color: user.balance < 0 ? '#dc2626' : user.balance > 0 ? '#059669' : '#9aa3b8' }}
        >
          {user.balance < 0 ? '−' : user.balance > 0 ? '+' : ''}₱{Math.abs(user.balance).toLocaleString()}
        </span>
      </td>
      <td className="px-4 py-3.5 text-xs" style={{ color: '#9aa3b8' }}>{user.joinDate}</td>
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
              {['View Profile', 'Send Message', 'Edit Details', user.status === 'active' ? 'Deactivate' : 'Activate'].map(action => (
                <button
                  key={action}
                  onClick={() => { onAction(user); setOpen(false) }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors"
                  style={{ color: action === 'Deactivate' ? '#dc2626' : '#1a2040' }}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}

function UsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null)

  const filtered = mockUsers.filter(u => {
    const q = search.toLowerCase()
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.unit.toLowerCase().includes(q)
    const matchRole = roleFilter === 'All' || u.role === roleFilter
    const matchStatus = statusFilter === 'All' || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            Residents & Users
          </h1>
          <p className="text-sm" style={{ color: '#6b7a99' }}>
            {filtered.length} of {mockUsers.length} users
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm"
          style={{ background: '#0f1e42' }}
        >
          <UserPlus size={16} />
          Add Resident
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow-sm" style={{ border: '1px solid #e8edf5' }}>
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9aa3b8' }} />
          <input
            type="text"
            placeholder="Search name, email, unit…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
            style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
          />
        </div>
        <div className="flex gap-2">
          {['All', 'resident', 'admin'].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
              style={roleFilter === r ? { background: '#0f1e42', color: '#fff' } : { background: '#f1f5f9', color: '#6b7a99' }}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['All', 'active', 'inactive'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
              style={statusFilter === s ? { background: '#c9a84c', color: '#fff' } : { background: '#f1f5f9', color: '#6b7a99' }}
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
                {['Resident', 'Unit', 'Role', 'Status', 'Phone', 'Balance', 'Since', 'Actions'].map(h => (
                  <th key={h} className="px-4 lg:px-5 py-3 text-left text-xs font-semibold" style={{ color: '#9aa3b8' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <UserRow key={user.id} user={user} index={i} onAction={setSelectedUser} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: '#9aa3b8' }}>No users match your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Resident Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in p-6">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              Add New Resident
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Full Name', placeholder: 'Juan dela Cruz', type: 'text' },
                { label: 'Email Address', placeholder: 'juan@email.com', type: 'email' },
                { label: 'Phone Number', placeholder: '+63 9XX XXX XXXX', type: 'tel' },
                { label: 'Unit Number', placeholder: 'e.g. 4A', type: 'text' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl text-sm"
                    style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: '#f1f5f9', color: '#6b7a99' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: '#0f1e42' }}
              >
                Save Resident
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
