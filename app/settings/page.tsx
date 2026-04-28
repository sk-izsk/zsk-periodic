'use client';

import Nav from '@/components/Nav';
import { changelogData } from '@/lib/changelog';
import { t } from '@/lib/i18n/ui';
import { useAppStore } from '@/lib/store';
import { marked } from 'marked';

function changelogMarkdown() {
  return changelogData
    .map((entry) => {
      const header = `## ${entry.version} (${entry.date})`;
      const items = entry.changes.map((change) => `- ${change}`).join('\n');
      return `${header}\n${items}`;
    })
    .join('\n\n');
}

export default function SettingsPage() {
  const language = useAppStore((s) => s.language);
  const animationSpeed = useAppStore((s) => s.animationSpeed);
  const animationsPaused = useAppStore((s) => s.animationsPaused);
  const massUnit = useAppStore((s) => s.massUnit);
  const setAnimationSpeed = useAppStore((s) => s.setAnimationSpeed);
  const setAnimationsPaused = useAppStore((s) => s.setAnimationsPaused);
  const setMassUnit = useAppStore((s) => s.setMassUnit);
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);

  const html = marked.parse(changelogMarkdown());

  return (
    <div className="flex flex-col h-screen w-screen">
      <Nav />
      <main className="max-w-4xl mx-auto w-full p-6 overflow-auto">
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>{t(language, 'settings.title', 'Settings')}</h1>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', marginTop: 4 }}>
          {t(language, 'settings.subtitle', 'Control language, animation speed, and global preferences.')}
        </p>

        <section className="mt-6 rounded-xl p-4" style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}>
          <label style={{ fontSize: 14, fontWeight: 500, display: 'block' }}>
            {t(language, 'settings.animationSpeed', 'Animation speed')}: {animationSpeed.toFixed(2)}x
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
          <label className="mt-3 flex items-center gap-2" style={{ fontSize: 14 }}>
            <input
              type="checkbox"
              checked={animationsPaused}
              onChange={(e) => setAnimationsPaused(e.target.checked)}
            />
            {t(language, 'settings.pauseAnimations', 'Pause animations')}
          </label>
        </section>

        <section className="mt-4 rounded-xl p-4" style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
            {t(language, 'settings.globalUnit', 'Global unit preference')}
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
            {t(language, 'settings.replayWelcome', 'Open welcome')}
          </button>
        </section>

        <section className="mt-4 rounded-xl p-4" style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            {t(language, 'settings.changelog', 'Changelog')}
          </h2>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </section>
      </main>
    </div>
  );
}
