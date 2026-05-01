import { EquationBalancer } from '@/components/tools/EquationBalancer'
import { MolarMassCalc } from '@/components/tools/MolarMassCalc'
import { SolubilityTable } from '@/components/tools/SolubilityTable'

const ToolsScreen = () => {
  return (
    <main className="flex flex-col max-w-3xl gap-6 p-6 mx-auto">
      <h1 style={{ fontSize: 24, fontWeight: 500 }}>Chemistry Tools</h1>
      <EquationBalancer />
      <MolarMassCalc />
      <SolubilityTable />
    </main>
  )
}

export default ToolsScreen
