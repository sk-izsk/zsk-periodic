import { useNucleusFrame } from '@/hooks/atomModel/useNucleusFrame'
import { buildNucleusParticles, getSphereGeometry, getStandardMaterial } from '@/utils/atomModel'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface NucleusProps {
  protons: number
  neutrons: number
  speedMul: number
  paused: boolean
}

export const Nucleus: React.FC<NucleusProps> = ({ protons, neutrons, speedMul, paused }) => {
  const groupRef = useRef<THREE.Group>(null)
  const particles = useMemo(() => buildNucleusParticles(protons, neutrons), [protons, neutrons])
  const protonMat = useMemo(
    () =>
      getStandardMaterial('nucleus:proton', {
        color: 0xff2222,
        roughness: 0.25,
        metalness: 0.4,
        emissive: new THREE.Color(0xff0000),
        emissiveIntensity: 1.5,
      }),
    [],
  )
  const neutronMat = useMemo(
    () =>
      getStandardMaterial('nucleus:neutron', {
        color: 0x999999,
        roughness: 0.15,
        metalness: 0.5,
        emissive: new THREE.Color(0x333333),
        emissiveIntensity: 0.6,
      }),
    [],
  )
  const particleGeometry = useMemo(() => getSphereGeometry(0.35, 14, 14), [])

  useNucleusFrame({ groupRef, paused, speedMul })

  return (
    <group ref={groupRef} dispose={null}>
      {protons > 1 && <pointLight color={0xff2200} intensity={2.2} distance={14} />}
      {particles.map(({ pos, kind }, index) => (
        <mesh
          key={index}
          geometry={particleGeometry}
          material={kind === 'proton' ? protonMat : neutronMat}
          position={pos}
        />
      ))}
    </group>
  )
}
