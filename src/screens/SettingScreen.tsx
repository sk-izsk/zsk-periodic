import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  useAnimationSpeed,
  useAnimationsPaused,
  useSetAnimationSpeed,
  useSetAnimationsPaused,
} from '@/hooks/store/useAnimationStore'
import { useMassUnit, useSetMassUnit } from '@/hooks/store/useSettingsStore'
import { useAppTranslation } from '@/i18n/localize'

const SettingsScreen = () => {
  const { t } = useAppTranslation()
  const animationSpeed = useAnimationSpeed()
  const animationsPaused = useAnimationsPaused()
  const massUnit = useMassUnit()
  const setAnimationSpeed = useSetAnimationSpeed()
  const setAnimationsPaused = useSetAnimationsPaused()
  const setMassUnit = useSetMassUnit()

  return (
    <main className="w-full max-w-4xl p-6 mx-auto">
      <header className="rounded-lg border border-line bg-surface p-5 shadow-[var(--shadow-panel)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Console setup</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{t('settings.title')}</h1>
        <p className="mt-2 text-sm text-muted">{t('settings.subtitle')}</p>
      </header>

      <Card className="mt-6">
        <CardContent className="pt-5">
          <label className="block text-sm font-medium">
            {t('settings.animationSpeed')}: {animationSpeed.toFixed(2)}x
          </label>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="w-full mt-2"
          />
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input
              type="checkbox"
              checked={animationsPaused}
              onChange={(e) => setAnimationsPaused(e.target.checked)}
            />
            {t('settings.pauseAnimations')}
          </label>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="pt-5">
          <div className="mb-2 text-sm font-medium">{t('settings.globalUnit')}</div>
          <div className="flex gap-2">
            {(['highSchool', 'universityConventional'] as const).map((option) => (
              <Button
                key={option}
                onClick={() => setMassUnit(option)}
                variant={massUnit === option ? 'primary' : 'secondary'}
              >
                {option === 'highSchool' ? 'High School' : 'University'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default SettingsScreen
