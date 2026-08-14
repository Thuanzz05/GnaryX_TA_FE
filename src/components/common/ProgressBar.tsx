import { cn } from '@/utils/cn'

export interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  color?: 'primary' | 'success' | 'warning'
  variant?: 'default' | 'inverse'
  className?: string
  label?: string
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
}

const colorStyles = {
  primary: 'bg-primary-500 dark:bg-primary-400',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  color = 'primary',
  variant = 'default',
  className,
  label,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const isInverse = variant === 'inverse'

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-body-sm">
          {label && (
            <span
              className={cn(
                isInverse ? 'text-white/80' : 'text-text-secondary dark:text-slate-400',
              )}
            >
              {label}
            </span>
          )}
          {showLabel && (
            <span
              className={cn(
                'font-medium',
                isInverse ? 'text-white' : 'text-text-primary dark:text-slate-200',
              )}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full',
          isInverse ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700',
          sizeStyles[size],
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Progress'}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            isInverse ? 'bg-white' : colorStyles[color],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
