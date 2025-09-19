'use client'

import { useState } from 'react'
import { getAllPropertyTypes } from '@/data/searchbox-options'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'

function AddListingStepOnePlace() {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('')
  const propertyTypes = getAllPropertyTypes()

  const handlePropertyTypeSelect = (propertyName: string) => {
    setSelectedPropertyType(propertyName)
  }

  return (
    <QuestionnaireWrapper>
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-slate-900 text-center">
            Which of these best describes your place?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {propertyTypes.map((propertyType) => (
              <button
                key={propertyType.name}
                onClick={() => handlePropertyTypeSelect(propertyType.name)}
                className={`
                p-6 border-2 rounded-xl transition-all duration-200 text-left
                hover:border-slate-400 hover:shadow-md cursor-pointer
                ${selectedPropertyType === propertyType.name
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-slate-200 bg-white'
                }
              `}
              >
                <div className="space-y-2">
                  <div className="text-2xl">{propertyType.icon}</div>
                  <div className="font-medium text-slate-900">{propertyType.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </QuestionnaireWrapper>
  )
}

export default AddListingStepOnePlace