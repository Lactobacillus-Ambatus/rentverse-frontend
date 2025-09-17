import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import TextAction from '@/components/TextAction'
import SignUpButton from '@/components/SignUpButton'
import LanguageSelector from '@/components/LanguageSelector'
import SearchBoxProperty from '@/components/SearchBoxProperty'
import SearchBoxPropertyMini from '@/components/SearchBoxPropertyMini'

import type { SearchBoxType } from '@/types/searchbox'

interface NavBarTopProps {
  searchBoxType?: SearchBoxType
}

function NavBarTop({ searchBoxType = 'none' }: NavBarTopProps): React.ReactNode {
  return (
    <div className={clsx([
      'w-full fixed z-50',
      'px-6 py-4 bg-white top-0 list-none border-b border-slate-200',
    ])}>
      <div className={clsx([
        'w-full flex items-center justify-between relative',
        searchBoxType === 'full' && 'mb-8',
      ])}>
        <Image
          src="/logo-nav.png"
          alt="Logo Rentverse"
          className="w-auto h-12"
          width={150}
          height={48} />

        {searchBoxType === 'compact' && <SearchBoxPropertyMini className="hidden lg:block absolute ml-[16%]" />}

        <nav className="hidden md:flex items-center space-x-8">
          <li>
            <TextAction href={'/'} text={'List your property'} />
          </li>
          <li>
            <LanguageSelector />
          </li>
          <li>
            <SignUpButton />
          </li>
        </nav>
      </div>
      {searchBoxType === 'full' && <SearchBoxProperty className="hidden lg:block" />}
    </div>
  )
}

export default NavBarTop