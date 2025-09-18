'use client'

import { useRouter } from 'next/navigation'
import ButtonCircle from '@/components/ButtonCircle'
import { ArrowLeft, Share, Heart } from 'lucide-react'
import clsx from 'clsx'

interface BarPropertyProps {
  title: string
}

function BarProperty(props: BarPropertyProps) {
  const router = useRouter()

  const handleBackButton = () => {
    router.back()
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-4 bg-white border-b border-gray-100">
      {/* Left side - Back button and title */}
      <div className="flex items-center space-x-3">
        <ButtonCircle icon={<ArrowLeft />} onClick={handleBackButton} />
        <h1 className="text-lg font-semibold text-gray-900">
          {props.title}
        </h1>
      </div>

      {/* Right side - Share and Favourites buttons */}
      <div className="flex items-center space-x-4">
        <button className={clsx([
          'flex items-center space-x-2 text-gray-600 cursor-pointer',
          'hover:underline hover:text-gray-900 transition-colors',
        ])}>
          <Share size={14} />
          <span className="text-sm font-medium">Share</span>
        </button>
        <button className={clsx([
          'flex items-center space-x-2 text-gray-600 cursor-pointer',
          'hover:underline hover:text-gray-900 transition-colors',
        ])}>
          <Heart size={14} />
          <span className="text-sm font-medium">Add to Favourites</span>
        </button>
      </div>
    </div>
  )
}

export default BarProperty