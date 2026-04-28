'use client';
import { Element, CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/elements';

interface Props {
  element: Element;
  onClose: () => void;
}

function Prop({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-3" style={{ background: 'var(--color-bg)', border: '0.5px solid var(--color-border)' }}>
      <div style={{ fontSize: 10, color: 'var(--color-muted)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function fmt(v: number | null, unit = '') { return v != null ? `${v}${unit}` : '—'; }

export default function ElementDetail({ element, onClose }: Props) {
  const color = CATEGORY_COLORS[element.cat];
  return (
    <div className="mt-3 rounded-xl p-4" style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="rounded-xl flex flex-col items-center justify-center flex-shrink-0"
          style={{ background: color, width: 76, height: 76 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,.8)' }}>{element.n}</span>
          <span style={{ fontSize: 34, fontWeight: 500, color: '#fff', lineHeight: 1 }}>{element.sym}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,.75)' }}>{element.mass}</span>
        </div>
        <div className="flex-1">
          <h2 style={{ fontSize: 22, fontWeight: 500 }}>{element.name}</h2>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 2 }}>
            Period {element.period}{element.group ? ` · Group ${element.group}` : ''} · {element.phase} @ STP
          </p>
          <span className="inline-block mt-2 rounded px-2 py-0.5 text-xs text-white" style={{ background: color }}>
            {CATEGORY_LABELS[element.cat]}
          </span>
        </div>
        <button onClick={onClose} className="text-sm px-3 py-1 rounded"
          style={{ border: '0.5px solid var(--color-border)', color: 'var(--color-muted)' }}>
          close
        </button>
      </div>

      {/* Properties grid */}
      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
        <Prop label="Atomic mass" value={`${element.mass} u`} />
        <Prop label="Electronegativity" value={fmt(element.en, ' (Pauling)')} />
        <Prop label="Melting point" value={fmt(element.mp, ' °C')} />
        <Prop label="Boiling point" value={fmt(element.bp, ' °C')} />
        <Prop label="Density" value={element.density != null ? `${element.density} g/cm³` : '—'} />
        <Prop label="Phase @ STP" value={element.phase} />
      </div>

      {/* Electron config */}
      <div className="mt-3 rounded-lg px-3 py-2 font-mono text-sm"
        style={{ background: 'var(--color-bg)', border: '0.5px solid var(--color-border)' }}>
        Electron configuration: {element.config}
      </div>
    </div>
  );
}
