import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Building2, Lock, User } from 'lucide-react'
import { authAPI } from '../lib/api'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authAPI.signup(email, password, name)
      if (response.user) {
        localStorage.setItem('cboms_user', JSON.stringify({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          unit: response.user.unit_id || 'N/A',
        }))

        navigate({ to: response.user.role === 'admin' ? '/admin' : '/dashboard' })
      } else {
        navigate({ to: '/' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="px-8 py-7 sm:px-10 bg-[#0f1e42] text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#c9a84c] text-[#0f1e42]">
              <Building2 size={22} />
            </div>
            <div>
              <div className="text-lg font-semibold">Register</div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-100">ONE SPATIAL ILOILO</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-200">
            Create your condominium management account to access bookings, residents, visitor logs, and support.
          </p>
        </div>

        <div className="px-8 py-8 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-900 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-900 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-900 outline-none transition"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm p-3 rounded-2xl bg-rose-50 text-rose-700 border border-rose-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed ${loading ? 'bg-slate-400' : 'bg-slate-900'}`}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate({ to: '/' })}
              className="font-semibold text-slate-900"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
