// Backend property response structure
export interface Property {
  id: string
  code: string
  title: string
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  type: PropertyTypeBackend
  bedrooms: number
  bathrooms: number
  area: number
  areaSqm: number  // Added areaSqm field
  isAvailable: boolean
  viewCount: number
  averageRating: number
  totalRatings: number
  isFavorited: boolean
  favoriteCount: number
  images: string[]
  amenities: string[]
  latitude?: number
  longitude?: number
  createdAt: string
  updatedAt: string
}

// Legacy property structure for backward compatibility
export interface PropertyBase {
  id: string
  title: string
  location: string
  price: number
  imageUrl: string
  area: number
  rating: number
  propertyType: PropertyType
}

// Backend property types
export type PropertyTypeBackend = 'APARTMENT' | 'HOUSE' | 'STUDIO' | 'CONDO' | 'VILLA' | 'ROOM'

// Frontend property types (legacy)
export type PropertyType = 'apartment' | 'condominium' | 'villa' | 'townhouse' | 'house' | 'studio' | 'penthouse'

// Properties API response structure
export interface PropertiesResponse {
  success: boolean
  data: {
    properties: Property[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
    maps: {
      latMean: number
      longMean: number
      depth: number
    }
  }
}

// Property management state
export interface PropertiesState {
  properties: Property[]
  filteredProperties: Property[]
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  } | null
  mapData: {
    latMean: number
    longMean: number
    depth: number
  } | null
}

// Enhanced search filters to match backend API
export interface SearchFilters {
  page?: number
  limit?: number
  type?: string
  city?: string
  available?: boolean
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  
  // Legacy fields for backward compatibility
  location?: string
  monthCount?: number
  yearCount?: number
  propertyType?: string
  minArea?: number
  maxArea?: number
}
