import { useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

export const useResettableOrbitControls = (
  resetToken: number,
  cameraPosition: readonly [number, number, number],
) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const { camera } = useThree()

  useLayoutEffect(() => {
    const controls = controlsRef.current
    if (!controls) {
      return
    }

    camera.position.set(...cameraPosition)
    camera.zoom = 1
    camera.updateProjectionMatrix()
    controls.target.set(0, 0, 0)
    controls.update()
    controls.saveState()
  }, [camera, cameraPosition, resetToken])

  return controlsRef
}
