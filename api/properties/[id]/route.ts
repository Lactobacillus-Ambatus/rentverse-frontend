import { NextRequest, NextResponse } from 'next/server'
import type { PropertyUpdateRequest } from '@/types'
import { forwardRequest, getAuthHeader, createErrorResponse, createCacheHeaders } from '@/utils/apiForwarder'

// GET /api/properties/{id} - Get property by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const response = await forwardRequest(`/api/properties/${id}`, {
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

// PUT /api/properties/{id} - Update property by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body: PropertyUpdateRequest = await request.json()

    const response = await forwardRequest(`/api/properties/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeader(request),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      createErrorResponse('Failed to update property', error as Error),
      { status: 500 },
    )
  }
}

// DELETE /api/properties/{id} - Delete property by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const response = await forwardRequest(`/api/properties/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(request),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      createErrorResponse('Failed to delete property', error as Error),
      { status: 500 },
    )
  }
}
