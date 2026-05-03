import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

interface UseAtomSceneFrameProps {
  atomRef: RefObject<THREE.Group | null>
  elementNumber: number
  neutrons: number
  paused: boolean
  speed: number
  topView: boolean
}

export const useAtomSceneFrame = ({
  atomRef,
  elementNumber,
  neutrons,
  paused,
  speed,
  topView,
}: UseAtomSceneFrameProps) => {
  const popStartRef = useRef<number | null>(null)

  useEffect(() => {
    popStartRef.current = null
    atomRef.current?.scale.set(0.1, 0.1, 0.1)
  }, [atomRef, elementNumber, neutrons])

  useFrame((state) => {
    if (!atomRef.current) {
      return
    }

    if (popStartRef.current == null) {
      popStartRef.current = state.clock.elapsedTime
    }

    if (topView) {
      atomRef.current.rotation.set(0, 0, 0)
    }

    const elapsed = state.clock.elapsedTime - popStartRef.current
    if (elapsed < 0.6) {
      const ease = 1 - Math.pow(1 - elapsed / 0.6, 3)
      const scale = 0.1 + 0.9 * ease
      atomRef.current.scale.set(scale, scale, scale)
      return
    }

    atomRef.current.scale.set(1, 1, 1)
    if (!paused && !topView) {
      atomRef.current.rotation.y += 0.002 * speed
    }
  })
}
