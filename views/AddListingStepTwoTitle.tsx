'use client'

import { useState } from 'react'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'

function AddListingStepTwoTitle() {
  const [title, setTitle] = useState('')
  const maxLength = 50

  return (
    <QuestionnaireWrapper>
      <div className="max-w-6xl w-full mx-auto space-y-6 mt-10">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-2xl font-serif text-slate-900">
            Now, let&apos;s give your house a title
          </h2>
          <p className="text-base text-slate-500 leading-relaxed">
            Short titles work best. Have fun with it you can always change it later.
          </p>
        </div>

        {/* Input Field */}
        <div className="space-y-2">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={maxLength}
          className="w-full px-4 py-4 text-base border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Enter your property title..."
        />

          {/* Character Counter */}
          <div className="text-sm text-slate-400 text-left">
            {title.length}/{maxLength}
          </div>
        </div>
      </div>
    </QuestionnaireWrapper>
  )
}

export default AddListingStepTwoTitle