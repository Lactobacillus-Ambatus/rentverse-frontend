import Link from 'next/link'
import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import CardProperty from '@/components/CardProperty'
import type { Property } from '@/types/property'
import { Plus } from 'lucide-react'

// Extended property type for UI with admin status
interface PropertyWithStatus extends Property {
  status: string
  owner?: string
}

function getStatusBadgeClass(status: string): string {
  return status === 'Published' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
}

function AllMyPropertiesPage() {
  // Sample user's property listings data
  const myProperties: PropertyWithStatus[] = [
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
      isFavorited: false,
      favoriteCount: 12,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png'],
      amenities: ['parking', 'wifi', 'air-conditioning'],
      latitude: 6.1254,
      longitude: 102.2386,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      status: 'Published',
    },
    {
      id: '2',
      code: 'RSA002',
      title: 'Residensi Setia Alam',
      description: 'Luxury condominium with modern facilities',
      address: 'Setia Alam Boulevard',
      city: 'Shah Alam',
      state: 'Selangor',
      zipCode: '40170',
      price: 890,
      type: 'CONDO' as const,
      bedrooms: 3,
      bathrooms: 2,
      area: 145,
      areaSqm: 145,
      isAvailable: true,
      viewCount: 200,
      averageRating: 4.6,
      totalRatings: 18,
      isFavorited: false,
      favoriteCount: 8,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_ockiwbockiwbocki_vmmlhm.png'],
      amenities: ['swimming-pool', 'gym', 'parking', 'wifi'],
      latitude: 3.0738,
      longitude: 101.4953,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      status: 'Published',
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
      price: 1200,
      type: 'HOUSE' as const,
      bedrooms: 4,
      bathrooms: 3,
      area: 185,
      areaSqm: 185,
      isAvailable: true,
      viewCount: 95,
      averageRating: 4.9,
      totalRatings: 12,
      isFavorited: true,
      favoriteCount: 15,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_5ckgfc5ckgfc5ckg_k9uzft.png'],
      amenities: ['parking', 'garden', 'wifi'],
      latitude: 3.2370,
      longitude: 101.6840,
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-03T00:00:00Z',
      status: 'Published',
    },
  ]

  return (
    <ContentWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-sans font-medium text-slate-900">My listings</h3>
        <Link
          href="/property/new"
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors duration-200"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Create new listing</span>
        </Link>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {myProperties.map((property) => (
          <div key={property.id} className="group relative">
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(property.status)}`}>
                {property.status}
              </span>
            </div>

            <CardProperty property={property} />

            {/* Property Management Actions */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex space-x-2">
                <Link
                  href={`/property/modify/${property.id}`}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  Edit
                </Link>
                <span className="text-slate-300">•</span>
                <button className="text-sm text-slate-600 hover:text-slate-700 font-medium transition-colors">
                  View Stats
                </button>
              </div>
              <button className="text-sm text-slate-500 hover:text-slate-600 transition-colors">
                More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state fallback */}
      {myProperties.length === 0 && (
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <Image
                src="https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758310328/rentverse-base/image_17_hsznyz.png"
                alt="No properties"
                width={240}
                height={240}
                className="w-60 h-60 object-contain"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-sans font-medium text-slate-900">
                No properties listed yet
              </h3>
              <p className="text-base text-slate-500 leading-relaxed">
                Start by creating your first property listing to earn rental income
              </p>
            </div>
            <Link
              href="/property/new"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors duration-200"
            >
              <Plus size={16} />
              <span>Create your first listing</span>
            </Link>
          </div>
        </div>
      )}
    </ContentWrapper>
  )
}

export default AllMyPropertiesPage