import { useAtomShells } from '@/hooks/useAtomShells'
import { useResettableOrbitControls } from '@/hooks/useResettableOrbitControls'
import { getAtomTextColors, SHELL_NAMES } from '@/utils/atomModel'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { AtomScene } from './AtomScene'
import * as styles from './atomModel.css'
import type { AtomModelProps } from '@/types/atomModel'

interface AtomOrbitControlsProps {
  cameraPosition: readonly [number, number, number]
  resetToken: number
}

const AtomOrbitControls = ({ cameraPosition, resetToken }: AtomOrbitControlsProps) => {
  const controlsRef = useResettableOrbitControls(resetToken, cameraPosition)

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={5}
      maxDistance={55}
      target={[0, 0, 0]}
    />
  )
}

const AtomModel = ({
  element,
  bg = '#0f0f1a',
  height = 320,
  fill = false,
  paused = false,
  speed = 1,
  topView = false,
  resetToken = 0,
  neutronOverride,
  isotopeLabel,
}: AtomModelProps) => {
  const [hoveredShell, setHoveredShell] = useState<number | null>(null)
  const shells = useAtomShells(element)
  const { isLight, isDarkMode } = useMemo(() => getAtomTextColors(bg), [bg])
  const cameraPosition = useMemo<[number, number, number]>(
    () => (topView ? [0, 0, 31] : [0, 6, 30]),
    [topView],
  )
  const tone = isLight ? 'light' : 'dark'

  return (
    <div
      className={clsx(
        styles.root,
        styles.rootTone[tone],
        styles.rootSize[fill || height === 320 ? (fill ? 'fill' : 'fixed') : 'fixed'],
      )}
    >
      <div className={styles.glow} />
      <div className={clsx(styles.topPill, styles.configPill, styles.pillTone[tone])}>
        {element.config}
      </div>

      {hoveredShell !== null && (
        <div className={clsx(styles.shellHint, styles.shellHintTone[tone])}>
          Shell {SHELL_NAMES[hoveredShell]} · {shells[hoveredShell]} electron
          {shells[hoveredShell] !== 1 ? 's' : ''}
        </div>
      )}

      {isotopeLabel && (
        <div
          className={clsx(
            'atom-isotope-pulse',
            styles.topPill,
            styles.isotopePill,
            styles.pillTone[isLight ? 'light' : 'isotopeDark'],
          )}
        >
          {isotopeLabel} · {neutronOverride}n
        </div>
      )}

      <Canvas
        camera={{ position: cameraPosition, fov: topView ? 42 : 46 }}
        gl={{ antialias: true, alpha: true }}
        className={styles.canvas}
      >
        <ambientLight intensity={isDarkMode ? 0.85 : 1.25} />
        <directionalLight position={[10, 12, 12]} intensity={isDarkMode ? 0.7 : 0.72} />
        <directionalLight position={[-8, 5, 4]} intensity={isDarkMode ? 0.28 : 0.35} />
        {isDarkMode && <pointLight position={[0, 0, 10]} intensity={0.95} color={0x8b5b2d} />}
        <AtomScene
          element={element}
          paused={paused}
          speed={speed}
          topView={topView}
          darkMode={isDarkMode}
          neutronOverride={neutronOverride}
          onShellHover={setHoveredShell}
        />
        <AtomOrbitControls cameraPosition={cameraPosition} resetToken={resetToken} />
      </Canvas>

      {!fill && (
        <div className={styles.footer}>
          {element.sym} · {element.config}
        </div>
      )}
    </div>
  )
}

export default AtomModel
export type { AtomModelProps }
