import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import type { RefObject } from 'react'

interface NavSearchProps {
  value: string
  onChange: (value: string) => void
  inputRef: RefObject<HTMLInputElement | null>
}

export const NavSearch: React.FC<NavSearchProps> = ({ value, onChange, inputRef }) => (
  <div className="relative ml-auto mr-1 w-full lg:w-auto">
    <Search
      className="absolute -translate-y-1/2 pointer-events-none left-3 top-1/2 text-muted"
      size={15}
    />
    <Input
      ref={inputRef}
      type="text"
      placeholder="Search elements... (Cmd+K)"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full lg:w-[260px] pl-9"
    />
  </div>
)
