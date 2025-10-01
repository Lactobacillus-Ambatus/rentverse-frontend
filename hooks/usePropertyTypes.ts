import { useState, useEffect } from 'react'
import type { PropertyTypeDetail } from '@/types/property'
import { PropertyTypesApiClient } from '@/utils/propertyTypesApiClient'
import { PropertyTypesApiClientProxy } from '@/utils/propertyTypesApiClientProxy'

// Icon mapping for property types
const getPropertyTypeIcon = (code: string): string => {
  const iconMap: Record<string, string> = {
    'APARTMENT': '🏠',
    'CONDOMINIUM': '🏬',
    'HOUSE': '🏡',
    'TOWNHOUSE': '🏘️',
    'VILLA': '🏰',
    'PENTHOUSE': '🏙️',
    'STUDIO': '🏢',
  }
  return iconMap[code] || '🏢'
}

// Transform backend property type to frontend format
const transformPropertyType = (propertyType: PropertyTypeDetail) => ({
  icon: getPropertyTypeIcon(propertyType.code),
  name: propertyType.name,
  description: propertyType.description || '',
  id: propertyType.id,
  code: propertyType.code,
})

export const usePropertyTypes = () => {
  const [propertyTypes, setPropertyTypes] = useState<Array<{
    icon: string
    name: string
    description: string
    id: string
    code: string
  }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        let response
        try {
          // First, try direct API call
          console.log('Trying direct API call...')
          response = await PropertyTypesApiClient.getPropertyTypes()
        } catch (directError) {
          console.log('Direct API failed, trying proxy...', directError)
          // If direct fails, try the proxy approach
          response = await PropertyTypesApiClientProxy.getPropertyTypes()
        }
        
        if (response.success && response.data) {
          const transformedTypes = response.data
            .filter(type => type.isActive !== false) // Only include active types
            .map(transformPropertyType)
          
          setPropertyTypes(transformedTypes)
        } else {
          throw new Error('Failed to fetch property types')
        }
      } catch (err) {
        console.error('Error fetching property types:', err)
        let errorMessage = 'Unknown error'
        
        if (err instanceof Error) {
          errorMessage = err.message
          
          // Provide more helpful error messages
          if (err.message.includes('<!DOCTYPE')) {
            errorMessage = 'API returned HTML instead of JSON (possibly ngrok warning page)'
          } else if (err.message.includes('Failed to fetch')) {
            errorMessage = 'Network error - check if API server is running'
          } else if (err.message.includes('CORS')) {
            errorMessage = 'CORS error - check API server configuration'
          }
        }
        
        setError(errorMessage)
        
        // Fallback to static data on error
        console.log('Using fallback property types due to API error')
        setPropertyTypes([
          { icon: '🏠', name: 'Apartment', description: 'Urban apartment units', id: 'fallback-1', code: 'APARTMENT' },
          { icon: '🏬', name: 'Condominium', description: 'Modern condo living', id: 'fallback-2', code: 'CONDOMINIUM' },
          { icon: '🏡', name: 'House', description: 'Single family homes', id: 'fallback-3', code: 'HOUSE' },
          { icon: '🏘️', name: 'Townhouse', description: 'Multi-story attached homes', id: 'fallback-4', code: 'TOWNHOUSE' },
          { icon: '🏰', name: 'Villa', description: 'Luxury standalone villas', id: 'fallback-5', code: 'VILLA' },
          { icon: '🏙️', name: 'Penthouse', description: 'Top-floor luxury units', id: 'fallback-6', code: 'PENTHOUSE' },
          { icon: '🏢', name: 'Studio', description: 'Open-concept single room', id: 'fallback-7', code: 'STUDIO' },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPropertyTypes()
  }, [])

  return { propertyTypes, isLoading, error }
}

// Hook for search components that includes "Property" option
export const usePropertyTypesForSearch = () => {
  const { propertyTypes, isLoading, error } = usePropertyTypes()
  
  const searchPropertyTypes = [
    { icon: '🏢', name: 'Property', description: 'All types of properties', id: 'all', code: 'ALL' },
    ...propertyTypes
  ]
  
  return { propertyTypes: searchPropertyTypes, isLoading, error }
}