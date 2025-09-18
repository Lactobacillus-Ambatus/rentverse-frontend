'use client'

import ButtonFilled from '@/components/ButtonFilled'
import { getLocaledPrice } from '@/utils/property'

interface BoxPropertyPriceProps {
  price: number
}

function BoxPropertyPrice(props: BoxPropertyPriceProps) {
  const formattedPrice = getLocaledPrice(props.price)

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-3xl">
      {/* Price section */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-orange-600">{formattedPrice.replace('/mo', '')}</span>
        <span className="text-lg text-slate-500 ml-2">for one month</span>
      </div>

      {/* Button section */}
      <div className="mb-4">
        <ButtonFilled onClick={() => {
        }}>
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
