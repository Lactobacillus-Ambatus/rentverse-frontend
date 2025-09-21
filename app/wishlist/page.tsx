import Link from 'next/link'
import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import CardProperty from '@/components/CardProperty'
import type { Property } from '@/types/property'
import { Search } from 'lucide-react'

function WishlistPage() {
  // Sample wishlist properties data
  const wishlistProperties: Property[] = [
    {
      id: '1',
      code: 'TRD001',
      title: 'Tijani Raja Dewa - Apartements',
      description: 'Modern apartment in the heart of Panji',
      address: 'Jalan Tijani Raja Dewa',
      city: 'Kota Bharu',
      state: 'Kelantan',
      zipCode: '15000',
      price: 550,
      type: 'APARTMENT' as const,
      bedrooms: 2,
      bathrooms: 1,
      area: 123,
      areaSqm: 123,
      isAvailable: true,
      viewCount: 150,
      averageRating: 4.8,
      totalRatings: 25,
      isFavorited: true,
      favoriteCount: 12,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png'],
      amenities: ['parking', 'wifi', 'air-conditioning'],
      latitude: 6.1254,
      longitude: 102.2386,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      code: 'RSK002',
      title: 'Residensi Senza Kuala Lumpur',
      description: 'Modern studio in the heart of KL',
      address: 'Jalan Bukit Bintang',
      city: 'Kuala Lumpur',
      state: 'Federal Territory',
      zipCode: '50200',
      price: 1200,
      type: 'STUDIO' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 85,
      areaSqm: 85,
      isAvailable: true,
      viewCount: 200,
      averageRating: 4.9,
      totalRatings: 15,
      isFavorited: true,
      favoriteCount: 8,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_ockiwbockiwbocki_vmmlhm.png'],
      amenities: ['wifi', 'air-conditioning', 'security'],
      latitude: 3.1478,
      longitude: 101.7089,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
    {
      id: '3',
      code: 'BCT003',
      title: 'Batu Caves Townhouses',
      description: 'Spacious townhouse near Batu Caves',
      address: 'Jalan Batu Caves',
      city: 'Batu Caves',
      state: 'Selangor',
      zipCode: '68100',
      price: 950,
      type: 'HOUSE' as const,
      bedrooms: 4,
      bathrooms: 3,
      area: 156,
      areaSqm: 156,
      isAvailable: true,
      viewCount: 95,
      averageRating: 4.7,
      totalRatings: 12,
      isFavorited: true,
      favoriteCount: 15,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_5ckgfc5ckgfc5ckg_k9uzft.png'],
      amenities: ['parking', 'garden', 'wifi'],
      latitude: 3.2370,
      longitude: 101.6840,
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-03T00:00:00Z',
    },
    {
      id: '4',
      code: 'TMA004',
      title: 'TH Mengkuang Aman',
      description: 'Luxury condominium in Mengkuang',
      address: 'Jalan Mengkuang',
      city: 'Mengkuang',
      state: 'Penang',
      zipCode: '13200',
      price: 680,
      type: 'CONDO' as const,
      bedrooms: 2,
      bathrooms: 2,
      area: 98,
      areaSqm: 98,
      isAvailable: true,
      viewCount: 120,
      averageRating: 4.6,
      totalRatings: 18,
      isFavorited: true,
      favoriteCount: 10,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_7seyqi7seyqi7sey_jgzhig.png'],
      amenities: ['swimming-pool', 'gym', 'parking', 'wifi'],
      latitude: 5.4164,
      longitude: 100.3327,
      createdAt: '2024-01-04T00:00:00Z',
      updatedAt: '2024-01-04T00:00:00Z',
    },
  ]

  return (
    <ContentWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-sans font-medium text-slate-900">My wishlists</h3>
        <Link
          href="/property"
          className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Search size={16} />
          <span className="text-sm font-medium">Edit</span>
        </Link>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProperties.map((property) => (
          <div key={property.id} className="group">
            <CardProperty property={property} />
          </div>
        ))}
      </div>

      {/* Empty state fallback */}
      {wishlistProperties.length === 0 && (
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <Image
                src="https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758310328/rentverse-base/image_17_hsznyz.png"
                alt="No wishlist items"
                width={240}
                height={240}
                className="w-60 h-60 object-contain"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-sans font-medium text-slate-900">
                Your wishlist is empty
              </h3>
              <p className="text-base text-slate-500 leading-relaxed">
                Start exploring properties to add them to your wishlist
              </p>
            </div>
            <Link
              href="/property"
              className="inline-flex px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors duration-200"
            >
              Explore Properties
            </Link>
          </div>
        </div>
      )}
    </ContentWrapper>
  )
}

export default WishlistPage