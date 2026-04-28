import Nav from '@/components/Nav';

const IONS = [
  { formula: 'H⁺',    name: 'Hydron',         type: 'Cation', mass: 1.008  },
  { formula: 'Li⁺',   name: 'Lithium ion',     type: 'Cation', mass: 6.941  },
  { formula: 'Na⁺',   name: 'Sodium ion',      type: 'Cation', mass: 22.99  },
  { formula: 'K⁺',    name: 'Potassium ion',   type: 'Cation', mass: 39.10  },
  { formula: 'Mg²⁺',  name: 'Magnesium ion',   type: 'Cation', mass: 24.31  },
  { formula: 'Ca²⁺',  name: 'Calcium ion',     type: 'Cation', mass: 40.08  },
  { formula: 'Fe²⁺',  name: 'Iron(II)',         type: 'Cation', mass: 55.85  },
  { formula: 'Fe³⁺',  name: 'Iron(III)',        type: 'Cation', mass: 55.85  },
  { formula: 'Cu²⁺',  name: 'Copper(II)',       type: 'Cation', mass: 63.55  },
  { formula: 'Zn²⁺',  name: 'Zinc ion',         type: 'Cation', mass: 65.38  },
  { formula: 'Ag⁺',   name: 'Silver ion',       type: 'Cation', mass: 107.87 },
  { formula: 'Ba²⁺',  name: 'Barium ion',       type: 'Cation', mass: 137.33 },
  { formula: 'Al³⁺',  name: 'Aluminum ion',     type: 'Cation', mass: 26.98  },
  { formula: 'NH₄⁺',  name: 'Ammonium',         type: 'Cation', mass: 18.04  },
  { formula: 'H⁻',    name: 'Hydride',          type: 'Anion',  mass: 1.008  },
  { formula: 'F⁻',    name: 'Fluoride',         type: 'Anion',  mass: 19.00  },
  { formula: 'Cl⁻',   name: 'Chloride',         type: 'Anion',  mass: 35.45  },
  { formula: 'Br⁻',   name: 'Bromide',          type: 'Anion',  mass: 79.90  },
  { formula: 'I⁻',    name: 'Iodide',           type: 'Anion',  mass: 126.90 },
  { formula: 'O²⁻',   name: 'Oxide',            type: 'Anion',  mass: 16.00  },
  { formula: 'OH⁻',   name: 'Hydroxide',        type: 'Anion',  mass: 17.01  },
  { formula: 'S²⁻',   name: 'Sulfide',          type: 'Anion',  mass: 32.06  },
  { formula: 'NO₃⁻',  name: 'Nitrate',          type: 'Anion',  mass: 62.00  },
  { formula: 'NO₂⁻',  name: 'Nitrite',          type: 'Anion',  mass: 46.01  },
  { formula: 'SO₄²⁻', name: 'Sulfate',          type: 'Anion',  mass: 96.06  },
  { formula: 'SO₃²⁻', name: 'Sulfite',          type: 'Anion',  mass: 80.06  },
  { formula: 'CO₃²⁻', name: 'Carbonate',        type: 'Anion',  mass: 60.01  },
  { formula: 'HCO₃⁻', name: 'Bicarbonate',      type: 'Anion',  mass: 61.02  },
  { formula: 'PO₄³⁻', name: 'Phosphate',        type: 'Anion',  mass: 94.97  },
  { formula: 'CH₃COO⁻', name: 'Acetate',        type: 'Anion',  mass: 59.04  },
  { formula: 'MnO₄⁻', name: 'Permanganate',     type: 'Anion',  mass: 118.94 },
  { formula: 'Cr₂O₇²⁻', name: 'Dichromate',    type: 'Anion',  mass: 216.00 },
];

export default function IonsPage() {
  const cations = IONS.filter(i => i.type === 'Cation');
  const anions  = IONS.filter(i => i.type === 'Anion');

  return (
    <div>
      <Nav />
      <main className="max-w-4xl mx-auto p-6">
        <h1 style={{ fontSize: 24, fontWeight: 500, marginBottom: 4 }}>Common Ions</h1>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', marginBottom: 24 }}>50+ monatomic and polyatomic ions with charges and molar masses.</p>

        {[{ label: 'Cations (positively charged)', data: cations, color: '#3b82f6' },
          { label: 'Anions (negatively charged)',  data: anions,  color: '#ef4444' }].map(group => (
          <section key={group.label} className="mb-8">
            <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>{group.label}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
              {group.data.map(ion => (
                <div key={ion.formula} className="rounded-lg p-3"
                  style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}>
                  <div style={{ fontSize: 20, fontWeight: 500, color: group.color }}>{ion.formula}</div>
                  <div style={{ fontSize: 13, marginTop: 2 }}>{ion.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 2 }}>{ion.mass} g/mol</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
