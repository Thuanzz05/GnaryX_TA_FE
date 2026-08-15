import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Flame, BookOpen, Trophy, Target } from 'lucide-react'
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
          className="absolute right-[-1rem] sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-[360px] bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden origin-top-right dark:bg-surface-card-dark dark:border-border-dark"
          role="menu"
        >
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <p className="font-bold text-gray-900 text-base sm:text-lg">Notifications</p>
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 sm:p-4 border-b border-gray-50 hover:bg-gray-50 flex items-start space-x-3 cursor-pointer transition-colors">
                <div className="mt-0.5 shrink-0">{notification.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-tight mb-1">{notification.title}</p>
                  {notification.description && (
                    <Text variant="caption" className="text-xs text-gray-500">{notification.description}</Text>
                  )}
                  <Text variant="caption" className="text-xs text-gray-500 mt-1">{notification.time}</Text>
                </div>
                {!notification.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-500" />}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 px-4 py-2">
            <Link to="/settings" onClick={() => setOpen(false)} className="block py-1.5 text-center text-xs font-medium text-indigo-600 hover:text-indigo-700">
              Notification settings
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
