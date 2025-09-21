'use client'

import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import BarProperty from '@/components/BarProperty'
import ImageGallery from '@/components/ImageGallery'
import BoxPropertyPrice from '@/components/BoxPropertyPrice'
import MapViewer from '@/components/MapViewer'

function DetailPage() {
  // Note: This is a static implementation - in production, you would use the params to fetch specific property data
  
  const tempImage: [string, string, string, string, string] = [
    'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
    'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_ockiwbockiwbocki_vmmlhm.png',
    'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_5ckgfc5ckgfc5ckg_k9uzft.png',
    'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_7seyqi7seyqi7sey_jgzhig.png',
    'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211362/rentverse-rooms/Gemini_Generated_Image_2wt0y22wt0y22wt0_ocdafo.png',
  ]

  return (
    <ContentWrapper>
      <BarProperty title="Tijani Raja Dewa - Apartements" />

      <section className="space-y-6">
        <ImageGallery images={tempImage} />

        {/* Main content area */}
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Property details and description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property header */}
            <div className="flex justify-between space-y-4">
              <div>
                <h1 className="text-2xl font-semibold text-teal-600">
                  Available to rent in 3 months!
                </h1>
                <p className="text-slate-600 text-lg">
                  2 bedrooms • 1 bathroom • 123 Sqft
                </p>
              </div>

              {/* Stats section */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-8">
                  <Image
                    src="https://res.cloudinary.com/dqhuvu22u/image/upload/v1758219434/rentverse-base/icon-star_kwohms.png"
                    width={24}
                    height={24}
                    alt="Star icon"
                    className="w-12 h-12"
                  />
                  <div className="text-center">
                    <div className="text-xl font-semibold text-slate-900">4.8</div>
                    <div className="text-sm text-slate-500">Guest reviews</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-slate-900">2K</div>
                  <div className="text-sm text-slate-500">Viewers</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-slate-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Nisl ac mi turpis commodo. Velit tristique
                lobortis imperdiet aliquam eget. Ultrices diam fringilla sollicitudin dignissim elementum
                ultrices. Volutpat volutpat in amet ipsum libero. Amet ultrices sit pretium eu enim mi.
                Sit euismod vel posuere adipiscing nisi auctor. Sit a malesuada arcu morbi amet. Ut nunc
                mauris dolor sit sagittis eget sed. Nisl porttitor in nascetur maecenas semper massa.
              </p>
            </div>
          </div>

          {/* Right side - Booking box */}
          <div className="lg:col-span-1">
            <BoxPropertyPrice price={1200} />
          </div>
        </div>
      </section>

      {/* Location section */}
      <section className="mx-auto w-full max-w-6xl space-y-6 py-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl text-teal-900">Where you will be</h2>
          <p className="text-lg text-slate-600">Panji, Kota Bharu, Kelantan, Malaysia</p>
        </div>

        {/* MapTiler Map */}
        <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200">
          <MapViewer
            center={{ lng: 102.2386, lat: 6.1254 }}
            zoom={14}
            style="streets-v2"
            height="320px"
            width="100%"
            markers={[
              {
                lng: 102.2386,
                lat: 6.1254,
                popup: '<div class="p-2"><h3 class="font-semibold">Tijani Raja Dewa - Apartements</h3><p class="text-sm text-slate-600">Panji, Kota Bharu, Kelantan</p></div>',
                color: '#0d9488',
              },
            ]}
            className="rounded-2xl"
          />
        </div>
      </section>
    </ContentWrapper>
  )
}

export default DetailPage