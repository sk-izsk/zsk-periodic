'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import clsx from 'clsx';

const LINKS = [
  { href: '/', label: 'Table' },
  { href: '/ions', label: 'Ions' },
  { href: '/tools', label: 'Tools' },
  { href: '/worksheet', label: 'Worksheet' },
];

export default function Nav() {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useAppStore();

  return (
    <nav className="flex items-center gap-1 px-4 py-2 border-b sticky top-0 z-50"
      style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
      <span className="font-bold text-lg mr-4 tracking-tight">Zperiod</span>
      {LINKS.map(l => (
        <Link key={l.href} href={l.href}
          className={clsx(
            'px-3 py-1.5 rounded text-sm transition-colors',
            pathname === l.href
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          )}>
          {l.label}
        </Link>
      ))}
      <button onClick={toggleDarkMode} className="ml-auto text-sm px-3 py-1.5 rounded border"
        style={{ borderColor: 'var(--color-border)' }}>
        {darkMode ? '☀ Light' : '☾ Dark'}
      </button>
    </nav>
  );
}
