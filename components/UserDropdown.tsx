'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { User, Settings, Home, Heart, Search, LogOut, Calendar } from 'lucide-react'
import useAuthStore from '@/stores/authStore'
import useCurrentUser from '@/hooks/useCurrentUser'

interface UserDropdownProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

function UserDropdown({ isOpen, onClose, className }: Readonly<UserDropdownProps>): React.ReactNode {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = useCurrentUser()
  const { logout } = useAuthStore()

  // Generate initials from first and last name
  const getInitials = (firstName: string, lastName: string): string => {
    const firstInitial = firstName?.charAt(0)?.toUpperCase() || ''
    const lastInitial = lastName?.charAt(0)?.toUpperCase() || ''
    
    // If we have both, use both. If only one, use that one. If none, use email first letter
    if (firstInitial && lastInitial) {
      return firstInitial + lastInitial
    } else if (firstInitial) {
      return firstInitial
    } else if (lastInitial) {
      return lastInitial
    } else {
      return user?.email?.charAt(0)?.toUpperCase() || 'U'
    }
  }

  // Get full name
  const getFullName = (): string => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    } else if (user?.name) {
      return user.name
    } else if (user?.firstName) {
      return user.firstName
    } else if (user?.lastName) {
      return user.lastName
    }
    return 'User'
  }

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

  const fullName = getFullName()
  const initials = getInitials(user?.firstName || '', user?.lastName || '')

  return (
    <div
      ref={dropdownRef}
      className={clsx([
        'absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg',
        'border border-slate-200 py-3 z-50',
        className
      ])}
    >
      {/* Welcome Header with Profile Photo */}
      <div className="px-4 py-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          {/* Profile Photo/Initials */}
          <div className="w-12 h-12 rounded-full bg-teal-600 text-white font-semibold flex items-center justify-center text-lg">
            {initials}
          </div>
          
          {/* Welcome Message */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">
              Welcome,
            </p>
            <p className="text-base font-semibold text-slate-900 truncate">
              {fullName}
            </p>
          </div>
        </div>
        
        {/* Email */}
        <div className="mt-3">
          <p className="text-sm text-slate-500 truncate">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <Link
          href="/account"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
        >
          <User size={18} className="mr-3 text-slate-400" />
          <span className="font-medium">Account</span>
        </Link>
        
        <Link
          href="/property"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
        >
          <Search size={18} className="mr-3 text-slate-400" />
          <span className="font-medium">Search Property</span>
        </Link>
        
        <Link
          href="/account/settings"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
        >
          <Settings size={18} className="mr-3 text-slate-400" />
          <span className="font-medium">Settings</span>
        </Link>
        
        <Link
          href="/property/all"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
        >
          <Home size={18} className="mr-3 text-slate-400" />
          <span className="font-medium">My listings</span>
        </Link>
        
        <Link
          href="/rents"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
        >
          <Calendar size={18} className="mr-3 text-slate-400" />
          <span className="font-medium">My rents</span>
        </Link>
        
        <Link
          href="/wishlist"
          onClick={onClose}
          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
        >
          <Heart size={18} className="mr-3 text-slate-400" />
          <span className="font-medium">My wishlists</span>
        </Link>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 py-2">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut size={18} className="mr-3 text-red-500" />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </div>
  )
}

export default UserDropdown