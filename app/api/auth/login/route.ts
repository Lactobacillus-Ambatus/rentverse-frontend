import { NextRequest, NextResponse } from 'next/server'
import { forwardRequest, getAuthHeader, createErrorResponse } from '@/utils/apiForwarder'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 },
      )
    }

    try {
      // Try to forward to backend first
      const response = await forwardRequest('/api/auth/login', {
        method: 'POST',
        headers: {
          ...getAuthHeader(request),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      // Check if response is actually JSON
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
      }
    } catch (backendError) {
      console.log('Backend unavailable, using mock data for development')
    }

    // Fallback: Mock response for development
    const { email, password } = body

    // Mock credentials for testing
    const mockCredentials = [
      { email: 'user@example.com', password: 'password123' },
      { email: 'john.doe@gmail.com', password: 'password123' },
      { email: 'admin@rentverse.com', password: 'admin123' },
      { email: 'test@test.com', password: 'test123' },
    ]

    const validCredentials = mockCredentials.find(
      (cred) => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password,
    )

    if (validCredentials) {
      // Return successful login response in the format you specified
      return NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: '12345',
              email: validCredentials.email,
              name: 'John Doe',
              role: 'user',
            },
            token: 'mock-jwt-token-' + Date.now(),
          },
        },
        { status: 200 },
      )
    } else {
      // Return error for invalid credentials
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json(
      createErrorResponse('Failed to login', error as Error),
      { status: 500 },
    )
  }
}
