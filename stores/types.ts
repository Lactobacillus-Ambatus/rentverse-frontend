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

export interface SignUpState {
  firstName: string
  lastName: string
  birthdate: string
  email: string
  password: string
  isLoading: boolean
  error: string | null
}

export interface SignUpActions {
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setBirthdate: (birthdate: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  isFormValid: () => boolean
  resetState: () => void
  submitSignUp: () => Promise<void>
}

export type SignUpStore = SignUpState & SignUpActions

export interface LogInState {
  password: string
  isLoading: boolean
  error: string | null
}

export interface LogInActions {
  setPassword: (password: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  isFormValid: () => boolean
  resetState: () => void
  submitLogIn: () => Promise<void>
}

export type LogInStore = LogInState & LogInActions
