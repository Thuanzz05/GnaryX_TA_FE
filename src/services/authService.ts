import type { User } from '@/types'
import { api } from './api'

const AUTH_USER_KEY = 'gnarylex-auth-user'
const AUTH_TOKEN_KEY = 'gnarylex-auth-token'
const REMEMBER_EMAIL_KEY = 'gnarylex-remember-email'
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'user'

function normalizeUser(raw: any): User | null {
  if (!raw || typeof raw !== 'object') return null

  return {
    id: raw.id || 'user-demo',
    fullName: raw.fullName || raw.name || raw.full_name || 'Learner',
    email: raw.email || '',
    avatar: raw.avatar,
    level: raw.level || 'A1',
    xp: Number(raw.xp || 0),
    levelNumber: Number(raw.levelNumber || raw.level_number || 1),
    streak: Number(raw.streak || 0),
    dailyGoal: Number(raw.dailyGoal || raw.daily_goal || 20),
    preferredTopics: Array.isArray(raw.preferredTopics) ? raw.preferredTopics : [],
  }
}

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY) || localStorage.getItem(AUTH_USER_KEY)
    if (!raw) return null
    return normalizeUser(JSON.parse(raw))
  } catch {
    return null
  }
}

function readStoredToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY) || null
}

function storeUser(user: User | null, accessToken?: string | null, refreshToken?: string | null) {
  if (user) {
    const normalizedUser = normalizeUser(user)
    if (normalizedUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser))
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser))
    }
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken)
    }
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    }
  } else {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}

export function getRememberedEmail(): string {
  return localStorage.getItem(REMEMBER_EMAIL_KEY) ?? ''
}

export const authService = {
  async login(email: string, password: string, rememberMe = false): Promise<User> {
    if (!email.trim() || !password) {
      throw new Error('Email and password are required')
    }

    const response = await api.post('/auth/login', {
      email: email.trim(),
      password,
    })

    if (rememberMe) {
      localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim())
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY)
    }

    const user = normalizeUser(response.data.user)
    const accessToken = response.data.accessToken as string
    const refreshToken = response.data.refreshToken as string
    if (!user) {
      throw new Error('Invalid user data received from server')
    }

    storeUser(user, accessToken, refreshToken)
    return user
  },

  async register(data: {
    fullName: string
    email: string
    password: string
  }): Promise<User> {
    const response = await api.post('/auth/register', {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      password: data.password,
    })

    const user = normalizeUser(response.data.user)
    if (user) {
      storeUser(user, response.data.accessToken, response.data.refreshToken)
      return user
    }

    return readStoredUser() as User
  },

  async loginWithGoogle(): Promise<User> {
    const user: User = {
      id: 'google-user',
      fullName: 'Google User',
      email: 'google@example.com',
      level: 'A2',
      xp: 400,
      levelNumber: 2,
      streak: 2,
      dailyGoal: 15,
      preferredTopics: ['Travel'],
    }

    storeUser(user, 'google-demo-token', 'google-demo-refresh-token')
    return user
  },

  async forgotPassword(_email: string): Promise<void> {
    return
  },

  async getCurrentUser(): Promise<User | null> {
    const token = readStoredToken()
    if (!token) {
      return readStoredUser()
    }

    try {
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const user = normalizeUser(response.data.user)
      if (user) {
        storeUser(user, token)
        return user
      }
    } catch {
      const storedUser = readStoredUser()
      if (storedUser) return storedUser
    }

    return readStoredUser()
  },

  logout(): void {
    storeUser(null, null, null)
    window.location.href = '/login'
  },
}
