// Location data types
export interface Location {
  id: string
  name: string
  description: string
  icon: string
  country?: string
  state?: string
  city?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// Popular location types
export interface PopularLocation extends Location {
  imageUrl: string
  propertyCount: number
  averagePrice: number
}

// Geographic region types
export interface Region {
  id: string
  name: string
  locations: Location[]
}

// Map location types
export interface MapLocation {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  propertyCount: number
}

// Base type for locations
export interface LocationBaseType {
  name: string
  imageUrl: string
}
