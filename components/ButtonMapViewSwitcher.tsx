'use client'

import React from 'react'
import { Map, LayoutList } from 'lucide-react'
import ButtonFilledSlate from '@/components/ButtonFilledSlate'

interface ButtonMapviewSwitcher extends React.HTMLAttributes<HTMLSpanElement> {
  onClick: () => void
  isMapView: boolean
}

function ButtonMapViewSwitcher({ onClick, isMapView, ...props }: ButtonMapviewSwitcher) {
  const { className, ...otherProps } = props

  return isMapView ? (
    <ButtonFilledSlate
      onClick={onClick}
      label={'List View'}
      className={className}
      iconRight={<LayoutList size={20} {...otherProps} />}
    />
  ) : (
    <ButtonFilledSlate
      onClick={onClick}
      label={'Map View'}
      className={className}
      iconRight={<Map size={20} {...otherProps} />}
    />
  )
}

export default ButtonMapViewSwitcher
