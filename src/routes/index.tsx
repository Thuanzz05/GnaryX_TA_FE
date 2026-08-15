import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ToastProvider } from '@/components/common'
import { AuthLayout, AppLayout } from '@/components/layout'
import { AuthProvider } from '@/hooks/useAuth'
import { GuestRoute, ProtectedRoute } from './guards'

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const LearnPage = lazy(() => import('@/pages/learn/LearnPage'))
const CourseDetailPage = lazy(() => import('@/pages/learn/CourseDetailPage'))
const LessonDetailPage = lazy(() => import('@/pages/learn/LessonDetailPage'))
const VocabularyPage = lazy(() => import('@/pages/vocabulary/VocabularyPage'))
const WordDetailPage = lazy(() => import('@/pages/vocabulary/WordDetailPage'))
const FlashcardsPage = lazy(() => import('@/pages/flashcards/FlashcardsPage'))
const PracticePage = lazy(() => import('@/pages/practice/PracticePage'))
const QuizPage = lazy(() => import('@/pages/quiz/QuizPage'))
const QuizResultPage = lazy(() => import('@/pages/quiz/QuizResultPage'))
const ReviewPage = lazy(() => import('@/pages/review/ReviewPage'))
const ProgressPage = lazy(() => import('@/pages/progress/ProgressPage'))
const FavoritesPage = lazy(() => import('@/pages/favorites/FavoritesPage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
const HelpPage = lazy(() => import('@/pages/help/HelpPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

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
  return <AppLayout />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: (
              <SuspenseWrapper>
                <LoginPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/register',
            element: (
              <SuspenseWrapper>
                <RegisterPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/forgot-password',
            element: (
              <SuspenseWrapper>
                <ForgotPasswordPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
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
            path: '/learn/:courseId',
            element: (
              <SuspenseWrapper>
                <CourseDetailPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/learn/:courseId/:lessonId',
            element: (
              <SuspenseWrapper>
                <LessonDetailPage />
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
            path: '/vocabulary/:wordId',
            element: (
              <SuspenseWrapper>
                <WordDetailPage />
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
            path: '/quiz',
            element: (
              <SuspenseWrapper>
                <QuizPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/quiz/result',
            element: (
              <SuspenseWrapper>
                <QuizResultPage />
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
    ],
  },
  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
])

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  )
}
