import { NextRequest, NextResponse } from 'next/server'
import { forwardRequest, getAuthHeader, createErrorResponse } from '@/utils/apiForwarder'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate email in the request body
    if (!body.email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
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
      const response = await forwardRequest('/api/auth/check-email', {
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
    const email = body.email.toLowerCase()
    const mockExistingEmails = [
      'user@example.com',
      'john.doe@gmail.com',
      'admin@rentverse.com',
      'test@test.com',
    ]

    const exists = mockExistingEmails.includes(email)

    return NextResponse.json({
      success: true,
      data: {
        exists,
        isActive: exists,
        role: exists ? 'user' : null,
      },
    }, { status: 200 })

  } catch (error) {
    console.error('Error checking email:', error)
    return NextResponse.json(
      createErrorResponse('Failed to check email', error as Error),
      { status: 500 },
    )
  }
}
