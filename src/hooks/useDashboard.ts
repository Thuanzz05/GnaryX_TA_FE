import { useCallback, useEffect, useState } from 'react'
import type { DashboardData } from '@/types'
import { progressService } from '@/services/progressService'

interface UseDashboardResult {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const dashboardData = await progressService.getDashboardData()
      setData(dashboardData)
    } catch {
      setError('Something went wrong while loading your dashboard.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  return { data, isLoading, error, refetch: fetchDashboard }
}
