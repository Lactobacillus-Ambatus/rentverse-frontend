/**
 * Property Upload API Service
 * Handles uploading properties to the backend
 */

import type { PropertyListingData } from '@/stores/propertyListingStore'

export interface MinimalPropertyUploadRequest {
  code: string
  title: string
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  latitude: number
  longitude: number
  price: number
  currencyCode: string
  bedrooms: number
  bathrooms: number
  areaSqm: number
  furnished: boolean
  isAvailable: boolean
  images: string[]
  amenityIds: string[]
}

export interface PropertyUploadRequest {
  code: string
  title: string
  description: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  placeId: string
  latitude: number
  longitude: number
  price: number
  currencyCode: string
  propertyTypeId: string
  bedrooms: number
  bathrooms: number
  areaSqm: number
  furnished: boolean
  isAvailable: boolean
  status: "DRAFT" | "PUBLISHED"
  images: string[]
  amenityIds: string[]
}

export interface PropertyUploadResponse {
  success: boolean
  message: string
  data: {
    property: {
      id: string
      code: string
      title: string
      description: string
      address: string
      city: string
      state: string
      zipCode: string
      price: number
      type: string
      bedrooms: number
      bathrooms: number
      area: number
      isAvailable: boolean
      viewCount: number
      averageRating: number
      totalRatings: number
      isFavorited: boolean
      favoriteCount: number
      images: string[]
      amenities: string[]
      createdAt: string
      updatedAt: string
    }
  }
}

/**
 * Upload a property to the backend
 */
export async function uploadProperty(
  propertyData: MinimalPropertyUploadRequest,
  token: string
): Promise<PropertyUploadResponse> {
  try {
    // Debug: Log the request data
    console.log('Uploading property data:', JSON.stringify(propertyData, null, 2))
    
    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    })

    if (!response.ok) {
      // Try to get the error details from the response
      let errorMessage = `Upload failed with status ${response.status}`
      try {
        const errorData = await response.json()
        console.error('Backend error response:', errorData)
        
        if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.error) {
          errorMessage = errorData.error
        } else if (errorData.details) {
          // Handle detailed validation errors
          errorMessage = `Validation failed: ${JSON.stringify(errorData.details)}`
        } else if (typeof errorData === 'string') {
          errorMessage = errorData
        }
      } catch (parseError) {
        console.error('Could not parse error response:', parseError)
        // Try to get response as text
        try {
          const errorText = await response.text()
          console.error('Error response text:', errorText)
          if (errorText) {
            errorMessage = errorText
          }
        } catch {
          // If we can't parse the error response, use the default message
        }
      }
      throw new Error(errorMessage)
    }

    const data: PropertyUploadResponse = await response.json()
    
    if (!data.success) {
      throw new Error(data.message || 'Upload failed')
    }

    return data
  } catch (error) {
    console.error('Property upload error:', error)
    throw error
  }
}

/**
 * Generate a unique property code
 */
function generatePropertyCode(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `PROP${timestamp}${random}`
}

/**
 * Convert property listing data to upload format
 */
export function mapPropertyListingToUploadRequest(data: PropertyListingData): MinimalPropertyUploadRequest {
  // Create a minimal payload with only essential fields
  const payload = {
    code: generatePropertyCode(),
    title: data.title || 'Test Property',
    description: data.description || 'Test Description',
    address: data.streetAddress || data.address || `${data.city || 'Kuala Lumpur'}, ${data.state || 'Selangor'}`,
    city: data.city || 'Kuala Lumpur',
    state: data.state || 'Selangor',
    zipCode: data.zipCode || '50000',
    latitude: data.latitude || 3.139,
    longitude: data.longitude || 101.6869,
    price: Math.max(data.price || 1000, 1),
    currencyCode: 'MYR',
    bedrooms: Math.max(data.bedrooms || 1, 1),
    bathrooms: Math.max(data.bathrooms || 1, 1),
    areaSqm: Math.max(data.areaSqm || 100, 1),
    furnished: false,
    isAvailable: true,
    images: [],
    amenityIds: []
    // Temporarily remove problematic fields: country, propertyTypeId, status
  }
  
  console.log('Minimal property data (removed problematic fields):', JSON.stringify(payload, null, 2))
  return payload
}