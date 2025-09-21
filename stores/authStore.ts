import { create } from 'zustand'
import type { User, AuthState } from '@/types/auth'

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
  submitEmailCheck: () => Promise<{ exists: boolean; isActive: boolean; role: string | null } | null>

  // General auth actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  resetForm: () => void
  isLoginFormValid: () => boolean
  isSignUpFormValid: () => boolean
  
  // Auth persistence
  initializeAuth: () => void
  validateToken: () => Promise<boolean>
  refreshUserData: () => Promise<boolean>
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
    const { email, password, setLoading, setError } = get()

    if (!get().isLoginFormValid()) {
      setError('Please enter a valid password')
      return
    }

    if (!email) {
      setError('Email is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Store user data and token
        const backendUser = result.data.user
        const user: User = {
          id: backendUser.id,
          email: backendUser.email,
          firstName: backendUser.firstName || backendUser.name || '',
          lastName: backendUser.lastName || '',
          birthdate: backendUser.dateOfBirth || undefined,
        }

        set({
          user,
          isLoggedIn: true,
          password: '',
          email: '', // Clear email from form
          error: null,
        })

        // Store token and user data in localStorage for future API calls
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', result.data.token)
          localStorage.setItem('authUser', JSON.stringify(user))
        }

        // Navigate to home page instead of forcing to property page
        window.location.href = '/'
      } else {
        // Handle 400/401 errors
        setError(result.message || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  },

  submitSignUp: async () => {
    const { firstName, lastName, email, signUpPassword, birthdate, setLoading, setError } = get()

    if (!get().isSignUpFormValid()) {
      setError('Please fill in all fields correctly')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: signUpPassword,
          firstName,
          lastName,
          birthdate,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Store user data and token
        const backendUser = result.data.user
        const user: User = {
          id: backendUser.id,
          email: backendUser.email,
          firstName: backendUser.firstName || backendUser.name || '',
          lastName: backendUser.lastName || '',
          birthdate: backendUser.dateOfBirth || birthdate,
        }

        set({
          user,
          isLoggedIn: true,
          firstName: '',
          lastName: '',
          email: '',
          signUpPassword: '',
          birthdate: '',
          error: null,
        })

        // Store token and user data in localStorage for future API calls
        if (typeof window !== 'undefined' && result.data.token) {
          localStorage.setItem('authToken', result.data.token)
          localStorage.setItem('authUser', JSON.stringify(user))
        }

        // Navigate to home page instead of forcing to property page
        window.location.href = '/'
      } else {
        // Handle errors
        setError(result.message || 'Sign up failed. Please try again.')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      setError('Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  },

  submitEmailCheck: async () => {
    const { email, validateEmail, setLoading, setError } = get()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        return result.data
      } else {
        setError(result.message || 'Email check failed. Please try again.')
        return null
      }
    } catch (error) {
      console.error('Email check error:', error)
      setError('Email check failed. Please try again.')
      return null
    } finally {
      setLoading(false)
    }
  },

  logout: () => {
    set({
      user: null,
      isLoggedIn: false,
      error: null,
      password: '',
      email: '',
      signUpPassword: '',
    })
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    }
  },

  resetForm: () => set({
    password: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    signUpPassword: '',
    error: null,
  }),

  // Initialize auth state from localStorage
  initializeAuth: () => {
    if (typeof window === 'undefined') return

    try {
      const storedToken = localStorage.getItem('authToken')
      const storedUser = localStorage.getItem('authUser')

      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser) as User
        set({
          user,
          isLoggedIn: true,
          error: null,
        })
        
        // Optionally validate token in background
        get().validateToken()
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      // Clear corrupted data
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    }
  },

  // Validate stored token and refresh user data with backend
  validateToken: async () => {
    if (typeof window === 'undefined') return false

    const token = localStorage.getItem('authToken')
    if (!token) return false

    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.success && result.data) {
          // Update user data with fresh data from backend
          const backendUser = result.data
          const user: User = {
            id: backendUser.id,
            email: backendUser.email,
            firstName: backendUser.firstName || backendUser.name || '',
            lastName: backendUser.lastName || '',
            birthdate: backendUser.dateOfBirth || undefined,
          }

          set({
            user,
            isLoggedIn: true,
            error: null,
          })

          // Update stored user data
          localStorage.setItem('authUser', JSON.stringify(user))
          return true
        }
      }
      
      // Token is invalid or response unsuccessful, clear auth state
      get().logout()
      return false
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  },

  // Refresh user data from backend
  refreshUserData: async () => {
    if (typeof window === 'undefined') return false

    const token = localStorage.getItem('authToken')
    if (!token) return false

    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.success && result.data) {
          // Update user data with fresh data from backend
          const backendUser = result.data
          const user: User = {
            id: backendUser.id,
            email: backendUser.email,
            firstName: backendUser.firstName || backendUser.name || '',
            lastName: backendUser.lastName || '',
            birthdate: backendUser.dateOfBirth || undefined,
          }

          set({
            user,
            isLoggedIn: true,
            error: null,
          })

          // Update stored user data
          localStorage.setItem('authUser', JSON.stringify(user))
          return true
        }
      }
      
      return false
    } catch (error) {
      console.error('Error refreshing user data:', error)
      return false
    }
  },
}))

export default useAuthStore
