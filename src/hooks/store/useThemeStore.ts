import { useThemeStore as useThemeState } from '@/stores/themeStore'

export const useDarkMode = () => useThemeState((s) => s.darkMode)
export const useToggleDarkMode = () => useThemeState((s) => s.toggleDarkMode)
