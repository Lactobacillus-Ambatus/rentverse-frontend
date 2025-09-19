import Link from 'next/link'
import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import CardProperty from '@/components/CardProperty'
import { Plus } from 'lucide-react'

function AllMyPropertiesPage() {
  // Sample user's property listings data
  const myProperties = [
    {
      id: '1',
      title: 'Tijani Raja Dewa - Apartements',
      location: 'Panji, Kota Bharu, Kelantan, Malaysia',
      price: 550,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
      area: 123,
      rating: 4.8,
      propertyType: 'apartment' as const,
      status: 'Published',
    },
    {
      id: '2',
      title: 'Residensi Setia Alam',
      location: 'Setia Alam, Selangor, Malaysia',
      price: 890,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_ockiwbockiwbocki_vmmlhm.png',
      area: 145,
      rating: 4.6,
      propertyType: 'condominium' as const,
      status: 'Published',
    },
    {
      id: '3',
      title: 'Batu Caves Townhouses',
      location: 'Batu Caves, Selangor, Malaysia',
      price: 1200,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_5ckgfc5ckgfc5ckg_k9uzft.png',
      area: 185,
      rating: 4.9,
      propertyType: 'townhouse' as const,
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
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                property.status === 'Published'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-slate-100 text-slate-600'
              }`}>
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