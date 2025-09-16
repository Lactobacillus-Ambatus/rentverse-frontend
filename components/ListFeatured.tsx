'use client'

import type { PropertyBase } from '@/types/property'
import CardProperty from '@/components/CardProperty'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'


function ListFeatured() {
  const sampleProperties: Array<PropertyBase> = [
    {
      id: 'a4b2-1c3d-4e5f-6789-0abcde123456',
      title: "Modern Apartment in City Center",
      location: "New York, NY",
      price: 412,
      imageUrl: "https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png",
      area: 1200,
      rating: 4.5,
      propertyType: 'apartment'
    },
    {
      id: 'a4b2-1c3d-4e5f-6789-0abcde123457',
      title: "Modern Apartment in City Center",
      location: "New York, NY",
      price: 412,
      imageUrl: "https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png",
      area: 1200,
      rating: 4.5,
      propertyType: 'condominium'
    },
    {
      id: 'a4b2-1c3d-4e5f-6789-0abcde123458',
      title: "Modern Apartment in City Center",
      location: "New York, NY",
      price: 412,
      imageUrl: "https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png",
      area: 1200,
      rating: 4.5,
      propertyType: 'villa'
    },
    {
      id: 'a4b2-1c3d-4e5f-6789-0abcde123459',
      title: "Modern Apartment in City Center",
      location: "New York, NY",
      price: 412,
      imageUrl: "https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png",
      area: 1200,
      rating: 4.5,
      propertyType: 'townhouse'
    },
  ]

  return (
    <div className="py-16 px-16">
      {/* Section title */}
      <div className="mb-12">
        <h2 className="font-serif text-3xl text-teal-900 mb-4">
          Featured Properties For You
        </h2>
        <p className="text-base text-teal-800 max-w-2xl">
          A selection of verified properties in the most sought-after locations
        </p>
      </div>

      <Swiper
        modules={[FreeMode]}
        spaceBetween={32}
        freeMode={true}
        grabCursor={true}
        breakpoints={{
          // Mobile
          320: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          // Tablet
          768: {
            slidesPerView: 2.3,
            spaceBetween: 24,
          },
          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          // Large desktop
          1280: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        className="!overflow-visible"
      >
        {sampleProperties.map((property) => (
          <SwiperSlide key={property.id}>
            <CardProperty {...property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ListFeatured