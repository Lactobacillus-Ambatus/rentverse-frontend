// Core user and authentication types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  birthdate?: string
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
}

// Authentication form data types
export interface LoginFormData {
  password: string
}

export interface SignUpFormData {
  firstName: string
  lastName: string
  birthdate: string
  email: string
  password: string
}

export interface EmailCheckData {
  email: string
}
