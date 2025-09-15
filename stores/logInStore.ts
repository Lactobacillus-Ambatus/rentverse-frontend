import { create } from 'zustand'
import { LogInStore } from './types'

const useLogInStore = create<LogInStore>((set, get) => ({
  // State
  password: '',
  isLoading: false,
  error: null,

  // Actions
  setPassword: (password: string) => set({ password, error: null }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),

  isFormValid: () => {
    const { password } = get()
    return password.trim() !== '' && password.length >= 6
  },

  resetState: () => set({
    password: '',
    isLoading: false,
    error: null
  }),

  submitLogIn: async () => {
    const { password, setLoading, setError, isFormValid } = get()

    if (!isFormValid()) {
      setError('Please enter a valid password')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Login submitted:', { password })

      // Handle success - could redirect user or show success message
      setLoading(false)
    } catch (error) {
      setError('Failed to log in. Please check your password and try again.')
      setLoading(false)
    }
  }
}))

export default useLogInStore
