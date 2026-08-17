import { Menu, Moon, Search, Sun } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { NotificationDropdown } from './NotificationDropdown'
import { GlobalSearch } from './GlobalSearch'
import { UserMenu } from './UserMenu'
import type { User } from '@/types'

interface HeaderProps {
  user: User
  title?: string
  onMenuClick: () => void
  onSearchClick: () => void
  isDark: boolean
  onToggleTheme: () => void
}

export function Header({
  user,
  title,
  onMenuClick,
  onSearchClick,
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
        {/* Desktop search */}
        <div className="relative hidden max-w-md flex-1 sm:block">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-1">
          {/* Mobile search trigger */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 sm:hidden"
            aria-label="Search"
            onClick={onSearchClick}
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

          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}
