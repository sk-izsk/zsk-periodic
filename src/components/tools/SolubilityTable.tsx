const CATIONS = [
  'Li⁺',
  'Na⁺',
  'K⁺',
  'NH₄⁺',
  'Ag⁺',
  'Ca²⁺',
  'Mg²⁺',
  'Ba²⁺',
  'Fe²⁺',
  'Fe³⁺',
  'Cu²⁺',
  'Zn²⁺',
  'Pb²⁺',
]
const ANIONS = ['Cl⁻', 'Br⁻', 'I⁻', 'SO₄²⁻', 'CO₃²⁻', 'OH⁻', 'NO₃⁻', 'PO₄³⁻']

// S=soluble, I=insoluble, Sl=slightly soluble, D=decomposes
const DATA: Record<string, Record<string, string>> = {
  'Li⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'S',
    'OH⁻': 'S',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'S',
  },
  'Na⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'S',
    'OH⁻': 'S',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'S',
  },
  'K⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'S',
    'OH⁻': 'S',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'S',
  },
  'NH₄⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'S',
    'OH⁻': 'S',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'S',
  },
  'Ag⁺': {
    'Cl⁻': 'I',
    'Br⁻': 'I',
    'I⁻': 'I',
    'SO₄²⁻': 'Sl',
    'CO₃²⁻': 'I',
    'OH⁻': 'I',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Ca²⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'Sl',
    'CO₃²⁻': 'I',
    'OH⁻': 'Sl',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Mg²⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'I',
    'OH⁻': 'I',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Ba²⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'I',
    'CO₃²⁻': 'I',
    'OH⁻': 'S',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Fe²⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'I',
    'OH⁻': 'I',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Fe³⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'D',
    'OH⁻': 'I',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Cu²⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'I',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'I',
    'OH⁻': 'I',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Zn²⁺': {
    'Cl⁻': 'S',
    'Br⁻': 'S',
    'I⁻': 'S',
    'SO₄²⁻': 'S',
    'CO₃²⁻': 'I',
    'OH⁻': 'I',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
  'Pb²⁺': {
    'Cl⁻': 'I',
    'Br⁻': 'I',
    'I⁻': 'I',
    'SO₄²⁻': 'I',
    'CO₃²⁻': 'I',
    'OH⁻': 'I',
    'NO₃⁻': 'S',
    'PO₄³⁻': 'I',
  },
}

const COLORS: Record<string, string> = {
  S: '#22c55e',
  I: '#ef4444',
  Sl: '#f59e0b',
  D: '#8b5cf6',
}

const SolubilityTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solubility Table</CardTitle>
        <CardDescription>
          S = soluble &nbsp; I = insoluble &nbsp; Sl = slightly soluble &nbsp; D = decomposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] border-collapse text-xs">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left text-muted"></th>
                {ANIONS.map((a) => (
                  <th key={a} className="px-1.5 py-1 font-medium text-muted">
                    {a}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATIONS.map((cat) => (
                <tr key={cat} className="border-t border-line/60">
                  <td className="px-2 py-1 font-medium">{cat}</td>
                  {ANIONS.map((an) => {
                    const val = DATA[cat]?.[an] ?? '?'
                    return (
                      <td key={an} className="px-1.5 py-1 text-center">
                        <span
                          style={{
                            display: 'inline-block',
                            width: 24,
                            lineHeight: '24px',
                            borderRadius: 4,
                            fontSize: 10,
                            fontWeight: 500,
                            background: COLORS[val] + '33',
                            color: COLORS[val],
                          }}
                        >
                          {val}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export { SolubilityTable }
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
