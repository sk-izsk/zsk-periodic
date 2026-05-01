import { useAtomShells } from '@/hooks/useAtomShells'
import { useResettableOrbitControls } from '@/hooks/useResettableOrbitControls'
import { getAtomTextColors, SHELL_NAMES } from '@/utils/atomModel'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMemo, useState } from 'react'
import { AtomScene } from './AtomScene'
import type { AtomModelProps } from './types'

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
  const { isLight, isDarkMode, textColor } = useMemo(() => getAtomTextColors(bg), [bg])
  const cameraPosition = useMemo<[number, number, number]>(
    () => (topView ? [0, 0, 31] : [0, 6, 30]),
    [topView],
  )

  return (
    <div
      style={{
        width: '100%',
        height: fill ? '100%' : height,
        position: 'relative',
        background: bg,
        borderRadius: fill ? 0 : 12,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 52% 42%, rgba(255,255,255,0.54), transparent 27rem), radial-gradient(circle at 70% 68%, rgba(135,177,204,0.24), transparent 20rem)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 12,
          zIndex: 10,
          background: isLight ? 'rgba(255,255,255,0.74)' : 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.18)',
          borderRadius: 999,
          padding: '4px 13px',
          fontSize: 12,
          fontFamily: 'monospace',
          color: textColor,
          letterSpacing: '0.03em',
          pointerEvents: 'none',
        }}
      >
        {element.config}
      </div>

      {hoveredShell !== null && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            background: isLight ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.18)',
            borderRadius: 10,
            padding: '5px 14px',
            fontSize: 12,
            color: textColor,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Shell {SHELL_NAMES[hoveredShell]} · {shells[hoveredShell]} electron
          {shells[hoveredShell] !== 1 ? 's' : ''}
        </div>
      )}

      {isotopeLabel && (
        <div
          className="atom-isotope-pulse"
          style={{
            position: 'absolute',
            top: 10,
            right: 54,
            zIndex: 10,
            background: isLight ? 'rgba(255,255,255,0.72)' : 'rgba(34,211,238,0.16)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(34,211,238,0.35)',
            borderRadius: 999,
            padding: '4px 12px',
            fontSize: 12,
            fontFamily: 'monospace',
            color: textColor,
            letterSpacing: '0.03em',
            pointerEvents: 'none',
          }}
        >
          {isotopeLabel} · {neutronOverride}n
        </div>
      )}

      <Canvas
        camera={{ position: cameraPosition, fov: topView ? 42 : 46 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
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
        <div
          style={{
            textAlign: 'center',
            padding: '7px 0',
            fontSize: 11,
            color: '#888',
            background: bg,
            fontFamily: 'monospace',
          }}
        >
          {element.sym} · {element.config}
        </div>
      )}
    </div>
  )
}

export default AtomModel
export type { AtomModelProps }
