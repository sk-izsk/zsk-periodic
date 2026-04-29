import jsPDF from 'jspdf'

export type ReactionType = 'synthesis' | 'decomposition' | 'single' | 'double' | 'combustion'
export type Difficulty = 'easy' | 'medium' | 'hard'

const REACTIONS: Record<ReactionType, { eq: string; balanced: string }[]> = {
  synthesis: [
    { eq: 'H₂ + O₂ →', balanced: '2H₂ + O₂ → 2H₂O' },
    { eq: 'Na + Cl₂ →', balanced: '2Na + Cl₂ → 2NaCl' },
    { eq: 'Fe + S →', balanced: 'Fe + S → FeS' },
    { eq: 'Mg + O₂ →', balanced: '2Mg + O₂ → 2MgO' },
    { eq: 'N₂ + H₂ →', balanced: 'N₂ + 3H₂ → 2NH₃' },
  ],
  decomposition: [
    { eq: 'H₂O →', balanced: '2H₂O → 2H₂ + O₂' },
    { eq: 'CaCO₃ →', balanced: 'CaCO₃ → CaO + CO₂' },
    { eq: 'H₂O₂ →', balanced: '2H₂O₂ → 2H₂O + O₂' },
    { eq: 'NH₃ →', balanced: '2NH₃ → N₂ + 3H₂' },
  ],
  single: [
    { eq: 'Zn + HCl →', balanced: 'Zn + 2HCl → ZnCl₂ + H₂' },
    { eq: 'Fe + CuSO₄ →', balanced: 'Fe + CuSO₄ → FeSO₄ + Cu' },
    { eq: 'Mg + H₂SO₄ →', balanced: 'Mg + H₂SO₄ → MgSO₄ + H₂' },
  ],
  double: [
    { eq: 'NaCl + AgNO₃ →', balanced: 'NaCl + AgNO₃ → NaNO₃ + AgCl' },
    { eq: 'HCl + NaOH →', balanced: 'HCl + NaOH → NaCl + H₂O' },
    { eq: 'BaCl₂ + Na₂SO₄ →', balanced: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl' },
  ],
  combustion: [
    { eq: 'CH₄ + O₂ →', balanced: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
    { eq: 'C₃H₈ + O₂ →', balanced: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O' },
    { eq: 'C₂H₅OH + O₂ →', balanced: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O' },
  ],
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateWorksheet(opts: {
  count: number
  types: ReactionType[]
  difficulty: Difficulty
  includeAnswers: boolean
}): void {
  const { count, types, difficulty, includeAnswers } = opts

  const pool = types.flatMap((t) => REACTIONS[t])
  const questions: typeof pool = []
  for (let i = 0; i < count; i++) {
    questions.push(pickRandom(pool))
  }

  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.getWidth()

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Chemical Equation Worksheet', pageW / 2, 20, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(
    `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}   |   Questions: ${count}`,
    pageW / 2,
    28,
    { align: 'center' },
  )

  doc.setDrawColor(180)
  doc.line(14, 32, pageW - 14, 32)

  doc.setFontSize(11)
  let y = 44

  doc.setFont('helvetica', 'normal')
  doc.text('Name: ___________________________   Date: ___________   Score: ______', 14, y)
  y += 12

  doc.setFont('helvetica', 'bold')
  doc.text('Balance the following chemical equations:', 14, y)
  y += 10

  doc.setFont('helvetica', 'normal')
  questions.forEach((q, i) => {
    if (y > 270) {
      doc.addPage()
      y = 20
    }
    doc.text(`${i + 1}.  ${q.eq}`, 14, y)
    y += 12
    doc.setDrawColor(200)
    doc.line(80, y, pageW - 14, y)
    y += 8
  })

  if (includeAnswers) {
    doc.addPage()
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('Answer Key', pageW / 2, 20, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    y = 34
    questions.forEach((q, i) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }
      doc.text(`${i + 1}.  ${q.balanced}`, 14, y)
      y += 10
    })
  }

  doc.save(`chemistry-worksheet-${difficulty}.pdf`)
}
