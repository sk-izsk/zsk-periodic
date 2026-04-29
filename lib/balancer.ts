/**
 * Chemical equation balancer using Gaussian elimination.
 * Input:  "H2 + O2 -> H2O"
 * Output: { balanced: "2H₂ + O₂ → 2H₂O", coefficients: [2,1,2] } | { error: string }
 */

type Matrix = number[][];

function parseFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};
  const re = /([A-Z][a-z]?)(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(formula)) !== null) {
    if (!m[1]) continue;
    counts[m[1]] = (counts[m[1]] || 0) + (m[2] ? parseInt(m[2]) : 1);
  }
  return counts;
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export interface BalanceResult {
  balanced?: string;
  coefficients?: number[];
  error?: string;
}

export function balanceEquation(input: string): BalanceResult {
  try {
    const sides = input.split(/->|→|=/).map(s => s.trim());
    if (sides.length !== 2) return { error: 'Use -> to separate reactants and products.' };

    const reactants = sides[0].split('+').map(s => s.trim());
    const products  = sides[1].split('+').map(s => s.trim());
    const compounds = [...reactants, ...products];

    const allElements = Array.from(
      new Set(compounds.flatMap(c => Object.keys(parseFormula(c))))
    );

    if (allElements.length === 0) return { error: 'No elements found.' };

    const matrix: Matrix = allElements.map(el => {
      const row: number[] = [];
      reactants.forEach(c => row.push(parseFormula(c)[el] || 0));
      products.forEach(c => row.push(-(parseFormula(c)[el] || 0)));
      return row;
    });

    // Append identity for augmented solve
    const n = compounds.length;
    const aug: Matrix = matrix.map(row => [...row, 0]);

    // Gaussian elimination
    let pivot = 0;
    for (let col = 0; col < n && pivot < aug.length; col++) {
      let maxRow = pivot;
      for (let r = pivot + 1; r < aug.length; r++) {
        if (Math.abs(aug[r][col]) > Math.abs(aug[maxRow][col])) maxRow = r;
      }
      [aug[pivot], aug[maxRow]] = [aug[maxRow], aug[pivot]];
      if (aug[pivot][col] === 0) continue;
      const div = aug[pivot][col];
      for (let c = col; c <= n; c++) aug[pivot][c] /= div;
      for (let r = 0; r < aug.length; r++) {
        if (r !== pivot && aug[r][col] !== 0) {
          const factor = aug[r][col];
          for (let c = col; c <= n; c++) aug[r][c] -= factor * aug[pivot][c];
        }
      }
      pivot++;
    }

    // Free variable = 1, solve back
    const coefs: number[] = new Array(n).fill(0);
    coefs[n - 1] = 1;
    for (let r = pivot - 1; r >= 0; r--) {
      let nonzero = -1;
      for (let c = 0; c < n; c++) {
        if (Math.abs(aug[r][c]) > 1e-9) { nonzero = c; break; }
      }
      if (nonzero === -1) continue;
      let val = 0;
      for (let c = nonzero + 1; c < n; c++) val -= aug[r][c] * coefs[c];
      coefs[nonzero] = val / aug[r][nonzero];
    }

    // Convert to integers
    const scale = coefs.reduce((acc, v) => v !== 0 ? lcm(acc, Math.round(1 / Math.abs(v) * 100)) : acc, 1);
    const intCoefs = coefs.map(v => Math.round(v * scale / 100));
    const gcdAll = intCoefs.reduce(gcd);
    const final = intCoefs.map(v => v / gcdAll);

    if (final.some(v => v <= 0)) return { error: 'Could not balance equation.' };

    const fmt = (c: string[], coef: number[]) =>
      c.map((f, i) => (coef[i] === 1 ? '' : coef[i]) + f).join(' + ');

    const balanced =
      fmt(reactants, final.slice(0, reactants.length)) +
      ' → ' +
      fmt(products, final.slice(reactants.length));

    return { balanced, coefficients: final };
  } catch {
    return { error: 'Invalid equation format.' };
  }
}
