import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

import type { SearchBoxType } from '@/types/searchbox'

interface ContentWrapperProps {
  children: React.ReactNode
  withFooter?: boolean
  searchBoxType?: SearchBoxType
}

function ContentWrapper({ children, withFooter = true, searchBoxType = 'none' }: ContentWrapperProps): React.ReactNode {
  return (
    <>
      <NavBar searchBoxType={searchBoxType} />
      <div className={searchBoxType === 'full' ? 'mt-48' : 'mt-24'}>
        {children}
      </div>
      {withFooter && <Footer />}
    </>
  )
}

export default ContentWrapper
