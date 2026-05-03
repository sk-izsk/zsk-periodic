import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import type * as THREE from 'three'

interface UseNucleusFrameProps {
  groupRef: RefObject<THREE.Group | null>
  paused: boolean
  speedMul: number
}

export const useNucleusFrame = ({ groupRef, paused, speedMul }: UseNucleusFrameProps) => {
  useFrame((state, delta) => {
    if (!groupRef.current || paused) {
      return
    }

    groupRef.current.rotation.y -= delta * 0.5 * speedMul
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })
}
