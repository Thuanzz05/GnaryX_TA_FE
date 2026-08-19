import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react'
import { cn } from '@/utils/cn'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastData {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  toasts: ToastData[]
  toast: (data: Omit<ToastData, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const styleMap = {
  success: 'border-success-500/60',
  error: 'border-error-500/60',
  warning: 'border-warning-500/60',
  info: 'border-primary-500/60',
}

const iconColorMap = {
  success: 'text-success-600 dark:text-success-500',
  error: 'text-error-600 dark:text-error-500',
  warning: 'text-warning-600 dark:text-warning-500',
  info: 'text-primary-600 dark:text-primary-400',
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData
  onDismiss: (id: string) => void
}) {
  const Icon = iconMap[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-card border p-4 shadow-xl',
        'bg-white dark:bg-slate-900',
        styleMap[toast.type],
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconColorMap[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary dark:text-slate-100">
          {toast.title}
        </p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-text-secondary dark:text-slate-400">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded p-0.5 text-text-muted transition-colors hover:text-text-primary dark:hover:text-white"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (data: Omit<ToastData, 'id'>) => {
      const id = crypto.randomUUID()
      const duration = data.duration ?? 4000

      setToasts((prev) => [...prev, { ...data, id }])

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration)
      }
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div
        className="pointer-events-none fixed right-4 top-4 z-100 flex flex-col gap-2"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
