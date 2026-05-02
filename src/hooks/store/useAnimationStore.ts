import { useAnimationStore as useAnimationState } from '@/stores/animationStore'

export const useAnimationSpeed = () => useAnimationState((s) => s.animationSpeed)
export const useSetAnimationSpeed = () => useAnimationState((s) => s.setAnimationSpeed)
export const useAnimationsPaused = () => useAnimationState((s) => s.animationsPaused)
export const useSetAnimationsPaused = () => useAnimationState((s) => s.setAnimationsPaused)
