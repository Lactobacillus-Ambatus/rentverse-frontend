import type { PropertyTypesResponse } from '@/types/property'

const BASE_URL = 'https://curious-lively-monster.ngrok-free.app/api'

export class PropertyTypesApiClient {
  static async getPropertyTypes(): Promise<PropertyTypesResponse> {
    // Try multiple approaches for ngrok compatibility
    const attempts = [
      // Attempt 1: With ngrok skip parameter and proper headers
      () => this.fetchWithConfig(`${BASE_URL}/property-types`, {
        headers: {
          'ngrok-skip-browser-warning': 'any',
          'Accept': 'application/json',
        }
      }),
      // Attempt 2: With query parameter
      () => this.fetchWithConfig(`${BASE_URL}/property-types?ngrok-skip-browser-warning=any`),
      // Attempt 3: With different ngrok bypass approaches
      () => this.fetchWithConfig(`${BASE_URL}/property-types`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }),
      // Attempt 4: Simple request without special handling
      () => this.fetchWithConfig(`${BASE_URL}/property-types`)
    ]

    for (let i = 0; i < attempts.length; i++) {
      try {
        console.log(`Attempting API call method ${i + 1}...`)
        const result = await attempts[i]()
        console.log(`✅ Success with method ${i + 1}`)
        return result
      } catch (error) {
        console.log(`❌ Method ${i + 1} failed:`, error)
        if (i === attempts.length - 1) {
          // Last attempt failed, throw the error
          throw error
        }
      }
    }

    // This should never be reached due to the throw above
    throw new Error('All API attempts failed')
  }

  private static async fetchWithConfig(url: string, config: RequestInit = {}): Promise<PropertyTypesResponse> {
    const defaultConfig: RequestInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      cache: 'no-cache',
    }

    const mergedConfig = {
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config.headers,
      }
    }

    console.log('Making request to:', url)
    console.log('With headers:', mergedConfig.headers)

    const response = await fetch(url, mergedConfig)

    console.log('Response status:', response.status)
    console.log('Response URL:', response.url)
    console.log('Response type:', response.headers.get('content-type'))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response (first 500 chars):', errorText.substring(0, 500))
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseText = await response.text()
    console.log('Response received, length:', responseText.length)
    console.log('Response preview (first 200 chars):', responseText.substring(0, 200))

    // Check if response is HTML (ngrok warning page)
    if (responseText.trim().startsWith('<!DOCTYPE') || 
        responseText.trim().startsWith('<html') ||
        responseText.includes('<title>ngrok</title>') ||
        responseText.includes('Visit Site')) {
      console.error('Detected ngrok warning page or HTML response')
      throw new Error('Server returned HTML instead of JSON (likely ngrok warning page)')
    }

    try {
      const data = JSON.parse(responseText)
      console.log('Successfully parsed JSON, property types count:', data.data?.length || 0)
      return data
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Failed to parse response:', responseText.substring(0, 1000))
      throw new Error(`Failed to parse JSON response: ${parseError}`)
    }
  }
}