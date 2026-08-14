import { cn } from '@/utils/cn'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface UserAvatarProps {
  name?: string
  user?: { fullName?: string; avatar?: string } | null
  src?: string
  size?: AvatarSize
  className?: string
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-20 w-20 text-2xl',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function UserAvatar({ name, user, src, size = 'md', className }: UserAvatarProps) {
  const resolvedName = name ?? user?.fullName ?? ''
  const resolvedSrc = src ?? user?.avatar
  if (resolvedSrc) {
    return (
      <img
        src={resolvedSrc}
        alt={resolvedName}
        className={cn(
          'shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-slate-800',
          sizeStyles[size],
          className,
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700 ring-2 ring-white dark:bg-primary-900/50 dark:text-primary-300 dark:ring-slate-800',
        sizeStyles[size],
        className,
      )}
      aria-hidden={!resolvedName}
    >
      {getInitials(resolvedName)}
    </div>
  )
}
