import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

export const useResettableOrbitControls = (
  resetToken: number,
  cameraPosition: readonly [number, number, number],
) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const { camera } = useThree()

  // useLayoutEffect fires synchronously before browser paint and before R3F's
  // RAF-based useFrame, so the camera is at the reset position when drei's
  // controls.update() runs on the next frame.
  useLayoutEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    camera.position.set(...cameraPosition)
    camera.zoom = 1
    camera.updateProjectionMatrix()
    controls.target.set(0, 0, 0)
    controls.update()
    controls.saveState()
  }, [camera, cameraPosition, resetToken])

  return controlsRef
}
