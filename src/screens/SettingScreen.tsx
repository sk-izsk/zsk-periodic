import { changelogData } from '@/lib/changelog'
import { useAppTranslation } from '@/lib/i18n/localize'
import { useAppStore } from '@/lib/store'

const SettingsScreen = () => {
  const { t } = useAppTranslation()
  const animationSpeed = useAppStore((s) => s.animationSpeed)
  const animationsPaused = useAppStore((s) => s.animationsPaused)
  const massUnit = useAppStore((s) => s.massUnit)
  const setAnimationSpeed = useAppStore((s) => s.setAnimationSpeed)
  const setAnimationsPaused = useAppStore((s) => s.setAnimationsPaused)
  const setMassUnit = useAppStore((s) => s.setMassUnit)
  const resetOnboarding = useAppStore((s) => s.resetOnboarding)

  return (
    <main className="w-full max-w-4xl p-6 mx-auto">
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>{t('settings.title')}</h1>
      <p style={{ fontSize: 14, color: 'var(--color-muted)', marginTop: 4 }}>
        {t('settings.subtitle')}
      </p>

      <section
        className="p-4 mt-6 rounded-xl"
        style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}
      >
        <label style={{ fontSize: 14, fontWeight: 500, display: 'block' }}>
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
        <label className="flex items-center gap-2 mt-3" style={{ fontSize: 14 }}>
          <input
            type="checkbox"
            checked={animationsPaused}
            onChange={(e) => setAnimationsPaused(e.target.checked)}
          />
          {t('settings.pauseAnimations')}
        </label>
      </section>

      <section
        className="p-4 mt-4 rounded-xl"
        style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
          {t('settings.globalUnit')}
        </div>
        <div className="flex gap-2">
          {(['highSchool', 'universityConventional'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setMassUnit(option)}
              className="px-3 py-1.5 rounded text-sm"
              style={{
                border: '0.5px solid var(--color-border)',
                background: massUnit === option ? '#2563eb' : 'transparent',
                color: massUnit === option ? '#fff' : 'var(--color-text)',
              }}
            >
              {option === 'highSchool' ? 'High School' : 'University'}
            </button>
          ))}
        </div>
        <button
          onClick={resetOnboarding}
          className="mt-3 px-3 py-1.5 rounded text-sm"
          style={{ border: '0.5px solid var(--color-border)' }}
        >
          {t('settings.replayWelcome')}
        </button>
      </section>

      <section
        className="p-4 mt-4 rounded-xl"
        style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
          {t('settings.changelog')}
        </h2>
        <article>
          {changelogData.map((entry) => (
            <section key={entry.version}>
              <h2>
                {entry.version} ({entry.date})
              </h2>
              <ul>
                {entry.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </section>
    </main>
  )
}

export default SettingsScreen
