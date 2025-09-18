import { NextRequest, NextResponse } from 'next/server'
import { forwardRequest, getAuthHeader, createErrorResponse, createCacheHeaders } from '@/utils/apiForwarder'

// GET /api/properties/featured - Get featured properties (most recently updated properties with pagination)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/api/properties/featured?${queryString}` : '/api/properties/featured'

    const response = await forwardRequest(endpoint, {
      method: 'GET',
      headers: getAuthHeader(request),
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: createCacheHeaders(600), // Cache for 10 minutes
    })
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    return NextResponse.json(
      createErrorResponse('Failed to fetch featured properties', error as Error),
      { status: 500 },
    )
  }
}
