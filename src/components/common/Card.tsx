import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type CardVariant = 'default' | 'elevated' | 'bordered'

const variantStyles: Record<CardVariant, string> = {
  default:
    'bg-surface-light border border-border shadow-card dark:bg-surface-card-dark dark:border-border-dark',
  elevated:
    'bg-surface-light shadow-card-hover dark:bg-surface-card-dark dark:shadow-none dark:border dark:border-border-dark',
  bordered:
    'bg-surface-light border-2 border-border dark:bg-surface-card-dark dark:border-border-dark',
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hoverable = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-card)]',
        variantStyles[variant],
        paddingStyles[padding],
        hoverable &&
          'transition-shadow duration-200 hover:shadow-card-hover cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
Card.displayName = 'Card'

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mb-4 flex flex-col gap-1.5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-heading-3 text-text-primary dark:text-slate-100',
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-body-sm text-text-secondary dark:text-slate-400', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-4 flex items-center gap-3 border-t border-border pt-4 dark:border-border-dark',
      className,
    )}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'
