'use client';

import { useState, useCallback } from 'react';
import {
  Play,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Phone,
  ShieldAlert,
  AudioLines,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';
import { WaveformVisualizer } from '@/components/site/waveform-visualizer';
import { ScanOverlay } from '@/components/site/scan-overlay';
import { cn } from '@/lib/utils';

type DemoState = 'idle' | 'analyzing' | 'result';
type DemoVerdict = 'real' | 'cloned';

interface DemoScenario {
  label: string;
  filename: string;
  verdict: DemoVerdict;
  confidence: number;
  decision: 'proceed' | 'callback' | 'escalate';
  message: string;
}

const scenarios: DemoScenario[] = [
  {
    label: 'Authentic Call',
    filename: 'sample_authentic_01.wav',
    verdict: 'real',
    confidence: 96.1,
    decision: 'proceed',
    message: '96.1% confidence this voice is authentic. No synthetic patterns found — safe to proceed.',
  },
  {
    label: 'Cloned Voice',
    filename: 'sample_cloned_01.wav',
    verdict: 'cloned',
    confidence: 88.4,
    decision: 'escalate',
    message: '88.4% chance this voice is synthetic. We recommend calling back the registered number.',
  },
  {
    label: 'Uncertain Sample',
    filename: 'sample_uncertain_01.wav',
    verdict: 'cloned',
    confidence: 61.2,
    decision: 'callback',
    message: '61.2% synthetic indicators present. Partial anomalies detected — verify via registered number.',
  },
];

const decisionConfig = {
  proceed: {
    label: 'Proceed',
    icon: ShieldCheck,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/25',
  },
  callback: {
    label: 'Call Back',
    icon: Phone,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
  },
  escalate: {
    label: 'Escalate',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
  },
};

export function PredictionDemo() {
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [progress, setProgress] = useState(0);
  const [activeScenario, setActiveScenario] = useState<DemoScenario | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animatedConf, setAnimatedConf] = useState(0);

  const runDemo = useCallback(() => {
    const scenario = scenarios[selectedIndex];
    setDemoState('analyzing');
    setProgress(0);
    setActiveScenario(null);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setActiveScenario(scenario);
          setAnimatedConf(0);
          setDemoState('result');

          const confInterval = setInterval(() => {
            setAnimatedConf((c) => {
              if (c >= scenario.confidence) {
                clearInterval(confInterval);
                return scenario.confidence;
              }
              return Math.min(c + 1.8, scenario.confidence);
            });
          }, 18);
          return 100;
        }
        return prev + 3;
      });
    }, 40);
  }, [selectedIndex]);

  const reset = () => {
    setDemoState('idle');
    setProgress(0);
    setActiveScenario(null);
    setAnimatedConf(0);
  };

  const isCloned = activeScenario?.verdict === 'cloned';

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center space-y-3">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-400">
            <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
            Interactive Demo
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          See the Prediction Engine
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
          Pick a sample and run the AI engine to see how VaaniRakshak delivers its verdict in real time.
        </p>
      </div>

      <GlassCard className="relative overflow-hidden p-6 sm:p-8">
        {demoState === 'analyzing' && <ScanOverlay />}

        {/* Scenario selector */}
        {demoState === 'idle' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">Choose a sample audio file:</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {scenarios.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedIndex(i)}
                    className={cn(
                      'rounded-lg border p-4 text-left transition-all',
                      selectedIndex === i
                        ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                        : 'glass border-white/5 text-muted-foreground hover:border-white/10 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AudioLines className="h-4 w-4" />
                      <span className="text-sm font-medium">{s.label}</span>
                    </div>
                    <span className="font-mono text-xs opacity-60">{s.filename}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-cyan-500/10 bg-cyan-500/5 p-4">
              <WaveformVisualizer bars={56} className="h-16" color="cyan" active={false} />
            </div>

            <div className="flex justify-center">
              <button
                onClick={runDemo}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
              >
                <Play className="h-4 w-4" fill="currentColor" />
                Run Detection
              </button>
            </div>
          </div>
        )}

        {/* Analyzing */}
        {demoState === 'analyzing' && (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 animate-spin-slow" />
              <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">Analyzing Audio</h3>
              <p className="mt-1 text-sm text-muted-foreground font-mono">
                {scenarios[selectedIndex].filename}
              </p>
            </div>
            <div className="w-full max-w-md">
              <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                <WaveformVisualizer bars={48} className="h-14" color="cyan" active />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Processing neural embeddings...</span>
                  <span className="font-mono text-cyan-400">{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: 'Spectral', done: progress > 33 },
                  { label: 'Neural', done: progress > 66 },
                  { label: 'Verdict', done: progress >= 100 },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-all',
                      s.done
                        ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
                        : 'border-white/5 bg-white/[0.02] text-muted-foreground'
                    )}
                  >
                    {s.done
                      ? <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
                      : <Loader2 className="h-3 w-3 flex-shrink-0 animate-spin" />}
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {demoState === 'result' && activeScenario && (
          <div className="space-y-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Verdict circle */}
              <div className={cn(
                'relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border-2',
                isCloned ? 'border-red-500/30 bg-red-500/10' : 'border-green-500/30 bg-green-500/10'
              )}>
                {!isCloned && <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-pulse-ring" />}
                {isCloned
                  ? <AlertTriangle className="h-10 w-10 text-red-400" />
                  : <ShieldCheck className="h-10 w-10 text-green-400" />}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="text-sm text-muted-foreground">Verdict</div>
                <h3 className={cn('text-3xl font-bold', isCloned ? 'text-red-400' : 'text-green-400')}>
                  {isCloned ? 'Cloned' : 'Real'}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
                  {activeScenario.message}
                </p>
              </div>

              {/* Confidence */}
              <div className="flex-shrink-0 text-center">
                <div className={cn('text-4xl font-bold tabular-nums', isCloned ? 'text-red-400' : 'text-green-400')}>
                  {animatedConf.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">Confidence</div>
                <div className="mt-2 h-2 w-24 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={cn('h-full rounded-full transition-all duration-100', isCloned ? 'bg-red-400' : 'bg-green-400')}
                    style={{ width: `${animatedConf}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 3-level decision */}
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(decisionConfig) as Array<keyof typeof decisionConfig>).map((level) => {
                const cfg = decisionConfig[level];
                const isActive = activeScenario.decision === level;
                return (
                  <div
                    key={level}
                    className={cn(
                      'rounded-xl border p-4 transition-all',
                      isActive ? cn(cfg.bg, cfg.border, 'scale-105') : 'glass border-white/5 opacity-40'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <cfg.icon className={cn('h-4 w-4', isActive ? cfg.color : 'text-muted-foreground')} />
                      <span className={cn('text-sm font-semibold', isActive ? cfg.color : 'text-muted-foreground')}>
                        {cfg.label}
                      </span>
                      {isActive && <span className={cn('ml-auto text-xs', cfg.color)}>Active</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-lg glass px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-cyan-500/30"
              >
                <RefreshCw className="h-4 w-4" />
                Try Another Sample
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
}
