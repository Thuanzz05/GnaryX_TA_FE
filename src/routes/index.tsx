import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ToastProvider } from '@/components/common'

const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage'))

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted dark:bg-surface-dark">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  )
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: (
      <SuspenseWrapper>
        <DesignSystemPage />
      </SuspenseWrapper>
    ),
  },
])

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
