import { create } from 'zustand';
import type { Element, ElementCategory } from './elements';

interface AppStore {
  // Table state
  selectedElement: Element | null;
  filterCategory: ElementCategory | null;
  searchQuery: string;
  setSelectedElement: (el: Element | null) => void;
  setFilterCategory: (cat: ElementCategory | null) => void;
  setSearchQuery: (q: string) => void;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Language
  language: string;
  setLanguage: (lang: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedElement: null,
  filterCategory: null,
  searchQuery: '',
  setSelectedElement: (el) => set({ selectedElement: el }),
  setFilterCategory: (cat) => set((s) => ({ filterCategory: s.filterCategory === cat ? null : cat })),
  setSearchQuery: (q) => set({ searchQuery: q }),

  darkMode: false,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}));
