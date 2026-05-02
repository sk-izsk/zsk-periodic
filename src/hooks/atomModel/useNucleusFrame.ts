import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import type * as THREE from 'three'

export const useNucleusFrame = (
  groupRef: RefObject<THREE.Group | null>,
  paused: boolean,
  speedMul: number,
) => {
  useFrame((state, delta) => {
    if (!groupRef.current || paused) {
      return
    }

    groupRef.current.rotation.y -= delta * 0.5 * speedMul
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })
}
