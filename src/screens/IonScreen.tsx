import { ION_SECTION_LABELS, ionsData } from '@/lib/features/ions/data'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { groupIonsBySection, sectionOrder } from '@/lib/features/ions/selectors'
import { useMemo } from 'react'

const IonScreen = () => {
  const grouped = useMemo(() => groupIonsBySection(ionsData), [])
  const sections = useMemo(() => sectionOrder(), [])

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6 rounded-lg border border-line bg-surface p-5 shadow-[var(--shadow-panel)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Reference deck
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Common Ions</h1>
        <p className="mt-2 text-sm text-muted">
          Section-grouped reference for common ions, aligned to the phase-2 data model.
        </p>
      </header>

      {sections.map((section) => (
        <section key={section} className="mb-8">
          <h2 className="mb-3 text-base font-semibold">{ION_SECTION_LABELS[section]}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
            {grouped[section].map((ion) => (
              <Card
                key={ion.id}
                className="p-3 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div
                  className={`text-xl font-semibold ${
                    ion.type === 'Cation'
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-danger)]'
                  }`}
                >
                  {ion.formula}
                </div>
                <div className="mt-1 text-sm">{ion.name}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge>{ion.type}</Badge>
                  <Badge>{ion.category}</Badge>
                </div>
                <div className="mt-2 text-xs text-muted">{ion.category}</div>
                <div className="mt-1 text-xs text-muted">{ion.mass} g/mol</div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default IonScreen
