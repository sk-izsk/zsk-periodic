import { calcMolarMass } from '@/lib/molarMass'
import { useState } from 'react'

const MolarMassCalc = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcMolarMass> | null>(null)

  const run = () => setResult(calcMolarMass(input))

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Molar Mass Calculator</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          placeholder="e.g. H2O, NaCl, Ca(OH)2"
          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
          style={{
            border: '0.5px solid var(--color-border)',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
          }}
        />
        <button
          onClick={run}
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {result && !result.error && (
        <div>
          <div className="text-2xl font-medium mb-3">
            {result.total} <span style={{ fontSize: 14, color: 'var(--color-muted)' }}>g/mol</span>
          </div>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '0.5px solid var(--color-border)',
                  color: 'var(--color-muted)',
                }}
              >
                <th style={{ textAlign: 'left', padding: '4px 0' }}>Element</th>
                <th style={{ textAlign: 'right', padding: '4px 0' }}>Count</th>
                <th style={{ textAlign: 'right', padding: '4px 0' }}>Atomic mass</th>
                <th style={{ textAlign: 'right', padding: '4px 0' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((row) => (
                <tr key={row.element} style={{ borderBottom: '0.5px solid var(--color-border)' }}>
                  <td style={{ padding: '4px 0', fontWeight: 500 }}>{row.element}</td>
                  <td style={{ textAlign: 'right', padding: '4px 0' }}>{row.count}</td>
                  <td style={{ textAlign: 'right', padding: '4px 0', color: 'var(--color-muted)' }}>
                    {row.mass}
                  </td>
                  <td style={{ textAlign: 'right', padding: '4px 0' }}>
                    {row.contribution.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {result?.error && <p style={{ color: '#ef4444', fontSize: 14 }}>{result.error}</p>}
    </div>
  )
}

export { MolarMassCalc }
