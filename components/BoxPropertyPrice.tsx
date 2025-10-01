'use client'

import { useRouter } from 'next/navigation'
import ButtonFilled from '@/components/ButtonFilled'
import { getLocaledPrice } from '@/utils/property'
import useBookingStore from '@/stores/bookingStore'

interface BoxPropertyPriceProps {
  readonly price: number
  readonly propertyId: string
}

function BoxPropertyPrice(props: BoxPropertyPriceProps) {
  const router = useRouter()
  const { setPropertyId } = useBookingStore()
  const formattedPrice = getLocaledPrice(props.price)

  const handleBookingClick = () => {
    // Set the property ID in the booking store
    setPropertyId(props.propertyId)
    
    // Navigate to the booking page
    router.push(`/property/${props.propertyId}/book`)
  }

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-3xl">
      {/* Price section */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-orange-600">{formattedPrice.replace('/mo', '')}</span>
        <span className="text-lg text-slate-500 ml-2">for one month</span>
      </div>

      {/* Button section */}
      <div className="mb-4">
        <ButtonFilled onClick={handleBookingClick}>
          Make a Booking
        </ButtonFilled>
      </div>

      {/* Disclaimer text */}
      <div className="text-center">
        <span className="text-sm text-slate-500">You won&apos;t be charged yet</span>
      </div>
    </div>
  )
}

export default BoxPropertyPrice
