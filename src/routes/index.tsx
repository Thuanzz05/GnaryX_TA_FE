import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ToastProvider } from '@/components/common'
import { AppLayout } from '@/components/layout'
import { MOCK_USER } from '@/services/userService'

const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const LearnPage = lazy(() => import('@/pages/learn/LearnPage'))
const VocabularyPage = lazy(() => import('@/pages/vocabulary/VocabularyPage'))
const FlashcardsPage = lazy(() => import('@/pages/flashcards/FlashcardsPage'))
const PracticePage = lazy(() => import('@/pages/practice/PracticePage'))
const ReviewPage = lazy(() => import('@/pages/review/ReviewPage'))
const ProgressPage = lazy(() => import('@/pages/progress/ProgressPage'))
const FavoritesPage = lazy(() => import('@/pages/favorites/FavoritesPage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
const HelpPage = lazy(() => import('@/pages/help/HelpPage'))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  )
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function LayoutRoot() {
  return <AppLayout user={MOCK_USER} />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <LayoutRoot />,
    children: [
      {
        path: '/dashboard',
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/learn',
        element: (
          <SuspenseWrapper>
            <LearnPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/vocabulary',
        element: (
          <SuspenseWrapper>
            <VocabularyPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/flashcards',
        element: (
          <SuspenseWrapper>
            <FlashcardsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/practice',
        element: (
          <SuspenseWrapper>
            <PracticePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/review',
        element: (
          <SuspenseWrapper>
            <ReviewPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/progress',
        element: (
          <SuspenseWrapper>
            <ProgressPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/favorites',
        element: (
          <SuspenseWrapper>
            <FavoritesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/profile',
        element: (
          <SuspenseWrapper>
            <ProfilePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/settings',
        element: (
          <SuspenseWrapper>
            <SettingsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/help',
        element: (
          <SuspenseWrapper>
            <HelpPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/design-system',
        element: (
          <SuspenseWrapper>
            <DesignSystemPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
