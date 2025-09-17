import { create } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}