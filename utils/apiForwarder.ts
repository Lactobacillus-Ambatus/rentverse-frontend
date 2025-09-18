// API forwarding utility for Next.js API routes

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export interface ForwardRequestOptions extends RequestInit {
  timeout?: number
  retries?: number
}

/**
 * Forward requests to backend API with error handling and retry logic
 */
export async function forwardRequest(
  endpoint: string,
  options: ForwardRequestOptions = {},
): Promise<Response> {
  const { timeout = 30000, retries = 0, ...fetchOptions } = options
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  const requestOptions: RequestInit = {
    ...fetchOptions,
    headers: defaultHeaders,
  }

  // Add timeout using AbortController
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  requestOptions.signal = controller.signal

  let lastError: Error
  let attempt = 0

  while (attempt <= retries) {
    try {
      const response = await fetch(url, requestOptions)
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      attempt++

      // Don't retry on timeout or if we've exhausted retries
      if (attempt > retries || error instanceof DOMException && error.name === 'AbortError') {
        break
      }

      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000))
    }
  }

  clearTimeout(timeoutId)
  throw lastError!
}

/**
 * Extract authorization header from Next.js request
 */
export function getAuthHeader(request: Request): Record<string, string> {
  const authHeader = request.headers.get('Authorization')
  return authHeader ? { Authorization: authHeader } : {}
}

/**
 * Create error response with consistent format
 */
export function createErrorResponse(
  message: string,
  error?: Error,
  status: number = 500,
) {
  return {
    success: false,
    message,
    error: error?.message || 'Unknown error',
    timestamp: new Date().toISOString(),
  }
}

/**
 * Create cache headers based on content type and TTL
 */
export function createCacheHeaders(
  maxAge: number,
  contentType?: string,
): Record<string, string> {
  const headers: Record<string, string> = {
    'Cache-Control': `public, max-age=${maxAge}`,
  }

  if (contentType) {
    headers['Content-Type'] = contentType
  }

  return headers
}
