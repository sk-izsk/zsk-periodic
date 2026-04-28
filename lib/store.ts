import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Element, ElementCategory } from './elements';
import {
    APP_SETTINGS_STORAGE_KEY,
    DEFAULT_LANGUAGE,
    isSupportedLanguage,
} from './i18n/config';
import type { AppLanguage } from './i18n/types';

export type MassUnit = 'highSchool' | 'universityConventional';

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
  language: AppLanguage;
  setLanguage: (lang: string) => void;

  // Motion
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  animationsPaused: boolean;
  setAnimationsPaused: (paused: boolean) => void;

  // Global units
  massUnit: MassUnit;
  setMassUnit: (unit: MassUnit) => void;

  // Onboarding state
  onboardingSeen: boolean;
  setOnboardingSeen: (seen: boolean) => void;
  resetOnboarding: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      selectedElement: null,
      filterCategory: null,
      searchQuery: '',
      setSelectedElement: (el) => set({ selectedElement: el }),
      setFilterCategory: (cat) => set((s) => ({ filterCategory: s.filterCategory === cat ? null : cat })),
      setSearchQuery: (q) => set({ searchQuery: q }),

      darkMode: true,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      language: DEFAULT_LANGUAGE,
      setLanguage: (lang) => {
        if (!isSupportedLanguage(lang)) return;
        set({ language: lang });
      },

      animationSpeed: 1,
      setAnimationSpeed: (speed) => set({ animationSpeed: Math.max(0.1, Math.min(2, speed)) }),
      animationsPaused: false,
      setAnimationsPaused: (paused) => set({ animationsPaused: paused }),

      massUnit: 'highSchool',
      setMassUnit: (unit) => set({ massUnit: unit }),

      onboardingSeen: false,
      setOnboardingSeen: (seen) => set({ onboardingSeen: seen }),
      resetOnboarding: () => set({ onboardingSeen: false }),
    }),
    {
      name: APP_SETTINGS_STORAGE_KEY,
      partialize: (state) => ({
        darkMode: state.darkMode,
        language: state.language,
        animationSpeed: state.animationSpeed,
        animationsPaused: state.animationsPaused,
        massUnit: state.massUnit,
        onboardingSeen: state.onboardingSeen,
      }),
    }
  )
);
