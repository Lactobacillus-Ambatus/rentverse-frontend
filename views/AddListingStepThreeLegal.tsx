'use client'

import { useState } from 'react'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'

function AddListingStepThreeLegal() {
  const [maintenanceIncluded, setMaintenanceIncluded] = useState('')
  const [landlordType, setLandlordType] = useState('')

  const maintenanceOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ]

  const landlordOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
    { value: 'partnership', label: 'Partnership firm' },
  ]

  const handleMaintenanceSelect = (value: string) => {
    setMaintenanceIncluded(value)
  }

  const handleLandlordSelect = (value: string) => {
    setLandlordType(value)
  }

  return (
    <QuestionnaireWrapper>
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-serif text-slate-900">
              Set your legal clause
            </h2>
            <p className="text-lg text-slate-600">
              Make sure you make wise decision for legal terms
            </p>
          </div>

          {/* Maintenance Question */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-lg font-medium text-slate-900">
                Is Maintenance Included in the rent?
              </label>

              {/* Maintenance Selection Grid */}
              <div className="grid grid-cols-2 gap-4">
                {maintenanceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleMaintenanceSelect(option.value)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                      ${maintenanceIncluded === option.value
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                    }
                    `}
                  >
                    {/* Radio button indicator */}
                    <div className="flex items-center space-x-3">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                          ${maintenanceIncluded === option.value
                          ? 'border-slate-900 bg-slate-900'
                          : 'border-slate-300'
                        }
                        `}
                      >
                        {maintenanceIncluded === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={`
                          font-medium transition-colors
                          ${maintenanceIncluded === option.value
                          ? 'text-slate-900'
                          : 'text-slate-700'
                        }
                        `}
                      >
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Landlord Type Question */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-lg font-medium text-slate-900">
                Select type of landlord
              </label>

              {/* Landlord Type Selection Grid */}
              <div className="grid grid-cols-2 gap-4">
                {landlordOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleLandlordSelect(option.value)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                      ${landlordType === option.value
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                    }
                    `}
                  >
                    {/* Radio button indicator */}
                    <div className="flex items-center space-x-3">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                          ${landlordType === option.value
                          ? 'border-slate-900 bg-slate-900'
                          : 'border-slate-300'
                        }
                        `}
                      >
                        {landlordType === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={`
                          font-medium transition-colors
                          ${landlordType === option.value
                          ? 'text-slate-900'
                          : 'text-slate-700'
                        }
                        `}
                      >
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </QuestionnaireWrapper>
  )
}

export default AddListingStepThreeLegal