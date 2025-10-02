'use client'

import Image from 'next/image'
import { useState, useEffect, use } from 'react'
import ContentWrapper from '@/components/ContentWrapper'
import BarProperty from '@/components/BarProperty'
import ImageGallery from '@/components/ImageGallery'
import MapViewer from '@/components/MapViewer'
import { Download, Share, Calendar, User, MapPin, Home } from 'lucide-react'
import { ShareService } from '@/utils/shareService'
import useAuthStore from '@/stores/authStore'

interface BookingDetail {
  id: string
  startDate: string
  endDate: string
  rentAmount: string
  currencyCode: string
  securityDeposit: string | null
  status: string
  notes: string
  createdAt: string
  updatedAt: string
  propertyId: string
  tenantId: string
  landlordId: string
  property: {
    id: string
    title: string
    description: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    price: string
    currencyCode: string
    bedrooms: number
    bathrooms: number
    areaSqm: number
    furnished: boolean
    isAvailable: boolean
    images: string[]
    latitude: number
    longitude: number
    placeId: string | null
    projectName: string | null
    developer: string | null
    code: string
    status: string
    createdAt: string
    updatedAt: string
    ownerId: string
    propertyTypeId: string
    amenities: Array<{
      propertyId: string
      amenityId: string
      amenity: {
        id: string
        name: string
        category: string
      }
    }>
  }
  tenant: {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
    phone: string
  }
  landlord: {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
    phone: string
  }
}

interface BookingResponse {
  success: boolean
  data: {
    booking: BookingDetail
  }
}

function RentDetailPage({ params }: { readonly params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [documentUrl, setDocumentUrl] = useState<string | null>(null)
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    const fetchBookingDetail = async () => {
      if (!isLoggedIn || !id) {
        setIsLoading(false)
        return
      }

      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          setError('Authentication token not found')
          setIsLoading(false)
          return
        }

        const response = await fetch(`/api/bookings/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch booking details: ${response.status}`)
        }

        const data: BookingResponse = await response.json()
        
        if (data.success) {
          setBooking(data.data.booking)
        } else {
          setError('Failed to load booking details')
        }
      } catch (err) {
        console.error('Error fetching booking details:', err)
        setError(err instanceof Error ? err.message : 'Failed to load booking details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookingDetail()
  }, [id, isLoggedIn])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: string, currency: string) => {
    const num = parseFloat(amount)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'IDR' ? 'IDR' : 'MYR',
      minimumFractionDigits: 0
    }).format(num)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Generate invoice number based on id
  const invoiceNumber = `INV${id.toUpperCase().slice(0, 8)}`

  const handleShareableLink = async () => {
    if (!booking) return
    
    try {
      let pdfUrl = documentUrl
      
      // If we don't have the document URL yet, fetch it
      if (!pdfUrl && booking.status.toLowerCase() !== 'pending') {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('Authentication token not found')
        }

        const response = await fetch(`https://rentverse-be.jokoyuliyanto.my.id/api/bookings/${booking.id}/rental-agreement`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch rental agreement: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.success && data.data.pdf) {
          pdfUrl = data.data.pdf.url
          setDocumentUrl(pdfUrl)
        } else {
          throw new Error('Failed to get rental agreement PDF')
        }
      }
      
      if (!pdfUrl) {
        alert('Document not available for sharing')
        return
      }

      const shareData = {
        title: `Rental Agreement - ${booking.property.title}`,
        text: `Rental agreement for ${booking.property.title} in ${booking.property.city}, ${booking.property.state}. Status: ${booking.status}`,
        url: pdfUrl
      }

      const success = await ShareService.share(shareData, {
        showToast: true,
        fallbackMessage: 'Rental agreement document link copied to clipboard!'
      })
      
      if (success) {
        console.log('Rental agreement document shared successfully')
      }
    } catch (error) {
      console.error('Error sharing rental agreement document:', error)
      alert('Failed to share rental agreement document. Please try again.')
    }
  }

  const handleDownloadDocument = async () => {
    if (!booking) return
    
    try {
      setIsDownloading(true)
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('Authentication token not found')
      }

      const response = await fetch(`https://rentverse-be.jokoyuliyanto.my.id/api/bookings/${booking.id}/rental-agreement`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch rental agreement: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success && data.data.pdf) {
        // Store the document URL for sharing
        setDocumentUrl(data.data.pdf.url)
        
        // Create a temporary link element and trigger download
        const link = document.createElement('a')
        link.href = data.data.pdf.url
        link.download = data.data.pdf.fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        console.log('Rental agreement downloaded successfully')
      } else {
        throw new Error('Failed to get rental agreement PDF')
      }
    } catch (error) {
      console.error('Error downloading rental agreement:', error)
      alert('Failed to download rental agreement. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <ContentWrapper>
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center space-y-6 max-w-md">
            <h3 className="text-xl font-sans font-medium text-slate-900">
              Please log in to view booking details
            </h3>
          </div>
        </div>
      </ContentWrapper>
    )
  }

  if (isLoading) {
    return (
      <ContentWrapper>
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
            <p className="text-slate-600">Loading booking details...</p>
          </div>
        </div>
      </ContentWrapper>
    )
  }

  if (error || !booking) {
    return (
      <ContentWrapper>
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <p className="text-red-600">{error || 'Booking not found'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </ContentWrapper>
    )
  }

  return (
    <ContentWrapper>
      <BarProperty title={`${booking.property.title} - ${invoiceNumber}`} />

      <section className="space-y-6">
        <ImageGallery images={booking.property.images as [string, string, string, string, string]} />

        {/* Main content area */}
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Property details and description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property header */}
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-semibold text-slate-900">
                    {booking.property.title}
                  </h1>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </div>
                </div>
                
                <div className="flex items-center text-slate-600 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Home size={16} />
                    <span>{booking.property.bedrooms} bedrooms • {booking.property.bathrooms} bathrooms • {booking.property.areaSqm} sqm</span>
                  </div>
                </div>

                <div className="flex items-center text-slate-600 space-x-1">
                  <MapPin size={16} />
                  <span>{booking.property.address}, {booking.property.city}, {booking.property.state}</span>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-slate-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Booking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-500">Check-in</p>
                    <p className="font-medium text-slate-900">{formatDate(booking.startDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-500">Check-out</p>
                    <p className="font-medium text-slate-900">{formatDate(booking.endDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User size={16} className="text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-500">Landlord</p>
                    <p className="font-medium text-slate-900">{booking.landlord.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-slate-500">Total Amount</p>
                    <p className="font-medium text-slate-900">{formatAmount(booking.rentAmount, booking.currencyCode)}</p>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Notes</p>
                  <p className="text-slate-700">{booking.notes}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Property Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {booking.property.description}
              </p>
            </div>

            {/* Amenities */}
            {booking.property.amenities && booking.property.amenities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {booking.property.amenities.map((amenity) => (
                    <div key={amenity.amenityId} className="flex items-center space-x-2 text-slate-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-sm">{amenity.amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side - Agreement box */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-6">
              <div className="space-y-6">
                {/* Agreement Header */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Image
                      src="https://res.cloudinary.com/dqhuvu22u/image/upload/v1758219434/rentverse-base/icon-star_kwohms.png"
                      width={24}
                      height={24}
                      alt="Agreement icon"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Your agreement
                    </h3>
                    <p className="text-sm text-slate-500">
                      Status: {booking.status}
                    </p>
                  </div>
                </div>

                {/* Share Document */}
                <div className="space-y-3">
                  <p className="block text-sm font-medium text-slate-700">
                    Share Document
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={documentUrl || (booking.status.toLowerCase() === 'pending' ? 'Document not available' : 'Click share to get document link')}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
                    />
                    <button
                      onClick={handleShareableLink}
                      disabled={booking.status.toLowerCase() === 'pending'}
                      className={`p-2 transition-colors ${
                        booking.status.toLowerCase() === 'pending'
                          ? 'text-slate-400 cursor-not-allowed'
                          : 'text-slate-600 hover:text-teal-600'
                      }`}
                      title="Share document"
                    >
                      <Share size={16} />
                    </button>
                  </div>
                </div>

                {/* Download Agreement */}
                <button
                  onClick={handleDownloadDocument}
                  disabled={booking.status.toLowerCase() === 'pending' || isDownloading}
                  className={`w-full flex items-center justify-center space-x-2 font-medium py-3 px-4 rounded-xl transition-colors duration-200 ${
                    booking.status.toLowerCase() === 'pending' || isDownloading
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  <Download size={16} />
                  <span>
                    {isDownloading 
                      ? 'Downloading...'
                      : booking.status.toLowerCase() === 'pending' 
                        ? 'Document not available' 
                        : 'Download document'
                    }
                  </span>
                </button>

                {/* Invoice Information */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-sm text-slate-500">Invoice Number</p>
                    <p className="text-lg font-semibold text-slate-900">{invoiceNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location section */}
      <section className="mx-auto w-full max-w-6xl space-y-6 py-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl text-teal-900">Where you will be</h2>
          <p className="text-lg text-slate-600">{booking.property.address}, {booking.property.city}, {booking.property.state}</p>
        </div>

        {/* Map container */}
        <div className="w-full h-80 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
          {booking.property.latitude && booking.property.longitude ? (
            <MapViewer
              center={{
                lng: booking.property.longitude,
                lat: booking.property.latitude
              }}
              zoom={15}
              style="streets-v2"
              className="w-full h-full"
              height="100%"
              width="100%"
              markers={[
                {
                  lng: booking.property.longitude,
                  lat: booking.property.latitude,
                  popup: `
                    <div class="p-3">
                      <h3 class="font-semibold text-slate-900 mb-2">${booking.property.title}</h3>
                      <p class="text-sm text-slate-600 mb-2">${booking.property.address}</p>
                      <p class="text-sm text-slate-600">${booking.property.city}, ${booking.property.state}</p>
                    </div>
                  `,
                  color: '#0d9488'
                }
              ]}
              interactive={true}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-2 text-slate-400" />
                <p>Location not available</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </ContentWrapper>
  )
}

export default RentDetailPage