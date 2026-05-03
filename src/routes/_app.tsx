import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { Sidebar } from '@/components/Sidebar'

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('cboms_user')
      if (!user) throw redirect({ to: '/' })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  const navigate = useNavigate()

  let user = { name: 'User', role: 'resident', unit: 'N/A' }
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem('cboms_user')
    if (s) user = JSON.parse(s)
  }

  const handleLogout = () => {
    localStorage.removeItem('cboms_user')
    navigate({ to: '/' })
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#eef1f8' }}>
      <Sidebar
        role={user.role as 'resident' | 'admin'}
        userName={user.name}
        userUnit={user.unit}
        onLogout={handleLogout}
      />
      <main className="flex-1 lg:ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
