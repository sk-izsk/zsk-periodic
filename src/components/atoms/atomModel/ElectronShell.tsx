import { useElectronShellFrame } from '@/hooks/atomModel/useElectronShellFrame'
import {
  ELECTRON_COLORS,
  ELECTRON_COLORS_DARK,
  getBasicMaterial,
  getSphereGeometry,
  getStandardMaterial,
  getTorusGeometry,
  SHELL_COLORS,
  SHELL_COLORS_DARK,
  TRAIL_COUNT,
} from '@/utils/atomModel'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

interface ElectronShellProps {
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
  const orbitGeometry = useMemo(
    () => getTorusGeometry(radius, topView ? 0.075 : 0.13, 18, 112),
    [radius, topView],
  )
  const glowGeometry = useMemo(
    () => getTorusGeometry(radius, topView ? 0.2 : 0.38, 16, 112),
    [radius, topView],
  )
  const hitGeometry = useMemo(() => getTorusGeometry(radius, 0.7, 8, 40), [radius])
  const electronGeometry = useMemo(
    () => getSphereGeometry(topView ? 0.18 : darkMode ? 0.3 : 0.27, 16, 16),
    [darkMode, topView],
  )
  const electronMaterial = useMemo(
    () =>
      getStandardMaterial(`electron:${electronBaseColor}:${darkMode}`, {
        color: electronColor,
        roughness: darkMode ? 0.22 : 0.35,
        metalness: darkMode ? 0.62 : 0.5,
        emissive: electronColor,
        emissiveIntensity: darkMode ? 1.15 : 0.38,
      }),
    [darkMode, electronBaseColor, electronColor],
  )
  const trailMaterials = useMemo(
    () =>
      Array.from({ length: TRAIL_COUNT }, (_, trailIndex) =>
        getBasicMaterial(`trail:${electronBaseColor}:${darkMode}:${trailIndex}`, {
          color: electronColor,
          transparent: true,
          opacity: darkMode
            ? Math.max(0.02, 0.28 - trailIndex * 0.06)
            : Math.max(0.01, 0.16 - trailIndex * 0.026),
        }),
      ),
    [darkMode, electronBaseColor, electronColor],
  )
  const trailGeometries = useMemo(
    () =>
      Array.from({ length: TRAIL_COUNT }, (_, trailIndex) =>
        getSphereGeometry(Math.max(0.05, 0.18 - trailIndex * 0.018), 6, 6),
      ),
    [],
  )
  const orbitRotation: [number, number, number] = topView ? [0, 0, 0] : [Math.PI / 2, 0, 0]
  const orbitOpacity = darkMode ? 0.72 : 0.78
  const glowOpacity = hovered ? (darkMode ? 0.34 : 0.52) : darkMode ? 0.18 : 0.34
  const hoverOrbitOpacity = darkMode ? 0.98 : 0.92
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

  return (
    <group
      ref={wobbleRef}
      dispose={null}
      rotation={topView ? [0, 0, 0] : [shellIndex * 0.18, shellIndex * 0.22, shellIndex * 0.1]}
    >
      <mesh geometry={orbitGeometry} rotation={orbitRotation}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? hoverOrbitOpacity : orbitOpacity}
        />
      </mesh>
      <mesh geometry={glowGeometry} rotation={orbitRotation}>
        <meshBasicMaterial color={color} transparent opacity={glowOpacity} depthWrite={false} />
      </mesh>
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
      {Array.from({ length: electrons }, (_, electronIndex) => {
        const x = radius * Math.cos(angles.current[electronIndex])
        const yz = radius * Math.sin(angles.current[electronIndex])
        const basePos: [number, number, number] = topView ? [x, yz, 0] : [x, 0, yz]

        return (
          <group key={electronIndex}>
            <mesh
              ref={(mesh) => {
                electronRefs.current[electronIndex] = mesh
              }}
              geometry={electronGeometry}
              material={electronMaterial}
              position={basePos}
            />
            {trailGeometries.map((trailGeometry, trailIndex) => (
              <mesh
                key={trailIndex}
                ref={(mesh) => {
                  if (!trailRefs.current[electronIndex]) {
                    trailRefs.current[electronIndex] = []
                  }
                  trailRefs.current[electronIndex][trailIndex] = mesh
                }}
                geometry={trailGeometry}
                material={trailMaterials[trailIndex]}
                position={basePos}
              />
            ))}
          </group>
        )
      })}
    </group>
  )
}
