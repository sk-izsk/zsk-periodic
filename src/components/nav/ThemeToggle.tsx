import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  darkMode: boolean
  label: string
  onToggle: () => void
}

const ThemeToggle = ({ darkMode, label, onToggle }: ThemeToggleProps) => (
  <Button onClick={onToggle} variant="secondary" size="icon" aria-label={label}>
    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
  </Button>
)

export { ThemeToggle }
