import { NextRequest, NextResponse } from 'next/server'
import { forwardRequest, getAuthHeader, createErrorResponse, createCacheHeaders } from '@/utils/apiForwarder'

// GET /properties/{id} - Get property by ID (alternative endpoint)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const response = await forwardRequest(`/properties/${id}`, {
      method: 'GET',
      headers: getAuthHeader(request),
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: createCacheHeaders(1800), // Cache for 30 minutes
    })
  } catch (error) {
    console.error('Error fetching property by ID:', error)
    return NextResponse.json(
      createErrorResponse('Failed to fetch property', error as Error),
      { status: 500 },
    )
  }
}
