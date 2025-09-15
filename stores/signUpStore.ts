import { create } from 'zustand'
import { SignUpStore } from './types'

const useSignUpStore = create<SignUpStore>((set, get) => ({
  // State
  firstName: '',
  lastName: '',
  birthdate: '',
  email: '',
  password: '',
  isLoading: false,
  error: null,

  // Actions
  setFirstName: (firstName: string) => set({ firstName, error: null }),

  setLastName: (lastName: string) => set({ lastName, error: null }),

  setBirthdate: (birthdate: string) => set({ birthdate, error: null }),

  setEmail: (email: string) => set({ email, error: null }),

  setPassword: (password: string) => set({ password, error: null }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),

  isFormValid: () => {
    const { firstName, lastName, birthdate, email, password } = get()
    return firstName.trim() !== '' &&
           lastName.trim() !== '' &&
           birthdate !== '' &&
           email.trim() !== '' &&
           password.length >= 6
  },

  resetState: () => set({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    isLoading: false,
    error: null
  }),

  submitSignUp: async () => {
    const { firstName, lastName, birthdate, email, password, setLoading, setError, isFormValid } = get()

    if (!isFormValid()) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Form submitted:', { firstName, lastName, birthdate, email, password })

      // Handle success - could redirect user or show success message
      setLoading(false)
    } catch (error) {
      setError('Failed to create account. Please try again.')
      setLoading(false)
    }
  }
}))

export default useSignUpStore
