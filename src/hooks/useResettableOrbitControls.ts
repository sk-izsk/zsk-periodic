import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useEffect, useRef } from 'react'

export const useResettableOrbitControls = (resetToken: number) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)

  useEffect(() => {
    controlsRef.current?.reset()
  }, [resetToken])

  return controlsRef
}
