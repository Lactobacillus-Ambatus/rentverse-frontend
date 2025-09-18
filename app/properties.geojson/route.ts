import { NextRequest, NextResponse } from 'next/server'
import { forwardRequest, getAuthHeader, createErrorResponse, createCacheHeaders } from '@/utils/apiForwarder'

// GET /properties.geojson - Get property data in GeoJSON format for high-performance map rendering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/properties.geojson?${queryString}` : '/properties.geojson'

    const response = await forwardRequest(endpoint, {
      method: 'GET',
      headers: getAuthHeader(request),
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        ...createCacheHeaders(900, 'application/geo+json'), // Cache for 15 minutes with GeoJSON content type
        'Access-Control-Allow-Origin': '*', // Allow cross-origin for map libraries
      },
    })
  } catch (error) {
    console.error('Error fetching properties GeoJSON:', error)
    return NextResponse.json(
      createErrorResponse('Failed to fetch properties GeoJSON data', error as Error),
      { status: 500 },
    )
  }
}
