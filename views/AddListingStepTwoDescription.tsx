'use client'

import { useState } from 'react'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'

function AddListingStepTwoDescription() {
  const [description, setDescription] = useState('')
  const maxLength = 500

  return (
    <QuestionnaireWrapper>
      <div className="max-w-6xl w-full mx-auto space-y-6 mt-10">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-2xl font-serif text-slate-900">
            Create your description
          </h2>
          <p className="text-base text-slate-500 leading-relaxed">
            Share what makes your place special.
          </p>
        </div>

        {/* Textarea Field */}
        <div className="space-y-2">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={maxLength}
          className="w-full px-4 py-4 text-base border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none min-h-[120px]"
          rows={5}
          placeholder="Surround yourself with style in this standout space..."
        />

          {/* Character Counter */}
          <div className="text-sm text-slate-400 text-left">
            {description.length}/{maxLength}
          </div>
        </div>
      </div>
    </QuestionnaireWrapper>
  )
}

export default AddListingStepTwoDescription