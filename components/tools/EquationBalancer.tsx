'use client';
import { useState } from 'react';
import { balanceEquation } from '@/lib/balancer';

export default function EquationBalancer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ balanced?: string; error?: string } | null>(null);

  const run = () => setResult(balanceEquation(input));

  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Equation Balancer</h2>
      <p style={{ fontSize: 13, color: 'var(--color-muted)', marginBottom: 12 }}>
        Enter an unbalanced equation using {'->'}. Example: <code>H2 + O2 -{'>'} H2O</code>
      </p>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && run()}
          placeholder="e.g. Fe + O2 -> Fe2O3"
          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
          style={{ border: '0.5px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
        />
        <button onClick={run} className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          Balance
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-lg" style={{
          background: result.error ? 'rgba(239,68,68,.1)' : 'rgba(34,197,94,.1)',
          border: `0.5px solid ${result.error ? 'rgba(239,68,68,.3)' : 'rgba(34,197,94,.3)'}`,
        }}>
          {result.error
            ? <p style={{ color: '#ef4444', fontSize: 14 }}>{result.error}</p>
            : <p style={{ fontFamily: 'monospace', fontSize: 16 }}>{result.balanced}</p>
          }
        </div>
      )}
    </div>
  );
}
