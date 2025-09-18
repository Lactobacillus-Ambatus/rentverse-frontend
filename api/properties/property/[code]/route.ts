import { NextRequest, NextResponse } from 'next/server'
import { forwardRequest, getAuthHeader, createErrorResponse, createCacheHeaders } from '@/utils/apiForwarder'

// GET /api/properties/property/{code} - Get property by code/slug (public access)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const { code } = await params

    const response = await forwardRequest(`/api/properties/property/${code}`, {
      method: 'GET',
      headers: getAuthHeader(request),
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: createCacheHeaders(1800), // Cache for 30 minutes
    })
  } catch (error) {
    console.error('Error fetching property by code:', error)
    return NextResponse.json(
      createErrorResponse('Failed to fetch property', error as Error),
      { status: 500 },
    )
  }
}
