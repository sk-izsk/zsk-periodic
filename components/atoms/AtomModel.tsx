'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import type { Element } from '@/lib/elements';

// Electron shell configuration from atomic number
function getShells(n: number): number[] {
  const shells: number[] = [];
  const config = [2, 8, 18, 32, 32, 18, 8];
  let remaining = n;
  for (const cap of config) {
    if (remaining <= 0) break;
    const fill = Math.min(remaining, cap);
    shells.push(fill);
    remaining -= fill;
  }
  return shells;
}

function Nucleus({ protons }: { protons: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (meshRef.current) meshRef.current.rotation.y += dt * 0.5; });
  const radius = Math.cbrt(protons) * 0.18 + 0.25;
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={0.4} />
    </mesh>
  );
}

function Shell({ radius, electrons, speed }: { radius: number; electrons: number; speed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (groupRef.current) groupRef.current.rotation.y += dt * speed; });

  const positions = useMemo(() => {
    return Array.from({ length: electrons }, (_, i) => {
      const angle = (i / electrons) * Math.PI * 2;
      return [Math.cos(angle) * radius, Math.sin(angle) * 0.05, Math.sin(angle) * radius] as [number, number, number];
    });
  }, [electrons, radius]);

  return (
    <group ref={groupRef}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 8, 80]} />
        <meshStandardMaterial color="#3b82f6" opacity={0.4} transparent />
      </mesh>
      {/* Electrons */}
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#60a5fa" emissive="#1e3a8a" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

interface Props {
  element: Element;
}

export default function AtomModel({ element }: Props) {
  const shells = getShells(element.n);

  return (
    <div style={{ width: '100%', height: 320, borderRadius: 12, overflow: 'hidden', background: '#0f0f1a' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Nucleus protons={element.n} />
        {shells.map((count, i) => (
          <Shell key={i} radius={(i + 1) * 1.1 + 0.4} electrons={count} speed={0.6 / (i + 1)} />
        ))}
        <OrbitControls enablePan={false} />
      </Canvas>
      <div style={{ textAlign: 'center', padding: '8px 0', fontSize: 12, color: '#888', background: '#0f0f1a' }}>
        {element.sym} — {element.config}
      </div>
    </div>
  );
}
