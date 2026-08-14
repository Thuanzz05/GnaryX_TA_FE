import { Link } from 'react-router-dom'
import { Menu, Moon, Search, Sun } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { UserAvatar } from '@/components/common/UserAvatar'
import { NotificationDropdown } from './NotificationDropdown'
import type { User } from '@/types'

interface HeaderProps {
  user: User
  title?: string
  onMenuClick: () => void
  isDark: boolean
  onToggleTheme: () => void
}

export function Header({
  user,
  title,
  onMenuClick,
  isDark,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-surface-light/95 px-4 backdrop-blur-sm dark:border-border-dark dark:bg-surface-card-dark/95 lg:px-6">
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {title && (
        <h1 className="hidden text-lg font-semibold text-text-primary dark:text-slate-100 sm:block">
          {title}
        </h1>
      )}

      <div className="flex flex-1 items-center justify-end gap-2 sm:justify-between sm:gap-4">
        <div className="relative hidden max-w-md flex-1 sm:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search vocabulary..."
            className="h-9 w-full rounded-lg border border-border bg-surface-muted pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary-500 focus:bg-surface-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-border-dark dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-primary-400 dark:focus:bg-slate-800"
            aria-label="Search vocabulary"
          />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 sm:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <NotificationDropdown />

          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link
            to="/profile"
            className="ml-1 rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            aria-label="View profile"
          >
            <UserAvatar name={user.fullName} src={user.avatar} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  )
}
