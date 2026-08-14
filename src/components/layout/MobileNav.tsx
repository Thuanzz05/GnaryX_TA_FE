import { Link, useLocation } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '@/utils/cn'
import { isNavActive, mobileBottomNavItems } from '@/constants/navigation'

interface MobileNavProps {
  onMoreClick: () => void
}

export function MobileNav({ onMoreClick }: MobileNavProps) {
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface-light/95 backdrop-blur-sm dark:border-border-dark dark:bg-surface-card-dark/95 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {mobileBottomNavItems.map((item) => {
          const active = isNavActive(pathname, item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-medium transition-colors',
                active
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-text-muted hover:text-text-secondary dark:text-slate-500 dark:hover:text-slate-300',
              )}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}

        <button
          type="button"
          onClick={onMoreClick}
          className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-medium text-text-muted transition-colors hover:text-text-secondary dark:text-slate-500 dark:hover:text-slate-300"
          aria-label="More navigation options"
        >
          <MoreHorizontal className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>More</span>
        </button>
      </div>
    </nav>
  )
}
