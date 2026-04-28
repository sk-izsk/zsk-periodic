'use client';
import { CATEGORY_COLORS, CATEGORY_LABELS, Element, ElementCategory, elements } from '@/lib/elements';
import { useAppStore } from '@/lib/store';
import ElementCell from './ElementCell';
import ElementDetail from './ElementDetail';

// Grid positions: [atomicNumber] -> { row, col } in 18-col layout
const GRID: Record<number, { row: number; col: number }> = {};
elements.forEach(e => {
  if (!e.group) return; // lanthanides/actinides handled separately
  // Skip f-block placeholders (La, Ac shown at col 3)
  if (e.n >= 58 && e.n <= 71) return;
  if (e.n >= 90 && e.n <= 103) return;
  GRID[e.n] = { row: e.period, col: e.group };
});

const MAIN = elements.filter(e => GRID[e.n]);
const LANTHANIDES = elements.filter(e => e.n >= 57 && e.n <= 71);
const ACTINIDES   = elements.filter(e => e.n >= 89 && e.n <= 103);

export default function PeriodicTable() {
  const { selectedElement, setSelectedElement, filterCategory, setFilterCategory, searchQuery, setSearchQuery } = useAppStore();

  const matches = (el: Element) => {
    const qMatch = !searchQuery || el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.sym.toLowerCase().includes(searchQuery.toLowerCase()) || String(el.n).includes(searchQuery);
    const catMatch = !filterCategory || el.cat === filterCategory;
    return qMatch && catMatch;
  };

  const hasFilter = !!filterCategory || searchQuery.length > 0;

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center mb-3">
        <div className="flex flex-wrap gap-1">
          {(Object.entries(CATEGORY_LABELS) as [ElementCategory, string][]).map(([k, v]) => (
            <button key={k} onClick={() => setFilterCategory(k)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs border transition-all"
              style={{
                borderColor: filterCategory === k ? CATEGORY_COLORS[k] : 'var(--color-border)',
                background: filterCategory === k ? CATEGORY_COLORS[k] : 'transparent',
                color: filterCategory === k ? '#fff' : 'var(--color-muted)',
              }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: CATEGORY_COLORS[k], display: 'inline-block' }} />
              {v}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search element…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="ml-auto px-3 py-1.5 rounded-lg text-sm outline-none"
          style={{ border: '0.5px solid var(--color-border)', background: 'var(--color-bg2)', color: 'var(--color-text)', width: 160 }}
        />
      </div>

      {/* Main table */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, 38px)', gridTemplateRows: 'repeat(7, 46px)', gap: 2, minWidth: 700 }}>
          {Array.from({ length: 7 }, (_, r) =>
            Array.from({ length: 18 }, (_, c) => {
              const row = r + 1, col = c + 1;
              const el = MAIN.find(e => GRID[e.n].row === row && GRID[e.n].col === col);

              if (el) return (
                <div key={el.n} style={{ gridRow: row, gridColumn: col }}>
                  <ElementCell
                    element={el}
                    dimmed={hasFilter && !matches(el)}
                    highlighted={hasFilter && matches(el)}
                    onClick={setSelectedElement}
                  />
                </div>
              );

              // Placeholder for lanthanide/actinide row indicator
              if ((row === 6 || row === 7) && col === 3) return (
                <div key={`${row}-${col}`} style={{ gridRow: row, gridColumn: col, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, color: 'var(--color-muted)' }}>{row === 6 ? '57–71' : '89–103'}</span>
                </div>
              );

              return <div key={`${row}-${col}`} style={{ gridRow: row, gridColumn: col }} />;
            })
          )}
        </div>

        {/* Lanthanides + Actinides */}
        <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[LANTHANIDES, ACTINIDES].map((series, i) => (
            <div key={i} style={{ display: 'flex', gap: 2, paddingLeft: 80 }}>
              {series.map(el => (
                <ElementCell key={el.n} element={el}
                  dimmed={hasFilter && !matches(el)}
                  highlighted={hasFilter && matches(el)}
                  onClick={setSelectedElement}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selectedElement && (
        <ElementDetail element={selectedElement} onClose={() => setSelectedElement(null)} />
      )}
    </div>
  );
}
