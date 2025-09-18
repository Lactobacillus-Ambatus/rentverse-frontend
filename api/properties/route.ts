import { NextRequest, NextResponse } from 'next/server'
import type { PropertyCreateRequest } from '@/types'
import { forwardRequest, getAuthHeader, createErrorResponse, createCacheHeaders } from '@/utils/apiForwarder'

// GET /api/properties - Get all properties with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/api/properties?${queryString}` : '/api/properties'

    const response = await forwardRequest(endpoint, {
      method: 'GET',
      headers: getAuthHeader(request),
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: createCacheHeaders(300), // Cache for 5 minutes
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      createErrorResponse('Failed to fetch properties', error as Error),
      { status: 500 },
    )
  }
}

// POST /api/properties - Create a new property (Landlord/Admin only)
export async function POST(request: NextRequest) {
  try {
    const body: PropertyCreateRequest = await request.json()

    const response = await forwardRequest('/api/properties', {
      method: 'POST',
      headers: {
        ...getAuthHeader(request),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      createErrorResponse('Failed to create property', error as Error),
      { status: 500 },
    )
  }
}
