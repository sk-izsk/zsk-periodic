import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AnimationStore {
  animationSpeed: number
  setAnimationSpeed: (speed: number) => void
  animationsPaused: boolean
  setAnimationsPaused: (paused: boolean) => void
}

const clampAnimationSpeed = (speed: number) => Math.max(0.1, Math.min(2, speed))

export const useAnimationStore = create<AnimationStore>()(
  persist(
    (set) => ({
      animationSpeed: 1,
      setAnimationSpeed: (speed) => set({ animationSpeed: clampAnimationSpeed(speed) }),
      animationsPaused: false,
      setAnimationsPaused: (paused) => set({ animationsPaused: paused }),
    }),
    { name: 'zperiod_animation_v1' },
  ),
)
