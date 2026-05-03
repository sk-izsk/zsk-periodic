import { useMemo } from 'react'
import {
  getTorusGeometry,
  getSphereGeometry,
  getStandardMaterial,
  TRAIL_COUNT,
  getBasicMaterial,
} from '../utils/atomModel'
import * as THREE from 'three'

interface ShellAssetsParams {
  radius: number
  topView: boolean
  darkMode: boolean
  electronBaseColor: string
  electronColor: THREE.Color
}

export const useElectronShellAssets = ({
  radius,
  topView,
  darkMode,
  electronBaseColor,
  electronColor,
}: ShellAssetsParams) => {
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
      Array.from({ length: TRAIL_COUNT }, (_, i) =>
        getBasicMaterial(`trail:${electronBaseColor}:${darkMode}:${i}`, {
          color: electronColor,
          transparent: true,
          opacity: darkMode ? Math.max(0.02, 0.28 - i * 0.06) : Math.max(0.01, 0.16 - i * 0.026),
        }),
      ),
    [darkMode, electronBaseColor, electronColor],
  )
  const trailGeometries = useMemo(
    () =>
      Array.from({ length: TRAIL_COUNT }, (_, i) =>
        getSphereGeometry(Math.max(0.05, 0.18 - i * 0.018), 6, 6),
      ),
    [],
  )

  return {
    orbitGeometry,
    glowGeometry,
    hitGeometry,
    electronGeometry,
    electronMaterial,
    trailMaterials,
    trailGeometries,
  }
}
