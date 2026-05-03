import { useAppTranslation } from '../i18n/localize'

export const useIsotopeStatusLabel = (value: string) => {
  const { t } = useAppTranslation()
  if (value === 'Stable') {
    return t('modal.stable')
  }
  if (value === 'Radioactive/Trace') {
    return t('modal.radioactiveTrace')
  }
  return value
}
