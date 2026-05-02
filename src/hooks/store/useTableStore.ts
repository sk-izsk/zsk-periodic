import { useElementSelectionStore } from '@/stores/elementSelectionStore'
import { useFilterStore } from '@/stores/filterStore'
import { useSearchStore } from '@/stores/searchStore'

export const useSelectedElement = () => useElementSelectionStore((s) => s.selectedElement)
export const useSetSelectedElement = () => useElementSelectionStore((s) => s.setSelectedElement)
export const useFilterCategory = () => useFilterStore((s) => s.filterCategory)
export const useSetFilterCategory = () => useFilterStore((s) => s.setFilterCategory)
export const useSearchQuery = () => useSearchStore((s) => s.searchQuery)
export const useSetSearchQuery = () => useSearchStore((s) => s.setSearchQuery)
