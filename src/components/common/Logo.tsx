import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BRAND } from '@/constants/brand'
import { cn } from '@/utils/cn'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showSubtitle?: boolean
  className?: string
  asLink?: boolean
}

const sizeStyles = {
  sm: { icon: 'h-8 w-8', iconInner: 'h-4 w-4', title: 'text-lg', subtitle: 'text-xs' },
  md: { icon: 'h-10 w-10', iconInner: 'h-5 w-5', title: 'text-xl', subtitle: 'text-xs' },
  lg: { icon: 'h-12 w-12', iconInner: 'h-6 w-6', title: 'text-2xl', subtitle: 'text-sm' },
}

export function Logo({
  size = 'md',
  showSubtitle = true,
  className,
  asLink = false,
}: LogoProps) {
  const styles = sizeStyles[size]

  const content = (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-card',
          styles.icon,
        )}
      >
        <BookOpen className={styles.iconInner} aria-hidden="true" />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            'font-bold tracking-tight text-text-primary dark:text-white',
            styles.title,
          )}
        >
          {BRAND.name}
        </span>
        {showSubtitle && (
          <span
            className={cn(
              'font-medium text-text-muted dark:text-slate-400',
              styles.subtitle,
            )}
          >
            {BRAND.tagline}
          </span>
        )}
      </div>
    </div>
  )

  if (asLink) {
    return (
      <Link to="/dashboard" aria-label={`${BRAND.name} home`}>
        {content}
      </Link>
    )
  }

  return content
}
