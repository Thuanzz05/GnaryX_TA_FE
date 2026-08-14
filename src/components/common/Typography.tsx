import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type HeadingLevel = 'display' | 'h1' | 'h2' | 'h3' | 'h4'

const headingStyles: Record<HeadingLevel, string> = {
  display: 'text-display',
  h1: 'text-heading-1',
  h2: 'text-heading-2',
  h3: 'text-heading-3',
  h4: 'text-heading-4',
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 'h2', className, children, ...props }, ref) => {
    const classNames = cn(
      headingStyles[level],
      'text-text-primary dark:text-text-inverse',
      className,
    )

    switch (level) {
      case 'display':
      case 'h1':
        return (
          <h1 ref={ref} className={classNames} {...props}>
            {children}
          </h1>
        )
      case 'h2':
        return (
          <h2 ref={ref} className={classNames} {...props}>
            {children}
          </h2>
        )
      case 'h3':
        return (
          <h3 ref={ref} className={classNames} {...props}>
            {children}
          </h3>
        )
      case 'h4':
        return (
          <h4 ref={ref} className={classNames} {...props}>
            {children}
          </h4>
        )
    }
  },
)
Heading.displayName = 'Heading'

type TextVariant = 'body' | 'body-sm' | 'caption' | 'muted'

const textStyles: Record<TextVariant, string> = {
  body: 'text-body text-text-primary dark:text-slate-200',
  'body-sm': 'text-body-sm text-text-secondary dark:text-slate-300',
  caption: 'text-caption text-text-muted dark:text-slate-400',
  muted: 'text-body-sm text-text-muted dark:text-slate-400',
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant
  as?: 'p' | 'span' | 'div'
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = 'body', as: Component = 'p', className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(textStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  ),
)
Text.displayName = 'Text'

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  required?: boolean
  htmlFor?: string
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-body-sm font-medium text-text-primary dark:text-slate-200',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-error-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  ),
)
Label.displayName = 'Label'
