import { Link } from '@tanstack/react-router'
import { Zap } from 'lucide-react'

const NavBrand = () => (
  <Link to="/" search={true} className="mr-2 flex items-center gap-2">
    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-[var(--color-accent)] text-white shadow-sm dark:text-slate-950">
      <Zap size={18} fill="currentColor" />
    </span>
    <span>
      <span className="block text-base font-semibold leading-4 tracking-tight">ZTable</span>
      <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        chemistry console
      </span>
    </span>
  </Link>
)

export { NavBrand }
