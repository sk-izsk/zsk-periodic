import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: 'zperiod_theme_v1' },
  ),
)
