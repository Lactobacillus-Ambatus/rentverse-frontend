'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { User, LogOut, Settings } from 'lucide-react'
import useAuthStore from '@/stores/authStore'
import useCurrentUser from '@/hooks/useCurrentUser'

interface UserDropdownProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

function UserDropdown({ isOpen, onClose, className }: UserDropdownProps): React.ReactNode {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = useCurrentUser()
  const { logout } = useAuthStore()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle ESC key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleLogout = () => {
    logout()
    onClose()
    // Redirect to home
    window.location.href = '/'
  }

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className={clsx([
        'absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg',
        'border border-slate-200 py-2 z-50',
        className
      ])}
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-sm font-medium text-slate-900">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-sm text-slate-500 truncate">
          {user?.email}
        </p>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <Link
          href="/account"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <User size={16} className="mr-3 text-slate-400" />
          Account
        </Link>
        
        <Link
          href="/account/settings"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Settings size={16} className="mr-3 text-slate-400" />
          Settings
        </Link>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 py-1">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} className="mr-3 text-red-500" />
          Log out
        </button>
      </div>
    </div>
  )
}

export default UserDropdown