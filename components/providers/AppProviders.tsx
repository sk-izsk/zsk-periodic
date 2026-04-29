
import { RTL_LANGUAGES } from '@/lib/i18n/config';
import { useAppStore } from '@/lib/store';
import { useEffect } from 'react';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const darkMode = useAppStore((s) => s.darkMode);
  const language = useAppStore((s) => s.language);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';
  }, [language]);

  return <>{children}</>;
}
