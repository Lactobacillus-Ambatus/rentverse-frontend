'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ContentWrapper from '@/components/ContentWrapper'
import ButtonCircle from '@/components/ButtonCircle'
import { ArrowLeft } from 'lucide-react'
import { usePropertyTypes } from '@/hooks/usePropertyTypes'

function ModifyPropertyPage() {
  const router = useRouter()
  const { propertyTypes, isLoading } = usePropertyTypes()
  const [formData, setFormData] = useState({
    title: 'Tijani Raja Dewa - Apartements',
    description: 'Lorem ipsum dolor sit amet consectetur ut',
    propertyType: 'Apartments',
    photos: '5 items selected',
    details: '1000 Sqft • 1 Bedroom',
    location: '',
  })

  const handleBack = () => {
    router.back()
  }

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving property:', formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <ContentWrapper>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <ButtonCircle icon={<ArrowLeft />} onClick={handleBack} />
        <h1 className="text-2xl font-sans font-medium text-slate-900">
          Listing editor
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Form */}
        <div className="space-y-8">
          {/* Title Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter property title"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Enter property description"
            />
          </div>

          {/* Property Type Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Property type
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={isLoading}
            >
              {isLoading ? (
                <option value="">Loading property types...</option>
              ) : (
                propertyTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Photos Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Photos
            </label>
            <div
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-between">
              <span>{formData.photos}</span>
              <button className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
                Manage Photos
              </button>
            </div>
          </div>

          {/* Details Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Details
            </label>
            <input
              type="text"
              value={formData.details}
              onChange={(e) => handleInputChange('details', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., 1000 Sqft • 1 Bedroom"
            />
          </div>

          {/* Location Field */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter property location"
            />
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="space-y-6">
          {/* Character Count */}
          <div className="flex justify-end">
            <span className="text-sm text-slate-400">
              {formData.title.length}/50 available
            </span>
          </div>

          {/* Preview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="space-y-6">
              {/* Preview Title */}
              <div>
                <h2 className="text-3xl font-serif text-slate-900 mb-2">
                  {formData.title || 'Property Title'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {formData.description || 'Property description will appear here...'}
                </p>
              </div>

              {/* Preview Image Placeholder */}
              <div className="w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-slate-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500">Property photos will appear here</p>
                </div>
              </div>

              {/* Preview Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {formData.propertyType}
                  </span>
                </div>

                {formData.details && (
                  <p className="text-slate-600">{formData.details}</p>
                )}

                {formData.location && (
                  <p className="text-slate-500 text-sm">{formData.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default ModifyPropertyPage