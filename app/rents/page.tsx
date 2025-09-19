import Link from 'next/link'
import Image from 'next/image'
import ContentWrapper from '@/components/ContentWrapper'
import { Search } from 'lucide-react'

function RentsPage() {
  return (
    <ContentWrapper>
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <h3 className="text-2xl font-serif text-slate-900">My rents</h3>
        <Link
          href="/property"
          className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Search size={16} />
          <span className="text-sm font-medium">Explore</span>
        </Link>
      </div>

      {/* Contents */}
      <div className="flex-1 flex items-center justify-center py-10">
        {/* If list empty */}
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <Image
              src="https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758310328/rentverse-base/image_17_hsznyz.png"
              alt="No rents illustration"
              width={240}
              height={240}
              className="w-60 h-60 object-contain"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-sans font-medium text-slate-900">
              Your rental list is still empty
            </h3>
            <p className="text-base text-slate-500 leading-relaxed">
              Explore properties to get your best rental property
            </p>
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default RentsPage