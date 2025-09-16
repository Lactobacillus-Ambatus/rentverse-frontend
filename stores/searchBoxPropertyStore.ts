import { create } from 'zustand'
import { SearchBoxPropertyStore } from './types'

const useSearchBoxPropertyStore = create<SearchBoxPropertyStore>((set, get) => ({
  // State
  isWhereOpen: false,
  isDurationOpen: false,
  isTypeOpen: false,
  whereValue: '',
  typeValue: '',
  monthCount: 0,
  yearCount: 0,

  // Actions
  setIsWhereOpen: (isOpen: boolean) => set({ isWhereOpen: isOpen }),
  setIsDurationOpen: (isOpen: boolean) => set({ isDurationOpen: isOpen }),
  setIsTypeOpen: (isOpen: boolean) => set({ isTypeOpen: isOpen }),
  setWhereValue: (value: string) => set({ whereValue: value }),
  setTypeValue: (value: string) => set({ typeValue: value }),
  setMonthCount: (count: number) => set({ monthCount: Math.max(0, count) }),
  setYearCount: (count: number) => set({ yearCount: Math.max(0, count) }),

  incrementMonth: () => set((state) => ({ monthCount: state.monthCount + 1 })),
  decrementMonth: () => set((state) => ({ monthCount: Math.max(0, state.monthCount - 1) })),
  incrementYear: () => set((state) => ({ yearCount: state.yearCount + 1 })),
  decrementYear: () => set((state) => ({ yearCount: Math.max(0, state.yearCount - 1) })),

  getDurationText: () => {
    const { monthCount, yearCount } = get()
    const parts = []
    if (monthCount > 0) parts.push(`${monthCount} month${monthCount !== 1 ? 's' : ''}`)
    if (yearCount > 0) parts.push(`${yearCount} year${yearCount !== 1 ? 's' : ''}`)
    return parts.length > 0 ? parts.join(', ') : 'Add duration'
  },

  getTypeText: () => {
    const { typeValue } = get()
    return typeValue || 'Select property type'
  },

  handleLocationSelect: (location: { name: string }) => {
    set({
      whereValue: location.name,
      isWhereOpen: false
    })
  },

  handleTypeSelect: (type: { name: string }) => {
    set({
      typeValue: type.name,
      isTypeOpen: false
    })
  },

  resetState: () => set({
    isWhereOpen: false,
    isDurationOpen: false,
    isTypeOpen: false,
    whereValue: '',
    typeValue: '',
    monthCount: 0,
    yearCount: 0,
  }),
}))

export default useSearchBoxPropertyStore
