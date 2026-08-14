import { Link } from 'react-router-dom'
import { Menu, Moon, Sun, Search } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { UserAvatar } from '@/components/common/UserAvatar'
import { NotificationDropdown } from './NotificationDropdown'
import { GlobalSearch } from './GlobalSearch'
import { cn } from '@/utils/cn'
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
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-rule bg-paper/95 px-4 backdrop-blur-sm lg:px-6">
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 lg:hidden text-ink-2 hover:text-ink hover:bg-paper-3"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {title && (
        <h1 className="hidden text-lg font-semibold text-ink sm:block">
          {title}
        </h1>
      )}

      <div className="flex flex-1 items-center justify-end gap-2 sm:justify-between sm:gap-4">
        <div className="relative hidden max-w-md flex-1 sm:block">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 sm:hidden text-ink-2 hover:text-ink hover:bg-paper-3"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <NotificationDropdown />

          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-ink-2 hover:text-ink hover:bg-paper-3"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link
            to="/profile"
            className="ml-1 rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            aria-label="View profile"
          >
            <UserAvatar name={user.fullName} src={user.avatar} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  )
}
