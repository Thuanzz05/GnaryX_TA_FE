import type { User } from '@/types'
import { localData } from './localData'

const REMEMBER_EMAIL_KEY = 'gnarylex-remember-email'

export function getRememberedEmail(): string { return localStorage.getItem(REMEMBER_EMAIL_KEY) ?? '' }

export const authService = {
  async login(email: string, _password: string, rememberMe = false): Promise<User> {
    if (!email.trim()) throw new Error('Email is required')
    if (rememberMe) localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim())
    const user = { ...localData.getUser(), email: email.trim() }
    localData.setUser(user)
    return user
  },
  async register(data: { fullName: string; email: string; password: string }): Promise<User> {
    return this.login(data.email, data.password, true).then((user) => {
      const nextUser = { ...user, fullName: data.fullName.trim() }
      localData.setUser(nextUser)
      return nextUser
    })
  },
  async loginWithGoogle(): Promise<User> { return localData.getUser() },
  async forgotPassword(_email: string): Promise<void> { return },
  async getCurrentUser(): Promise<User> { return localData.getUser() },
  logout(): void { localData.setUser(localData.getUser()) },
}
