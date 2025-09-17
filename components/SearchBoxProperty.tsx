'use client'

import clsx from 'clsx'
import React from 'react'
import { useRef, useEffect } from 'react'
import { Search, Plus, Minus } from 'lucide-react'
import { getAllLocations, getAllPropertyTypes } from '@/data/searchbox-options'
import useSearchBoxPropertyStore from '@/stores/searchBoxPropertyStore'

function SearchBoxProperty(props: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  const {
    isWhereOpen,
    isDurationOpen,
    isTypeOpen,
    whereValue,
    monthCount,
    yearCount,
    setIsWhereOpen,
    setIsDurationOpen,
    setIsTypeOpen,
    setWhereValue,
    incrementMonth,
    decrementMonth,
    incrementYear,
    decrementYear,
    getDurationText,
    getTypeText,
    handleLocationSelect,
    handleTypeSelect,
  } = useSearchBoxPropertyStore()

  const whereRef = useRef<HTMLDivElement>(null)
  const durationRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)
  const locations = getAllLocations()
  const propertyTypes = getAllPropertyTypes()
  const { className, ...propsRest } = props

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (whereRef.current && !whereRef.current.contains(event.target as Node)) {
        setIsWhereOpen(false)
      }
      if (durationRef.current && !durationRef.current.contains(event.target as Node)) {
        setIsDurationOpen(false)
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsWhereOpen, setIsDurationOpen, setIsTypeOpen])

  return (
    <div className={clsx(['relative', className])} {...propsRest}>
      <div
        className="flex items-center bg-white rounded-full shadow-lg border border-slate-200 p-0 max-w-4xl mx-auto overflow-hidden">
        {/* Where Section */}
        <div
          className={clsx([
            'flex-1 pl-10 pr-6 py-4 border-r border-slate-200 cursor-pointer',
            'hover:bg-slate-50',
            isWhereOpen && 'bg-slate-50',
          ])}
          onClick={() => setIsWhereOpen(true)}
        >
          <label className="block text-sm font-medium text-slate-900 mb-1">Where</label>
          <input
            type="text"
            placeholder="Search locations"
            value={whereValue}
            onChange={(e) => setWhereValue(e.target.value)}
            onFocus={() => setIsWhereOpen(true)}
            className="w-full text-sm text-slate-600 placeholder-slate-400 bg-transparent border-none outline-none"
          />
        </div>

        {/* Duration Section */}
        <div
          className={clsx([
            'flex-1 px-6 py-4 border-r border-slate-200 cursor-pointer',
            'hover:bg-slate-50',
            isDurationOpen && 'bg-slate-50',
          ])}
          onClick={() => setIsDurationOpen(!isDurationOpen)}
        >
          <label className="block text-sm font-medium text-slate-900 mb-1">Duration</label>
          <span className="text-sm text-slate-600">{getDurationText()}</span>
        </div>

        {/* Type Section */}
        <div
          className={clsx([
            'flex-1 px-6 py-4 cursor-pointer',
            'hover:bg-slate-50',
            isTypeOpen && 'bg-slate-50',
          ])}
          onClick={() => setIsTypeOpen(!isTypeOpen)}
        >
          <label className="block text-sm font-medium text-slate-900 mb-1">Type</label>
          <span className="text-sm text-slate-600">{getTypeText()}</span>
        </div>

        {/* Search Button */}
        <div className="ml-4 pr-4">
          <button
            className="flex items-center justify-center w-12 h-12 bg-teal-600 hover:bg-teal-700 rounded-full transition-colors">
            <Search size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Dropdown for Where section */}
      <div ref={whereRef}>
        {isWhereOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-200 mt-2 p-6 z-50 max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-slate-900 mb-4">Suggested locations</h3>
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {/* Search option when there's a value */}
              {whereValue && (
                <div
                  className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border-b border-slate-100 mb-2"
                  onClick={() => handleLocationSelect({ name: whereValue })}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg mr-4">
                    <Search size={20} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Search &quot;{whereValue}&quot;</div>
                    <div className="text-sm text-slate-500">Search for this location</div>
                  </div>
                </div>
              )}

              {/* Filtered locations */}
              {locations
                .filter(location =>
                  location.name.toLowerCase().includes(whereValue.toLowerCase()) ||
                  location.description.toLowerCase().includes(whereValue.toLowerCase()),
                )
                .map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg mr-4">
                      <span className="text-xl">{location.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{location.name}</div>
                      <div className="text-sm text-slate-500">{location.description}</div>
                    </div>
                  </div>
                ))}

              {/* No results message */}
              {whereValue && locations.filter(location =>
                location.name.toLowerCase().includes(whereValue.toLowerCase()) ||
                location.description.toLowerCase().includes(whereValue.toLowerCase()),
              ).length === 0 && (
                <div className="flex items-center p-3 text-slate-500">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg mr-4">
                    <Search size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-600">No locations found</div>
                    <div className="text-sm text-slate-400">Try searching for a different location</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dropdown for Duration section */}
      <div ref={durationRef}>
        {isDurationOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-200 mt-2 p-6 z-50 max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Month Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Month</div>
                  <div className="text-sm text-slate-500">Rent monthly</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementMonth}
                    className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-full hover:border-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={monthCount === 0}
                  >
                    <Minus size={16} className="text-slate-600" />
                  </button>
                  <span className="w-8 text-center font-medium text-slate-900">{monthCount}</span>
                  <button
                    onClick={incrementMonth}
                    className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-full hover:border-slate-400 transition-colors"
                  >
                    <Plus size={16} className="text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Year Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Year</div>
                  <div className="text-sm text-slate-500">Rent yearly</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementYear}
                    className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-full hover:border-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={yearCount === 0}
                  >
                    <Minus size={16} className="text-slate-600" />
                  </button>
                  <span className="w-8 text-center font-medium text-slate-900">{yearCount}</span>
                  <button
                    onClick={incrementYear}
                    className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-full hover:border-slate-400 transition-colors"
                  >
                    <Plus size={16} className="text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dropdown for Type section */}
      <div ref={typeRef}>
        {isTypeOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-200 mt-2 p-6 z-50 max-w-4xl mx-auto">
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {propertyTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleTypeSelect(type)}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg mr-4">
                    <span className="text-xl">{type.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{type.name}</div>
                    <div className="text-sm text-slate-500">{type.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBoxProperty
