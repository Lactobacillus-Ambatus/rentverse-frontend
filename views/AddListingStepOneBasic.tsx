'use client'

import { useState } from 'react'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'

function AddListingStepOneBasic() {
  const [bedrooms, setBedrooms] = useState(0)
  const [bathrooms, setBathrooms] = useState(1)
  const [indoorArea, setIndoorArea] = useState('')
  const [outdoorArea, setOutdoorArea] = useState('')
  const [plotSize, setPlotSize] = useState('')

  const incrementCount = (value: number, setter: (val: number) => void) => {
    setter(value + 1)
  }

  const decrementCount = (value: number, setter: (val: number) => void) => {
    if (value > 0) {
      setter(value - 1)
    }
  }

  return (
    <QuestionnaireWrapper>
      <div className="max-w-6xl w-full mx-auto p-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-serif text-slate-900">
              Share some basics about your place
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              You&apos;ll add more details later, like bed types.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-8">
            {/* Bedrooms */}
            <div className="flex items-center justify-between py-4 border-b border-slate-200">
              <span className="text-lg text-slate-900">Bedrooms</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decrementCount(bedrooms, setBedrooms)}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-slate-400 transition-colors"
                  disabled={bedrooms === 0}
                >
                  <span className="text-lg leading-none">−</span>
                </button>
                <span className="text-lg font-medium text-slate-900 min-w-[3rem] text-center">
                  {bedrooms === 0 ? 'Studio' : bedrooms}
                </span>
                <button
                  onClick={() => incrementCount(bedrooms, setBedrooms)}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-slate-400 transition-colors"
                >
                  <span className="text-lg leading-none">+</span>
                </button>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center justify-between py-4 border-b border-slate-200">
              <span className="text-lg text-slate-900">Bathrooms</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decrementCount(bathrooms, setBathrooms)}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-slate-400 transition-colors"
                  disabled={bathrooms === 0}
                >
                  <span className="text-lg leading-none">−</span>
                </button>
                <span className="text-lg font-medium text-slate-900 min-w-[2rem] text-center">
                  {bathrooms}
                </span>
                <button
                  onClick={() => incrementCount(bathrooms, setBathrooms)}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-slate-400 transition-colors"
                >
                  <span className="text-lg leading-none">+</span>
                </button>
              </div>
            </div>

            {/* Indoor area */}
            <div className="space-y-3">
              <label className="block text-lg text-slate-900">Indoor area</label>
              <div className="relative">
                <input
                  type="number"
                  value={indoorArea}
                  onChange={(e) => setIndoorArea(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 pr-12 text-base border border-slate-200 rounded-full bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                  Sqft
                </span>
              </div>
              <p className="text-sm text-slate-500">
                All space between a floor and a ceiling that is covered by walls, doorways, or windows.
              </p>
            </div>

            {/* Outdoor area */}
            <div className="space-y-3">
              <label className="block text-lg text-slate-900">Outdoor area</label>
              <div className="relative">
                <input
                  type="number"
                  value={outdoorArea}
                  onChange={(e) => setOutdoorArea(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 pr-12 text-base border border-slate-200 rounded-full bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                  Sqft
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Combined size of the terrace, pool, parking area, and sala. Do not include the size of the garden.
              </p>
            </div>

            {/* Plot size */}
            <div className="space-y-3">
              <label className="block text-lg text-slate-900">Plot size</label>
              <div className="relative">
                <input
                  type="number"
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 pr-12 text-base border border-slate-200 rounded-full bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                  Sqft
                </span>
              </div>
              <p className="text-sm text-slate-500">
                A land plot is a parcel of land that has defined boundaries (or borders) and is registered with the
                local government.
              </p>
            </div>
          </div>
        </div>
      </div>
    </QuestionnaireWrapper>
  )
}

export default AddListingStepOneBasic