import { create } from 'zustand'
import type { Element } from '@/data/elements/elements'

interface ElementSelectionStore {
  selectedElement: Element | null
  setSelectedElement: (el: Element | null) => void
}

export const useElementSelectionStore = create<ElementSelectionStore>()((set) => ({
  selectedElement: null,
  setSelectedElement: (el) => set({ selectedElement: el }),
}))
