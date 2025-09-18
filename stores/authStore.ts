import { create } from 'zustand'
import type { User, AuthState } from '../types/auth'

interface AuthActions {
  // Login functionality
  setPassword: (password: string) => void
  submitLogIn: () => Promise<void>

  // Signup functionality
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setBirthdate: (birthdate: string) => void
  setEmail: (email: string) => void
  setSignUpPassword: (password: string) => void
  submitSignUp: () => Promise<void>

  // Email check functionality
  validateEmail: (email: string) => boolean
  submitEmailCheck: () => Promise<void>

  // General auth actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  resetForm: () => void
  isLoginFormValid: () => boolean
  isSignUpFormValid: () => boolean
}

interface AuthFormState {
  password: string
  firstName: string
  lastName: string
  birthdate: string
  email: string
  signUpPassword: string
}

type AuthStore = AuthState & AuthFormState & AuthActions

const useAuthStore = create<AuthStore>((set, get) => ({
  // Auth state
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  // Form state
  password: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  email: '',
  signUpPassword: '',

  // Actions
  setPassword: (password: string) => set({ password }),
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
  setBirthdate: (birthdate: string) => set({ birthdate }),
  setEmail: (email: string) => set({ email }),
  setSignUpPassword: (signUpPassword: string) => set({ signUpPassword }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),

  validateEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  isLoginFormValid: () => {
    const { password } = get()
    return password.length >= 6
  },

  isSignUpFormValid: () => {
    const { firstName, lastName, email, signUpPassword, birthdate } = get()
    const { validateEmail } = get()
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      validateEmail(email) &&
      signUpPassword.length >= 6 &&
      birthdate.length > 0
    )
  },

  submitLogIn: async () => {
    const { setLoading, setError } = get()

    if (!get().isLoginFormValid()) {
      setError('Please enter a valid password')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }

      set({
        user: mockUser,
        isLoggedIn: true,
        password: '',
      })
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  },

  submitSignUp: async () => {
    const { firstName, lastName, email, birthdate, setLoading, setError } = get()

    if (!get().isSignUpFormValid()) {
      setError('Please fill in all fields correctly')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        birthdate,
      }

      set({
        user: newUser,
        isLoggedIn: true,
        firstName: '',
        lastName: '',
        email: '',
        signUpPassword: '',
        birthdate: '',
      })
    } catch {
      setError('Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  },

  submitEmailCheck: async () => {
    const { email, validateEmail, setLoading, setError } = get()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      console.log('Email checked:', email)
    } catch {
      setError('Email check failed. Please try again.')
    } finally {
      setLoading(false)
    }
  },

  logout: () => set({
    user: null,
    isLoggedIn: false,
    error: null,
  }),

  resetForm: () => set({
    password: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    signUpPassword: '',
    error: null,
  }),
}))

export default useAuthStore
