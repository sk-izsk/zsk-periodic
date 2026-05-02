import { create } from 'zustand'
import type { ElementCategory } from '@/data/elements/elements'

interface FilterStore {
  filterCategory: ElementCategory | null
  setFilterCategory: (cat: ElementCategory | null) => void
}

export const useFilterStore = create<FilterStore>()((set) => ({
  filterCategory: null,
  setFilterCategory: (cat) =>
    set((state) => ({ filterCategory: state.filterCategory === cat ? null : cat })),
}))
