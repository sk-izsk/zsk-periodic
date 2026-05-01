import * as THREE from 'three'

export const SHELL_COLORS = [
  '#f5a3b7',
  '#f0bd5d',
  '#e8d16a',
  '#84d9ad',
  '#8ab8f4',
  '#b9b1f4',
  '#f3a3c8',
]
export const SHELL_COLORS_DARK = [
  '#ff98aa',
  '#ffc46d',
  '#ffe78b',
  '#9bf1c4',
  '#9bc7ff',
  '#c5bcff',
  '#ffacd0',
]
export const ELECTRON_COLORS = [
  '#ca2f6d',
  '#d26d1e',
  '#c69d10',
  '#0c9f66',
  '#1467c9',
  '#5b41b8',
  '#bf287a',
]
export const ELECTRON_COLORS_DARK = [
  '#ff7272',
  '#ffab55',
  '#ffe66a',
  '#64f0a5',
  '#6ca5ff',
  '#9a88ff',
  '#ff86c2',
]
export const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q']
export const TRAIL_COUNT = 3

const SUPERSCRIPT_DIGITS: Record<string, string> = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
}

const NOBLE_GAS_SHELLS: Record<string, number[]> = {
  '[He]': [2],
  '[Ne]': [2, 8],
  '[Ar]': [2, 8, 8],
  '[Kr]': [2, 8, 18, 8],
  '[Xe]': [2, 8, 18, 18, 8],
  '[Rn]': [2, 8, 18, 32, 18, 8],
}

export type Particle = {
  pos: THREE.Vector3
  kind: 'proton' | 'neutron'
}

// Cache key space is bounded by shell count, palette, and fixed segment sizes.
// Shared GPU objects avoid per-atom allocation churn while the app is open.
const geometryCache = new Map<string, THREE.BufferGeometry>()
const materialCache = new Map<string, THREE.Material>()

const seededUnit = (seed: number): number => {
  const raw = Math.sin(seed * 12.9898) * 43758.5453
  return raw - Math.floor(raw)
}

const jitter = (index: number, axis: number): number =>
  (seededUnit(index * 17 + axis * 101) - 0.5) * 0.1

const fibonacciPositions = (count: number, scale: number): THREE.Vector3[] => {
  const phi = Math.PI * (3 - Math.sqrt(5))

  return Array.from({ length: count }, (_, index) => {
    const k = index + 0.5
    const y = 1 - (k / count) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * k

    return new THREE.Vector3(
      Math.cos(theta) * radius * scale + jitter(index, 0),
      y * scale + jitter(index, 1),
      Math.sin(theta) * radius * scale + jitter(index, 2),
    )
  })
}

const buildParticleKinds = (protons: number, neutrons: number): Particle['kind'][] => {
  const kinds: Particle['kind'][] = [
    ...Array<'proton'>(protons).fill('proton'),
    ...Array<'neutron'>(neutrons).fill('neutron'),
  ]

  for (let index = kinds.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(seededUnit(protons * 97 + neutrons * 13 + index) * (index + 1))
    ;[kinds[index], kinds[swapIndex]] = [kinds[swapIndex], kinds[index]]
  }

  return kinds
}

export const buildNucleusParticles = (protons: number, neutrons: number): Particle[] => {
  const total = protons + neutrons
  const particleRadius = 0.35
  const scale = Math.pow(total, 1 / 3) * particleRadius * 0.8
  const kinds = buildParticleKinds(protons, neutrons)

  if (total === 1) {
    return [{ pos: new THREE.Vector3(0, 0, 0), kind: kinds[0] }]
  }

  if (total === 2) {
    return [
      { pos: new THREE.Vector3(-0.4, 0, 0), kind: kinds[0] },
      { pos: new THREE.Vector3(0.4, 0, 0), kind: kinds[1] },
    ]
  }

  const positions = fibonacciPositions(total, scale)
  const particles = positions.map((pos, index) => ({ pos, kind: kinds[index] }))

  if (total <= 20) {
    return particles
  }

  const maxDistance = particles.reduce((max, particle) => Math.max(max, particle.pos.length()), 0)
  const cutoff = maxDistance - particleRadius * 3
  return cutoff > 0 ? particles.filter((particle) => particle.pos.length() >= cutoff) : particles
}

export const configToShells = (config: string): number[] => {
  let base: number[] = []
  let rest = config

  for (const [symbol, shells] of Object.entries(NOBLE_GAS_SHELLS)) {
    if (config.startsWith(symbol)) {
      base = [...shells]
      rest = config.slice(symbol.length).trim()
      break
    }
  }

  const counts = [...base]
  const re = /(\d)[spdf]([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g
  let match: RegExpExecArray | null

  while ((match = re.exec(rest)) !== null) {
    const shell = Number(match[1])
    const electrons = Number(
      match[2]
        .split('')
        .map((char) => SUPERSCRIPT_DIGITS[char] ?? char)
        .join(''),
    )

    while (counts.length < shell) {
      counts.push(0)
    }
    counts[shell - 1] += electrons
  }

  while (counts.length > 0 && counts[counts.length - 1] === 0) {
    counts.pop()
  }

  return counts.length > 0 ? counts : [1]
}

export const getNeutronCount = (mass: number, atomicNumber: number): number =>
  Math.max(0, Math.round(mass) - atomicNumber)

export const getAtomTextColors = (background: string) => {
  const isLight =
    background.startsWith('#e') || background.startsWith('#d') || background.startsWith('#f')
  return {
    isLight,
    isDarkMode: !isLight,
    textColor: isLight ? '#222' : '#eee',
  }
}

export const getSphereGeometry = (
  radius: number,
  widthSegments: number,
  heightSegments: number,
) => {
  const key = `sphere:${radius}:${widthSegments}:${heightSegments}`
  const cached = geometryCache.get(key)
  if (cached) {
    return cached as THREE.SphereGeometry
  }

  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
  geometryCache.set(key, geometry)
  return geometry
}

export const getTorusGeometry = (
  radius: number,
  tube: number,
  radialSegments: number,
  tubularSegments: number,
) => {
  const key = `torus:${radius}:${tube}:${radialSegments}:${tubularSegments}`
  const cached = geometryCache.get(key)
  if (cached) {
    return cached as THREE.TorusGeometry
  }

  const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments)
  geometryCache.set(key, geometry)
  return geometry
}

export const getStandardMaterial = (key: string, options: THREE.MeshStandardMaterialParameters) => {
  const cached = materialCache.get(key)
  if (cached) {
    return cached as THREE.MeshStandardMaterial
  }

  const material = new THREE.MeshStandardMaterial(options)
  materialCache.set(key, material)
  return material
}

export const getBasicMaterial = (key: string, options: THREE.MeshBasicMaterialParameters) => {
  const cached = materialCache.get(key)
  if (cached) {
    return cached as THREE.MeshBasicMaterial
  }

  const material = new THREE.MeshBasicMaterial(options)
  materialCache.set(key, material)
  return material
}
