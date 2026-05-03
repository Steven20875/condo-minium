import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { UserPlus, LogIn, LogOut, Car, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { mockVisits, type Visit } from '@/lib/mockData'

export const Route = createFileRoute('/_app/dashboard/visitors')({
  component: MyVisitorsPage,
})

function MyVisitorsPage() {
  const myVisits = mockVisits.filter(v => v.resident === 'Maria Santos')
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            My Visitors
          </h1>
          <p className="text-sm" style={{ color: '#6b7a99' }}>Register and track your guests</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm"
          style={{ background: '#0f1e42' }}
        >
          <UserPlus size={16} />
          Register Visitor
        </button>
      </div>

      <div className="space-y-3">
        {myVisits.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl" style={{ border: '1px solid #e8edf5' }}>
            <UserPlus size={36} style={{ color: '#dde3ef', margin: '0 auto 12px' }} />
            <p style={{ color: '#9aa3b8' }}>No visitor records yet</p>
          </div>
        ) : (
          myVisits.map(v => {
            const st = v.status === 'inside'
              ? { bg: '#ecfdf5', color: '#059669', label: 'Inside', Icon: CheckCircle }
              : v.status === 'expected'
              ? { bg: '#fffbeb', color: '#d97706', label: 'Expected', Icon: AlertCircle }
              : { bg: '#f8fafc', color: '#9aa3b8', label: 'Departed', Icon: XCircle }
            return (
              <div key={v.id} className="bg-white rounded-2xl p-5 shadow-sm fade-in flex items-center gap-4" style={{ border: '1px solid #e8edf5' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ background: st.color }}
                >
                  {v.visitorName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold" style={{ color: '#0f1e42' }}>{v.visitorName}</div>
                  <div className="text-sm" style={{ color: '#6b7a99' }}>{v.purpose}</div>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-xs" style={{ color: '#9aa3b8' }}>
                    <span className="flex items-center gap-1"><LogIn size={11} />{v.checkIn}</span>
                    {v.checkOut && <span className="flex items-center gap-1"><LogOut size={11} />{v.checkOut}</span>}
                    {v.vehicle && <span className="flex items-center gap-1"><Car size={11} />{v.vehicle}</span>}
                  </div>
                </div>
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{ background: st.bg, color: st.color }}
                >
                  <st.Icon size={13} />
                  {st.label}
                </span>
              </div>
            )
          })
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl fade-in p-6">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              Register Visitor
            </h3>
            <div className="space-y-3">
              {['Visitor Name', 'Purpose of Visit', 'Expected Date & Time', 'Vehicle Plate (optional)'].map(f => (
                <div key={f}>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>{f}</label>
                  <input type="text" className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#f1f5f9', color: '#6b7a99' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#0f1e42' }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
