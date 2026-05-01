import { useAtomShells } from '@/hooks/useAtomShells'
import type { Element } from '@/lib/elements'
import { getNeutronCount } from '@/utils/atomModel'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { ElectronShell } from './ElectronShell'
import { Nucleus } from './Nucleus'

interface AtomSceneProps {
  element: Element
  paused: boolean
  speed: number
  topView: boolean
  darkMode: boolean
  neutronOverride?: number
  onShellHover: (idx: number | null) => void
}

const AtomScene = ({
  element,
  paused,
  speed,
  topView,
  darkMode,
  neutronOverride,
  onShellHover,
}: AtomSceneProps) => {
  const atomRef = useRef<THREE.Group>(null)
  const popStartRef = useRef<number | null>(null)
  const shells = useAtomShells(element)
  const neutrons = useMemo(
    () => neutronOverride ?? getNeutronCount(element.mass, element.n),
    [element.mass, element.n, neutronOverride],
  )

  useEffect(() => {
    popStartRef.current = null
    atomRef.current?.scale.set(0.1, 0.1, 0.1)
  }, [element.n, neutrons])

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

  return (
    <group ref={atomRef} dispose={null} scale={[0.1, 0.1, 0.1]}>
      <Nucleus protons={element.n} neutrons={neutrons} speedMul={speed} paused={paused} />
      {shells.map((count, index) => (
        <ElectronShell
          key={`${index}-${count}`}
          shellIndex={index}
          shellCount={shells.length}
          electrons={count}
          speedMul={speed}
          paused={paused}
          topView={topView}
          darkMode={darkMode}
          onHover={onShellHover}
        />
      ))}
    </group>
  )
}

export { AtomScene }
