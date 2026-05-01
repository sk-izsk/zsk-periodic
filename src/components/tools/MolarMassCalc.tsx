import { calcMolarMass } from '@/lib/molarMass'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const MolarMassCalc = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcMolarMass> | null>(null)

  const run = () => setResult(calcMolarMass(input))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Molar Mass Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && run()}
            placeholder="e.g. H2O, NaCl, Ca(OH)2"
            className="flex-1"
          />
          <Button onClick={run} variant="primary">
            Calculate
          </Button>
        </div>

        {result && !result.error && (
          <div>
            <div className="mb-3 text-2xl font-semibold text-ink">
              {result.total} <span className="text-sm font-medium text-muted">g/mol</span>
            </div>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="py-1 text-left">Element</th>
                  <th className="py-1 text-right">Count</th>
                  <th className="py-1 text-right">Atomic mass</th>
                  <th className="py-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((row) => (
                  <tr key={row.element} className="border-b border-line/70">
                    <td className="py-1 font-medium">{row.element}</td>
                    <td className="py-1 text-right">{row.count}</td>
                    <td className="py-1 text-right text-muted">{row.mass}</td>
                    <td className="py-1 text-right">{row.contribution.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {result?.error && <p className="text-sm text-[var(--color-danger)]">{result.error}</p>}
      </CardContent>
    </Card>
  )
}

export { MolarMassCalc }
