'use client';

import { useEffect, useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Phone,
  PhoneCall,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Activity,
  Gauge,
  Fingerprint,
  AudioLines,
} from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';
import { WaveformVisualizer } from '@/components/site/waveform-visualizer';
import { cn } from '@/lib/utils';

export type Verdict = 'real' | 'cloned';
export type DecisionLevel = 'proceed' | 'callback' | 'escalate';

interface DetectionSignal {
  label: string;
  value: number;
  description: string;
}

interface PredictionResultProps {
  verdict: Verdict;
  confidence: number;
  fileName?: string | null;
  fileSize?: string | null;
  onReset: () => void;
}

const decisionConfig: Record<
  DecisionLevel,
  {
    label: string;
    description: string;
    icon: typeof ShieldCheck;
    color: string;
    bg: string;
    border: string;
    glow: string;
  }
> = {
  proceed: {
    label: 'Proceed',
    description: 'Voice appears authentic. Safe to continue the conversation.',
    icon: ShieldCheck,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/25',
    glow: 'glow-green-sm',
  },
  callback: {
    label: 'Call Back',
    description:
      'Partial synthetic indicators detected. Verify via registered number.',
    icon: Phone,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    glow: 'glow-amber-sm',
  },
  escalate: {
    label: 'Escalate',
    description:
      'High probability synthetic voice. Do not proceed without verification.',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
    glow: 'glow-red-sm',
  },
};

export function PredictionResult({
  verdict,
  confidence,
  fileName,
  fileSize,
  onReset,
}: PredictionResultProps) {
  const isReal = verdict === 'real';
  const isCloned = verdict === 'cloned';
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  const signals: DetectionSignal[] = isReal
    ? [
        {
          label: 'Spectral Consistency',
          value: 92,
          description: 'Natural spectral distribution detected.',
        },
        {
          label: 'Temporal Coherence',
          value: 89,
          description: 'Human-like rhythm and breathing preserved.',
        },
        {
          label: 'Artifact Detection',
          value: 12,
          description: 'Very few synthetic artifacts found.',
        },
        {
          label: 'Pitch Modulation',
          value: 15,
          description: 'Pitch changes appear natural.',
        },
        {
          label: 'Neural Embedding Match',
          value: 8,
          description: 'Low similarity with cloned voice patterns.',
        },
        {
          label: 'Phase Coherence',
          value: 90,
          description: 'Phase alignment matches authentic speech.',
        },
      ]
    : [
        {
          label: 'Spectral Consistency',
          value: 24,
          description: 'Spectral distribution looks synthetic.',
        },
        {
          label: 'Temporal Coherence',
          value: 31,
          description: 'Speech rhythm appears artificial.',
        },
        {
          label: 'Artifact Detection',
          value: 93,
          description: 'Strong synthetic artifacts detected.',
        },
        {
          label: 'Pitch Modulation',
          value: 88,
          description: 'Unnatural pitch variations found.',
        },
        {
          label: 'Neural Embedding Match',
          value: 95,
          description: 'Strong similarity with cloned voice patterns.',
        },
        {
          label: 'Phase Coherence',
          value: 18,
          description: 'Phase inconsistencies detected.',
        },
      ];

  let decision: DecisionLevel;
  if (!isCloned && confidence >= 85) decision = 'proceed';
  else if (isCloned && confidence >= 85) decision = 'escalate';
  else decision = 'callback';

  const config = decisionConfig[decision];

  useEffect(() => {
    setAnimatedConfidence(0);

    const interval = setInterval(() => {
      setAnimatedConfidence((prev) => {
        if (prev >= confidence) {
          clearInterval(interval);
          return confidence;
        }
        return Math.min(prev + 1.5, confidence);
      });
    }, 20);

    return () => clearInterval(interval);
  }, [confidence]);

  const professionalMessage = isCloned
    ? `${confidence}% chance this voice is synthetic. We recommend calling back the registered number to verify identity.`
    : `${confidence}% confidence this voice is authentic. No synthetic patterns detected — safe to proceed.`;

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Main Verdict Card */}
      <GlassCard
        className={cn('relative overflow-hidden p-8', `border ${config.border}`)}
        glow={!isCloned}
      >
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative flex flex-col items-center text-center">
          <div
            className={cn(
              'relative flex h-16 w-16 items-center justify-center rounded-full border-2',
              isCloned
                ? 'border-red-500/30 bg-red-500/10'
                : 'border-green-500/30 bg-green-500/10'
            )}
          >
            {isCloned ? (
              <AlertTriangle className="h-8 w-8 text-red-400" />
            ) : (
              <ShieldCheck className="h-8 w-8 text-green-400" />
            )}

            {!isCloned && (
              <div className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-pulse-ring" />
            )}
          </div>

          <h3
            className={cn(
              'mt-4 text-3xl font-bold tracking-tight',
              isCloned ? 'text-red-400' : 'text-green-400'
            )}
          >
            {isCloned ? 'Cloned' : 'Real'}
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {professionalMessage}
          </p>

          <div className="mt-6 w-full max-w-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Confidence</span>

              <span
                className={cn(
                  'text-lg font-bold tabular-nums',
                  isCloned ? 'text-red-400' : 'text-green-400'
                )}
              >
                {animatedConfidence.toFixed(1)}%
              </span>
            </div>

            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-100',
                  isCloned ? 'bg-red-400' : 'bg-green-400'
                )}
                style={{
                  width: `${animatedConfidence}%`,
                  boxShadow: isCloned
                    ? '0 0 12px rgba(239,68,68,.5)'
                    : '0 0 12px rgba(34,197,94,.5)',
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {fileName && (
              <span className="flex items-center gap-1.5">
                <AudioLines className="h-4 w-4" />
                {fileName}
              </span>
            )}

            {fileSize && <span>{fileSize}</span>}
          </div>
        </div>
      </GlassCard>

      {/* Decision Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(Object.keys(decisionConfig) as DecisionLevel[]).map((level) => {
          const cfg = decisionConfig[level];
          const active = decision === level;

          return (
            <div
              key={level}
              className={cn(
                'relative rounded-xl border p-5 transition-all duration-300',
                active
                  ? cn(cfg.bg, cfg.border, cfg.glow, 'scale-105')
                  : 'glass border-white/5 opacity-50'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg border',
                    cfg.bg,
                    cfg.border
                  )}
                >
                  <cfg.icon className={cn('h-5 w-5', cfg.color)} />
                </div>

                <span
                  className={cn(
                    'text-lg font-bold',
                    active ? cfg.color : 'text-muted-foreground'
                  )}
                >
                  {cfg.label}
                </span>

                {active && (
                  <span className={cn('ml-auto text-xs font-medium', cfg.color)}>
                    Recommended
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {cfg.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Waveform */}
      <GlassCard className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium text-white">
            <AudioLines className="h-4 w-4 text-cyan-400" />
            Audio Waveform
          </span>

          <span className="font-mono text-xs text-muted-foreground">
            44.1 kHz
          </span>
        </div>

        <WaveformVisualizer
          bars={64}
          className="h-20"
          color={isCloned ? 'red' : 'green'}
          active={false}
        />
      </GlassCard>

      {/* Detection Signals */}
      <GlassCard className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Fingerprint className="h-4 w-4 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">
            Detection Signal Breakdown
          </h3>
        </div>

        <div className="space-y-4">
          {signals.map((signal, i) => {
            const flagged = signal.value > 50;

            return (
              <div
                key={signal.label}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-white">
                      {signal.label}
                    </span>

                    <span className="ml-2 text-xs text-muted-foreground">
                      {signal.description}
                    </span>
                  </div>

                  <span
                    className={cn(
                      'text-sm font-bold',
                      flagged ? 'text-red-400' : 'text-green-400'
                    )}
                  >
                    {signal.value}%
                  </span>
                </div>

                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5">
                  <div
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-700',
                      flagged ? 'bg-red-400' : 'bg-green-400'
                    )}
                    style={{ width: `${signal.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Summary Stats - FIXED */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: 'Authentic Probability',
            value: isCloned
              ? `${(100 - confidence).toFixed(1)}%`
              : `${confidence}%`,
            icon: CheckCircle2,
            color: isReal ? 'green' : 'red',
          },
          {
            label: 'Clone Probability',
            value: isCloned
              ? `${confidence}%`
              : `${(100 - confidence).toFixed(1)}%`,
            icon: XCircle,
            color: isCloned ? 'red' : 'green',
          },
          {
            label: 'Processing Time',
            value: '0.7s',
            icon: Activity,
            color: 'cyan',
          },
          {
            label: 'Model Version',
            value: 'v2.4',
            icon: Gauge,
            color: 'cyan',
          },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-4 text-center" hover>
            <stat.icon
              className={cn(
                'mx-auto h-5 w-5',
                stat.color === 'red'
                  ? 'text-red-400'
                  : stat.color === 'green'
                  ? 'text-green-400'
                  : 'text-cyan-400'
              )}
            />

            <div
              className={cn(
                'mt-2 text-xl font-bold',
                stat.color === 'red'
                  ? 'text-red-400'
                  : stat.color === 'green'
                  ? 'text-green-400'
                  : 'text-white'
              )}
            >
              {stat.value}
            </div>

            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-lg glass px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-cyan-500/30"
        >
          <PhoneCall className="h-4 w-4" />
          Analyze Another Sample
        </button>
      </div>
    </div>
  );
}