import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Flame, BookOpen, Trophy, Target } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/common/Button'
import { Text } from '@/components/common/Typography'

interface Notification {
  id: string
  icon: React.ReactNode
  title: string
  description?: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    icon: <Flame className="h-4 w-4 text-warning-500" />,
    title: 'You completed your 7-day streak!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    icon: <BookOpen className="h-4 w-4 text-primary-500" />,
    title: '20 words are ready for review.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    icon: <Trophy className="h-4 w-4 text-accent-purple" />,
    title: 'New achievement unlocked!',
    description: 'Quiz Master',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    icon: <Target className="h-4 w-4 text-success-500" />,
    title: 'Daily goal completed!',
    description: '+120 XP earned today',
    time: 'Yesterday',
    read: true,
  },
]

export function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const containerRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

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

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative h-9 w-9 p-0"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-surface-light shadow-modal dark:border-border-dark dark:bg-surface-card-dark"
          role="menu"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-border-dark">
            <p className="text-sm font-semibold text-text-primary dark:text-slate-100">
              Notifications
            </p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Mark all read
              </button>
            )}
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={cn(
                  'border-b border-border px-4 py-3 last:border-0 dark:border-border-dark',
                  !notification.read && 'bg-primary-50/50 dark:bg-primary-900/10',
                )}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 shrink-0">{notification.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary dark:text-slate-100">
                      {notification.title}
                    </p>
                    {notification.description && (
                      <Text variant="caption" className="mt-0.5">
                        {notification.description}
                      </Text>
                    )}
                    <Text variant="caption" className="mt-1">
                      {notification.time}
                    </Text>
                  </div>
                  {!notification.read && (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-border px-4 py-2 dark:border-border-dark">
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="block py-1.5 text-center text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Notification settings
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
