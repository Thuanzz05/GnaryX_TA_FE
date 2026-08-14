import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '@/utils/cn'
import { Label } from './Typography'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              'h-10 w-full rounded-[var(--radius-input)] border bg-surface-light px-3 text-sm text-text-primary',
              'placeholder:text-text-muted transition-colors duration-150',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:border-border-dark dark:bg-surface-card-dark dark:text-slate-100 dark:placeholder:text-slate-500',
              error
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
                : 'border-border',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-slate-400">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-caption text-error-600 dark:text-error-500" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-caption text-text-muted dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, helperText, error, fullWidth = true, className, id, required, ...props },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          className={cn(
            'min-h-24 w-full rounded-[var(--radius-input)] border bg-surface-light px-3 py-2 text-sm text-text-primary',
            'placeholder:text-text-muted transition-colors duration-150 resize-y',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'dark:border-border-dark dark:bg-surface-card-dark dark:text-slate-100',
            error ? 'border-error-500' : 'border-border',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-caption text-error-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-caption text-text-muted dark:text-slate-400">{helperText}</p>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  description?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const checkboxId =
      id ??
      (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary-600',
            'focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0',
            'dark:border-border-dark dark:bg-surface-card-dark',
            className,
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <Label htmlFor={checkboxId} className="cursor-pointer">
                {label}
              </Label>
            )}
            {description && (
              <p className="text-caption text-text-muted dark:text-slate-400">{description}</p>
            )}
          </div>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  options: { value: string; label: string }[]
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, helperText, error, options, fullWidth = true, className, id, required, ...props },
    ref,
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <Label htmlFor={selectId} required={required}>
            {label}
          </Label>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={!!error}
          className={cn(
            'h-10 w-full rounded-[var(--radius-input)] border bg-surface-light px-3 text-sm text-text-primary',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'dark:border-border-dark dark:bg-surface-card-dark dark:text-slate-100',
            error ? 'border-error-500' : 'border-border',
            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-caption text-error-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-caption text-text-muted dark:text-slate-400">{helperText}</p>
        )}
      </div>
    )
  },
)
Select.displayName = 'Select'
