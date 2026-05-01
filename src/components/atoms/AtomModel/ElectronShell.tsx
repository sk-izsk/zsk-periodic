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
import { useFrame } from '@react-three/fiber'
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

const ElectronShell = ({
  shellIndex,
  shellCount,
  electrons,
  speedMul,
  paused,
  topView,
  darkMode,
  onHover,
}: ElectronShellProps) => {
  const wobbleRef = useRef<THREE.Group>(null)
  const electronRefs = useRef<(THREE.Mesh | null)[]>([])
  const trailRefs = useRef<(THREE.Mesh | null)[][]>([])
  const angles = useRef<number[]>(
    Array.from(
      { length: electrons },
      (_, electronIndex) => (electronIndex / electrons) * Math.PI * 2,
    ),
  )
  const [hovered, setHovered] = useState(false)

  const minRadius = shellCount === 1 ? 8.6 : 3.7
  const maxRadius = shellCount === 1 ? 8.6 : 11.4
  const step = shellCount > 1 ? (maxRadius - minRadius) / (shellCount - 1) : 0
  const radius = minRadius + shellIndex * step
  const shellSpeed = 0.018 / (shellIndex + 1)
  const shellPalette = darkMode ? SHELL_COLORS_DARK : SHELL_COLORS
  const electronPalette = darkMode ? ELECTRON_COLORS_DARK : ELECTRON_COLORS
  const color = shellPalette[shellIndex % shellPalette.length]
  const electronBaseColor = electronPalette[shellIndex % electronPalette.length]
  const electronColor = useMemo(() => new THREE.Color(electronBaseColor), [electronBaseColor])
  const orbitGeometry = useMemo(() => getTorusGeometry(radius, 0.05, 14, 80), [radius])
  const hitGeometry = useMemo(() => getTorusGeometry(radius, 0.55, 8, 40), [radius])
  const electronGeometry = useMemo(
    () => getSphereGeometry(darkMode ? 0.215 : 0.19, 14, 14),
    [darkMode],
  )
  const electronMaterial = useMemo(
    () =>
      getStandardMaterial(`electron:${electronBaseColor}:${darkMode}`, {
        color: electronColor,
        roughness: darkMode ? 0.22 : 0.35,
        metalness: darkMode ? 0.62 : 0.5,
        emissive: electronColor,
        emissiveIntensity: darkMode ? 1.12 : 0.24,
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
  const hoverRingColor = darkMode ? '#fff27a' : '#ffaa00'
  const orbitOpacity = darkMode ? 0.62 : 0.45
  const hoverOrbitOpacity = darkMode ? 0.98 : 0.92

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

      for (let trailIndex = trails.length - 1; trailIndex > 0; trailIndex--) {
        const current = trails[trailIndex]
        const previous = trails[trailIndex - 1]
        if (current && previous) {
          current.position.copy(previous.position)
        }
      }

      trails[0]?.position.copy(electron.position)
    }
  })

  return (
    <group
      ref={wobbleRef}
      dispose={null}
      rotation={topView ? [0, 0, 0] : [shellIndex * 0.18, shellIndex * 0.22, shellIndex * 0.1]}
    >
      <mesh geometry={orbitGeometry} rotation={orbitRotation}>
        <meshBasicMaterial
          color={hovered ? hoverRingColor : color}
          transparent
          opacity={hovered ? hoverOrbitOpacity : orbitOpacity}
        />
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

export default ElectronShell
