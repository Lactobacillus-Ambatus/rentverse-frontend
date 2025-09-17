'use client'

import CardProperty from '@/components/CardProperty'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { getAllProperties } from '@/data/properties'


function ListFeatured() {
  const sampleProperties = getAllProperties()

  return (
    <div className="py-16 px-4 md:px-16">
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
            slidesPerView: 1.4,
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
            <CardProperty property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ListFeatured