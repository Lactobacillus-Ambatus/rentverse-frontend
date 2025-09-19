import Image from 'next/image'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'


function AddListingStepTwo() {
  return (
    <QuestionnaireWrapper>
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="text-lg text-slate-600 font-medium">Step 2</span>
              <h1 className="text-4xl font-semibold text-slate-900 leading-tight">
                Make your place stand out
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll
                create a title and description.
              </p>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <Image
              width={640}
              height={640}
              alt="Step 1: Tell us about your place"
              className="w-80 h-80 lg:w-96 lg:h-96"
              src="https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758249314/rentverse-base/image_12_ffs0nz.png"
            />
          </div>
        </div>
      </div>
    </QuestionnaireWrapper>
  )
}

export default AddListingStepTwo
