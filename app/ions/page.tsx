import { ION_SECTION_LABELS, ionsData } from '@/lib/features/ions/data';
import { groupIonsBySection, sectionOrder } from '@/lib/features/ions/selectors';

export default function IonsPage() {
  const grouped = groupIonsBySection(ionsData);

  return (
    <main className="max-w-4xl mx-auto p-6">
        <h1 style={{ fontSize: 24, fontWeight: 500, marginBottom: 4 }}>Common Ions</h1>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', marginBottom: 24 }}>Section-grouped reference for common ions, aligned to the phase-2 data model.</p>

        {sectionOrder().map((section) => (
          <section key={section} className="mb-8">
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{ION_SECTION_LABELS[section]}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
              {grouped[section].map((ion) => (
                <div key={ion.id} className="rounded-lg p-3"
                  style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      color: ion.type === 'Cation' ? '#2563eb' : '#dc2626',
                    }}
                  >
                    {ion.formula}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 2 }}>{ion.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 2 }}>{ion.category}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 2 }}>{ion.mass} g/mol</div>
                </div>
              ))}
            </div>
          </section>
        ))}
    </main>
  );
}
