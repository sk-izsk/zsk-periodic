import { EquationBalancer } from '@/components/tools/EquationBalancer'
import { MolarMassCalc } from '@/components/tools/MolarMassCalc'
import { SolubilityTable } from '@/components/tools/SolubilityTable'

const ToolsScreen = () => {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-5 p-6">
      <header className="rounded-lg border border-line bg-surface p-5 shadow-[var(--shadow-panel)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Lab console</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Chemistry Tools</h1>
      </header>
      <EquationBalancer />
      <MolarMassCalc />
      <SolubilityTable />
    </main>
  )
}

export default ToolsScreen
