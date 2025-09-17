import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { RulerDimensionLine, Star } from 'lucide-react'
import type { PropertyBase } from '@/types/property'
import IconPropertyType from '@/utils/IconPropertyType'
import { swapCasePropertyType, getLocaledPrice, getLocaledArea, getLocaledRating } from '@/utils/property'

function CardProperty({ property }: { property: PropertyBase }) {
  return (
    <div className={clsx([
      'w-full max-w-320 bg-white rounded-2xl overflow-hidden shadow-sm',
      'hover:scale-105 hover:shadow-lg transition-all duration-300'
    ])}>
      <Link href={`/listing/${property.id}`} className="block group">
        {/* Image Container */}
        <div className="relative">
          <Image
            src={property.imageUrl}
            alt={`Image of ${property.title}`}
            width={500}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300"
          />

          {/* Property Type Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
            <IconPropertyType property_type={property.propertyType} size={16} />
            <span>{swapCasePropertyType(property.propertyType)}</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-5">
          {/* Location */}
          <span className="text-xs sm:text-sm text-slate-500 font-medium">{property.location}</span>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mt-1 mb-3 group-hover:text-teal-600 transition-colors">
            {property.title}
          </h3>

          {/* Price and Details Row */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <span className="text-lg sm:text-xl font-bold text-orange-500">{getLocaledPrice(property.price)}</span>

            {/* Area and Rating */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Area */}
              <div className="flex items-center gap-1 text-slate-600">
                <RulerDimensionLine size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">{getLocaledArea(property.area)}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-slate-600">
                <Star size={14} className="fill-yellow-400 text-yellow-400 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">{getLocaledRating(property.rating)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CardProperty