'use client'

import { useState } from 'react'

'use client'

import { useState, useEffect } from 'react'
import { usePropertyListingStore } from '@/stores/propertyListingStore'
import { getPriceRecommendation, mapPropertyDataToAIRequest } from '@/utils/priceRecommendationService'

export default function AddListingStepThreePrice() {
  const { data, updateData } = usePropertyListingStore()
  const [displayPrice, setDisplayPrice] = useState(data.price?.toString() || '1500')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false)
  const [recommendationError, setRecommendationError] = useState<string | null>(null)

  // Update display price when store price changes
  useEffect(() => {
    if (data.price && data.price.toString() !== displayPrice) {
      setDisplayPrice(data.price.toString())
    }
  }, [data.price])

  const handlePriceClick = () => {
    setIsEditing(true)
  }

  const handlePriceChange = (value: string) => {
    setDisplayPrice(value)
  }

  const handlePriceSubmit = () => {
    const numericPrice = parseFloat(displayPrice)
    if (!isNaN(numericPrice) && numericPrice > 0) {
      updateData({ price: numericPrice })
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePriceSubmit()
    } else if (e.key === 'Escape') {
      setDisplayPrice(data.price?.toString() || '1500')
      setIsEditing(false)
    }
  }

  const handleGetRecommendation = async () => {
    setIsLoadingRecommendation(true)
    setRecommendationError(null)

    try {
      // Map current property data to AI API format
      const requestData = mapPropertyDataToAIRequest(data)
      
      // Call the AI API
      const response = await getPriceRecommendation(requestData)
      
      // Update the price with the recommendation
      const recommendedPrice = response.predicted_price
      setDisplayPrice(recommendedPrice.toString())
      updateData({ price: recommendedPrice })
      
      console.log('Price recommendation received:', {
        predicted_price: response.predicted_price,
        range: response.price_range,
        currency: response.currency
      })
      
    } catch (error) {
      console.error('Failed to get price recommendation:', error)
      setRecommendationError('Failed to get price recommendation. Please try again.')
    } finally {
      setIsLoadingRecommendation(false)
    }
  }
