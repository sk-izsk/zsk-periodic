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
    <div
      className="rounded-xl p-5"
      style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Solubility Table</h2>
      <p style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 12 }}>
        S = soluble &nbsp; I = insoluble &nbsp; Sl = slightly soluble &nbsp; D = decomposes
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ fontSize: 11, borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th
                style={{ padding: '4px 8px', color: 'var(--color-muted)', textAlign: 'left' }}
              ></th>
              {ANIONS.map((a) => (
                <th
                  key={a}
                  style={{ padding: '4px 6px', color: 'var(--color-muted)', fontWeight: 500 }}
                >
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATIONS.map((cat) => (
              <tr key={cat}>
                <td style={{ padding: '4px 8px', fontWeight: 500 }}>{cat}</td>
                {ANIONS.map((an) => {
                  const val = DATA[cat]?.[an] ?? '?'
                  return (
                    <td key={an} style={{ padding: '4px 6px', textAlign: 'center' }}>
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
    </div>
  )
}

export { SolubilityTable }
