import { create } from 'zustand'
import type { PropertyBase, PropertiesState, SearchFilters } from '../types/property'
import type { SearchBoxState } from '../types/searchbox'

interface PropertiesActions {
  // Search box actions
  setIsWhereOpen: (isOpen: boolean) => void
  setIsDurationOpen: (isOpen: boolean) => void
  setIsTypeOpen: (isOpen: boolean) => void
  setWhereValue: (value: string) => void
  setTypeValue: (value: string) => void
  setMonthCount: (count: number) => void
  setYearCount: (count: number) => void
  incrementMonth: () => void
  decrementMonth: () => void
  incrementYear: () => void
  decrementYear: () => void
  getDurationText: () => string
  getTypeText: () => string
  handleLocationSelect: (location: { name: string }) => void
  handleTypeSelect: (type: { name: string }) => void
  resetSearchBox: () => void

  // Properties actions
  loadProperties: () => Promise<void>
  searchProperties: (filters: SearchFilters) => void
  filterProperties: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addProperty: (property: PropertyBase) => void
  updateProperty: (id: string, property: Partial<PropertyBase>) => void
  deleteProperty: (id: string) => void
  getPropertyById: (id: string) => PropertyBase | undefined
}

type PropertiesStore = SearchBoxState & PropertiesState & PropertiesActions & {
  searchFilters: SearchFilters
}

const usePropertiesStore = create<PropertiesStore>((set, get) => ({
  // Search box state
  isWhereOpen: false,
  isDurationOpen: false,
  isTypeOpen: false,
  whereValue: '',
  typeValue: '',
  monthCount: 1,
  yearCount: 0,

  // Properties state
  properties: [],
  filteredProperties: [],
  isLoading: false,
  error: null,
  searchFilters: {
    location: '',
    monthCount: 1,
    yearCount: 0,
    propertyType: '',
  },

  // Search box actions
  setIsWhereOpen: (isWhereOpen: boolean) => set({ isWhereOpen }),
  setIsDurationOpen: (isDurationOpen: boolean) => set({ isDurationOpen }),
  setIsTypeOpen: (isTypeOpen: boolean) => set({ isTypeOpen }),
  setWhereValue: (whereValue: string) => set({ whereValue }),
  setTypeValue: (typeValue: string) => set({ typeValue }),
  setMonthCount: (monthCount: number) => set({ monthCount }),
  setYearCount: (yearCount: number) => set({ yearCount }),

  incrementMonth: () => {
    const { monthCount } = get()
    if (monthCount < 11) {
      set({ monthCount: monthCount + 1 })
    } else {
      set({ monthCount: 0, yearCount: get().yearCount + 1 })
    }
  },

  decrementMonth: () => {
    const { monthCount, yearCount } = get()
    if (monthCount > 0) {
      set({ monthCount: monthCount - 1 })
    } else if (yearCount > 0) {
      set({ monthCount: 11, yearCount: yearCount - 1 })
    }
  },

  incrementYear: () => {
    set({ yearCount: get().yearCount + 1 })
  },

  decrementYear: () => {
    const { yearCount } = get()
    if (yearCount > 0) {
      set({ yearCount: yearCount - 1 })
    }
  },

  getDurationText: () => {
    const { monthCount, yearCount } = get()
    if (yearCount === 0 && monthCount === 1) {
      return '1 month'
    } else if (yearCount === 0) {
      return `${monthCount} months`
    } else if (monthCount === 0) {
      return yearCount === 1 ? '1 year' : `${yearCount} years`
    } else {
      const yearText = yearCount === 1 ? '1 year' : `${yearCount} years`
      const monthText = monthCount === 1 ? '1 month' : `${monthCount} months`
      return `${yearText} ${monthText}`
    }
  },

  getTypeText: () => {
    const { typeValue } = get()
    return typeValue || 'Property type'
  },

  handleLocationSelect: (location: { name: string }) => {
    set({
      whereValue: location.name,
      isWhereOpen: false,
    })
  },

  handleTypeSelect: (type: { name: string }) => {
    set({
      typeValue: type.name,
      isTypeOpen: false,
    })
  },

  resetSearchBox: () => set({
    isWhereOpen: false,
    isDurationOpen: false,
    isTypeOpen: false,
    whereValue: '',
    typeValue: '',
    monthCount: 1,
    yearCount: 0,
  }),

  // Properties actions
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),

  loadProperties: async () => {
    const { setLoading, setError } = get()
    setLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockProperties: PropertyBase[] = [
        {
          id: 'a4b2-1c3d-4e5f-6789-0abcde123456',
          title: 'Modern Apartment in City Center',
          location: 'George Town, Penang',
          price: 412,
          imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
          area: 1200,
          rating: 4.5,
          propertyType: 'apartment',
        },
        {
          id: 'a4b2-1c3d-4e5f-6789-0abcde123457',
          title: 'Luxury Condominium',
          location: 'Kuala Lumpur',
          price: 650,
          imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
          area: 1500,
          rating: 4.8,
          propertyType: 'condominium',
        },
        {
          id: 'a4b2-1c3d-4e5f-6789-0abcde123458',
          title: 'Beach Villa',
          location: 'Langkawi, Kedah',
          price: 850,
          imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
          area: 2000,
          rating: 4.9,
          propertyType: 'villa',
        },
        {
          id: 'a4b2-1c3d-4e5f-6789-0abcde123459',
          title: 'Cozy Townhouse',
          location: 'Malacca City, Melaka',
          price: 380,
          imageUrl: 'https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758016984/rentverse-rooms/Gemini_Generated_Image_5hdui35hdui35hdu_s34nx6.png',
          area: 900,
          rating: 4.3,
          propertyType: 'townhouse',
        },
      ]

      set({
        properties: mockProperties,
        filteredProperties: mockProperties,
      })
    } catch {
      setError('Failed to load properties. Please try again.')
    } finally {
      setLoading(false)
    }
  },

  searchProperties: (filters) => {
    set({ searchFilters: filters })
    get().filterProperties()
  },

  filterProperties: () => {
    const { properties, searchFilters } = get()

    let filtered = properties

    if (searchFilters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchFilters.location.toLowerCase()),
      )
    }

    if (searchFilters.propertyType) {
      filtered = filtered.filter(property =>
        property.propertyType.toLowerCase() === searchFilters.propertyType.toLowerCase(),
      )
    }

    set({ filteredProperties: filtered })
  },

  addProperty: (property: PropertyBase) => {
    set(state => ({
      properties: [...state.properties, property],
      filteredProperties: [...state.filteredProperties, property],
    }))
  },

  updateProperty: (id: string, updatedProperty: Partial<PropertyBase>) => {
    set(state => ({
      properties: state.properties.map(property =>
        property.id === id ? { ...property, ...updatedProperty } : property,
      ),
      filteredProperties: state.filteredProperties.map(property =>
        property.id === id ? { ...property, ...updatedProperty } : property,
      ),
    }))
  },

  deleteProperty: (id: string) => {
    set(state => ({
      properties: state.properties.filter(property => property.id !== id),
      filteredProperties: state.filteredProperties.filter(property => property.id !== id),
    }))
  },

  getPropertyById: (id: string) => {
    const { properties } = get()
    return properties.find(property => property.id === id)
  },
}))

export default usePropertiesStore
