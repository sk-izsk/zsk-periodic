import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SOLUBILITY_ANIONS, SOLUBILITY_CATIONS, SOLUBILITY_DATA } from '@/data/tools/solubility'
import { resultCell, resultCode } from './solubilityTable.css'

export const SolubilityTable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solubility Table</CardTitle>
        <CardDescription>
          S = soluble &nbsp; I = insoluble &nbsp; Sl = slightly soluble &nbsp; D = decomposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] border-collapse text-xs">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left text-muted"></th>
                {SOLUBILITY_ANIONS.map((anion) => (
                  <th key={anion} className="px-1.5 py-1 font-medium text-muted">
                    {anion}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SOLUBILITY_CATIONS.map((cation) => (
                <tr key={cation} className="border-t border-line/60">
                  <td className="px-2 py-1 font-medium">{cation}</td>
                  {SOLUBILITY_ANIONS.map((anion) => {
                    const value = SOLUBILITY_DATA[cation][anion]
                    return (
                      <td key={anion} className="px-1.5 py-1 text-center">
                        <span className={`${resultCell} ${resultCode[value]}`}>{value}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
