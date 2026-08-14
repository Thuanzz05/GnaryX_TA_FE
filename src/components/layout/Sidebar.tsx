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
        'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[0.8125rem] font-medium transition-all',
        'duration-[var(--dur-short)]',
        active
          ? 'bg-accent-subtle text-accent'
          : 'text-ink-2 hover:bg-paper-3 hover:text-ink',
        collapsed && 'justify-center px-2',
      )}
    >
      {/* Active indicator — left border accent */}
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <Icon
        className={cn(
          'h-[18px] w-[18px] shrink-0 transition-colors',
          active
            ? 'text-accent'
            : 'text-ink-3 group-hover:text-ink-2',
        )}
        aria-hidden="true"
      />
      {!collapsed && <span>{item.label}</span>}
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
        'flex h-full flex-col bg-sidebar border-r border-rule',
        collapsed ? 'w-[68px]' : 'w-[260px]',
      )}
    >
      {/* Logo area — tighter, cleaner */}
      <div className={cn(
        'flex items-center border-b border-rule px-5 py-4',
        collapsed && 'justify-center px-2',
      )}>
        <Logo size={collapsed ? 'sm' : 'md'} showSubtitle={!collapsed} asLink />
      </div>

      {/* Main navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3" aria-label="Main navigation">
        <p className={cn(
          'mb-2 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-3',
          collapsed && 'sr-only',
        )}>
          Menu
        </p>
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

      {/* Bottom section */}
      <div className="border-t border-rule px-3 py-3">
        <p className={cn(
          'mb-2 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-3',
          collapsed && 'sr-only',
        )}>
          Account
        </p>
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onMobileClose}
            collapsed={collapsed}
          />
        ))}

        {/* User profile link */}
        <Link
          to="/profile"
          onClick={onMobileClose}
          className={cn(
            'mt-3 flex items-center gap-3 rounded-lg border border-rule px-3 py-2.5 transition-colors',
            'hover:bg-paper-3',
            collapsed && 'justify-center border-0 px-2',
          )}
        >
          <UserAvatar name={user.fullName} src={user.avatar} size="sm" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-semibold text-ink">
                {user.fullName}
              </p>
              <p className="truncate text-[0.6875rem] text-ink-3">
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
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] lg:hidden"
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
