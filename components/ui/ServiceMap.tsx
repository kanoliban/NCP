'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface ServiceMapProps {
  center: {
    lat: number
    lng: number
  }
  coverage: {
    name: string
    coordinates: number[]
  }[]
  hoveredCity: string | null
}

export default function ServiceMap({ center, coverage, hoveredCity }: ServiceMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [key: string]: L.Marker }>({})
  const circleRef = useRef<L.Circle | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!mapRef.current) {
        // Initialize map
        mapRef.current = L.map('service-map', {
          center: [center.lat, center.lng],
          zoom: 11,
          zoomControl: false,
          attributionControl: false,
        })

        // Add light theme tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
        }).addTo(mapRef.current)

        // Add service radius circle
        circleRef.current = L.circle([center.lat, center.lng], {
          color: '#0A5C99',
          fillColor: '#1E88E5',
          fillOpacity: 0.1,
          weight: 2,
          radius: 24140, // 15 miles in meters
        }).addTo(mapRef.current)

        // Add markers for each coverage area
        coverage.forEach((area) => {
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div class="relative">
                <div class="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div class="w-6 h-6 bg-[#0A5C99] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ${area.name.charAt(0)}
                  </div>
                </div>
              </div>
            `,
          })

          const marker = L.marker([area.coordinates[0], area.coordinates[1]], {
            icon: customIcon,
          })
            .bindTooltip(area.name, {
              permanent: false,
              direction: 'top',
              className: 'custom-tooltip',
            })
            .addTo(mapRef.current)

          markersRef.current[area.name] = marker
        })
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Handle hover effects
  useEffect(() => {
    if (mapRef.current) {
      Object.entries(markersRef.current).forEach(([cityName, marker]) => {
        const element = marker.getElement()
        if (element) {
          if (hoveredCity === cityName) {
            element.classList.add('custom-marker-active')
            marker.setZIndexOffset(1000)
          } else {
            element.classList.remove('custom-marker-active')
            marker.setZIndexOffset(0)
          }
        }
      })
    }
  }, [hoveredCity])

  // Update map center when it changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], 11, {
        animate: true,
        duration: 0.8,
      })
    }
  }, [center])

  return <div id="service-map" className="h-full w-full" />
}