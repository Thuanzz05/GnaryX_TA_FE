import type { User } from '@/types'
import { apiFetch } from './api'

const AUTH_USER_KEY = 'gnarylex-auth-user'
const AUTH_TOKEN_KEY = 'gnarylex-auth-token'
const REMEMBER_EMAIL_KEY = 'gnarylex-remember-email'

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

function readStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY) || null
}

function storeUser(user: User | null, token?: string | null) {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    if (token) localStorage.setItem(AUTH_TOKEN_KEY, token)
  } else {
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY)
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

    if (password.length < 8) {
      throw new Error('Invalid email or password')
    }

    try {
      const data = await apiFetch<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      })

      if (rememberMe) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim())
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY)
      }

      storeUser(data.user, data.token)
      return data.user
    } catch {
      const fallbackUser: User = {
        id: 'user-demo',
        fullName: email.split('@')[0] || 'Learner',
        email: email.trim(),
        level: 'B1',
        xp: 0,
        levelNumber: 1,
        streak: 0,
        dailyGoal: 20,
        preferredTopics: ['Business', 'Technology'],
      }

      if (rememberMe) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim())
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY)
      }

      storeUser(fallbackUser, 'demo-token')
      return fallbackUser
    }
  },

  async register(data: {
    fullName: string
    email: string
    password: string
  }): Promise<User> {
    try {
      const response = await apiFetch<{ token: string; user: User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          password: data.password,
        }),
      })

      storeUser(response.user, response.token)
      return response.user
    } catch {
      const fallbackUser: User = {
        id: 'user-demo',
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        level: 'B1',
        xp: 0,
        levelNumber: 1,
        streak: 0,
        dailyGoal: 20,
        preferredTopics: ['Business', 'Technology'],
      }

      storeUser(fallbackUser, 'demo-token')
      return fallbackUser
    }
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

    storeUser(user, 'google-demo-token')
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
      const data = await apiFetch<{ user: User }>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data?.user) {
        storeUser(data.user, token)
        return data.user
      }
    } catch {
      const storedUser = readStoredUser()
      if (storedUser) return storedUser
    }

    return readStoredUser()
  },

  logout(): void {
    storeUser(null, null)
  },
}
