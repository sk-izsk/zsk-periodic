import type { AppLanguage, TranslationDict } from '../types';
import { enUI } from './en';
import { faUI } from './fa';
import { frUI } from './fr';
import { ruUI } from './ru';
import { tlUI } from './tl';
import { urUI } from './ur';
import { zhUI } from './zh';
import { zhHantUI } from './zh-Hant';

const UI_DICTIONARIES: Record<AppLanguage, TranslationDict> = {
  en: enUI,
  zh: zhUI,
  'zh-Hant': zhHantUI,
  fr: frUI,
  ru: ruUI,
  fa: faUI,
  ur: urUI,
  tl: tlUI,
};

function getByPath(dict: TranslationDict, key: string): string | undefined {
  const parts = key.split('.');
  let current: string | TranslationDict | undefined = dict;

  for (const part of parts) {
    if (typeof current !== 'object' || current == null || !(part in current)) {
      return undefined;
    }
    current = current[part];
  }

  return typeof current === 'string' ? current : undefined;
}

export function t(lang: AppLanguage, key: string, fallback = ''): string {
  return (
    getByPath(UI_DICTIONARIES[lang], key) ??
    getByPath(UI_DICTIONARIES.en, key) ??
    fallback
  );
}
