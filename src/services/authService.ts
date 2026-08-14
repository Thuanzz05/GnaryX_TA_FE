import type { User } from '@/types'
import { MOCK_USER } from '@/services/userService'

const AUTH_USER_KEY = 'gnarylex-auth-user'
const REMEMBER_EMAIL_KEY = 'gnarylex-remember-email'

function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

function storeUser(user: User | null) {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_USER_KEY)
  }
}

export function getRememberedEmail(): string {
  return localStorage.getItem(REMEMBER_EMAIL_KEY) ?? ''
}

export const authService = {
  async login(email: string, password: string, rememberMe = false): Promise<User> {
    await delay()

    if (!email.trim() || !password) {
      throw new Error('Email and password are required')
    }

    if (password.length < 8) {
      throw new Error('Invalid email or password')
    }

    if (rememberMe) {
      localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim())
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY)
    }

    const user: User = {
      ...MOCK_USER,
      email: email.trim(),
    }

    storeUser(user)
    return user
  },

  async register(data: {
    fullName: string
    email: string
    password: string
  }): Promise<User> {
    await delay()

    const user: User = {
      ...MOCK_USER,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
    }

    storeUser(user)
    return user
  },

  async loginWithGoogle(): Promise<User> {
    await delay(600)
    storeUser(MOCK_USER)
    return MOCK_USER
  },

  async forgotPassword(_email: string): Promise<void> {
    await delay(1000)
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(300)
    return readStoredUser()
  },

  logout(): void {
    storeUser(null)
  },
}
