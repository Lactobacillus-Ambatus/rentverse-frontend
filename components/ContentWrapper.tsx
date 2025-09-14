import React from 'react'

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-24">
      {children}
    </div>
  )
}

export default ContentWrapper
