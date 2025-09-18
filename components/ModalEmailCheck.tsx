'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import InputEmail from './InputEmail'
import ButtonFilled from './ButtonFilled'
import useAuthStore from '@/stores/authStore'

interface ModalEmailCheckProps {
  isModal?: boolean
}

function ModalEmailCheck({ isModal = true }: ModalEmailCheckProps) {
  const router = useRouter()
  const {
    email,
    isLoading,
    error,
    setEmail,
    validateEmail,
    submitEmailCheck,
  } = useAuthStore()

  const isEmailValid = validateEmail(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = (await submitEmailCheck()) as { exists?: boolean } | undefined
    const exists = Boolean(data?.exists)
    router.push(exists ? '/auth/login' : '/auth/signup')
  }

  const containerContent = (
    <div className={clsx([
      isModal ? 'shadow-xl' : 'border border-slate-400',
      'bg-white rounded-3xl max-w-md w-full p-8',
    ])}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Log in or sign up
        </h2>
        <div className="w-full h-px bg-slate-200 mt-4"></div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <p className="text-lg text-slate-600 text-center mb-6">
          Welcome to Rentverse
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <InputEmail
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Continue Button */}
          <ButtonFilled
            type="submit"
            disabled={!isEmailValid || isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </ButtonFilled>
        </form>
      </div>
    </div>
  )

  if (isModal) {
    // Render as floating modal with backdrop
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        {containerContent}
      </div>
    )
  }

  // Render as regular container without backdrop
  return (
    <div className="flex items-center justify-center p-4">
      {containerContent}
    </div>
  )
}

export default ModalEmailCheck
