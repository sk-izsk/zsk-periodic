import * as THREE from 'three'

interface ElectronParticleProps {
  electronIndex: number
  angles: React.RefObject<number[]>
  radius: number
  topView: boolean
  electronRefs: React.RefObject<(THREE.Mesh | null)[]>
  trailRefs: React.RefObject<(THREE.Mesh | null)[][]>
  electronGeometry: THREE.SphereGeometry
  electronMaterial: THREE.MeshStandardMaterial
  trailGeometries: THREE.SphereGeometry[]
  trailMaterials: THREE.MeshBasicMaterial[]
}

export const ElectronParticle: React.FC<ElectronParticleProps> = ({
  electronIndex,
  angles,
  radius,
  topView,
  electronRefs,
  trailRefs,
  electronGeometry,
  electronMaterial,
  trailGeometries,
  trailMaterials,
}) => {
  const x = radius * Math.cos(angles.current[electronIndex])
  const yz = radius * Math.sin(angles.current[electronIndex])
  const basePos: [number, number, number] = topView ? [x, yz, 0] : [x, 0, yz]

  return (
    <group>
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
}
