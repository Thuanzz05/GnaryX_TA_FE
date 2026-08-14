import {
  BarChart3,
  BookOpen,
  CircleHelp,
  GraduationCap,
  Heart,
  Layers,
  LayoutDashboard,
  RotateCcw,
  Settings,
  Sparkles,
  User,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  /** Show in mobile bottom navigation */
  mobilePrimary?: boolean
}

export const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, mobilePrimary: true },
  { label: 'Learn', href: '/learn', icon: GraduationCap, mobilePrimary: true },
  { label: 'Vocabulary', href: '/vocabulary', icon: BookOpen, mobilePrimary: true },
  { label: 'Flashcards', href: '/flashcards', icon: Layers },
  { label: 'Practice', href: '/practice', icon: Sparkles, mobilePrimary: true },
  { label: 'Review', href: '/review', icon: RotateCcw },
  { label: 'Progress', href: '/progress', icon: BarChart3, mobilePrimary: true },
  { label: 'Favorites', href: '/favorites', icon: Heart },
]

export const bottomNavItems: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help', href: '/help', icon: CircleHelp },
  { label: 'Profile', href: '/profile', icon: User },
]

export const mobileBottomNavItems = mainNavItems.filter((item) => item.mobilePrimary)

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(`${href}/`)
}
