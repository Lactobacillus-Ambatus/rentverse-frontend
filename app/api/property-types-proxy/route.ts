import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://curious-lively-monster.ngrok-free.app/api'

export async function GET() {
  try {
    // Make the request from the server side (bypasses browser restrictions)
    const response = await fetch(`${BACKEND_URL}/property-types`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Add ngrok header on server side (no CORS issues here)
        'ngrok-skip-browser-warning': 'true',
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch from backend API', status: response.status },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    console.log('Successfully proxied property types:', data.data?.length || 0, 'items')
    
    // Return the data with CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error in property types proxy:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}