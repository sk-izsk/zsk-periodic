'use client';
import AtomModel from '@/components/atoms/AtomModel';
import { CATEGORY_COLORS, CATEGORY_LABELS, elements } from '@/lib/elements';
import { toElementProfile } from '@/lib/features/table/adapters';
import type { ElementProfile } from '@/lib/features/table/types';
import { loadElementLocale } from '@/lib/i18n/locale-loaders';
import type { ElementLocaleRecord } from '@/lib/i18n/types';
import { useAppStore } from '@/lib/store';
import { useRouter, useSearch } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ─── Card colors matching original (L1 steel-blue, L2 blue, L3 amber, L4 red) ───
const CARD_BG: Record<string, string> = {
  l1: '#7a8fa8',
  l2: '#5a7cbf',
  l3: '#c4a34e',
  l4: '#c45858',
};

// ─── Superscript helper ───────────────────────────────────────────────────────
const SUP_DIGITS: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
};
function toSuperscript(n: number): string {
  return String(n).split('').map((c) => SUP_DIGITS[c] ?? c).join('');
}
const SUPS: Record<string, string> = {
  '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸',
};
const ROMAN: Record<string, string> = {
  '+1': 'I', '+2': 'II', '+3': 'III', '+4': 'IV',
  '+5': 'V', '+6': 'VI', '+7': 'VII',
};

function formatIonSymbol(ionStr: string): string {
  const m = ionStr.match(/^([A-Za-z]+)([+-])(\d+)?$/);
  if (!m) return ionStr;
  const [, sym, sign, num] = m;
  if (!num || num === '1') return `${sym}${sign === '+' ? '⁺' : '⁻'}`;
  return `${sym}${SUPS[num] ?? num}${sign === '+' ? '⁺' : '⁻'}`;
}

function parseCommonIons(
  ionStr: string,
  elementName: string,
): { notation: string; label: string }[] {
  if (!ionStr || ionStr === 'No common ions') return [];
  return ionStr.split(', ').map((raw) => {
    const m = raw.match(/^([A-Za-z]+)([+-]\d+)$/);
    if (!m) return { notation: formatIonSymbol(raw), label: '' };
    const charge = m[2];
    const notation = formatIonSymbol(raw);
    const label = ROMAN[charge]
      ? `${elementName}(${ROMAN[charge]})`
      : charge.startsWith('-')
        ? `${elementName}ide`
        : elementName;
    return { notation, label };
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: '9px 16px',
        borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{value}</span>
    </div>
  );
}

function L1Card({ profile }: { profile: ElementProfile }) {
  const ions = parseCommonIons(profile.level1.commonIons, profile.name);
  const typeLabel = profile.level1.type || CATEGORY_LABELS[profile.category] || 'Unknown';

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: CARD_BG.l1,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <CardRow label="Type" value={typeLabel} />
      <CardRow label="Group / Period" value={profile.level1.groupPeriod} />
      <CardRow label="Phase @ STP" value={profile.level1.phaseAtSTP} />
      <CardRow label="Electron Block" value={profile.level1.electronBlock} last />

      {/* Common ions section */}
      <div style={{ flex: 1, padding: '12px 14px 14px' }}>
        <div
          style={{
            height: '100%',
            background: 'rgba(28, 41, 63, 0.42)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 14,
            padding: '10px 10px 12px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Common Ions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
            {ions.length === 0 ? (
              <div
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 11,
                  padding: '10px 12px',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.7)',
                  textAlign: 'center',
                }}
              >
                No common ions
              </div>
            ) : (
              ions.slice(0, 4).map((ion, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.14)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 11,
                    padding: '10px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 18, color: '#f5df9a' }}>
                    {ion.notation}
                  </span>
                  {ion.label && (
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>
                      {ion.label}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function L2Card({
  profile,
  massUnit,
}: {
  profile: ElementProfile;
  massUnit: string;
}) {
  const mass =
    massUnit === 'highSchool'
      ? profile.level2.mass.highSchool
      : (profile.level2.mass.universityConventional ?? profile.level2.mass.highSchool);

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: CARD_BG.l2, borderRadius: 16, overflow: 'hidden' }}
    >
      <CardRow label="Avg Atomic Mass" value={mass} />
      <CardRow label="Configuration" value={profile.electronConfiguration} />
      <CardRow label="Valence e⁻" value={profile.level1.valenceElectrons} />
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {[
          { label: `${profile.level2.protons}`, sub: 'P⁺ Protons' },
          { label: `${Math.round(parseFloat(profile.level2.mass.highSchool)) - profile.level2.protons}`, sub: 'N° Neutrons' },
          { label: `${profile.level2.electronsNeutral}`, sub: 'E⁻ Electrons' },
        ].map(({ label, sub }) => (
          <div key={sub} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{label}</div>
            <div style={{ fontSize: 9, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Isotope list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', padding: '4px 14px 8px', fontWeight: 500 }}>
          Isotopes
        </div>
        {profile.level2.isotopes.map((iso, i) => {
          const massNum = parseInt(iso.name.split('-')[1] ?? '0', 10);
          const symWithSup = `${toSuperscript(massNum)}${profile.symbol}`;
          const isLast = i === profile.level2.isotopes.length - 1;
          return (
            <div
              key={iso.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '9px 14px',
                borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.07)',
                gap: 10,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 18, color: '#ffd77a', minWidth: 64 }}>{symWithSup}</span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', flex: 1 }}>{iso.neutron}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: iso.percent.startsWith('Radioactive') ? '#ff9a9a' : '#7affb8',
                textTransform: 'uppercase',
              }}>{iso.percent}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function L3Card({ profile }: { profile: ElementProfile }) {
  const p = profile.level3.physical;
  const e = profile.level3.electronic;
  const chips = [
    ...e.oxidationStates.common.map((state) => ({ state, kind: 'common' as const })),
    ...e.oxidationStates.possible.map((state) => ({ state, kind: 'possible' as const })),
  ];

  const metrics = [
    { label: '1st Ionization', value: p.firstIonization },
    { label: 'Electron Affinity', value: p.electronAffinity },
    { label: 'Electronegativity', value: p.electronegativity },
    { label: 'Density', value: p.density },
    { label: 'Melting Point', value: p.meltingPoint },
    { label: 'Boiling Point', value: p.boilingPoint },
    { label: 'Atomic Radius', value: p.atomicRadius },
    { label: 'Specific Heat', value: p.specificHeat },
  ];

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: CARD_BG.l3, borderRadius: 16, overflow: 'hidden' }}
    >
      <CardRow label="Configuration" value={e.configuration} last />

      <div style={{ flex: 1, padding: '12px 14px 14px' }}>
        <div
          style={{
            height: '100%',
            background: 'rgba(0, 0, 0, 0.22)',
            border: '1px solid rgba(0, 0, 0, 0.18)',
            borderRadius: 16,
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div
            style={{
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 12,
              padding: '10px 10px 8px',
              background: 'rgba(0, 0, 0, 0.18)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              Oxidation States
              <span style={{ marginLeft: 8, color: 'rgba(160, 220, 255, 0.95)' }}>• Common</span>
              <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.6)' }}>Possible</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {chips.length === 0 ? (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>N/A</span>
              ) : (
                chips.map((chip, idx) => (
                  <span
                    key={`${chip.kind}-${chip.state}-${idx}`}
                    style={{
                      fontSize: 12,
                      lineHeight: '18px',
                      height: 22,
                      minWidth: 30,
                      padding: '0 9px',
                      borderRadius: 999,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#eaf4ff',
                      border: chip.kind === 'common'
                        ? '1px solid rgba(69, 153, 245, 0.55)'
                        : '1px solid rgba(255,255,255,0.2)',
                      background: chip.kind === 'common'
                        ? 'rgba(34, 120, 216, 0.55)'
                        : 'rgba(148, 168, 189, 0.2)',
                      fontWeight: chip.kind === 'common' ? 700 : 600,
                    }}
                  >
                    {chip.state}
                  </span>
                ))
              )}
            </div>
          </div>

          <div
            style={{
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 12,
              padding: '12px 10px',
              background: 'rgba(0, 0, 0, 0.18)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 12px',
              flex: 1,
              alignContent: 'start',
            }}
          >
            {metrics.map((m) => (
              <div key={m.label} style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.45)', paddingLeft: 10 }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: 3,
                    fontWeight: 600,
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontSize: 34, display: 'none' }} />
                <div style={{ fontSize: 13, color: '#ffffff', fontWeight: 700 }}>
                  {m.value || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function L4Card({ profile }: { profile: ElementProfile }) {
  const h = profile.level4.history;
  const uses = profile.level4.uses;
  const hazards = profile.level4.hazards;
  const stse = profile.level4.stseContext;

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: CARD_BG.l4, borderRadius: 16, overflow: 'hidden' }}
    >
      <CardRow label="Discovery Year" value={h.discoveryYear} />
      <CardRow label="Discovered By" value={h.discoveredBy} />
      <CardRow label="Named By" value={h.namedBy} last />

      {uses.length > 0 && (
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Common Uses
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>
            {uses.join(' · ')}
          </div>
        </div>
      )}

      {hazards.length > 0 && (
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Hazards
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>
            {hazards.join(' · ')}
          </div>
        </div>
      )}

      {stse.length > 0 && (
        <div style={{ padding: '10px 14px', flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            STSE Context
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>
            {stse.join(' · ')}
          </div>
        </div>
      )}
    </div>
  );
}

function ControlBtn({
  children,
  title,
  onClick,
  active,
}: {
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 34,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        background: active ? 'rgba(100,120,180,0.25)' : 'var(--color-bg2)',
        border: '1px solid var(--color-border)',
        cursor: 'pointer',
        color: 'var(--color-muted)',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

const LEVELS = ['l1', 'l2', 'l3', 'l4'] as const;

export default function ElementModal() {
  const { element: elementParam } = useSearch({ from: '__root__' });
  const router = useRouter();

  const selectedElement = useAppStore((s) => s.selectedElement);
  const setSelectedElement = useAppStore((s) => s.setSelectedElement);
  const massUnit = useAppStore((s) => s.massUnit);
  const language = useAppStore((s) => s.language);
  const animationsPaused = useAppStore((s) => s.animationsPaused);
  const setAnimationsPaused = useAppStore((s) => s.setAnimationsPaused);
  const animationSpeed = useAppStore((s) => s.animationSpeed);
  const darkMode = useAppStore((s) => s.darkMode);

  const [activeCard, setActiveCard] = useState(0);
  const [locale, setLocale] = useState<ElementLocaleRecord | undefined>();
  const [topView, setTopView] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  // Ref so URL→state effect can read selectedElement without it being a dep
  const selectedElementRef = useRef(selectedElement);
  useEffect(() => { selectedElementRef.current = selectedElement; });

  // state -> URL: fires when selected element changes
  useEffect(() => {
    const next = selectedElement ? String(selectedElement.n) : undefined;
    const current = typeof elementParam === 'string' ? elementParam : undefined;
    if ((next ?? '') === (current ?? '')) return;
    const url = new URL(window.location.href);
    if (next) url.searchParams.set('element', next);
    else url.searchParams.delete('element');
    router.history.replace(url.pathname + url.search + url.hash);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedElement?.n]);

  // URL -> state: fires when URL element param changes
  useEffect(() => {
    if (isClosingRef.current) {
      if (!elementParam) isClosingRef.current = false;
      return;
    }

    const q = typeof elementParam === 'string' ? elementParam : String(elementParam ?? '');
    if (!q) {
      if (selectedElementRef.current) setSelectedElement(null);
      return;
    }
    const byAtomic = /^\d+$/.test(q) ? elements.find((e) => e.n === Number(q)) : undefined;
    const bySymbol = elements.find((e) => e.sym.toLowerCase() === q.toLowerCase());
    const match = byAtomic ?? bySymbol;
    if (!match) return;
    if (selectedElementRef.current?.n !== match.n) setSelectedElement(match);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementParam]);


  // Reset card index and load locale when element changes
  useEffect(() => {
    if (!selectedElement) return;
    setActiveCard(0);
    setTopView(false);
    
    let mounted = true;
    loadElementLocale(language).then((records) => {
      if (!mounted) return;
      setLocale(records[String(selectedElement.n)]);
    });
    return () => {
      mounted = false;
    };
  }, [selectedElement, language]);

  const profile: ElementProfile | null = useMemo(
    () => (selectedElement ? toElementProfile(selectedElement, locale) : null),
    [selectedElement, locale],
  );

  const currentIdx = selectedElement ? elements.findIndex((e) => e.n === selectedElement.n) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < elements.length - 1;

  const navigatePrev = useCallback(() => {
    if (currentIdx > 0) setSelectedElement(elements[currentIdx - 1]);
  }, [currentIdx, setSelectedElement]);

  const navigateNext = useCallback(() => {
    if (currentIdx < elements.length - 1) setSelectedElement(elements[currentIdx + 1]);
  }, [currentIdx, setSelectedElement]);

  const close = useCallback(() => {
    isClosingRef.current = true;
    const url = new URL(window.location.href);
    url.searchParams.delete('element');
    router.history.replace(url.pathname + url.search + url.hash);
    setSelectedElement(null);
  }, [router.history, setSelectedElement]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  // Touch swipe handlers for card slider
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) {
      if (dx < 0) setActiveCard((c) => Math.min(c + 1, LEVELS.length - 1));
      else setActiveCard((c) => Math.max(c - 1, 0));
    }
    touchStartX.current = null;
  };

  // Keyboard arrow navigation when modal is open
  useEffect(() => {
    if (!selectedElement) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveCard((c) => Math.min(c + 1, LEVELS.length - 1));
      if (e.key === 'ArrowLeft') setActiveCard((c) => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedElement]);

  const atomBg = darkMode ? '#000000' : '#e8ecf4';

  return (
    <AnimatePresence>
      {selectedElement && profile && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              background: 'rgba(0,0,0,0.48)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 51,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                width: '94vw',
                maxWidth: 1240,
                height: '84vh',
                maxHeight: 760,
                borderRadius: 22,
                overflow: 'hidden',
                background: 'var(--color-bg)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                position: 'relative',
              }}
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── PREV element button ── */}
              {hasPrev && (
                <div
                  className="group/prev"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 56,
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: 8,
                  }}
                >
                  <button
                    aria-label="Previous element"
                    onClick={navigatePrev}
                    className="opacity-0 group-hover/prev:opacity-100 transition-opacity duration-200 hover:!bg-black/65"
                    style={{
                      width: 32,
                      height: 48,
                      borderRadius: 8,
                      border: '1px solid rgba(128,128,128,0.25)',
                      background: 'rgba(0,0,0,0.45)',
                      color: '#fff',
                      fontSize: 20,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                    }}
                  >
                    ‹
                  </button>
                </div>
              )}

              {/* ── NEXT element button ── */}
              {hasNext && (
                <div
                  className="group/next"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 56,
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: 8,
                  }}
                >
                  <button
                    aria-label="Next element"
                    onClick={navigateNext}
                    className="opacity-0 group-hover/next:opacity-100 transition-opacity duration-200 hover:!bg-black/65"
                    style={{
                      width: 32,
                      height: 48,
                      borderRadius: 8,
                      border: '1px solid rgba(128,128,128,0.25)',
                      background: 'rgba(0,0,0,0.45)',
                      color: '#fff',
                      fontSize: 20,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                    }}
                  >
                    ›
                  </button>
                </div>
              )}
              {/* ── LEFT PANEL ── */}
              <div
                style={{
                  width: '38%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRight: '1px solid var(--color-border)',
                  flexShrink: 0,
                }}
              >
                {/* Header */}
                <div
                  style={{
                    background: 'var(--color-bg2)',
                    padding: '20px 20px 16px',
                    borderBottom: '1px solid var(--color-border)',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    {/* Stacked atomic notation */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        paddingTop: 4,
                        gap: 0,
                        lineHeight: 1.15,
                        color: 'var(--color-muted)',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      <span>
                        {Math.round(parseFloat(profile.level2.mass.highSchool))}
                      </span>
                      <span>{profile.level2.protons}</span>
                    </div>

                    {/* Symbol + name */}
                    <div>
                      <div
                        style={{
                          fontSize: 60,
                          fontWeight: 700,
                          lineHeight: 0.88,
                          letterSpacing: -2,
                          color: 'var(--color-text)',
                        }}
                      >
                        {profile.symbol}
                      </div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 400,
                          marginTop: 8,
                          color: 'var(--color-text)',
                        }}
                      >
                        {profile.name}
                      </div>
                    </div>
                  </div>

                  {/* Category badge */}
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 10,
                      borderRadius: 999,
                      padding: '3px 12px',
                      fontSize: 11,
                      color: '#fff',
                      fontWeight: 500,
                      background: CATEGORY_COLORS[profile.category],
                    }}
                  >
                    {CATEGORY_LABELS[profile.category]}
                  </span>
                </div>

                {/* Card Slider */}
                <div
                  style={{ flex: 1, overflow: 'hidden', padding: 14, position: 'relative' }}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  <motion.div
                    key={LEVELS[activeCard]}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    style={{ height: '100%' }}
                  >
                    {LEVELS[activeCard] === 'l1' && <L1Card profile={profile} />}
                    {LEVELS[activeCard] === 'l2' && <L2Card profile={profile} massUnit={massUnit} />}
                    {LEVELS[activeCard] === 'l3' && <L3Card profile={profile} />}
                    {LEVELS[activeCard] === 'l4' && <L4Card profile={profile} />}
                  </motion.div>
                </div>

                {/* Dot navigation */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    padding: '10px 0',
                    borderTop: '1px solid var(--color-border)',
                    flexShrink: 0,
                  }}
                >
                  <button
                    aria-label="Previous card"
                    onClick={() => setActiveCard((c) => Math.max(c - 1, 0))}
                    disabled={activeCard === 0}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg2)',
                      color: 'var(--color-muted)',
                      cursor: activeCard === 0 ? 'not-allowed' : 'pointer',
                      opacity: activeCard === 0 ? 0.35 : 0.9,
                      fontSize: 14,
                      lineHeight: '22px',
                      textAlign: 'center',
                      padding: 0,
                    }}
                  >
                    ‹
                  </button>

                  {LEVELS.map((lvl, i) => (
                    <button
                      key={lvl}
                      onClick={() => setActiveCard(i)}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background:
                          i === activeCard
                            ? CARD_BG[lvl]
                            : 'var(--color-muted)',
                        opacity: i === activeCard ? 1 : 0.3,
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: i === activeCard ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                  ))}
                  <div
                    style={{
                      width: 1,
                      background: 'var(--color-border)',
                      height: 14,
                      margin: '0 3px',
                      opacity: 0.6,
                    }}
                  />
                  {/* Lock icon */}
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    style={{ opacity: 0.35 }}
                  >
                    <rect
                      x="1"
                      y="6"
                      width="10"
                      height="8"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M4 6V4a2 2 0 0 1 4 0v2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <button
                    aria-label="Next card"
                    onClick={() => setActiveCard((c) => Math.min(c + 1, LEVELS.length - 1))}
                    disabled={activeCard === LEVELS.length - 1}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg2)',
                      color: 'var(--color-muted)',
                      cursor: activeCard === LEVELS.length - 1 ? 'not-allowed' : 'pointer',
                      opacity: activeCard === LEVELS.length - 1 ? 0.35 : 0.9,
                      fontSize: 14,
                      lineHeight: '22px',
                      textAlign: 'center',
                      padding: 0,
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* ── RIGHT PANEL (3D Atom) ── */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* Close button */}
                <button
                  onClick={close}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 40,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'rgba(128,128,128,0.18)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 20,
                    color: 'var(--color-text)',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>

                {/* 3D Atom canvas */}
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <AtomModel key={selectedElement.n} element={selectedElement} bg={atomBg} fill paused={animationsPaused} speed={animationSpeed} topView={topView} />
                  </div>
                </div>

                {/* Bottom controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderTop: '1px solid var(--color-border)',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: 'flex', gap: 8 }}>
                    {/* Pause/Resume */}
                    <ControlBtn
                      title={animationsPaused ? 'Resume' : 'Pause'}
                      onClick={() => setAnimationsPaused(!animationsPaused)}
                      active={animationsPaused}
                    >
                      {animationsPaused ? (
                        // Play icon
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                          <polygon points="4,2 12,7 4,12" />
                        </svg>
                      ) : (
                        // Pause icon
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                          <rect x="2" y="2" width="4" height="10" rx="1" />
                          <rect x="8" y="2" width="4" height="10" rx="1" />
                        </svg>
                      )}
                    </ControlBtn>

                    {/* Layers / detail level */}
                    <ControlBtn title="Top view" active={topView} onClick={() => setTopView((v) => !v)}>
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      >
                        <path d="M8 1 L15 4.5 L8 8 L1 4.5 Z" />
                        <path d="M1 7.5 L8 11 L15 7.5" />
                      </svg>
                    </ControlBtn>
                  </div>

                  {/* Help */}
                  <ControlBtn title="Help">
                    <span
                      style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-muted)' }}
                    >
                      ?
                    </span>
                  </ControlBtn>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
