// Core property data types
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

// Property management state
export interface PropertiesState {
  properties: PropertyBase[]
  filteredProperties: PropertyBase[]
  isLoading: boolean
  error: string | null
}

// Property type options
export type PropertyType = 'apartment' | 'condominium' | 'villa' | 'townhouse' | 'house' | 'studio' | 'penthouse'

// Property filters and search
export interface SearchFilters {
  location: string
  monthCount: number
  yearCount: number
  propertyType: string
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
}
