import { useResetTableOrbitControls } from '@/hooks/useResetTableOrbitControls'
import { OrbitControls } from '@react-three/drei'

interface AtomOrbitControlsProps {
  cameraPosition: readonly [number, number, number]
  resetToken: number
}

export const AtomOrbitControls: React.FC<AtomOrbitControlsProps> = ({
  cameraPosition,
  resetToken,
}) => {
  const controlsRef = useResetTableOrbitControls({ resetToken, cameraPosition })

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
