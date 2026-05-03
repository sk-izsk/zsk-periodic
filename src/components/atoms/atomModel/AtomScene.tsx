import type { Element } from '@/data/elements/elements'
import { useAtomSceneFrame } from '@/hooks/atomModel/useAtomSceneFrame'
import { useAtomShells } from '@/hooks/useAtomShells'
import { getNeutronCount } from '@/utils/atomModel'
import { useMemo, useRef } from 'react'
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

export const AtomScene: React.FC<AtomSceneProps> = ({
  element,
  paused,
  speed,
  topView,
  darkMode,
  neutronOverride,
  onShellHover,
}) => {
  const atomRef = useRef<THREE.Group>(null)
  const shells = useAtomShells(element)
  const neutrons = useMemo(
    () => neutronOverride ?? getNeutronCount(element.mass, element.n),
    [element.mass, element.n, neutronOverride],
  )

  useAtomSceneFrame({ atomRef, elementNumber: element.n, neutrons, paused, speed, topView })

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
