import EquationBalancer from '@/components/tools/EquationBalancer';
import MolarMassCalc from '@/components/tools/MolarMassCalc';
import SolubilityTable from '@/components/tools/SolubilityTable';

export default function ToolsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
        <h1 style={{ fontSize: 24, fontWeight: 500 }}>Chemistry Tools</h1>
        <EquationBalancer />
        <MolarMassCalc />
        <SolubilityTable />
    </main>
  );
}
