const SUBSCRIPT_DIGITS: Record<string, string> = {
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '₃': '3',
  '₄': '4',
  '₅': '5',
  '₆': '6',
  '₇': '7',
  '₈': '8',
  '₉': '9',
}

export type FormulaCounts = Record<string, number>

export type FormulaParseResult = { ok: true; counts: FormulaCounts } | { ok: false; error: string }

const normalizeFormula = (formula: string): string =>
  formula
    .trim()
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (digit) => SUBSCRIPT_DIGITS[digit] ?? digit)
    .replace(/\s+/g, '')

const readNumber = (formula: string, index: number): { value: number; nextIndex: number } => {
  let end = index
  while (/\d/.test(formula[end] ?? '')) {
    end++
  }

  if (end === index) {
    return { value: 1, nextIndex: index }
  }

  return { value: Number(formula.slice(index, end)), nextIndex: end }
}

const addCount = (counts: FormulaCounts, symbol: string, count: number): void => {
  counts[symbol] = (counts[symbol] ?? 0) + count
}

const mergeCounts = (target: FormulaCounts, source: FormulaCounts, multiplier: number): void => {
  for (const [symbol, count] of Object.entries(source)) {
    addCount(target, symbol, count * multiplier)
  }
}

const parseGroup = (
  formula: string,
  startIndex: number,
  terminator?: ')' | ']',
): { ok: true; counts: FormulaCounts; nextIndex: number } | { ok: false; error: string } => {
  const counts: FormulaCounts = {}
  let index = startIndex

  while (index < formula.length) {
    const char = formula[index]

    if (terminator && char === terminator) {
      return { ok: true, counts, nextIndex: index + 1 }
    }

    if (char === ')' || char === ']') {
      return { ok: false, error: `Unexpected "${char}" in formula.` }
    }

    if (char === '(' || char === '[') {
      const close = char === '(' ? ')' : ']'
      const group = parseGroup(formula, index + 1, close)
      if (!group.ok) {
        return group
      }

      const multiplier = readNumber(formula, group.nextIndex)
      mergeCounts(counts, group.counts, multiplier.value)
      index = multiplier.nextIndex
      continue
    }

    if (!/[A-Z]/.test(char)) {
      return { ok: false, error: `Invalid token "${char}" in formula.` }
    }

    let symbol = char
    index++
    if (/[a-z]/.test(formula[index] ?? '')) {
      symbol += formula[index]
      index++
    }

    const amount = readNumber(formula, index)
    addCount(counts, symbol, amount.value)
    index = amount.nextIndex
  }

  if (terminator) {
    return { ok: false, error: `Missing "${terminator}" in formula.` }
  }

  return { ok: true, counts, nextIndex: index }
}

export const parseChemicalFormula = (formula: string): FormulaParseResult => {
  const normalized = normalizeFormula(formula)

  if (!normalized) {
    return { ok: false, error: 'Formula is empty.' }
  }

  const parsed = parseGroup(normalized, 0)
  if (!parsed.ok) {
    return parsed
  }

  return { ok: true, counts: parsed.counts }
}

export const gcd = (a: number, b: number): number => {
  const x = Math.abs(Math.trunc(a))
  const y = Math.abs(Math.trunc(b))

  return y === 0 ? x : gcd(y, x % y)
}

export const lcm = (a: number, b: number): number => {
  if (a === 0 || b === 0) {
    return 0
  }

  return Math.abs(a * b) / gcd(a, b)
}
