import type { Difficulty, ReactionType } from '@/lib/worksheet'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

const REACTION_TYPES: { key: ReactionType; label: string; example: string }[] = [
  { key: 'synthesis', label: 'Synthesis', example: 'A + B → AB' },
  { key: 'decomposition', label: 'Decomposition', example: 'AB → A + B' },
  { key: 'single', label: 'Single replacement', example: 'A + BC → AC + B' },
  { key: 'double', label: 'Double replacement', example: 'AB + CD → AD + CB' },
  { key: 'combustion', label: 'Combustion', example: 'CₓHᵧ + O₂ → CO₂ + H₂O' },
]

const WorksheetScreen = () => {
  const [count, setCount] = useState(10)
  const [types, setTypes] = useState<ReactionType[]>(['synthesis', 'decomposition'])
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [answers, setAnswers] = useState(true)
  const [generating, setGenerating] = useState(false)

  const toggle = (t: ReactionType) =>
    setTypes((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]))

  const generate = async () => {
    if (types.length === 0) {
      return
    }
    setGenerating(true)
    const { generateWorksheet } = await import('@/lib/worksheet')
    generateWorksheet({ count, types, difficulty, includeAnswers: answers })
    setGenerating(false)
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Print lab</p>
          <CardTitle className="text-2xl">Worksheet Generator</CardTitle>
          <CardDescription>
            Generate print-ready balanced equation worksheets with answer key.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Question count */}
          <section className="mb-6">
            <label className="mb-2 block text-sm font-medium">Number of questions</label>
            <div className="flex gap-2">
              {[5, 10, 20, 30, 50].map((n) => (
                <Button
                  key={n}
                  onClick={() => setCount(n)}
                  variant={count === n ? 'primary' : 'secondary'}
                >
                  {n}
                </Button>
              ))}
            </div>
          </section>

          {/* Reaction types */}
          <section className="mb-6">
            <label className="mb-2 block text-sm font-medium">Reaction types</label>
            <div className="flex flex-col gap-2">
              {REACTION_TYPES.map((t) => (
                <label
                  key={t.key}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors ${
                    types.includes(t.key)
                      ? 'border-[var(--color-accent)] bg-[var(--color-ring)]'
                      : 'border-line bg-elevated'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={types.includes(t.key)}
                    onChange={() => toggle(t.key)}
                  />
                  <div>
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="font-mono text-xs text-muted">{t.example}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Difficulty */}
          <section className="mb-6">
            <label className="mb-2 block text-sm font-medium">Difficulty</label>
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <Button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className="capitalize"
                  variant={difficulty === d ? 'primary' : 'secondary'}
                >
                  {d}
                </Button>
              ))}
            </div>
          </section>

          {/* Include answers */}
          <section className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={answers}
                onChange={(e) => setAnswers(e.target.checked)}
              />
              <span className="text-sm">Include answer key</span>
            </label>
          </section>

          <Button
            onClick={generate}
            disabled={generating || types.length === 0}
            className="w-full"
            size="lg"
            variant="primary"
          >
            {generating ? 'Generating…' : `Generate ${count}-question worksheet (PDF)`}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default WorksheetScreen
