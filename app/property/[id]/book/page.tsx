'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ContentWrapper from '@/components/ContentWrapper'
import ButtonCircle from '@/components/ButtonCircle'
import { ArrowLeft } from 'lucide-react'

function BookingPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  const handleBack = () => {
    router.back()
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <ContentWrapper>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <ButtonCircle icon={<ArrowLeft />} onClick={handleBack} />
        <h1 className="text-2xl font-sans font-medium text-slate-900">
          Request to book
        </h1>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form */}
        <div className="space-y-8">
          {/* Step 1 - Payment Method */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-slate-900">1.</span>
              <h2 className="text-lg font-semibold text-slate-900">Add payment method</h2>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                  VISA
                </div>
                <span className="text-slate-600">Visa credit card</span>
              </div>
              <button className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
                Change
              </button>
            </div>
          </div>

          {/* Step 2 - Message to Host */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-slate-900">2.</span>
              <h2 className="text-lg font-semibold text-slate-900">Write a message to the host</h2>
            </div>

            <p className="text-slate-600 text-sm">
              Let your host know a little about your visit and why their place is a good fit for you.
            </p>

            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell your message in here"
                className="w-full h-32 px-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 - Review Request */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-slate-900">3.</span>
              <h2 className="text-lg font-semibold text-slate-900">Review your request</h2>
            </div>
          </div>
        </div>

        {/* Right side - Property Summary */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="space-y-6">
              {/* Property Image */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png"
                  alt="Property"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-xs font-medium text-slate-700">
                  Apartment
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-3">
                <p className="text-sm text-slate-500">Panji, Kota Bharu, Kelantan, Malaysia</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Tijani Raja Dewa - Apartements
                </h3>
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Dates</span>
                  <button className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
                    Change
                  </button>
                </div>
                <p className="text-sm text-slate-600">Sep 22 - Oct 22, 2025</p>
              </div>

              {/* Price Details */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700">Price details</h4>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">1 month × RM 550</span>
                  <span className="text-slate-900">RM 550</span>
                </div>

                <div className="flex justify-between text-sm font-medium border-t border-slate-200 pt-3">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">RM 550</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default BookingPage