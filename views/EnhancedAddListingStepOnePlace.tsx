'use client'

import { useState, useEffect } from 'react'
import { getPropertyTypesForListing } from '@/data/searchbox-options'
import { usePropertyListingStore } from '@/stores/propertyListingStore'

function EnhancedAddListingStepOnePlace() {
  const { data, updateData, markStepCompleted } = usePropertyListingStore()
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(data.propertyType || '')
  const propertyTypes = getPropertyTypesForListing() // Using the filtered list

  // Update store when selection changes
  useEffect(() => {
    if (selectedPropertyType) {
      updateData({ propertyType: selectedPropertyType })
      // Mark this step as completed when a valid selection is made
      markStepCompleted(2) // This is step index 2 in the sequence
    }
  }, [selectedPropertyType, updateData, markStepCompleted])

  const handlePropertyTypeSelect = (propertyName: string) => {
    setSelectedPropertyType(propertyName)
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900">
            Which of these best describes your place?
          </h2>
          <p className="text-lg text-slate-600">
            This helps us categorize your property and show it to the right guests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {propertyTypes.map((propertyType) => (
            <button
              key={propertyType.name}
              onClick={() => handlePropertyTypeSelect(propertyType.name)}
              className={`
                p-6 border-2 rounded-xl transition-all duration-200 text-left
                hover:border-slate-400 hover:shadow-md cursor-pointer
                ${selectedPropertyType === propertyType.name
                  ? 'border-teal-500 bg-teal-50 shadow-md'
                  : 'border-slate-200 bg-white'
                }
              `}
            >
              <div className="space-y-3">
                <div className="text-3xl">{propertyType.icon}</div>
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">{propertyType.name}</div>
                  <div className="text-sm text-slate-600">{propertyType.description}</div>
                </div>
                {selectedPropertyType === propertyType.name && (
                  <div className="flex items-center text-teal-600 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Selected
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedPropertyType && (
          <div className="text-center text-sm text-slate-600 bg-green-50 border border-green-200 rounded-lg p-4">
            Great choice! You selected <strong>{selectedPropertyType}</strong>. 
            Click &quot;Next&quot; to continue to the next step.
          </div>
        )}
      </div>
    </div>
  )
}

export default EnhancedAddListingStepOnePlace