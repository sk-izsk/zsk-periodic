import type { Difficulty, ReactionType } from '@/lib/worksheet';
import { useState } from 'react';

const REACTION_TYPES: { key: ReactionType; label: string; example: string }[] = [
  { key: 'synthesis',     label: 'Synthesis',          example: 'A + B → AB' },
  { key: 'decomposition', label: 'Decomposition',       example: 'AB → A + B' },
  { key: 'single',        label: 'Single replacement',  example: 'A + BC → AC + B' },
  { key: 'double',        label: 'Double replacement',  example: 'AB + CD → AD + CB' },
  { key: 'combustion',    label: 'Combustion',          example: 'CₓHᵧ + O₂ → CO₂ + H₂O' },
];

export default function WorksheetPage() {
  const [count, setCount] = useState(10);
  const [types, setTypes] = useState<ReactionType[]>(['synthesis', 'decomposition']);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [answers, setAnswers] = useState(true);
  const [generating, setGenerating] = useState(false);

  const toggle = (t: ReactionType) =>
    setTypes(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);

  const generate = async () => {
    if (types.length === 0) return;
    setGenerating(true);
    const { generateWorksheet } = await import('@/lib/worksheet');
    generateWorksheet({ count, types, difficulty, includeAnswers: answers });
    setGenerating(false);
  };

  return (
    <main className="max-w-2xl p-6 mx-auto">
        <h1 style={{ fontSize: 24, fontWeight: 500, marginBottom: 4 }}>Worksheet Generator</h1>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', marginBottom: 24 }}>
          Generate print-ready balanced equation worksheets with answer key.
        </p>

        {/* Question count */}
        <section className="mb-6">
          <label style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 8 }}>Number of questions</label>
          <div className="flex gap-2">
            {[5, 10, 20, 30, 50].map(n => (
              <button key={n} onClick={() => setCount(n)}
                className="px-4 py-2 text-sm transition-colors rounded-lg"
                style={{
                  background: count === n ? '#3b82f6' : 'var(--color-bg2)',
                  color: count === n ? '#fff' : 'var(--color-text)',
                  border: '0.5px solid var(--color-border)',
                }}>
                {n}
              </button>
            ))}
          </div>
        </section>

        {/* Reaction types */}
        <section className="mb-6">
          <label style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 8 }}>Reaction types</label>
          <div className="flex flex-col gap-2">
            {REACTION_TYPES.map(t => (
              <label key={t.key} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
                style={{ border: '0.5px solid var(--color-border)', background: types.includes(t.key) ? 'rgba(59,130,246,.08)' : 'var(--color-bg2)' }}>
                <input type="checkbox" checked={types.includes(t.key)} onChange={() => toggle(t.key)} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'monospace' }}>{t.example}</div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Difficulty */}
        <section className="mb-6">
          <label style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 8 }}>Difficulty</label>
          <div className="flex gap-2">
            {(['easy','medium','hard'] as Difficulty[]).map(d => (
              <button key={d} onClick={() => setDifficulty(d)}
                className="px-4 py-2 text-sm capitalize transition-colors rounded-lg"
                style={{
                  background: difficulty === d ? '#3b82f6' : 'var(--color-bg2)',
                  color: difficulty === d ? '#fff' : 'var(--color-text)',
                  border: '0.5px solid var(--color-border)',
                }}>
                {d}
              </button>
            ))}
          </div>
        </section>

        {/* Include answers */}
        <section className="mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={answers} onChange={e => setAnswers(e.target.checked)} />
            <span style={{ fontSize: 14 }}>Include answer key</span>
          </label>
        </section>

        <button onClick={generate} disabled={generating || types.length === 0}
          className="w-full py-3 text-sm font-medium text-white transition-colors rounded-xl"
          style={{ background: types.length === 0 ? '#94a3b8' : '#3b82f6' }}>
          {generating ? 'Generating…' : `Generate ${count}-question worksheet (PDF)`}
        </button>
    </main>
  );
}
