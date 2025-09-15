export interface EmailCheckState {
  email: string
  isLoading: boolean
  error: string | null
  isEmailValid: boolean
}

export interface EmailCheckActions {
  setEmail: (email: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  validateEmail: (email: string) => boolean
  resetState: () => void
  submitEmail: () => Promise<void>
}

export type EmailCheckStore = EmailCheckState & EmailCheckActions
