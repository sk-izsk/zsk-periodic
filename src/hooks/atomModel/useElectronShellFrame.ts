import { TRAIL_COUNT } from '@/utils/atomModel'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { RefObject } from 'react'
import type * as THREE from 'three'

export const useElectronShellFrame = (
  wobbleRef: RefObject<THREE.Group | null>,
  electronRefs: RefObject<(THREE.Mesh | null)[]>,
  trailRefs: RefObject<(THREE.Mesh | null)[][]>,
  electrons: number,
  radius: number,
  shellSpeed: number,
  speedMul: number,
  paused: boolean,
  topView: boolean,
) => {
  const angles = useRef<number[]>(
    Array.from(
      { length: electrons },
      (_, electronIndex) => (electronIndex / electrons) * Math.PI * 2,
    ),
  )

  useFrame((state, delta) => {
    if (wobbleRef.current) {
      if (topView) {
        wobbleRef.current.rotation.set(0, 0, 0)
      } else if (!paused) {
        wobbleRef.current.rotation.y += 0.001 * speedMul
        wobbleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 * speedMul) * 0.06
      }
    }

    if (paused) {
      return
    }

    for (let electronIndex = 0; electronIndex < electrons; electronIndex++) {
      angles.current[electronIndex] += shellSpeed * speedMul * 60 * delta

      const electron = electronRefs.current[electronIndex]
      if (!electron) {
        continue
      }

      const x = radius * Math.cos(angles.current[electronIndex])
      const yz = radius * Math.sin(angles.current[electronIndex])

      electron.position.set(x, topView ? yz : 0, topView ? 0 : yz)

      const trails = trailRefs.current[electronIndex]
      if (!trails) {
        continue
      }

      for (
        let trailIndex = Math.min(trails.length, TRAIL_COUNT) - 1;
        trailIndex > 0;
        trailIndex--
      ) {
        const current = trails[trailIndex]
        const previous = trails[trailIndex - 1]
        if (current && previous) {
          current.position.copy(previous.position)
        }
      }

      trails[0]?.position.copy(electron.position)
    }
  })

  return angles
}
