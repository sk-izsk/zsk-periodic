'use client';
import type { AppLanguage } from '@/lib/i18n/types';
import { t } from '@/lib/i18n/ui';
import { useAppStore } from '@/lib/store';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '/', key: 'nav.table' },
  { href: '/ions', key: 'nav.ions' },
  { href: '/tools', key: 'nav.tools' },
  { href: '/worksheet', key: 'nav.worksheet' },
  { href: '/settings', key: 'nav.settings' },
];

const LANGUAGES: { value: AppLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '简体中文' },
  { value: 'zh-Hant', label: '繁體中文' },
  { value: 'fr', label: 'Français' },
  { value: 'ru', label: 'Русский' },
  { value: 'fa', label: 'فارسی' },
  { value: 'ur', label: 'اردو' },
  { value: 'tl', label: 'Tagalog' },
];

export default function Nav() {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode, language, setLanguage, searchQuery, setSearchQuery } = useAppStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    const onQuickSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener('keydown', onQuickSearch);
    return () => window.removeEventListener('keydown', onQuickSearch);
  }, []);

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
          {t(language, l.key, l.key)}
        </Link>
      ))}

      {pathname === '/' && (
        <div className="ml-auto mr-2">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search elements... (Cmd+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm outline-none"
            style={{ border: '0.5px solid var(--color-border)', background: 'var(--color-bg2)', color: 'var(--color-text)', width: 240 }}
          />
        </div>
      )}

      <div ref={dropdownRef} className={pathname === '/' ? 'relative' : 'ml-auto relative'}>
        <button
          onClick={() => setOpen((s) => !s)}
          className="text-sm px-3 py-1.5 rounded border"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {t(language, 'nav.language', 'Language')}
        </button>
        {open && (
          <div
            className="absolute right-0 mt-1 rounded-md py-1 min-w-44"
            style={{
              background: 'var(--color-bg)',
              border: '0.5px solid var(--color-border)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.16)',
            }}
          >
            {LANGUAGES.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setLanguage(item.value);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-sm"
                style={{
                  background: language === item.value ? 'rgba(37,99,235,0.12)' : 'transparent',
                  color: 'var(--color-text)',
                }}
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/settings#suggest-language"
              className="block px-3 py-1.5 text-sm"
              onClick={() => setOpen(false)}
              style={{ color: 'var(--color-muted)' }}
            >
              {t(language, 'nav.suggestLanguage', 'Suggest a language')}
            </Link>
          </div>
        )}
      </div>

      <button onClick={toggleDarkMode} className="ml-2 text-sm px-3 py-1.5 rounded border"
        style={{ borderColor: 'var(--color-border)' }}>
        {darkMode
          ? `☀ ${t(language, 'common.light', 'Light')}`
          : `☾ ${t(language, 'common.dark', 'Dark')}`}
      </button>
    </nav>
  );
}
