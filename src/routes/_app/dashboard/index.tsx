import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS, CategoryScale, LinearScale, LineElement,
  PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  CalendarCheck, Bell, TrendingUp, Clock, CreditCard,
  Wrench, Dumbbell, Waves, UtensilsCrossed, BookOpen, Users, ChevronRight, CheckCircle2,
} from 'lucide-react'
import { mockBookings, mockAnnouncements, revenueChartData } from '@/lib/mockData'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler)

export const Route = createFileRoute('/_app/dashboard/')({
  component: ResidentDashboard,
})

const facilities = [
  { name: 'Swimming Pool', icon: Waves, color: '#3b82f6', slots: '6AM–9PM' },
  { name: 'Gym', icon: Dumbbell, color: '#10b981', slots: '5AM–10PM' },
  { name: 'Function Hall', icon: Users, color: '#8b5cf6', slots: '8AM–10PM' },
  { name: 'BBQ Area', icon: UtensilsCrossed, color: '#f97316', slots: '10AM–8PM' },
  { name: 'Study Room', icon: BookOpen, color: '#c9a84c', slots: '7AM–9PM' },
  { name: 'Maintenance', icon: Wrench, color: '#6b7280', slots: 'Request' },
]

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  confirmed: { bg: '#ecfdf5', color: '#059669', label: 'Confirmed' },
  pending:   { bg: '#fffbeb', color: '#d97706', label: 'Pending' },
  cancelled: { bg: '#fef2f2', color: '#dc2626', label: 'Cancelled' },
  completed: { bg: '#f0f9ff', color: '#0284c7', label: 'Completed' },
}

function StatCard({ icon: Icon, label, value, sub, iconBg }: {
  icon: React.ElementType; label: string; value: string; sub: string; iconBg: string
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm fade-in" style={{ border: '1px solid #e8edf5' }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: '#6b7a99' }}>{label}</p>
          <p className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>{value}</p>
          <p className="text-xs mt-1" style={{ color: '#9aa3b8' }}>{sub}</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
    </div>
  )
}

function ResidentDashboard() {
  const [mounted, setMounted] = useState(false)
  const [bookingForm, setBookingForm] = useState({ facility: '', date: '', time: '', notes: '' })
  const [bookingSuccess, setBookingSuccess] = useState(false)
  useEffect(() => setMounted(true), [])

  const myBookings = mockBookings.filter(b => b.resident === 'Maria Santos')
  const today = new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => { setBookingSuccess(false); setBookingForm({ facility: '', date: '', time: '', notes: '' }) }, 3000)
  }

  const chartData = {
    labels: revenueChartData.months,
    datasets: [{
      label: 'Association Dues (₱)',
      data: [13000, 13000, 13000, 13000, 13000, 13000, 15000, 15000, 15000, 15000, 15000, 15000],
      borderColor: '#c9a84c',
      backgroundColor: 'rgba(201,168,76,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#c9a84c',
      pointRadius: 4,
      borderWidth: 2,
    }],
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            Welcome back, Maria
          </h1>
          <p className="text-sm" style={{ color: '#6b7a99' }}>{today}</p>
        </div>
        <button
          className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm"
          style={{ border: '1px solid #e8edf5' }}
        >
          <Bell size={18} style={{ color: '#6b7a99' }} />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ background: '#dc2626' }}
          />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={CalendarCheck} label="Active Bookings" value="3" sub="2 this week" iconBg="#3b82f6" />
        <StatCard icon={CreditCard} label="Balance Due" value="₱2,500" sub="Due May 15" iconBg="#dc2626" />
        <StatCard icon={Clock} label="Upcoming" value="1" sub="Pool · May 5" iconBg="#c9a84c" />
        <StatCard icon={TrendingUp} label="Total Bookings" value="14" sub="This year" iconBg="#10b981" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Quick Book */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #e8edf5' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            Book a Facility
          </h2>

          {bookingSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center fade-in">
              <CheckCircle2 size={40} style={{ color: '#059669' }} className="mb-3" />
              <p className="font-semibold" style={{ color: '#059669' }}>Booking Submitted!</p>
              <p className="text-sm mt-1" style={{ color: '#6b7a99' }}>Pending admin confirmation</p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Facility</label>
                <select
                  required
                  value={bookingForm.facility}
                  onChange={e => setBookingForm(p => ({ ...p, facility: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#fff' }}
                >
                  <option value="">Select facility…</option>
                  {facilities.filter(f => f.name !== 'Maintenance').map(f => (
                    <option key={f.name} value={f.name}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Date</label>
                <input
                  type="date"
                  required
                  value={bookingForm.date}
                  onChange={e => setBookingForm(p => ({ ...p, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Preferred Time</label>
                <select
                  required
                  value={bookingForm.time}
                  onChange={e => setBookingForm(p => ({ ...p, time: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#fff' }}
                >
                  <option value="">Select time…</option>
                  {['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#6b7a99' }}>Notes (optional)</label>
                <textarea
                  value={bookingForm.notes}
                  onChange={e => setBookingForm(p => ({ ...p, notes: e.target.value }))}
                  rows={2}
                  placeholder="Any special requests…"
                  className="w-full px-3 py-2.5 rounded-xl text-sm resize-none"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040' }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: '#0f1e42' }}
              >
                Submit Booking
              </button>
            </form>
          )}
        </div>

        {/* My Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #e8edf5' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              My Bookings
            </h2>
            <Link
              to="/dashboard/bookings"
              className="text-xs font-medium flex items-center gap-1"
              style={{ color: '#c9a84c' }}
            >
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {myBookings.slice(0, 4).map(b => {
              const st = statusStyle[b.status]
              const FacIcon = facilities.find(f => f.name === b.facility)?.icon ?? CalendarCheck
              const iconColor = facilities.find(f => f.name === b.facility)?.color ?? '#6b7a99'
              return (
                <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f8fafc' }}>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: iconColor + '18' }}
                  >
                    <FacIcon size={17} style={{ color: iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: '#1a2040' }}>{b.facility}</div>
                    <div className="text-xs" style={{ color: '#9aa3b8' }}>{b.date} · {b.time} · {b.duration}h</div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        {mounted && (
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #e8edf5' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
              Payment History
            </h2>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: false, grid: { color: '#f0f0f0' }, ticks: { color: '#9aa3b8', font: { size: 11 } } },
                  x: { grid: { display: false }, ticks: { color: '#9aa3b8', font: { size: 11 } } },
                },
              }}
            />
          </div>
        )}

        {/* Announcements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #e8edf5' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
            Announcements
          </h2>
          <div className="space-y-3">
            {mockAnnouncements.map(a => {
              const priorityStyle = a.priority === 'high'
                ? { bg: '#fef2f2', color: '#dc2626', dot: '#dc2626' }
                : a.priority === 'low'
                ? { bg: '#f0fdf4', color: '#059669', dot: '#059669' }
                : { bg: '#eff6ff', color: '#2563eb', dot: '#2563eb' }
              return (
                <div key={a.id} className="p-3 rounded-xl" style={{ background: priorityStyle.bg }}>
                  <div className="flex items-start gap-2">
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: priorityStyle.dot }}
                    />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#1a2040' }}>{a.title}</p>
                      <p className="text-xs mt-0.5 line-clamp-2" style={{ color: '#6b7a99' }}>{a.content}</p>
                      <p className="text-xs mt-1" style={{ color: '#9aa3b8' }}>{a.date} · {a.author}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
