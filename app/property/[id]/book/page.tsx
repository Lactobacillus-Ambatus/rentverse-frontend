'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ContentWrapper from '@/components/ContentWrapper'
import ButtonCircle from '@/components/ButtonCircle'
import { ArrowLeft } from 'lucide-react'
import { BookingApiClient } from '@/utils/bookingApiClient'
import { PropertiesApiClient } from '@/utils/propertiesApiClient'
import { BookingRequest } from '@/types/booking'
import { Property } from '@/types/property'
import useAuthStore from '@/stores/authStore'
import { debugAuthState } from '@/utils/debugAuth'

function BookingPage() {
  const router = useRouter()
  const params = useParams()
  const propertyId = params.id as string
  const { isLoggedIn } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoadingProperty, setIsLoadingProperty] = useState(true)

  // Debug the route parameters
  console.log('[ROUTE] All params:', params)
  console.log('[ROUTE] Property ID from params:', propertyId)
  console.log('[ROUTE] Params.id type:', typeof params.id)
  console.log('[ROUTE] Params.id value:', params.id)

  // Form data state for booking
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    numGuests: 1,
    message: '',
    totalAmount: 0
  })

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoadingProperty(true)
        
        // Validate propertyId before making API call
        if (!propertyId) {
          console.error('[PROPERTY] No property ID available from route params')
          setSubmitError('Invalid property ID. Please check the URL.')
          return
        }
        
        // Fetch actual property data using the properties API client
        console.log('[PROPERTY] Fetching property with ID:', propertyId)
        const backendProperty = await PropertiesApiClient.getProperty(propertyId)
        
        console.log('[PROPERTY] Raw API response:', backendProperty)
        setProperty(backendProperty)
        
        // Set the initial total amount from property price
        const price = typeof backendProperty.price === 'string' 
          ? parseFloat(backendProperty.price) 
          : backendProperty.price
        setFormData(prev => ({ ...prev, totalAmount: price || 0 }))
        
      } catch (error) {
        console.error('Error fetching property:', error)
        setSubmitError('Failed to load property details. Please try again.')
        
        // Don't set fallback data, let the user know there's an issue
        setProperty(null)
      } finally {
        setIsLoadingProperty(false)
      }
    }

    console.log('[EFFECT] useEffect triggered, propertyId:', propertyId)
    if (propertyId && propertyId !== 'undefined' && propertyId !== 'null') {
      fetchProperty()
    } else {
      console.warn('[EFFECT] No valid propertyId found:', propertyId)
      setSubmitError('Property ID not found in URL')
      setIsLoadingProperty(false)
    }
  }, [propertyId])

  // Get button text based on state
  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Submitting...'
    if (!isLoggedIn) return 'Login Required'
    return 'Submit Booking'
  }

  // Redirect to login if not authenticated
  const handleAuthRedirect = () => {
    if (!isLoggedIn) {
      setSubmitError('Please log in to make a booking.')
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
      return true
    }
    return false
  }

  const handleBack = () => {
    router.back()
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

    const handleSubmitBooking = async () => {
    if (!formData.checkIn || !formData.checkOut || !formData.numGuests) {
      setSubmitError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Add comprehensive debugging
      console.log('[BOOKING] Starting booking submission...')
      const authStore = useAuthStore.getState()
      debugAuthState()
      
      // Check authentication state
      if (!authStore.isLoggedIn) {
        console.log('[BOOKING] User not logged in, redirecting to login')
        setSubmitError('Please log in to make a booking')
        router.push('/auth/login')
        return
      }

      // Manual token validation
      const token = localStorage.getItem('authToken')
      console.log('[BOOKING] Token from localStorage:', token ? `${token.slice(0, 20)}...` : 'null')
      
      if (!token) {
        console.log('[BOOKING] No token found, redirecting to login')
        setSubmitError('Authentication token not found. Please log in again.')
        router.push('/auth/login')
        return
      }

      // Test token validity with /api/auth/me
      console.log('[BOOKING] Testing token validity...')
      try {
        const authTestResponse = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        
        console.log('[BOOKING] Auth test response status:', authTestResponse.status)
        console.log('[BOOKING] Auth test response ok:', authTestResponse.ok)
        
        if (!authTestResponse.ok) {
          const authError = await authTestResponse.text()
          console.log('[BOOKING] Auth test failed:', authError)
          setSubmitError('Token validation failed. Please log in again.')
          router.push('/auth/login')
          return
        }
        
        const authResult = await authTestResponse.json()
        console.log('[BOOKING] Auth test result:', authResult)
        
        if (!authResult.success) {
          console.log('[BOOKING] Auth test unsuccessful:', authResult)
          setSubmitError('Authentication failed. Please log in again.')
          router.push('/auth/login')
          return
        }
        
        console.log('[BOOKING] Token is valid, proceeding with booking...')
      } catch (authError) {
        console.error('[BOOKING] Auth test error:', authError)
        setSubmitError('Authentication check failed. Please try again.')
        return
      }

      // Prepare booking data
      const bookingData: BookingRequest = {
        propertyId: propertyId,
        startDate: formData.checkIn,
        endDate: formData.checkOut,
        rentAmount: formData.totalAmount || 0,
        securityDeposit: 0,
        notes: formData.message
      }

      console.log('[BOOKING] Booking data:', bookingData)

      // Submit booking
      console.log('[BOOKING] Submitting booking through API client...')
      const response = await BookingApiClient.createBooking(bookingData)
      console.log('[BOOKING] Booking response:', response)

      if (response && response.id) {
        setCurrentStep(3) // Go to confirmation step
        console.log('[BOOKING] Booking successful!')
      } else {
        setSubmitError('Failed to create booking')
        console.log('[BOOKING] Booking failed - no booking ID received')
      }
    } catch (error: unknown) {
      console.error('Booking submission error:', error)
      
      // Handle specific error cases
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.log('[BOOKING] Error message details:', errorMessage)
      
      if (errorMessage.includes('401')) {
        setSubmitError('Authentication failed. Please log in again. (Error: 401)')
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      } else if (errorMessage.includes('403')) {
        setSubmitError('You do not have permission to make bookings. (Error: 403)')
      } else if (errorMessage.includes('400')) {
        setSubmitError('Invalid booking data. Please check your information. (Error: 400)')
      } else if (errorMessage.includes('422')) {
        setSubmitError('Booking validation failed. Please check your data. (Error: 422)')
      } else if (errorMessage.includes('500')) {
        setSubmitError('Server error. Please try again later. (Error: 500)')
      } else {
        setSubmitError(`Failed to submit booking: ${errorMessage}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ContentWrapper>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <ButtonCircle icon={<ArrowLeft />} onClick={handleBack} />
        <h1 className="text-2xl font-sans font-medium text-slate-900">
          Request to book
        </h1>
      </div>

      {/* Authentication Warning */}
      {!isLoggedIn && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl">
          <p className="font-medium">Authentication Required</p>
          <p className="text-sm">You need to log in to make a booking. Please sign in to continue.</p>
        </div>
      )}

      {/* Property Loading Error */}
      {!propertyId && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
          <p className="font-medium">Property Not Found</p>
          <p className="text-sm">Unable to detect property ID from the URL. Please check the link and try again.</p>
        </div>
      )}

      {/* Property Loading State */}
      {isLoadingProperty && propertyId && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl">
          <p className="font-medium">Loading Property</p>
          <p className="text-sm">Fetching property details for ID: {propertyId}</p>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form */}
        <div className="space-y-8">
          {/* Step 1 - Payment Method */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-slate-900">1.</span>
              <h2 className="text-lg font-semibold text-slate-900">Add payment method</h2>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                  VISA
                </div>
                <span className="text-slate-600">Visa credit card</span>
              </div>
              <button className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
                Change
              </button>
            </div>

            {/* Booking Details */}
            <div className="space-y-4 pt-4">
              <h3 className="text-md font-medium text-slate-900">Booking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData(prev => ({...prev, checkIn: e.target.value}))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData(prev => ({...prev, checkOut: e.target.value}))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.numGuests}
                    onChange={(e) => setFormData(prev => ({...prev, numGuests: parseInt(e.target.value) || 1}))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Total Amount (RM)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData(prev => ({...prev, totalAmount: parseFloat(e.target.value) || 0}))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="550.00"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {currentStep < 3 && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors duration-200"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step 2 - Message to Host */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-slate-900">2.</span>
              <h2 className="text-lg font-semibold text-slate-900">Write a message to the host</h2>
            </div>

            <p className="text-slate-600 text-sm">
              Let your host know a little about your visit and why their place is a good fit for you.
            </p>

            <div className="space-y-4">
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                placeholder="Tell your message in here"
                className="w-full h-32 px-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />

              <div className="flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition-colors duration-200"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors duration-200 ml-auto"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step 3 - Review Request */}
          {currentStep >= 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-slate-900">3.</span>
                <h2 className="text-lg font-semibold text-slate-900">Review your request</h2>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Payment Method:</p>
                  <p className="text-slate-900 font-medium">VISA credit card</p>
                </div>
                
                {formData.message && (
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Message to Host:</p>
                    <p className="text-slate-900">{formData.message}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-slate-600 mb-2">Booking Details:</p>
                  <div className="space-y-1">
                    <p className="text-slate-900">Check-in: {formData.checkIn || 'Not selected'}</p>
                    <p className="text-slate-900">Check-out: {formData.checkOut || 'Not selected'}</p>
                    <p className="text-slate-900">Guests: {formData.numGuests}</p>
                    <p className="text-slate-900">Total: RM {formData.totalAmount}</p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                  {submitError}
                </div>
              )}

              {/* Success Message */}
              {currentStep === 3 && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl">
                  Booking submitted successfully! You will be redirected to your bookings.
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition-colors duration-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting || !isLoggedIn}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {getSubmitButtonText()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Property Summary */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="space-y-6">
              {/* Property Image */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                {property ? (
                  <Image
                    src={
                      property.images && property.images.length > 0 
                        ? property.images[0] 
                        : "https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png"
                    }
                    alt={property.title || `Property ${property.id} image`}
                    fill
                    className="object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      // Fallback to default image if the property image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = "https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png"
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 animate-pulse rounded-xl flex items-center justify-center">
                    <span className="text-slate-400 text-sm">Loading image...</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-xs font-medium text-slate-700">
                  {property?.propertyType?.name || property?.type || 'Loading...'}
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-3">
                <p className="text-sm text-slate-500">
                  {property ? `${property.address}, ${property.city}, ${property.state}, ${property.country}` : 'Loading location...'}
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  {property?.title || 'Loading property...'}
                </h3>
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Dates</span>
                  <button className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
                    Change
                  </button>
                </div>
                <p className="text-sm text-slate-600">
                  {formData.checkIn && formData.checkOut 
                    ? `${new Date(formData.checkIn).toLocaleDateString()} - ${new Date(formData.checkOut).toLocaleDateString()}`
                    : 'Select dates in the form'
                  }
                </p>
              </div>

              {/* Price Details */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700">Price details</h4>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Monthly rent</span>
                  <span className="text-slate-900">
                    RM {property ? (typeof property.price === 'string' ? parseFloat(property.price) : property.price) : 0}
                  </span>
                </div>

                {formData.totalAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total amount</span>
                    <span className="text-slate-900">RM {formData.totalAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-medium border-t border-slate-200 pt-3">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">
                    RM {formData.totalAmount || (property ? (typeof property.price === 'string' ? parseFloat(property.price) : property.price) : 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default BookingPage
