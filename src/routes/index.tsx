import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Building2, Lock, User, ChevronRight, Shield, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 700))

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('cboms_user', JSON.stringify({ name: 'Ramon Admin', role: 'admin', unit: 'Admin Office' }))
      navigate({ to: '/admin' })
    } else if (username === 'resident' && password === 'resident123') {
      localStorage.setItem('cboms_user', JSON.stringify({ name: 'Maria Santos', role: 'resident', unit: 'Unit 4A' }))
      navigate({ to: '/dashboard' })
    } else {
      setError('Invalid credentials. Use the demo accounts below.')
      setLoading(false)
    }
  }

  const quickLogin = (role: 'admin' | 'resident') => {
    if (role === 'admin') { setUsername('admin'); setPassword('admin123') }
    else { setUsername('resident'); setPassword('resident123') }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-[58%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #0a1428 0%, #0f1e42 50%, #122254 100%)' }}
      >
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Glow */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{ width: 400, height: 400, top: '30%', right: '5%', background: 'rgba(201,168,76,0.06)' }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{ width: 300, height: 300, bottom: '10%', left: '5%', background: 'rgba(59,130,246,0.05)' }}
        />

        {/* Building silhouette */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 900 340"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax slice"
          style={{ opacity: 1 }}
        >
          <rect x="30" y="200" width="70" height="140" fill="rgba(255,255,255,0.025)" />
          <rect x="110" y="155" width="85" height="185" fill="rgba(255,255,255,0.035)" />
          <rect x="205" y="100" width="100" height="240" fill="rgba(255,255,255,0.03)" />
          <rect x="315" y="55" width="80" height="285" fill="rgba(255,255,255,0.045)" />
          <rect x="405" y="30" width="110" height="310" fill="rgba(255,255,255,0.04)" />
          <rect x="525" y="85" width="95" height="255" fill="rgba(255,255,255,0.03)" />
          <rect x="630" y="130" width="90" height="210" fill="rgba(255,255,255,0.035)" />
          <rect x="730" y="175" width="75" height="165" fill="rgba(255,255,255,0.025)" />
          <rect x="815" y="210" width="65" height="130" fill="rgba(255,255,255,0.02)" />
          {/* Windows on main tower */}
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <rect
                key={`w${row}${col}`}
                x={420 + col * 32}
                y={48 + row * 38}
                width={14}
                height={20}
                rx={2}
                fill={Math.random() > 0.4 ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)'}
              />
            ))
          )}
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 2 }).map((_, col) => (
              <rect
                key={`w2${row}${col}`}
                x={325 + col * 34}
                y={72 + row * 42}
                width={13}
                height={18}
                rx={2}
                fill={Math.random() > 0.5 ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.07)'}
              />
            ))
          )}
        </svg>

        {/* Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: '#c9a84c' }}
            >
              <Building2 className="w-5 h-5" style={{ color: '#0f1e42' }} />
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight">SkyView Residences</div>
              <div className="text-xs font-semibold tracking-widest" style={{ color: '#c9a84c', letterSpacing: '0.1em' }}>
                CONDOMINIUM MANAGEMENT
              </div>
            </div>
          </div>

          <h1
            className="text-5xl xl:text-6xl text-white mb-5 leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Your home,<br />
            <span style={{ color: '#c9a84c' }}>managed</span>{' '}
            with care.
          </h1>
          <p className="text-lg max-w-md leading-relaxed" style={{ color: '#7a8fb5' }}>
            The complete platform for condominium living — book facilities, track visitors,
            manage dues, and stay connected with your community.
          </p>

          <div className="mt-8 space-y-3">
            {['Facility booking in seconds', 'Real-time visitor tracking', 'Transparent billing & dues'].map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <CheckCircle2 size={16} style={{ color: '#c9a84c', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: '#8899bb' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '120', label: 'Residents' },
            { value: '88%', label: 'Occupancy Rate' },
            { value: '12', label: 'Amenities' },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)' }}
            >
              <div className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: '#c9a84c' }}>
                {stat.value}
              </div>
              <div className="text-sm mt-1" style={{ color: '#7a8fb5' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: '#0f1e42' }}
          >
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg" style={{ color: '#0f1e42' }}>SkyView Residences</span>
        </div>

        <div className="w-full max-w-sm">
          <h2
            className="text-4xl mb-1.5"
            style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}
          >
            Welcome back
          </h2>
          <p className="text-sm mb-8" style={{ color: '#6b7a99' }}>
            Sign in to your resident portal
          </p>

          {/* Quick demo buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => quickLogin('resident')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all"
              style={{ border: '2px solid #dde3ef', color: '#1a2040' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#0f1e42' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#dde3ef' }}
            >
              <User size={15} style={{ color: '#3b82f6' }} />
              Resident Demo
            </button>
            <button
              onClick={() => quickLogin('admin')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all"
              style={{ border: '2px solid #dde3ef', color: '#1a2040' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#c9a84c' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#dde3ef' }}
            >
              <Shield size={15} style={{ color: '#c9a84c' }} />
              Admin Demo
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: '#e5eaf3' }} />
            <span className="text-xs" style={{ color: '#9aa3b8' }}>or enter manually</span>
            <div className="flex-1 h-px" style={{ background: '#e5eaf3' }} />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a2040' }}>
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9aa3b8' }} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all"
                  style={{
                    border: '1.5px solid #dde3ef',
                    color: '#1a2040',
                    background: '#fff',
                  }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#0f1e42'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(15,30,66,0.06)' }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#dde3ef'; (e.target as HTMLInputElement).style.boxShadow = 'none' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a2040' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9aa3b8' }} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all"
                  style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#fff' }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#0f1e42'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(15,30,66,0.06)' }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#dde3ef'; (e.target as HTMLInputElement).style.boxShadow = 'none' }}
                />
              </div>
            </div>

            {error && (
              <div className="text-sm p-3 rounded-xl" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all"
              style={{ background: loading ? '#6b7a99' : '#0f1e42' }}
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Sign In <ChevronRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: '#9aa3b8' }}>
            Demo accounts:{' '}
            <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: '#f1f5f9', color: '#1a2040' }}>admin / admin123</code>
            {' '}or{' '}
            <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: '#f1f5f9', color: '#1a2040' }}>resident / resident123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
