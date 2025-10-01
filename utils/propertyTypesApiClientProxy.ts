import type { PropertyTypesResponse } from '@/types/property'

// Alternative approach: Create a Next.js API route to proxy the request
// This bypasses browser CORS and ngrok issues

export class PropertyTypesApiClientProxy {
  static async getPropertyTypes(): Promise<PropertyTypesResponse> {
    try {
      // Use Next.js API route as proxy
      const response = await fetch('/api/property-types-proxy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching property types via proxy:', error)
      throw error
    }
  }
}