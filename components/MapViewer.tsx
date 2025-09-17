'use client'

import React, { useRef, useEffect, useCallback, memo } from 'react'
import * as maptilersdk from '@maptiler/sdk'

interface MapViewerProps {
  center?: {
    lng: number
    lat: number
  }
  zoom?: number
  style?: string
  className?: string
  height?: string
  width?: string
  markers?: Array<{
    lng: number
    lat: number
    popup?: string
    color?: string
  }>
  onMapLoad?: (map: maptilersdk.Map) => void
  onMapClick?: (coordinates: { lng: number; lat: number }) => void
  interactive?: boolean
}

const MapViewer = memo(function MapViewer({
                                            center = { lng: 139.753, lat: 35.6844 }, // Default to Tokyo
                                            zoom = 14,
                                            style = 'streets-v2',
                                            className = '',
                                            height = '100%',
                                            width = '100%',
                                            markers = [],
                                            onMapLoad,
                                            onMapClick,
                                            interactive = true,
                                          }: MapViewerProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const markersRef = useRef<maptilersdk.Marker[]>([])

  // Initialize API key once
  useEffect(() => {
    if (!maptilersdk.config.apiKey) {
      maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API || ''
    }
  }, [])

  // Clear existing markers
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []
  }, [])

  // Add markers to map
  const addMarkers = useCallback((mapInstance: maptilersdk.Map) => {
    clearMarkers()

    markers.forEach(markerData => {
      const marker = new maptilersdk.Marker({
        color: markerData.color || '#3B82F6',
      })
        .setLngLat([markerData.lng, markerData.lat])
        .addTo(mapInstance)

      if (markerData.popup) {
        const popup = new maptilersdk.Popup({ offset: 25 })
          .setHTML(markerData.popup)
        marker.setPopup(popup)
      }

      markersRef.current.push(marker)
    })
  }, [markers, clearMarkers])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: style,
      center: [center.lng, center.lat],
      zoom: zoom,
      interactive: interactive,
    })

    // Handle map load event
    map.current.on('load', () => {
      if (map.current && onMapLoad) {
        onMapLoad(map.current)
      }
    })

    // Handle map click event
    if (onMapClick) {
      map.current.on('click', (e) => {
        onMapClick({
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
        })
      })
    }

    return () => {
      clearMarkers()
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [style, center.lng, center.lat, zoom, interactive, onMapLoad, onMapClick, clearMarkers])

  // Update map center and zoom when props change
  useEffect(() => {
    if (map.current) {
      map.current.flyTo({
        center: [center.lng, center.lat],
        zoom: zoom,
        duration: 1000,
      })
    }
  }, [center.lng, center.lat, zoom])

  // Update markers when markers prop changes
  useEffect(() => {
    if (map.current) {
      addMarkers(map.current)
    }
  }, [markers, addMarkers])

  // Update map style when style prop changes
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(style)
    }
  }, [style])

  return (
    <div
      className={`map-wrap ${className} rounded-3xl overflow-hidden`}
      style={{ height, width }}
    >
      <div
        ref={mapContainer}
        className="map w-full h-full rounded-3xl overflow-hidden"
        style={{
          height: '100%',
          width: '100%',
          boxShadow: 'none',
        }}
      />
    </div>
  )
})

export default MapViewer
