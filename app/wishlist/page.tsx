import Link from 'next/link'
import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import CardProperty from '@/components/CardProperty'
import { Search } from 'lucide-react'

function WishlistPage() {
  // Sample wishlist properties data - structured to match PropertyBase interface
  const wishlistProperties = [
    {
      id: '1',
      title: 'Tijani Raja Dewa - Apartements',
      location: 'Panji, Kota Bharu, Kelantan, Malaysia',
      price: 550,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
      area: 123,
      rating: 4.8,
      propertyType: 'apartment' as const,
    },
    {
      id: '2',
      title: 'Residensi Senza Kuala Lumpur',
      location: 'Kuala Lumpur, Federal Territory',
      price: 1200,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_ockiwbockiwbocki_vmmlhm.png',
      area: 85,
      rating: 4.9,
      propertyType: 'studio' as const,
    },
    {
      id: '3',
      title: 'Batu Caves Townhouses',
      location: 'Batu Caves, Selangor',
      price: 950,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_5ckgfc5ckgfc5ckg_k9uzft.png',
      area: 156,
      rating: 4.7,
      propertyType: 'townhouse' as const,
    },
    {
      id: '4',
      title: 'TH Mengkuang Aman',
      location: 'Mengkuang, Penang, Malaysia',
      price: 680,
      imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758211360/rentverse-rooms/Gemini_Generated_Image_7seyqi7seyqi7sey_jgzhig.png',
      area: 98,
      rating: 4.6,
      propertyType: 'condominium' as const,
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