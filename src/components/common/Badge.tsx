import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline'

type BadgeSize = 'sm' | 'md'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300',
  secondary: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  success: 'bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-500',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-500',
  error: 'bg-error-100 text-error-700 dark:bg-error-900/40 dark:text-error-500',
  outline:
    'border border-border bg-transparent text-text-secondary dark:border-border-dark dark:text-slate-300',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-badge font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-success-500',
            variant === 'warning' && 'bg-warning-500',
            variant === 'error' && 'bg-error-500',
            variant === 'primary' && 'bg-primary-500',
            variant === 'default' && 'bg-slate-400',
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  ),
)
Badge.displayName = 'Badge'
