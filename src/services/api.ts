import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('Missing refresh token')
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { token: refreshToken })
        const nextAccessToken = response.data.accessToken

        localStorage.setItem('accessToken', nextAccessToken)
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export async function apiFetch<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
  const response: AxiosResponse<T> = await api.request({ url: path, ...options })

  if (response.status === 204) {
    return undefined as T
  }

  return response.data
}

export { API_BASE_URL }
