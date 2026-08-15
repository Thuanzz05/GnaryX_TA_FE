import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { MobileSearchSheet } from './MobileSearchSheet'
import { bottomNavItems, mainNavItems } from '@/constants/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'

const pageTitles: Record<string, string> = {
  '/help': 'Help',
  '/design-system': 'Design System',
}

function getPageTitle(pathname: string): string | undefined {
  if (pageTitles[pathname]) return pageTitles[pathname]

  const allItems = [...mainNavItems, ...bottomNavItems]
  const match = allItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  )
  return match?.label
}

export function AppLayout() {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  if (!user) return null

  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname])

  return (
    <div className="min-h-screen bg-surface-muted dark:bg-surface-dark">
      <Sidebar
        user={user}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <Header
          user={user}
          title={pageTitle}
          onMenuClick={() => setSidebarOpen(true)}
          onSearchClick={() => setSearchOpen(true)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        <main className="px-4 py-6 pb-24 lg:px-6 lg:pb-6">
          <Outlet />
        </main>
      </div>

      <MobileNav onMoreClick={() => setSidebarOpen(true)} />
      <MobileSearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
