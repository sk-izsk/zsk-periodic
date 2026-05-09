import { readFile } from 'node:fs/promises'

const elementCategories = new Set([
  'alkali',
  'alkaline',
  'transition',
  'post',
  'metalloid',
  'nonmetal',
  'halogen',
  'noble',
  'lanthanide',
  'actinide',
])

const phases = new Set(['Solid', 'Liquid', 'Gas', 'Unknown'])
const l3PhysicalFields = [
  'electronegativity',
  'firstIonization',
  'density',
  'meltingPoint',
  'boilingPoint',
  'electronAffinity',
  'atomicRadius',
  'specificHeat',
]

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'))

const fail = (message) => {
  throw new Error(`data:check failed: ${message}`)
}

const assert = (condition, message) => {
  if (!condition) {
    fail(message)
  }
}

const isNullableNumber = (value) => value === null || typeof value === 'number'

const elements = await readJson('../src/data/elements/elements.json')
const l3Data = await readJson('../src/data/elements/element-l3-data.json')

assert(Array.isArray(elements), 'elements.json must be array')
assert(elements.length === 118, `elements.json expected 118 entries, got ${elements.length}`)

const atomicNumbers = new Set()
const symbols = new Set()

for (const element of elements) {
  assert(typeof element === 'object' && element !== null, 'each element must be object')
  assert(Number.isInteger(element.n), `element atomic number invalid: ${JSON.stringify(element)}`)
  assert(!atomicNumbers.has(element.n), `duplicate atomic number ${element.n}`)
  atomicNumbers.add(element.n)
  assert(typeof element.sym === 'string' && element.sym.length > 0, `invalid symbol for Z=${element.n}`)
  assert(!symbols.has(element.sym), `duplicate symbol ${element.sym}`)
  symbols.add(element.sym)
  assert(typeof element.name === 'string' && element.name.length > 0, `invalid name for ${element.sym}`)
  assert(typeof element.mass === 'number', `invalid mass for ${element.sym}`)
  assert(elementCategories.has(element.cat), `invalid category for ${element.sym}: ${element.cat}`)
  assert(Number.isInteger(element.period), `invalid period for ${element.sym}`)
  assert(element.group === null || Number.isInteger(element.group), `invalid group for ${element.sym}`)
  assert(phases.has(element.phase), `invalid phase for ${element.sym}: ${element.phase}`)
  assert(typeof element.config === 'string' && element.config.length > 0, `invalid config for ${element.sym}`)
  assert(isNullableNumber(element.en), `invalid electronegativity for ${element.sym}`)
  assert(isNullableNumber(element.mp), `invalid melting point for ${element.sym}`)
  assert(isNullableNumber(element.bp), `invalid boiling point for ${element.sym}`)
  assert(isNullableNumber(element.density), `invalid density for ${element.sym}`)
  assert(
    element.discovered === undefined || Number.isInteger(element.discovered),
    `invalid discovered year for ${element.sym}`,
  )
  assert(
    element.discoveredBy === undefined || typeof element.discoveredBy === 'string',
    `invalid discoveredBy for ${element.sym}`,
  )
}

assert(typeof l3Data === 'object' && l3Data !== null && !Array.isArray(l3Data), 'element-l3-data.json must be object')

for (const atomicNumber of atomicNumbers) {
  const entry = l3Data[String(atomicNumber)]
  assert(entry, `missing L3 data for atomic number ${atomicNumber}`)
  assert(Array.isArray(entry.oxidationStates?.common), `invalid common oxidation states for ${atomicNumber}`)
  assert(Array.isArray(entry.oxidationStates?.possible), `invalid possible oxidation states for ${atomicNumber}`)
  for (const field of l3PhysicalFields) {
    assert(typeof entry.physical?.[field] === 'string', `invalid physical.${field} for ${atomicNumber}`)
  }
}

for (const key of Object.keys(l3Data)) {
  assert(atomicNumbers.has(Number(key)), `L3 data has unknown atomic number ${key}`)
}

console.log(`data:check ok (${elements.length} elements, ${Object.keys(l3Data).length} L3 records)`)
