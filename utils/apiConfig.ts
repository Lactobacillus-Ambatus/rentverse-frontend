// API Configuration utility
// Centralized API base URL management

/**
 * Get the API base URL from environment variables
 * Falls back to production URL if not set
 */
export const getApiBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rentverse-be.jokoyuliyanto.my.id'
  
  // Remove trailing slash if present
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

/**
 * Get the full API URL with /api path
 */
export const getApiUrl = (): string => {
  return `${getApiBaseUrl()}/api`
}

/**
 * Create a full API endpoint URL
 * @param endpoint - The API endpoint (e.g., 'properties', 'bookings/123')
 */
export const createApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return `${getApiUrl()}/${cleanEndpoint}`
}

// Export constants for convenience
export const API_BASE_URL = getApiBaseUrl()
export const API_URL = getApiUrl()