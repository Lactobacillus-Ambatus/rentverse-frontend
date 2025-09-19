'use client'

import { useState } from 'react'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'
import ButtonCircle from '@/components/ButtonCircle'
import { Pen } from 'lucide-react'

function AddListingStepThreePrice() {
  const [price, setPrice] = useState(950)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setPrice(value)
  }

  const handlePriceBlur = () => {
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  return (
    <QuestionnaireWrapper>
      <div className="max-w-2xl mx-auto p-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-serif text-slate-900">
              Now, set a rent price
            </h2>
            <p className="text-lg text-slate-500">
              You can edit the price later
            </p>
          </div>

          {/* Price Display */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              {isEditing ? (
                <div className="flex items-center">
                  <span className="text-6xl font-serif text-slate-900">RM</span>
                  <input
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    onBlur={handlePriceBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    className="text-6xl font-serif text-slate-900 bg-transparent border-none outline-none text-left ml-1"
                    style={{ width: `${price.toString().length + 1}ch` }}
                  />
                </div>
              ) : (
                <span className="text-6xl font-serif text-slate-900">
                  RM{price}
                </span>
              )}
              <ButtonCircle icon={<Pen size={20} />} onClick={handleEditClick} />
            </div>
            <p className="text-lg text-slate-500">per month</p>
          </div>

          {/* Recommendation Button */}
          <div className="flex justify-center">
            <button
              className="flex items-center space-x-3 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors duration-200">
              <span className="font-medium">Get recommendation price</span>
              <div className="px-3 py-1 bg-white text-teal-600 rounded-full text-sm font-bold">
                RevAI
              </div>
            </button>
          </div>
        </div>
      </div>
    </QuestionnaireWrapper>
  )
}

export default AddListingStepThreePrice
