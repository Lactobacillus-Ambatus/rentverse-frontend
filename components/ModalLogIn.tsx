'use client'

import Link from 'next/link'
import clsx from 'clsx'
import React, { ChangeEvent } from 'react'
import { ArrowLeft } from 'lucide-react'
import BoxError from '@/components/BoxError'
import InputPassword from '@/components/InputPassword'
import FilledButton from '@/components/FilledButton'
import useLogInStore from '@/stores/logInStore'

interface ModalLogInProps {
  isModal?: boolean
}

function ModalLogIn({ isModal = true }: ModalLogInProps) {
  const {
    password,
    isLoading,
    error,
    setPassword,
    isFormValid,
    submitLogIn
  } = useLogInStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLogIn()
  }

  const containerContent = (
    <div className={clsx([
      isModal ? 'shadow-xl' : 'border border-slate-400',
      'bg-white rounded-3xl max-w-md w-full p-8'
    ])}>
      {/* Header */}
      <div className="text-center mb-6 relative">
        <ArrowLeft size={20} className="absolute left-0 top-1 text-slate-800 cursor-pointer hover:text-slate-600" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Log in
        </h2>
        <div className="w-full h-px bg-slate-200 mt-4"></div>
      </div>

      {/* Content */}
      <div className="mb-8">
        {/* Alert box - only show when there's an error */}
        {error && (
          <div className="mb-6">
            <BoxError errorTitle={'Let\'s try that again'} errorDescription={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Section */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-3">
              Password
            </label>
            <InputPassword
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Password"
              required
              showStrengthIndicator={false}
            />
          </div>

          {/* Submit Button */}
          <FilledButton
            type="submit"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? 'Loading...' : 'Log in'}
          </FilledButton>
          
          <div className="text-center">
            <Link href={'/'} className={'underline text-slate-700 text-sm hover:text-slate-900 transition-colors'}>
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        {containerContent}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      {containerContent}
    </div>
  )
}

export default ModalLogIn
