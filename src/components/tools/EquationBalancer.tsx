import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useEquationBalancer } from '@/hooks/useEquationBalancer'
import { useState } from 'react'

export const EquationBalancer = () => {
  const [input, setInput] = useState('')
  const { result, pending, run } = useEquationBalancer()

  const balance = () => run(input)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equation Balancer</CardTitle>
        <CardDescription>
          Enter an unbalanced equation using {'->'}. Example: <code>H2 + O2 -{'>'} H2O</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && balance()}
            placeholder="e.g. Fe + O2 -> Fe2O3"
            className="flex-1"
          />
          <Button onClick={balance} disabled={pending} variant="primary">
            {pending ? 'Balancing...' : 'Balance'}
          </Button>
        </div>

        {result && (
          <div
            className={`mt-4 rounded-md border p-4 ${
              result.error
                ? 'border-red-500/30 bg-red-500/10'
                : 'border-green-500/30 bg-green-500/10'
            }`}
          >
            {result.error ? (
              <p className="text-sm text-[var(--color-danger)]">{result.error}</p>
            ) : (
              <p className="font-mono text-base text-ink">{result.balanced}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
