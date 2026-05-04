import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { Building2 } from 'lucide-react'
import { authAPI } from '../lib/api'

export const Route = createFileRoute('/')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authAPI.login(email, password)
      
      // Store user info
      localStorage.setItem('cboms_user', JSON.stringify({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        unit: response.user.unit_id || 'N/A'
      }))

      // Navigate based on role
      if (response.user.role === 'admin') {
        navigate({ to: '/admin' })
      } else {
        navigate({ to: '/dashboard' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.')
      setLoading(false)
    }
  }

  const quickLogin = async (role: 'admin' | 'resident') => {
    const credentials = role === 'admin'
      ? { email: 'admin@condo.com', password: 'admin123' }
      : { email: 'resident@condo.com', password: 'resident123' }

    setEmail(credentials.email)
    setPassword(credentials.password)
    setLoading(true)
    setError('')

    try {
      const response = await authAPI.login(credentials.email, credentials.password)
      localStorage.setItem('cboms_user', JSON.stringify({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        unit: response.user.unit_id || 'N/A',
      }))

      if (response.user.role === 'admin') {
        navigate({ to: '/admin' })
      } else {
        navigate({ to: '/dashboard' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen grid place-items-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center bg-slate-900">
      <div className="absolute inset-0 bg-slate-950/70 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md px-6 py-8 rounded-[32px] border border-white/15 bg-white/95 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
        <div className="mb-7 text-center">
          <div className="mb-5">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight text-slate-900">ONE SPATIAL</div>
                <div className="text-sm font-bold leading-tight text-slate-900">ILOILO</div>
              </div>
            </div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Condominium Management</div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to your resident portal</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => quickLogin('resident')}
              disabled={loading}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
            >
              {loading ? 'Logging in…' : 'Resident Demo'}
            </button>
            <button
              type="button"
              onClick={() => quickLogin('admin')}
              disabled={loading}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
            >
              {loading ? 'Logging in…' : 'Admin Demo'}
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>or enter manually</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: '/register' })}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Create account
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-500">
          Demo accounts: <span className="font-semibold text-slate-900">admin@condo.com / admin123</span> or <span className="font-semibold text-slate-900">resident@condo.com / resident123</span>
        </div>
      </div>
    </div>
  )
}

