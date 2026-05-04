import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Building2, Plus, Edit2, Trash2, X, AlertTriangle, BedDouble, Maximize2, CheckCircle2, Wrench } from 'lucide-react'
import { unitsAPI } from '@/lib/api'

export const Route = createFileRoute('/_app/admin/units')({
  component: UnitsManagementPage,
  ssr: false, // Disable SSR for this route
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

type Unit = {
  id?: number
  unit_number: string
  type: string
  floor: number
  status: 'available' | 'occupied' | 'maintenance'
  price: number
  area: number
  tenant?: string
}

type UnitFormData = Omit<Unit, 'id'>

function UnitsManagementPage() {
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [formData, setFormData] = useState<UnitFormData>({
    unit_number: '',
    type: '1BR',
    floor: 1,
    status: 'available',
    price: 0,
    area: 0,
    tenant: '',
  })

  useEffect(() => {
    // Temporary: use mock data to test UI
    const mockUnits = [
      { id: 1, unit_number: '101', type: '1BR', floor: 1, status: 'available', price: 15000, area: 45.5, tenant: null },
      { id: 2, unit_number: '102', type: '1BR', floor: 1, status: 'occupied', price: 15000, area: 45.5, tenant: 'John Doe' },
      { id: 3, unit_number: '201', type: '2BR', floor: 2, status: 'available', price: 22000, area: 65.0, tenant: null },
      { id: 4, unit_number: '202', type: '2BR', floor: 2, status: 'maintenance', price: 22000, area: 65.0, tenant: null },
      { id: 5, unit_number: '301', type: '3BR', floor: 3, status: 'available', price: 30000, area: 85.0, tenant: null },
      { id: 6, unit_number: '302', type: '3BR', floor: 3, status: 'occupied', price: 30000, area: 85.0, tenant: 'Jane Smith' },
    ];
    setUnits(mockUnits);
    setLoading(false);
    // loadUnits() // Commented out for now
  }, [])

  const loadUnits = async () => {
    try {
      setLoading(true)
      const data = await unitsAPI.getAll()
      setUnits(data)
      setError('')
    } catch (err) {
      setError('Failed to load units')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const updated = await unitsAPI.update(editingId, formData)
        setUnits(units.map(u => u.id === editingId ? updated : u))
      } else {
        const created = await unitsAPI.create(formData)
        setUnits([...units, created])
      }
      resetForm()
      setError('')
    } catch (err) {
      setError('Failed to save unit')
    }
  }

  const handleEdit = (unit: Unit) => {
    setFormData({
      unit_number: unit.unit_number,
      type: unit.type,
      floor: unit.floor,
      status: unit.status,
      price: unit.price,
      area: unit.area,
      tenant: unit.tenant || '',
    })
    setEditingId(unit.id || null)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await unitsAPI.delete(id)
      setUnits(units.filter(u => u.id !== id))
      setDeleteConfirm(null)
      setError('')
    } catch (err) {
      setError('Failed to delete unit')
    }
  }

  const resetForm = () => {
    setFormData({
      unit_number: '',
      type: '1BR',
      floor: 1,
      status: 'available',
      price: 0,
      area: 0,
      tenant: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const statusColors = {
    available: { bg: '#ecfdf5', text: '#059669', label: 'Available' },
    occupied: { bg: '#f8fafc', text: '#6b7a99', label: 'Occupied' },
    maintenance: { bg: '#fffbeb', text: '#d97706', label: 'Maintenance' },
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            Units Management
          </h1>
          <p className="text-sm" style={{ color: '#6b7a99' }}>
            Add, edit, or delete units. Total: {units.length}
          </p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#0f1e42' }}
        >
          <Plus size={16} />
          Add Unit
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12" style={{ color: '#6b7a99' }}>Loading units...</div>
      ) : units.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border" style={{ borderColor: '#e8edf5', color: '#6b7a99' }}>
          <Building2 size={40} className="mx-auto mb-3" style={{ opacity: 0.5 }} />
          <p>No units yet. Add your first unit to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => {
            const StatusIcon = statusConfig[unit.status].icon
            return (
              <div
                key={unit.id}
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
                    style={{ background: statusConfig[unit.status].bg, color: statusConfig[unit.status].color }}
                  >
                    <StatusIcon size={11} />
                    {statusConfig[unit.status].label}
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
                        Unit {unit.unit_number}
                      </h3>
                      {unit.tenant && (
                        <p className="text-xs mt-0.5" style={{ color: '#9aa3b8' }}>Tenant: {unit.tenant}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold" style={{ color: '#0f1e42' }}>
                        ₱{unit.price?.toLocaleString() || 0}
                      </div>
                      <div className="text-xs" style={{ color: '#9aa3b8' }}>/month</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: '#6b7a99' }}>
                    <span className="flex items-center gap-1">
                      <Maximize2 size={12} />
                      {unit.area} sqm
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble size={12} />
                      {unit.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(unit)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition"
                      style={{ background: '#3b82f6' }}
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(unit.id || null)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition"
                      style={{ background: '#dc2626' }}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in">
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#e8edf5' }}>
              <h3 className="font-bold text-lg" style={{ color: '#0f1e42' }}>
                {editingId ? 'Edit Unit' : 'Add New Unit'}
              </h3>
              <button onClick={resetForm} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
                <X size={18} style={{ color: '#6b7a99' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Unit Number *</label>
                <input
                  type="text"
                  value={formData.unit_number}
                  onChange={e => setFormData({ ...formData, unit_number: e.target.value })}
                  placeholder="101, 102, etc."
                  required
                  className="w-full px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Type *</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl text-sm"
                    style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                  >
                    <option>Studio</option>
                    <option>1BR</option>
                    <option>2BR</option>
                    <option>3BR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Floor *</label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={e => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl text-sm"
                    style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Area (sqm) *</label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={e => setFormData({ ...formData, area: parseFloat(e.target.value) })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl text-sm"
                    style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Price (₱) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl text-sm"
                    style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Status *</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as 'available' | 'occupied' | 'maintenance' })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Tenant Name</label>
                <input
                  type="text"
                  value={formData.tenant || ''}
                  onChange={e => setFormData({ ...formData, tenant: e.target.value })}
                  placeholder="Leave blank if available"
                  className="w-full px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="button" onClick={resetForm} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#f1f5f9', color: '#6b7a99' }}>
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#0f1e42' }}>
                  {editingId ? 'Update' : 'Add'} Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl fade-in">
            <div className="p-6 text-center">
              <AlertTriangle size={40} style={{ color: '#dc2626', margin: '0 auto 12px' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: '#0f1e42' }}>Delete Unit?</h3>
              <p className="text-sm mb-6" style={{ color: '#6b7a99' }}>
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: '#f1f5f9', color: '#6b7a99' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: '#dc2626' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
