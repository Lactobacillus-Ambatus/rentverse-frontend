// Central export point for all application types

// Authentication types
export type {
  User,
  AuthState,
  LoginFormData,
  SignUpFormData,
  EmailCheckData,
} from './auth'

// Property types
export type {
  PropertyBase,
  PropertiesState,
  PropertyType,
  SearchFilters,
} from './property'

// Search box types
export type {
  SearchBoxState,
  LocationOption,
  PropertyTypeOption,
  DurationConfig,
  SearchFormData,
  SearchBoxType,
} from './searchbox'

// Location types
export type {
  Location,
  PopularLocation,
  Region,
  MapLocation,
  LocationBaseType,
} from './location'

// Common utility types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}
