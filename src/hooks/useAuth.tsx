import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from '@/types'
import { authService } from '@/services/authService'

const DEMO_USER: User = {
  id: 'local-demo-user',
  fullName: 'Local Learner',
  email: 'demo@gnarylex.local',
  level: 'A2',
  xp: 400,
  levelNumber: 2,
  streak: 2,
  dailyGoal: 15,
  preferredTopics: ['Travel'],
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  register: (data: {
    fullName: string
    email: string
    password: string
  }) => Promise<void>
  loginWithGoogle: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(DEMO_USER)
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string, rememberMe = false) => {
    const loggedInUser = await authService.login(email, password, rememberMe)
    setUser(loggedInUser)
  }, [])

  const register = useCallback(
    async (data: { fullName: string; email: string; password: string }) => {
      const newUser = await authService.register(data)
      setUser(newUser)
    },
    [],
  )

  const loginWithGoogle = useCallback(async () => {
    const loggedInUser = await authService.loginWithGoogle()
    setUser(loggedInUser)
  }, [])

  const forgotPassword = useCallback(async (email: string) => {
    await authService.forgotPassword(email)
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(DEMO_USER)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      loginWithGoogle,
      forgotPassword,
      logout,
    }),
    [user, isLoading, login, register, loginWithGoogle, forgotPassword, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
