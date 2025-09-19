import Link from 'next/link'
import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import CardProperty from '@/components/CardProperty'
import { Plus, Filter } from 'lucide-react'

function AdminPage() {
  // Sample all properties data for admin view
  const allProperties = [
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
      owner: 'John Doe',
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
      owner: 'Jane Smith',
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
      status: 'Pending',
      owner: 'Mike Johnson',
    },
    {
      id: '4',
      title: 'KL City Centre Studio',
      location: 'Kuala Lumpur, Federal Territory',
      price: 750,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_7seyqi7seyqi7sey_jgzhig.png',
      area: 65,
      rating: 4.4,
      propertyType: 'studio' as const,
      status: 'Published',
      owner: 'Sarah Lee',
    },
    {
      id: '5',
      title: 'Penang Heritage House',
      location: 'George Town, Penang, Malaysia',
      price: 980,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211362/rentverse-rooms/Gemini_Generated_Image_2wt0y22wt0y22wt0_ocdafo.png',
      area: 220,
      rating: 4.7,
      propertyType: 'house' as const,
      status: 'Published',
      owner: 'David Tan',
    },
    {
      id: '6',
      title: 'Cyberjaya Modern Villa',
      location: 'Cyberjaya, Selangor, Malaysia',
      price: 1500,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
      area: 300,
      rating: 4.9,
      propertyType: 'villa' as const,
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
                property.status === 'Published'
                  ? 'bg-orange-100 text-orange-600'
                  : property.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-slate-100 text-slate-600'
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