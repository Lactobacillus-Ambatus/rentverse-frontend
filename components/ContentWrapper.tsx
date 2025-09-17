import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

interface ContentWrapperProps {
  children: React.ReactNode
  withFooter?: boolean
}

function ContentWrapper({ children, withFooter = true }: ContentWrapperProps) {
  return (
    <>
      <NavBar />
      <div className="mt-24">
        {children}
      </div>
      {withFooter && <Footer />}
    </>
  )
}

export default ContentWrapper
