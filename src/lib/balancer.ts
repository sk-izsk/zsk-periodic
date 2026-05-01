import { parseChemicalFormula } from '@/utils/chemistry'

type Fraction = {
  numerator: bigint
  denominator: bigint
}

type Matrix = Fraction[][]
type RrefResult = {
  matrix: Matrix
  pivotColumns: number[]
  freeColumns: number[]
}

const MAX_FREE_VARIABLE_WEIGHT = 12

export interface BalanceResult {
  balanced?: string
  coefficients?: number[]
  error?: string
}

const zero = (): Fraction => ({ numerator: 0n, denominator: 1n })

const one = (): Fraction => ({ numerator: 1n, denominator: 1n })

const gcdBigInt = (a: bigint, b: bigint): bigint => {
  const x = a < 0n ? -a : a
  const y = b < 0n ? -b : b

  return y === 0n ? x : gcdBigInt(y, x % y)
}

const lcmBigInt = (a: bigint, b: bigint): bigint => {
  if (a === 0n || b === 0n) {
    return 0n
  }

  return (a / gcdBigInt(a, b)) * b
}

const fraction = (numerator: number | bigint, denominator: number | bigint = 1n): Fraction => {
  let nextNumerator = BigInt(numerator)
  let nextDenominator = BigInt(denominator)

  if (nextDenominator === 0n) {
    throw new Error('Fraction denominator cannot be zero.')
  }

  if (nextDenominator < 0n) {
    nextNumerator = -nextNumerator
    nextDenominator = -nextDenominator
  }

  const divisor = gcdBigInt(nextNumerator, nextDenominator)
  return {
    numerator: nextNumerator / divisor,
    denominator: nextDenominator / divisor,
  }
}

const isZero = (value: Fraction): boolean => value.numerator === 0n

const add = (a: Fraction, b: Fraction): Fraction =>
  fraction(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator)

const subtract = (a: Fraction, b: Fraction): Fraction =>
  fraction(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator)

const multiply = (a: Fraction, b: Fraction): Fraction =>
  fraction(a.numerator * b.numerator, a.denominator * b.denominator)

const divide = (a: Fraction, b: Fraction): Fraction =>
  fraction(a.numerator * b.denominator, a.denominator * b.numerator)

const negate = (value: Fraction): Fraction => fraction(-value.numerator, value.denominator)

const parseSide = (side: string): { ok: true; compounds: string[] } | { ok: false; error: string } => {
  if (!side.trim()) {
    return { ok: true, compounds: [] }
  }

  const compounds = side.split('+').map((compound) => compound.trim())
  if (compounds.some((compound) => compound.length === 0)) {
    return { ok: false, error: 'Remove empty compounds around plus signs.' }
  }

  return { ok: true, compounds }
}

const toFormulaCounts = (compounds: string[]) => {
  const counts = new Map<string, Record<string, number>>()

  for (const compound of compounds) {
    const parsed = parseChemicalFormula(compound)
    if (!parsed.ok) {
      return { ok: false as const, error: parsed.error }
    }
    counts.set(compound, parsed.counts)
  }

  return { ok: true as const, counts }
}

const toRref = (matrix: Matrix): RrefResult => {
  const rows = matrix.map((row) => row.map((value) => fraction(value.numerator, value.denominator)))
  const pivotColumns: number[] = []
  let pivotRow = 0
  const columnCount = rows[0]?.length ?? 0

  for (let col = 0; col < columnCount && pivotRow < rows.length; col++) {
    let rowWithPivot = -1
    for (let row = pivotRow; row < rows.length; row++) {
      if (!isZero(rows[row][col])) {
        rowWithPivot = row
        break
      }
    }

    if (rowWithPivot === -1) {
      continue
    }

    ;[rows[pivotRow], rows[rowWithPivot]] = [rows[rowWithPivot], rows[pivotRow]]

    const pivot = rows[pivotRow][col]
    for (let c = col; c < rows[pivotRow].length; c++) {
      rows[pivotRow][c] = divide(rows[pivotRow][c], pivot)
    }

    for (let row = 0; row < rows.length; row++) {
      if (row === pivotRow || isZero(rows[row][col])) {
        continue
      }

      const factor = rows[row][col]
      for (let c = col; c < rows[row].length; c++) {
        rows[row][c] = subtract(rows[row][c], multiply(factor, rows[pivotRow][c]))
      }
    }

    pivotColumns.push(col)
    pivotRow++
  }

  const pivotSet = new Set(pivotColumns)
  const freeColumns = Array.from({ length: columnCount }, (_, index) => index).filter(
    (index) => !pivotSet.has(index),
  )

  return { matrix: rows, pivotColumns, freeColumns }
}

const fractionsToIntegerCoefficients = (values: Fraction[]): number[] | undefined => {
  const denominatorLcm = values.reduce((acc, value) => lcmBigInt(acc, value.denominator), 1n)
  const scaled = values.map((value) => value.numerator * (denominatorLcm / value.denominator))
  const sign = scaled.some((value) => value < 0n) && !scaled.some((value) => value > 0n) ? -1n : 1n
  const normalized = scaled.map((value) => value * sign)

  if (normalized.some((value) => value <= 0n)) {
    return undefined
  }

  const divisor = normalized.reduce((acc, value) => gcdBigInt(acc, value), normalized[0] ?? 1n)
  const reduced = normalized.map((value) => value / divisor)

  if (reduced.some((value) => value > BigInt(Number.MAX_SAFE_INTEGER))) {
    return undefined
  }

  return reduced.map(Number)
}

const buildNullspaceBasis = ({ matrix: rref, pivotColumns, freeColumns }: RrefResult): Matrix => {
  const columnCount = rref[0]?.length ?? 0

  return freeColumns.map((freeColumn) => {
    const solution = Array.from({ length: columnCount }, zero)
    solution[freeColumn] = one()

    for (let row = pivotColumns.length - 1; row >= 0; row--) {
      const pivotColumn = pivotColumns[row]
      let value = zero()

      for (const col of freeColumns) {
        value = subtract(value, multiply(rref[row][col], solution[col]))
      }

      solution[pivotColumn] = value
    }

    return solution
  })
}

const combineBasis = (basis: Matrix, weights: number[]): Fraction[] =>
  basis[0].map((_, coefficientIndex) =>
    weights.reduce(
      (sum, weight, basisIndex) =>
        add(sum, multiply(fraction(weight), basis[basisIndex][coefficientIndex])),
      zero(),
    ),
  )

const tryIntegerCoefficients = (solution: Fraction[]): number[] | undefined => {
  const coefficients = fractionsToIntegerCoefficients(solution)
  if (coefficients) {
    return coefficients
  }

  const flipped = fractionsToIntegerCoefficients(solution.map(negate))
  if (flipped) {
    return flipped
  }

  return undefined
}

const freeVariableWeights = Array.from(
  { length: MAX_FREE_VARIABLE_WEIGHT },
  (_, index) => index + 1,
).flatMap((weight) => [weight, -weight])

const searchBasisCombinations = (
  basis: Matrix,
  index: number,
  weights: number[],
): number[] | undefined => {
  if (index === basis.length) {
    return tryIntegerCoefficients(combineBasis(basis, weights))
  }

  for (const weight of freeVariableWeights) {
    weights[index] = weight
    const coefficients = searchBasisCombinations(basis, index + 1, weights)
    if (coefficients) {
      return coefficients
    }
  }

  return undefined
}

const solveNullspace = (matrix: Matrix): number[] | undefined => {
  const rref = toRref(matrix)
  const basis = buildNullspaceBasis(rref)

  if (basis.length === 0) {
    return undefined
  }

  for (const solution of basis) {
    const coefficients = tryIntegerCoefficients(solution)
    if (coefficients) {
      return coefficients
    }
  }

  return searchBasisCombinations(
    basis,
    0,
    Array.from({ length: basis.length }, () => 1),
  )
}

const formatBalancedSide = (compounds: string[], coefficients: number[]): string =>
  compounds
    .map((compound, index) => `${coefficients[index] === 1 ? '' : coefficients[index]}${compound}`)
    .join(' + ')

export const balanceEquation = (input: string): BalanceResult => {
  const sides = input.split(/->|→|=/).map((side) => side.trim())
  if (sides.length !== 2) {
    return { error: 'Use -> to separate reactants and products.' }
  }

  const reactantSide = parseSide(sides[0])
  const productSide = parseSide(sides[1])
  if (!reactantSide.ok) {
    return { error: reactantSide.error }
  }
  if (!productSide.ok) {
    return { error: productSide.error }
  }

  const reactants = reactantSide.compounds
  const products = productSide.compounds
  if (reactants.length === 0 || products.length === 0) {
    return { error: 'Both sides of the equation need at least one compound.' }
  }

  const compounds = [...reactants, ...products]
  const parsed = toFormulaCounts(compounds)
  if (!parsed.ok) {
    return { error: parsed.error }
  }

  const elements = Array.from(
    new Set(compounds.flatMap((compound) => Object.keys(parsed.counts.get(compound) ?? {}))),
  )
  if (elements.length === 0) {
    return { error: 'No elements found.' }
  }

  const matrix = elements.map((element) =>
    compounds.map((compound, index) => {
      const count = parsed.counts.get(compound)?.[element] ?? 0
      return fraction(index < reactants.length ? count : -count)
    }),
  )

  const coefficients = solveNullspace(matrix)
  if (!coefficients) {
    return { error: 'Could not balance equation.' }
  }

  const balanced = `${formatBalancedSide(
    reactants,
    coefficients.slice(0, reactants.length),
  )} → ${formatBalancedSide(products, coefficients.slice(reactants.length))}`

  return { balanced, coefficients }
}
