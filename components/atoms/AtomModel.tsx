import type { Element } from '@/lib/elements';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// ─── Per-shell colors (matching original soft palette) ───────────────────────
const SHELL_COLORS = [
  '#ff6b6b',
  '#ff9f43',
  '#ffe66d',
  '#7bed9f',
  '#70a1ff',
  '#a29bfe',
  '#f78fb3',
];
const SHELL_COLORS_DARK = [
  '#ff7f7f',
  '#ffb36b',
  '#ffe98f',
  '#94f5ba',
  '#8cb6ff',
  '#b7abff',
  '#ff9ac0',
];
const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

// ─── Fibonacci sphere distribution ───────────────────────────────────────────
function fibonacciPositions(n: number, scale: number): THREE.Vector3[] {
  const phi = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const k = i + 0.5;
    const y = 1 - (k / n) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * k;
    const j = 0.1;
    return new THREE.Vector3(
      Math.cos(theta) * r * scale + (Math.random() - 0.5) * j,
      y * scale + (Math.random() - 0.5) * j,
      Math.sin(theta) * r * scale + (Math.random() - 0.5) * j,
    );
  });
}

type Particle = { pos: THREE.Vector3; kind: 'proton' | 'neutron' };

function buildNucleusParticles(protons: number, neutrons: number): Particle[] {
  const total = protons + neutrons;
  const pRadius = 0.35;
  const scale = Math.pow(total, 1 / 3) * pRadius * 0.8;
  const kinds: ('proton' | 'neutron')[] = [
    ...Array<'proton'>(protons).fill('proton'),
    ...Array<'neutron'>(neutrons).fill('neutron'),
  ];
  for (let i = kinds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kinds[i], kinds[j]] = [kinds[j], kinds[i]];
  }
  let particles: Particle[];
  if (total === 1) {
    particles = [{ pos: new THREE.Vector3(0, 0, 0), kind: kinds[0] }];
  } else if (total === 2) {
    particles = [
      { pos: new THREE.Vector3(-0.4, 0, 0), kind: kinds[0] },
      { pos: new THREE.Vector3(0.4, 0, 0), kind: kinds[1] },
    ];
  } else {
    const positions = fibonacciPositions(total, scale);
    particles = positions.map((pos, i) => ({ pos, kind: kinds[i] }));
    if (total > 20) {
      let maxDist = 0;
      for (const p of particles) maxDist = Math.max(maxDist, p.pos.length());
      const cutoff = maxDist - pRadius * 3;
      if (cutoff > 0) particles = particles.filter((p) => p.pos.length() >= cutoff);
    }
  }
  return particles;
}

// ─── Nucleus ─────────────────────────────────────────────────────────────────
function Nucleus({ protons, neutrons, speedMul }: { protons: number; neutrons: number; speedMul: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => buildNucleusParticles(protons, neutrons), [protons, neutrons]);
  const protonMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xff2222, roughness: 0.25, metalness: 0.4, emissive: new THREE.Color(0xff0000), emissiveIntensity: 1.5 }), []);
  const neutronMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.15, metalness: 0.5, emissive: new THREE.Color(0x333333), emissiveIntensity: 0.6 }), []);
  const pGeo = useMemo(() => new THREE.SphereGeometry(0.35, 14, 14), []);
  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y -= dt * 0.5 * speedMul;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.1;
  });
  return (
    <group ref={groupRef}>
      {protons > 1 && <pointLight color={0xff2200} intensity={2.2} distance={14} />}
      {particles.map(({ pos, kind }, i) => (
        <mesh key={i} geometry={pGeo} material={kind === 'proton' ? protonMat : neutronMat} position={pos} />
      ))}
    </group>
  );
}

// ─── Electron shell ───────────────────────────────────────────────────────────
const TRAIL_COUNT = 5;

interface ShellProps {
  shellIndex: number;
  shellCount: number;
  electrons: number;
  speedMul: number;
  paused: boolean;
  topView: boolean;
  darkMode: boolean;
  onHover: (idx: number | null) => void;
}

function Shell({ shellIndex, shellCount, electrons, speedMul, paused, topView, darkMode, onHover }: ShellProps) {
  const wobbleRef = useRef<THREE.Group>(null);
  const electronRefs = useRef<(THREE.Mesh | null)[]>([]);
  const trailRefs = useRef<(THREE.Mesh | null)[][]>([]);
  const angles = useRef<number[]>(Array.from({ length: electrons }, (_, e) => (e / electrons) * Math.PI * 2));
  const [hovered, setHovered] = useState(false);

  const minRadius = shellCount === 1 ? 8.6 : 3.7;
  const maxRadius = shellCount === 1 ? 8.6 : 11.4;
  const step = shellCount > 1 ? (maxRadius - minRadius) / (shellCount - 1) : 0;
  const radius = minRadius + shellIndex * step;
  const shellSpeed = 0.018 / (shellIndex + 1);
  const shellPalette = darkMode ? SHELL_COLORS_DARK : SHELL_COLORS;
  const color = shellPalette[shellIndex % shellPalette.length];
  const colorObj = useMemo(() => new THREE.Color(color), [color]);

  const orbitGeo = useMemo(() => new THREE.TorusGeometry(radius, 0.05, 14, 80), [radius]);
  const hitGeo = useMemo(() => new THREE.TorusGeometry(radius, 0.55, 8, 40), [radius]);
  const electronColor = useMemo(() => colorObj.clone().offsetHSL(0, 0, darkMode ? 0.06 : -0.04), [colorObj, darkMode]);
  const hoverRingColor = darkMode ? '#fff27a' : '#ffaa00';
  const orbitOpacity = darkMode ? 0.62 : 0.45;
  const hoverOrbitOpacity = darkMode ? 0.98 : 0.92;
  const elGeo = useMemo(() => new THREE.SphereGeometry(darkMode ? 0.215 : 0.19, 14, 14), [darkMode]);
  const elMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: electronColor,
    roughness: darkMode ? 0.22 : 0.35,
    metalness: darkMode ? 0.62 : 0.5,
    emissive: electronColor,
    emissiveIntensity: darkMode ? 1.05 : 0.18,
  }), [electronColor, darkMode]);
  const trailMats = useMemo(() => Array.from({ length: TRAIL_COUNT }, (_, t) => new THREE.MeshBasicMaterial({
    color: electronColor,
    transparent: true,
    opacity: darkMode ? Math.max(0.02, 0.28 - t * 0.042) : Math.max(0.01, 0.16 - t * 0.016),
  })), [electronColor, darkMode]);
  const trailGeos = useMemo(() => Array.from({ length: TRAIL_COUNT }, (_, t) => new THREE.SphereGeometry(Math.max(0.05, 0.18 - t * 0.012), 6, 6)), []);
  const orbitRotation: [number, number, number] = topView ? [0, 0, 0] : [Math.PI / 2, 0, 0];

  useFrame((_, dt) => {
    for (let e = 0; e < electrons; e++) {
      if (!paused) {
        angles.current[e] += shellSpeed * speedMul * 60 * dt;
      }
      const el = electronRefs.current[e];
      if (!el) continue;
      const px = radius * Math.cos(angles.current[e]);
      const pyOrZ = radius * Math.sin(angles.current[e]);

      if (topView) {
        el.position.x = px;
        el.position.y = pyOrZ;
        el.position.z = 0;
      } else {
        el.position.x = px;
        el.position.y = 0;
        el.position.z = pyOrZ;
      }

      if (!paused) {
        const trails = trailRefs.current[e];
        if (trails) {
          for (let t = trails.length - 1; t > 0; t--) {
            const ta = trails[t]; const tb = trails[t - 1];
            if (ta && tb) ta.position.copy(tb.position);
          }
          if (trails[0]) trails[0].position.copy(el.position);
        }
      }
    }
    if (wobbleRef.current) {
      if (topView) {
        wobbleRef.current.rotation.set(0, 0, 0);
      } else if (!paused) {
        const tm = Date.now() * 0.001;
        wobbleRef.current.rotation.y += 0.001 * speedMul;
        wobbleRef.current.rotation.z = Math.sin(tm * 0.4 * speedMul) * 0.06;
      }
    }
  });

  return (
    <group ref={wobbleRef} rotation={topView ? [0, 0, 0] : [shellIndex * 0.18, shellIndex * 0.22, shellIndex * 0.1]}>
      <mesh geometry={orbitGeo} rotation={orbitRotation}>
        <meshBasicMaterial color={hovered ? hoverRingColor : color} transparent opacity={hovered ? hoverOrbitOpacity : orbitOpacity} />
      </mesh>
      <mesh
        geometry={hitGeo}
        rotation={orbitRotation}
        onPointerOver={() => { setHovered(true); onHover(shellIndex); }}
        onPointerOut={() => { setHovered(false); onHover(null); }}
      >
        <meshBasicMaterial transparent opacity={0.001} />
      </mesh>
      {Array.from({ length: electrons }, (_, e) => {
        const ix = radius * Math.cos(angles.current[e]);
        const iyOrZ = radius * Math.sin(angles.current[e]);
        const basePos: [number, number, number] = topView ? [ix, iyOrZ, 0] : [ix, 0, iyOrZ];
        return (
          <group key={e}>
            <mesh ref={(m) => { electronRefs.current[e] = m; }} geometry={elGeo} material={elMat} position={basePos} />
            {trailGeos.map((tGeo, t) => (
              <mesh
                key={t}
                ref={(m) => { if (!trailRefs.current[e]) trailRefs.current[e] = []; trailRefs.current[e][t] = m; }}
                geometry={tGeo}
                material={trailMats[t]}
                position={basePos}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
}

// ─── Parse electron config string to Bohr shell occupancies ─────────────────
const SUP: Record<string, string> = {
  '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9',
};
// K, L, M, N, O, P electrons for noble gas core abbreviations
const NG_SHELLS: Record<string, number[]> = {
  '[He]': [2],
  '[Ne]': [2, 8],
  '[Ar]': [2, 8, 8],
  '[Kr]': [2, 8, 18, 8],
  '[Xe]': [2, 8, 18, 18, 8],
  '[Rn]': [2, 8, 18, 32, 18, 8],
};

function configToShells(config: string): number[] {
  let base: number[] = [];
  let rest = config;
  for (const [sym, shells] of Object.entries(NG_SHELLS)) {
    if (config.startsWith(sym)) { base = [...shells]; rest = config.slice(sym.length).trim(); break; }
  }
  const counts = [...base];
  // Match Unicode superscripts DIRECTLY to avoid greedy normalisation ambiguity:
  // "3d¹⁰4s²" → n=3 e=10, n=4 e=2  (normalising first gives "3d104s2" → e=104 bug)
  const re = /(\d)[spdf]([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g;
  let m;
  while ((m = re.exec(rest)) !== null) {
    const n = parseInt(m[1], 10);
    const e = parseInt(m[2].split('').map(c => SUP[c] ?? c).join(''), 10);
    while (counts.length < n) counts.push(0);
    counts[n - 1] += e;
  }
  while (counts.length > 0 && counts[counts.length - 1] === 0) counts.pop();
  return counts.length > 0 ? counts : [1];
}

// ─── Full atom scene ──────────────────────────────────────────────────────────
function AtomScene({ element, paused, speed, topView, darkMode, onShellHover }: {
  element: Element; paused: boolean; speed: number; topView: boolean; darkMode: boolean; onShellHover: (idx: number | null) => void;
}) {
  const atomRef = useRef<THREE.Group>(null);
  const popStart = useRef(Date.now());

  useEffect(() => {
    popStart.current = Date.now();
    if (atomRef.current) atomRef.current.scale.set(0.1, 0.1, 0.1);
  }, [element.n]);

  const shells = useMemo(() => configToShells(element.config), [element.config]);

  const neutrons = useMemo(() => Math.max(0, Math.round(element.mass) - element.n), [element]);

  useFrame(() => {
    if (!atomRef.current) return;
    if (topView) {
      atomRef.current.rotation.set(0, 0, 0);
    }
    const elapsed = (Date.now() - popStart.current) * 0.001;
    if (elapsed < 0.6) {
      const ease = 1 - Math.pow(1 - elapsed / 0.6, 3);
      atomRef.current.scale.set(0.1 + 0.9 * ease, 0.1 + 0.9 * ease, 0.1 + 0.9 * ease);
    } else {
      atomRef.current.scale.set(1, 1, 1);
      if (!paused && !topView) {
        atomRef.current.rotation.y += 0.002 * speed;
      }
    }
  });

  return (
    <group ref={atomRef} scale={[0.1, 0.1, 0.1]}>
      <Nucleus protons={element.n} neutrons={neutrons} speedMul={speed} />
      {shells.map((count, i) => (
        <Shell key={i} shellIndex={i} shellCount={shells.length} electrons={count} speedMul={speed} paused={paused} topView={topView} darkMode={darkMode} onHover={onShellHover} />
      ))}
    </group>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
interface Props {
  element: Element;
  bg?: string;
  height?: number;
  fill?: boolean;
  paused?: boolean;
  speed?: number;
  topView?: boolean;
}

export default function AtomModel({ element, bg = '#0f0f1a', height = 320, fill = false, paused = false, speed = 1, topView = false }: Props) {
  const [hoveredShell, setHoveredShell] = useState<number | null>(null);
  const isLight = bg.startsWith('#e') || bg.startsWith('#d') || bg.startsWith('#f');
  const isDarkMode = !isLight;
  const textColor = isLight ? '#222' : '#eee';

  const shells = useMemo(() => configToShells(element.config), [element.config]);

  const cameraPosition = topView ? ([0, 10, 34] as [number, number, number]) : ([0, 2, 34] as [number, number, number]);

  return (
    <div style={{ width: '100%', height: fill ? '100%' : height, position: 'relative', background: bg, borderRadius: fill ? 0 : 12, overflow: 'hidden' }}>
      {/* Electron config badge */}
      <div style={{
        position: 'absolute', top: 10, left: 12, zIndex: 10,
        background: isLight ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.18)',
        borderRadius: 999, padding: '4px 13px',
        fontSize: 12, fontFamily: 'monospace', color: textColor,
        letterSpacing: '0.03em', pointerEvents: 'none',
      }}>
        {element.config}
      </div>

      {/* Shell hover tooltip */}
      {hoveredShell !== null && (
        <div style={{
          position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
          background: isLight ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.18)',
          borderRadius: 10, padding: '5px 14px',
          fontSize: 12, color: textColor, pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          Shell {SHELL_NAMES[hoveredShell]} · {shells[hoveredShell]} electron{shells[hoveredShell] !== 1 ? 's' : ''}
        </div>
      )}

      <Canvas key={topView ? 'atom-top-view' : 'atom-default-view'} camera={{ position: cameraPosition, fov: 46 }} gl={{ antialias: true, alpha: true }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={isDarkMode ? 0.85 : 1.0} />
        <directionalLight position={[10, 10, 10]} intensity={isDarkMode ? 0.7 : 0.4} />
        {isDarkMode && <pointLight position={[0, 0, 10]} intensity={0.95} color={0x8b5b2d} />}
        <AtomScene element={element} paused={paused} speed={speed} topView={topView} darkMode={isDarkMode} onShellHover={setHoveredShell} />
        <OrbitControls
          enablePan={false}
          enableZoom
          enableRotate
          minDistance={5}
          maxDistance={55}
          target={[0, 0, 0]}
        />
      </Canvas>

      {!fill && (
        <div style={{ textAlign: 'center', padding: '7px 0', fontSize: 11, color: '#888', background: bg, fontFamily: 'monospace' }}>
          {element.sym} · {element.config}
        </div>
      )}
    </div>
  );
}
