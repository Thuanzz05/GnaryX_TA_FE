import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import { UserAvatar } from '@/components/common/UserAvatar'
import { useAuth } from '@/hooks/useAuth'
import type { User } from '@/types'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/login', { replace: true })
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        aria-label="User menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <UserAvatar name={user.fullName} src={user.avatar} size="sm" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-white shadow-xl dark:border-border-dark dark:bg-surface-card-dark z-50">
          {/* User info */}
          <div className="border-b border-border px-4 py-3 dark:border-border-dark">
            <p className="font-semibold text-text-primary dark:text-slate-100">{user.fullName}</p>
            <p className="text-sm text-text-muted dark:text-slate-400">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-text-primary hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <UserIcon className="h-4 w-4" />
              <span>View Profile</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-text-primary hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>

            <div className="border-t border-border my-2 dark:border-border-dark" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-slate-800 transition-colors font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
