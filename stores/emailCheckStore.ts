import { create } from 'zustand'
import { EmailCheckStore } from './types'

const useEmailCheckStore = create<EmailCheckStore>((set, get) => ({
  // State
  email: '',
  isLoading: false,
  error: null,
  isEmailValid: false,

  // Actions
  setEmail: (email: string) => {
    const isValid = get().validateEmail(email)
    set({
      email,
      isEmailValid: isValid,
      error: null,
    })
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),

  validateEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  resetState: () => set({
    email: '',
    isLoading: false,
    error: null,
    isEmailValid: false,
  }),

  submitEmail: async () => {
    const { email, validateEmail, setLoading, setError } = get()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Here you would make your actual API call
      console.log('Email submitted:', email)

      // Handle success
      setLoading(false)
    } catch (error) {
      setError('Failed to submit email. Please try again.')
      setLoading(false)
    }
  },
}))

export default useEmailCheckStore
