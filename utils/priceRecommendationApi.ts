/**
 * AI Pricing Service
 * Calls the Rentverse AI API for price recommendations
 */

export interface PriceRecommendationRequest {
  area: number
  bathrooms: number
  bedrooms: number
  furnished: string // "Yes" or "No"
  location: string
  property_type: string
}

export interface PriceRecommendationResponse {
  currency: string
  predicted_price: number
  price_range: {
    max: number
    min: number
  }
  status: string
}

/**
 * Get AI-powered price recommendation for a property
 */
export async function getPriceRecommendation(
  propertyData: PriceRecommendationRequest
): Promise<PriceRecommendationResponse> {
  try {
    const response = await fetch('http://rentverse-ai.jokoyuliyanto.my.id/api/v1/classify/price', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: PriceRecommendationResponse = await response.json()
    
    if (data.status !== 'success') {
      throw new Error('API returned unsuccessful status')
    }

    return data
  } catch (error) {
    console.error('Price recommendation API error:', error)
    throw error
  }
}