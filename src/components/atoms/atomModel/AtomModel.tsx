import type { Element } from '@/data/elements/elements'
import { useAtomShells } from '@/hooks/useAtomShells'
import { getAtomTextColors, SHELL_NAMES } from '@/utils/atomModel'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import {
  canvas,
  configPill,
  footer,
  glow,
  isotopePill,
  pillTone,
  root,
  rootSize,
  rootTone,
  shellHint,
  shellHintTone,
  topPill,
} from './atomModel.css'
import { AtomOrbitControls } from './AtomOrbitControls'
import { AtomScene } from './AtomScene'

interface AtomModelProps {
  element: Element
  bg?: string
  height?: number
  fill?: boolean
  paused?: boolean
  speed?: number
  topView?: boolean
  resetToken?: number
  neutronOverride?: number
  isotopeLabel?: string
  cameraMode?: 'desktop' | 'mobile'
  overlayInsetRight?: number
}

const AtomModel: React.FC<AtomModelProps> = ({
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
  cameraMode = 'desktop',
  overlayInsetRight = 54,
}) => {
  const [hoveredShell, setHoveredShell] = useState<number | null>(null)
  const shells = useAtomShells(element)
  const { isLight, isDarkMode } = useMemo(() => getAtomTextColors(bg), [bg])
  const cameraPosition = useMemo<[number, number, number]>(() => {
    if (cameraMode === 'mobile') {
      return topView ? [0, 0, 38] : [0, 7, 37]
    }

    return topView ? [0, 0, 31] : [0, 6, 30]
  }, [cameraMode, topView])
  const fov = cameraMode === 'mobile' ? (topView ? 48 : 52) : topView ? 42 : 46
  const tone = isLight ? 'light' : 'dark'

  return (
    <div
      className={clsx(
        root,
        rootTone[tone],
        rootSize[fill || height === 320 ? (fill ? 'fill' : 'fixed') : 'fixed'],
      )}
    >
      <div className={glow} />
      <div className={clsx(topPill, configPill, pillTone[tone])}>{element.config}</div>

      {hoveredShell !== null && (
        <div className={clsx(shellHint, shellHintTone[tone])}>
          Shell {SHELL_NAMES[hoveredShell]} · {shells[hoveredShell]} electron
          {shells[hoveredShell] !== 1 ? 's' : ''}
        </div>
      )}

      {isotopeLabel && (
        <div
          className={clsx(
            'atom-isotope-pulse',
            topPill,
            isotopePill,
            pillTone[isLight ? 'light' : 'isotopeDark'],
          )}
          style={{ right: overlayInsetRight }}
        >
          {isotopeLabel} · {neutronOverride}n
        </div>
      )}

      <Canvas
        camera={{ position: cameraPosition, fov }}
        gl={{ antialias: true, alpha: true }}
        className={canvas}
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
        <div className={footer}>
          {element.sym} · {element.config}
        </div>
      )}
    </div>
  )
}

export default AtomModel
