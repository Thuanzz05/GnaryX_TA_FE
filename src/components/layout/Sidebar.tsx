import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Logo } from '@/components/common/Logo'
import { UserAvatar } from '@/components/common/UserAvatar'
import {
  bottomNavItems,
  isNavActive,
  mainNavItems,
  type NavItem,
} from '@/constants/navigation'
import type { User } from '@/types'

interface SidebarProps {
  user: User
  mobileOpen?: boolean
  onMobileClose?: () => void
  collapsed?: boolean
}

function NavLink({
  item,
  pathname,
  onNavigate,
  collapsed,
}: {
  item: NavItem
  pathname: string
  onNavigate?: () => void
  collapsed?: boolean
}) {
  const active = isNavActive(pathname, item.href)
  const Icon = item.icon

  return (
    <Link
      to={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
          : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
        collapsed && 'justify-center px-2',
      )}
    >
      <Icon
        className={cn(
          'h-5 w-5 shrink-0',
          active
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-text-muted group-hover:text-text-secondary dark:text-slate-500 dark:group-hover:text-slate-300',
        )}
        aria-hidden="true"
      />
      {!collapsed && <span>{item.label}</span>}
      {active && !collapsed && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
      )}
    </Link>
  )
}

export function Sidebar({ user, mobileOpen = false, onMobileClose, collapsed = false }: SidebarProps) {
  const { pathname } = useLocation()
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!mobileOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileClose?.()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen, onMobileClose])

  const sidebarContent = (
    <aside
      ref={sidebarRef}
      className={cn(
        'flex h-full flex-col border-r border-border bg-surface-light dark:border-border-dark dark:bg-surface-card-dark',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      <div className={cn('border-b border-border px-4 py-5 dark:border-border-dark', collapsed && 'px-2')}>
        <Logo size={collapsed ? 'sm' : 'md'} showSubtitle={!collapsed} asLink />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onMobileClose}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="space-y-1 border-t border-border px-3 py-4 dark:border-border-dark">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onMobileClose}
            collapsed={collapsed}
          />
        ))}

        <Link
          to="/profile"
          onClick={onMobileClose}
          className={cn(
            'mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-muted dark:hover:bg-slate-800',
            collapsed && 'justify-center px-2',
          )}
        >
          <UserAvatar name={user.fullName} src={user.avatar} size="sm" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary dark:text-slate-100">
                {user.fullName}
              </p>
              <p className="truncate text-xs text-text-muted dark:text-slate-400">
                Level {user.level}
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex">{sidebarContent}</div>

      {/* Mobile / tablet overlay sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
