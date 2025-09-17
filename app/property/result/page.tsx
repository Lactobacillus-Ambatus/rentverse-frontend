'use client'

import { useState } from 'react'
import { ArrowDownWideNarrow } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Mousewheel } from 'swiper/modules'
import { getAllProperties } from '@/data/properties'
import MapViewer from '@/components/MapViewer'
import Pagination from '@/components/Pagination'
import CardProperty from '@/components/CardProperty'
import ContentWrapper from '@/components/ContentWrapper'
import ButtonSecondary from '@/components/ButtonSecondary'
import ButtonMapViewSwitcher from '@/components/ButtonMapViewSwitcher'

function ResultsPage() {
  const properties = getAllProperties(10)
  const [isMapView, setIsMapView] = useState(false)

  const toggleView = () => {
    setIsMapView(!isMapView)
  }

  // Helper function to group properties based on screen size
  const getGroupedProperties = (itemsPerSlide: number) => {
    const grouped = []
    for (let i = 0; i < properties.length; i += itemsPerSlide) {
      grouped.push(properties.slice(i, i + itemsPerSlide))
    }
    return grouped
  }

  // Map configuration
  const mapCenter = { lng: -74.006, lat: 40.7128 } // New York City center
  const mapZoom = 12

  // Create markers from properties data (simulated coordinates around NYC)
  const propertyMarkers = properties.map((property, index) => ({
    lng: mapCenter.lng + (Math.random() - 0.5) * 0.02, // Random offset around center
    lat: mapCenter.lat + (Math.random() - 0.5) * 0.02,
    popup: `
      <div class="p-2">
        <h3 class="font-semibold text-sm">${property.title}</h3>
        <p class="text-xs text-gray-600">${property.location}</p>
        <p class="text-sm font-bold text-teal-600">$${property.price}/month</p>
      </div>
    `,
    color: '#0D9488', // Teal color to match the theme
  }))

  return (
    <ContentWrapper searchBoxType="compact">
      <div className="w-full py-4 px-2 sm:px-4 md:px-8 lg:px-12 flex justify-between items-start gap-x-5">
        {/* Property Card Results */}
        <div className={`w-full md:w-1/2 ${isMapView ? 'hidden' : 'block'}`}>
          {/* Header Result */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-xl text-teal-900">
                {properties.length} homes within map area
              </h3>
              <p className="text-base text-teal-800">
                Showing 1 – {properties.length}
              </p>
            </div>
            <ButtonSecondary
              iconLeft={<ArrowDownWideNarrow size={16} />}
              label="Sort"
            />
          </div>

          {/* Vertical Scrollable Results */}
          <div className="h-[70vh] overflow-hidden">
            {/* Mobile: 1 column */}
            <div className="block sm:hidden h-full">
              <Swiper
                direction="vertical"
                slidesPerView="auto"
                spaceBetween={16}
                scrollbar={{
                  hide: false,
                  draggable: true,
                }}
                mousewheel={{
                  enabled: true,
                  forceToAxis: true,
                }}
                modules={[Scrollbar, Mousewheel]}
                className="h-full"
                style={{ height: '100%' }}
              >
                {properties.map((property) => (
                  <SwiperSlide key={property.id} className="!h-auto">
                    <div className="pr-4 mb-4">
                      <CardProperty property={property} />
                    </div>
                  </SwiperSlide>
                ))}

                {/* Pagination as last slide */}
                <SwiperSlide className="!h-auto">
                  <div className="py-8 flex justify-center items-center pr-4">
                    <Pagination
                      currentPage={1}
                      totalPages={15}
                      onPageChange={(page) => {
                        console.log('Page changed to:', page)
                      }}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Small screens: 2 columns */}
            <div className="hidden sm:block md:hidden h-full">
              <Swiper
                direction="vertical"
                slidesPerView="auto"
                spaceBetween={16}
                scrollbar={{
                  hide: false,
                  draggable: true,
                }}
                mousewheel={{
                  enabled: true,
                  forceToAxis: true,
                }}
                modules={[Scrollbar, Mousewheel]}
                className="h-full"
                style={{ height: '100%' }}
              >
                {getGroupedProperties(2).map((group, index) => (
                  <SwiperSlide key={index} className="!h-auto">
                    <div className="grid grid-cols-2 gap-4 pr-4 mb-4">
                      {group.map((property) => (
                        <CardProperty key={property.id} property={property} />
                      ))}
                    </div>
                  </SwiperSlide>
                ))}

                {/* Pagination as last slide */}
                <SwiperSlide className="!h-auto">
                  <div className="py-8 flex justify-center items-center pr-4 col-span-2">
                    <Pagination
                      currentPage={1}
                      totalPages={15}
                      onPageChange={(page) => {
                        console.log('Page changed to:', page)
                      }}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Medium screens (tablets): 1 column */}
            <div className="hidden md:block lg:hidden h-full">
              <Swiper
                direction="vertical"
                slidesPerView="auto"
                spaceBetween={16}
                scrollbar={{
                  hide: false,
                  draggable: true,
                }}
                mousewheel={{
                  enabled: true,
                  forceToAxis: true,
                }}
                modules={[Scrollbar, Mousewheel]}
                className="h-full"
                style={{ height: '100%' }}
              >
                {properties.map((property) => (
                  <SwiperSlide key={property.id} className="!h-auto">
                    <div className="pr-4 mb-4">
                      <CardProperty property={property} />
                    </div>
                  </SwiperSlide>
                ))}

                {/* Pagination as last slide */}
                <SwiperSlide className="!h-auto">
                  <div className="py-8 flex justify-center items-center pr-4">
                    <Pagination
                      currentPage={1}
                      totalPages={15}
                      onPageChange={(page) => {
                        console.log('Page changed to:', page)
                      }}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Large screens: 2 columns */}
            <div className="hidden lg:block h-full">
              <Swiper
                direction="vertical"
                slidesPerView="auto"
                spaceBetween={16}
                scrollbar={{
                  hide: false,
                  draggable: true,
                }}
                mousewheel={{
                  enabled: true,
                  forceToAxis: true,
                }}
                modules={[Scrollbar, Mousewheel]}
                className="h-full"
                style={{ height: '100%' }}
              >
                {getGroupedProperties(2).map((group, index) => (
                  <SwiperSlide key={index} className="!h-auto">
                    <div className="grid grid-cols-2 gap-4 pr-4 mb-4">
                      {group.map((property) => (
                        <CardProperty key={property.id} property={property} />
                      ))}
                    </div>
                  </SwiperSlide>
                ))}

                {/* Pagination as last slide */}
                <SwiperSlide className="!h-auto">
                  <div className="py-8 flex justify-center items-center pr-4 col-span-2">
                    <Pagination
                      currentPage={1}
                      totalPages={15}
                      onPageChange={(page) => {
                        console.log('Page changed to:', page)
                      }}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        {/* Map Results */}
        <div className={`w-full md:w-1/2 ${isMapView ? 'block' : 'hidden md:block'}`}>
          {/*<div className="w-full h-[80vh] bg-gray-500"></div>*/}
          <MapViewer
            center={mapCenter}
            zoom={mapZoom}
            markers={propertyMarkers}
            onMapClick={(coords) => console.log('Clicked:', coords)}
            className="shadow-lg"
            height="80vh"
          />
        </div>
      </div>

      {/* Map/List View Switcher Button - Mobile/Tablet Only */}
      <div className="md:hidden">
        <ButtonMapViewSwitcher
          onClick={toggleView}
          isMapView={isMapView}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
        />
      </div>
    </ContentWrapper>
  )
}

export default ResultsPage
