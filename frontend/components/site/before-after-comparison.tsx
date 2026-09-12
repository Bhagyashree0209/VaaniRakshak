'use client';

import { ShieldCheck, AlertTriangle, Mic, Bot } from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';
import { WaveformVisualizer } from '@/components/site/waveform-visualizer';
import { SectionHeading } from '@/components/site/section-heading';
import { cn } from '@/lib/utils';

const cards = [
  {
    id: 'real',
    type: 'Original Voice',
    subtitle: 'Human — Authenticated',
    icon: Mic,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
    iconBorder: 'border-green-500/20',
    waveColor: 'green' as const,
    verdictLabel: 'Authentic',
    verdictColor: 'text-green-400',
    verdictBg: 'bg-green-500/10',
    verdictBorder: 'border-green-500/20',
    confidence: 96.8,
    confidenceColor: 'bg-green-400',
    glowColor: 'glow-green-sm',
    cardBorder: 'border-green-500/15',
    description: 'Natural spectral distribution. Microphone phase coherence confirmed. No synthetic artifacts detected.',
    metrics: [
      { label: 'Spectral Authenticity', value: 97 },
      { label: 'Phase Coherence', value: 95 },
      { label: 'Temporal Naturalness', value: 98 },
    ],
    badge: { text: 'REAL', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  },
  {
    id: 'cloned',
    type: 'AI Cloned Voice',
    subtitle: 'Synthetic — Flagged',
    icon: Bot,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10',
    iconBorder: 'border-red-500/20',
    waveColor: 'red' as const,
    verdictLabel: 'Cloned',
    verdictColor: 'text-red-400',
    verdictBg: 'bg-red-500/10',
    verdictBorder: 'border-red-500/20',
    confidence: 91.4,
    confidenceColor: 'bg-red-400',
    glowColor: 'glow-red-sm',
    cardBorder: 'border-red-500/15',
    description: 'Generative model fingerprint detected. Neural embedding mismatch. Pitch modulation abnormality confirmed.',
    metrics: [
      { label: 'Artifact Score', value: 89 },
      { label: 'Neural Match', value: 94 },
      { label: 'Synthetic Probability', value: 91 },
    ],
    badge: { text: 'CLONED', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  },
];

export function BeforeAfterComparison() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Side-by-Side Analysis"
        title="Original vs AI Cloned Voice"
        description="See how VaaniRakshak distinguishes authentic human speech from synthetic AI-generated voice clones — instantly, with high confidence."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card, i) => (
          <GlassCard
            key={card.id}
            className={cn('relative overflow-hidden p-6 border', card.cardBorder, card.glowColor)}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl border', card.iconBg, card.iconBorder)}>
                  <card.icon className={cn('h-5 w-5', card.iconColor)} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{card.type}</h3>
                  <p className={cn('text-xs font-medium', card.iconColor)}>{card.subtitle}</p>
                </div>
              </div>
              <span className={cn(
                'inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold tracking-wider',
                card.badge.color, card.badge.bg, card.badge.border
              )}>
                {card.badge.text}
              </span>
            </div>

            {/* Waveform */}
            <div className={cn(
              'mt-5 rounded-lg border p-4',
              card.id === 'real' ? 'border-green-500/10 bg-green-500/5' : 'border-red-500/10 bg-red-500/5'
            )}>
              <div className="mb-2 flex items-center justify-between">
                <span className={cn('text-xs font-medium uppercase tracking-widest', card.iconColor)}>
                  Waveform Analysis
                </span>
                <span className="font-mono text-xs text-muted-foreground">44.1 kHz</span>
              </div>
              <WaveformVisualizer
                bars={48}
                className="h-16"
                color={card.waveColor}
                active={false}
              />
            </div>

            {/* Confidence indicator */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Detection Confidence</span>
                <span className={cn('font-bold', card.iconColor)}>{card.confidence}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className={cn('h-full rounded-full transition-all duration-700', card.confidenceColor)}
                  style={{
                    width: `${card.confidence}%`,
                    boxShadow: card.id === 'real'
                      ? '0 0 10px rgba(34, 197, 94, 0.4)'
                      : '0 0 10px rgba(239, 68, 68, 0.4)',
                  }}
                />
              </div>
            </div>

            {/* Verdict chip */}
            <div className={cn(
              'mt-4 flex items-center gap-2 rounded-lg border px-4 py-3',
              card.verdictBg, card.verdictBorder
            )}>
              {card.id === 'real' ? (
                <ShieldCheck className={cn('h-5 w-5 flex-shrink-0', card.verdictColor)} />
              ) : (
                <AlertTriangle className={cn('h-5 w-5 flex-shrink-0', card.verdictColor)} />
              )}
              <div>
                <div className={cn('text-sm font-semibold', card.verdictColor)}>
                  {card.id === 'real'
                    ? 'Authentic human voice confirmed.'
                    : '91% chance this voice is synthetic. Escalate immediately.'}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-4 space-y-2.5">
              {card.metrics.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span className={cn('font-medium', card.iconColor)}>{m.value}%</span>
                  </div>
                  <div className="mt-1 h-1 w-full rounded-full bg-white/5">
                    <div
                      className={cn('h-1 rounded-full', card.confidenceColor)}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
              {card.description}
            </p>

            {/* Step number accent */}
            <div className="absolute right-5 bottom-5 font-mono text-5xl font-bold text-white/[0.03] select-none">
              0{i + 1}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
