import Link from 'next/link'
import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import CardProperty from '@/components/CardProperty'
import type { Property } from '@/types/property'
import { Plus, Filter } from 'lucide-react'

// Extended property type for UI with admin status
interface PropertyWithStatus extends Property {
  status: string
  owner?: string
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'Published':
      return 'bg-orange-100 text-orange-600'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-600'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}

function AdminPage() {
  // Sample all properties data for admin view
  const allProperties: PropertyWithStatus[] = [
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
      owner: 'John Doe',
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
      owner: 'Jane Smith',
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
      isAvailable: false,
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
      status: 'Pending',
      owner: 'Mike Johnson',
    },
    {
      id: '4',
      code: 'KLS004',
      title: 'KL City Centre Studio',
      description: 'Modern studio in the heart of KL',
      address: 'Jalan Bukit Bintang',
      city: 'Kuala Lumpur',
      state: 'Federal Territory',
      zipCode: '50200',
      price: 750,
      type: 'STUDIO' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      areaSqm: 65,
      isAvailable: true,
      viewCount: 300,
      averageRating: 4.4,
      totalRatings: 35,
      isFavorited: false,
      favoriteCount: 22,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_7seyqi7seyqi7sey_jgzhig.png'],
      amenities: ['wifi', 'air-conditioning', 'security'],
      latitude: 3.1478,
      longitude: 101.7089,
      createdAt: '2024-01-04T00:00:00Z',
      updatedAt: '2024-01-04T00:00:00Z',
      status: 'Published',
      owner: 'Sarah Lee',
    },
    {
      id: '5',
      code: 'PHH005',
      title: 'Penang Heritage House',
      description: 'Traditional heritage house in George Town',
      address: 'Lebuh Armenian',
      city: 'George Town',
      state: 'Penang',
      zipCode: '10200',
      price: 980,
      type: 'HOUSE' as const,
      bedrooms: 3,
      bathrooms: 2,
      area: 220,
      areaSqm: 220,
      isAvailable: true,
      viewCount: 180,
      averageRating: 4.7,
      totalRatings: 28,
      isFavorited: true,
      favoriteCount: 19,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211362/rentverse-rooms/Gemini_Generated_Image_2wt0y22wt0y22wt0_ocdafo.png'],
      amenities: ['parking', 'wifi', 'heritage-features'],
      latitude: 5.4164,
      longitude: 100.3327,
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z',
      status: 'Published',
      owner: 'David Tan',
    },
    {
      id: '6',
      code: 'CMV006',
      title: 'Cyberjaya Modern Villa',
      description: 'Luxury villa in Cyberjaya tech hub',
      address: 'Persiaran APEC',
      city: 'Cyberjaya',
      state: 'Selangor',
      zipCode: '63000',
      price: 1500,
      type: 'VILLA' as const,
      bedrooms: 5,
      bathrooms: 4,
      area: 300,
      areaSqm: 300,
      isAvailable: false,
      viewCount: 75,
      averageRating: 4.9,
      totalRatings: 8,
      isFavorited: false,
      favoriteCount: 25,
      images: ['https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png'],
      amenities: ['swimming-pool', 'gym', 'parking', 'garden', 'security'],
      latitude: 2.9213,
      longitude: 101.6559,
      createdAt: '2024-01-06T00:00:00Z',
      updatedAt: '2024-01-06T00:00:00Z',
      status: 'Draft',
      owner: 'Lisa Wong',
    },
  ]

  return (
    <ContentWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-sans font-medium text-slate-900">All listings</h3>
        <div className="flex items-center space-x-4">
          {/* Filter Button */}
          <button
            className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors">
            <Filter size={16} />
            <span className="text-sm font-medium">111 reviews</span>
          </button>

          {/* Add Review Button */}
          <Link
            href="/admin/add-review"
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors duration-200"
          >
            <Plus size={16} />
            <span className="text-sm font-medium">Add review</span>
          </Link>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProperties.map((property) => (
          <div key={property.id} className="group relative">
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                getStatusBadgeClass(property.status)
              }`}>
                {property.status}
              </span>
            </div>

            <CardProperty property={property} />

            {/* Admin Management Actions */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/property/${property.id}`}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link
                    href={`/admin/property/${property.id}/edit`}
                    className="text-sm text-slate-600 hover:text-slate-700 font-medium transition-colors"
                  >
                    Edit
                  </Link>
                </div>
                <button className="text-sm text-slate-500 hover:text-slate-600 transition-colors">
                  Actions
                </button>
              </div>

              {/* Owner Info */}
              <div className="text-xs text-slate-500">
                Owner: {property.owner}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state fallback */}
      {allProperties.length === 0 && (
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
                No properties found
              </h3>
              <p className="text-base text-slate-500 leading-relaxed">
                There are currently no properties in the system
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="text-sm text-slate-500 mb-2">Total Properties</div>
          <div className="text-2xl font-semibold text-slate-900">{allProperties.length}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="text-sm text-slate-500 mb-2">Published</div>
          <div className="text-2xl font-semibold text-teal-600">
            {allProperties.filter(p => p.status === 'Published').length}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="text-sm text-slate-500 mb-2">Pending Review</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {allProperties.filter(p => p.status === 'Pending').length}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="text-sm text-slate-500 mb-2">Draft</div>
          <div className="text-2xl font-semibold text-slate-600">
            {allProperties.filter(p => p.status === 'Draft').length}
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default AdminPage