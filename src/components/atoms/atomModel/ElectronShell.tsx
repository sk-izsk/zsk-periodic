import { useElectronShellFrame } from '@/hooks/atomModel/useElectronShellFrame'
import {
  ELECTRON_COLORS,
  ELECTRON_COLORS_DARK,
  SHELL_COLORS,
  SHELL_COLORS_DARK,
} from '@/utils/atomModel'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useElectronShellAssets } from '../../../hooks/useElectronShellAssets'
import { ElectronParticle } from './ElectronParticle'

export interface ElectronShellProps {
  shellIndex: number
  shellCount: number
  electrons: number
  speedMul: number
  paused: boolean
  topView: boolean
  darkMode: boolean
  onHover: (idx: number | null) => void
}

export const ElectronShell: React.FC<ElectronShellProps> = ({
  shellIndex,
  shellCount,
  electrons,
  speedMul,
  paused,
  topView,
  darkMode,
  onHover,
}) => {
  const wobbleRef = useRef<THREE.Group>(null)
  const electronRefs = useRef<(THREE.Mesh | null)[]>([])
  const trailRefs = useRef<(THREE.Mesh | null)[][]>([])
  const [hovered, setHovered] = useState(false)

  const minRadius = shellCount === 1 ? 8.4 : 3.25
  const maxRadius = shellCount === 1 ? 8.4 : 11.8
  const step = shellCount > 1 ? (maxRadius - minRadius) / (shellCount - 1) : 0
  const radius = minRadius + shellIndex * step
  const shellSpeed = 0.022 / (1 + shellIndex * 0.45)

  const shellPalette = darkMode ? SHELL_COLORS_DARK : SHELL_COLORS
  const electronPalette = darkMode ? ELECTRON_COLORS_DARK : ELECTRON_COLORS
  const color = shellPalette[shellIndex % shellPalette.length]
  const electronBaseColor = electronPalette[shellIndex % electronPalette.length]
  const electronColor = useMemo(() => new THREE.Color(electronBaseColor), [electronBaseColor])

  const {
    orbitGeometry,
    glowGeometry,
    hitGeometry,
    electronGeometry,
    electronMaterial,
    trailMaterials,
    trailGeometries,
  } = useElectronShellAssets({ radius, topView, darkMode, electronBaseColor, electronColor })

  const angles = useElectronShellFrame({
    wobbleRef,
    electronRefs,
    trailRefs,
    electrons,
    radius,
    shellSpeed,
    speedMul,
    paused,
    topView,
  })

  // Render-time opacity values
  const orbitRotation: [number, number, number] = topView ? [0, 0, 0] : [Math.PI / 2, 0, 0]
  const orbitOpacity = darkMode ? 0.72 : 0.78
  const glowOpacity = hovered ? (darkMode ? 0.34 : 0.52) : darkMode ? 0.18 : 0.34
  const hoverOrbitOpacity = darkMode ? 0.98 : 0.92

  return (
    <group
      ref={wobbleRef}
      dispose={null}
      rotation={topView ? [0, 0, 0] : [shellIndex * 0.18, shellIndex * 0.22, shellIndex * 0.1]}
    >
      {/* Orbit ring */}
      <mesh geometry={orbitGeometry} rotation={orbitRotation}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? hoverOrbitOpacity : orbitOpacity}
        />
      </mesh>

      {/* Glow ring */}
      <mesh geometry={glowGeometry} rotation={orbitRotation}>
        <meshBasicMaterial color={color} transparent opacity={glowOpacity} depthWrite={false} />
      </mesh>

      {/* Invisible hit area for hover detection */}
      <mesh
        geometry={hitGeometry}
        rotation={orbitRotation}
        onPointerOver={() => {
          setHovered(true)
          onHover(shellIndex)
        }}
        onPointerOut={() => {
          setHovered(false)
          onHover(null)
        }}
      >
        <meshBasicMaterial transparent opacity={0.001} />
      </mesh>

      {/* Electrons + trails */}
      {Array.from({ length: electrons }, (_, electronIndex) => (
        <ElectronParticle
          key={electronIndex}
          electronIndex={electronIndex}
          angles={angles}
          radius={radius}
          topView={topView}
          electronRefs={electronRefs}
          trailRefs={trailRefs}
          electronGeometry={electronGeometry}
          electronMaterial={electronMaterial}
          trailGeometries={trailGeometries}
          trailMaterials={trailMaterials}
        />
      ))}
    </group>
  )
}
