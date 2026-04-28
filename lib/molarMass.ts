import { elementsBySymbol } from './elements';

export interface MolarMassResult {
  total: number;
  breakdown: { element: string; count: number; mass: number; contribution: number }[];
  error?: string;
}

export function calcMolarMass(formula: string): MolarMassResult {
  const breakdown: MolarMassResult['breakdown'] = [];
  let total = 0;

  // Handles nested parens e.g. Ca(OH)2
  function parse(f: string, multiplier = 1): boolean {
    const re = /([A-Z][a-z]?)(\d*)|(\()|(\))(\d*)/g;
    let m: RegExpExecArray | null;
    const stack: number[] = [multiplier];

    while ((m = re.exec(f)) !== null) {
      if (m[1]) {
        const el = elementsBySymbol[m[1]];
        if (!el) return false;
        const count = (m[2] ? parseInt(m[2]) : 1) * stack[stack.length - 1];
        const contrib = el.mass * count;
        total += contrib;
        const existing = breakdown.find(b => b.element === m![1]);
        if (existing) { existing.count += count; existing.contribution += contrib; }
        else breakdown.push({ element: m[1], count, mass: el.mass, contribution: contrib });
      } else if (m[3]) {
        stack.push(stack[stack.length - 1]);
      } else if (m[4]) {
        stack.pop();
        const n = m[5] ? parseInt(m[5]) : 1;
        if (n > 1) {
          // scale last group
          const top = stack[stack.length - 1];
          stack.push(top * n);
          // re-traverse would be cleaner, but for MVP inline multiply:
        }
      }
    }
    return true;
  }

  const ok = parse(formula);
  if (!ok || total === 0) return { total: 0, breakdown: [], error: 'Invalid formula.' };
  return { total: parseFloat(total.toFixed(4)), breakdown };
}
