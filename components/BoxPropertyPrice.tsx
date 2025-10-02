'use client'

import { useRouter } from 'next/navigation'
import ButtonFilled from '@/components/ButtonFilled'
import { getLocaledPrice } from '@/utils/property'
import useBookingStore from '@/stores/bookingStore'
import useAuthStore from '@/stores/authStore'

interface BoxPropertyPriceProps {
  readonly price: number
  readonly propertyId: string
  readonly ownerId?: string
}

function BoxPropertyPrice(props: BoxPropertyPriceProps) {
  const router = useRouter()
  const { setPropertyId } = useBookingStore()
  const { user, isLoggedIn } = useAuthStore()
  const formattedPrice = getLocaledPrice(props.price)

  // Check if current user is the property owner
  const isOwner = isLoggedIn && user && props.ownerId && user.id === props.ownerId

  // Debug logging
  console.log('[BoxPropertyPrice] Ownership check:', {
    isLoggedIn,
    userId: user?.id,
    ownerId: props.ownerId,
    isOwner
  })

  const handleBookingClick = () => {
    // Set the property ID in the booking store
    setPropertyId(props.propertyId)
    
    // Navigate to the booking page
    router.push(`/property/${props.propertyId}/book`)
  }

  const handleEditClick = () => {
    // Navigate to the property edit page
    router.push(`/property/${props.propertyId}/modify`)
  }

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-3xl">
      {/* Price section */}
      <div className="text-center mb-6">
        {isOwner && (
          <div className="mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
              Your Property
            </span>
          </div>
        )}
        <span className="text-3xl font-bold text-orange-600">{formattedPrice.replace('/mo', '')}</span>
        <span className="text-lg text-slate-500 ml-2">for one month</span>
      </div>

      {/* Button section */}
      <div className="mb-4">
        {isOwner ? (
          <ButtonFilled onClick={handleEditClick}>
            Edit Property
          </ButtonFilled>
        ) : (
          <ButtonFilled onClick={handleBookingClick}>
            Make a Booking
          </ButtonFilled>
        )}
      </div>

      {/* Disclaimer text */}
      <div className="text-center">
        {isOwner ? (
          <span className="text-sm text-slate-500">Manage your property listing</span>
        ) : (
          <span className="text-sm text-slate-500">You won&apos;t be charged yet</span>
        )}
      </div>
    </div>
  )
}

export default BoxPropertyPrice
