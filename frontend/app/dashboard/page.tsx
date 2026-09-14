'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  AudioLines,
  AlertTriangle,
  Clock,
  ArrowRight,
  Upload,
  TrendingUp,
  CheckCircle2,
  XCircle,
  FileAudio,
  Activity,
} from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';
import { WaveformVisualizer } from '@/components/site/waveform-visualizer';
import { cn } from '@/lib/utils';

const overviewStats = [
  {
    label: 'Total Analyses',
    value: '18',
    icon: AudioLines,
    trend: '+12.4%',
    color: 'cyan',
  },
  {
    label: 'Clones Detected',
    value: '347',
    icon: AlertTriangle,
    trend: '+8.1%',
    color: 'red',
  },
  {
    label: 'Authentic Audio',
    value: '937',
    icon: ShieldCheck,
    trend: '+15.2%',
    color: 'green',
  },
  {
    label: 'Avg. Confidence',
    value: '94.6%',
    icon: TrendingUp,
    trend: '+2.3%',
    color: 'cyan',
  },
];

const recentAnalyses = [
  {
    id: 'VR-2026-001284',
    filename: 'voicemail_suspicious.wav',
    duration: '0:34',
    verdict: 'clone',
    confidence: 96.4,
    timestamp: '2 min ago',
  },
  {
    id: 'VR-2026-001283',
    filename: 'interview_authentic.mp3',
    duration: '12:45',
    verdict: 'authentic',
    confidence: 98.1,
    timestamp: '18 min ago',
  },
  {
    id: 'VR-2026-001282',
    filename: 'call_recording_03.wav',
    duration: '3:21',
    verdict: 'clone',
    confidence: 89.2,
    timestamp: '1 hour ago',
  },
  {
    id: 'VR-2026-001281',
    filename: 'podcast_clip.flac',
    duration: '5:10',
    verdict: 'authentic',
    confidence: 95.7,
    timestamp: '2 hours ago',
  },
  {
    id: 'VR-2026-001280',
    filename: 'voice_memo_unknown.ogg',
    duration: '0:52',
    verdict: 'clone',
    confidence: 92.8,
    timestamp: '3 hours ago',
  },
];

const verdictConfig = {
  clone: {
    label: 'AI Clone',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: XCircle,
  bar: 'bg-red-400',
  },
  authentic: {
    label: 'Authentic',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: CheckCircle2,
    bar: 'bg-green-400',
  },
};

export default function DashboardPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor detection activity and analysis statistics
          </p>
        </div>
        <Link
          href="/analyze"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
        >
          <Upload className="h-4 w-4" />
          New Analysis
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <GlassCard key={stat.label} className="p-5" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg border',
                  stat.color === 'red'
                    ? 'bg-red-500/10 border-red-500/20'
                    : stat.color === 'green'
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-cyan-500/10 border-cyan-500/20'
                )}
              >
                <stat.icon
                  className={cn(
                    'h-5 w-5',
                    stat.color === 'red'
                      ? 'text-red-400'
                      : stat.color === 'green'
                      ? 'text-green-400'
                      : 'text-cyan-400'
                  )}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <TrendingUp className="h-3 w-3 text-cyan-400" />
              <span className="text-cyan-400 font-medium">{stat.trend}</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Quick Upload + Live Feed */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Upload */}
        <div className="lg:col-span-1">
          <GlassCard className="p-6" hover>
            <h3 className="text-lg font-semibold text-white">Quick Upload</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Drop an audio file to analyze
            </p>
            <Link
              href="/analyze"
              className="mt-4 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-cyan-500/20 bg-cyan-500/5 px-4 py-10 text-center transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <Upload className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Click to upload</p>
                <p className="text-xs text-muted-foreground">WAV, MP3, FLAC, OGG — up to 30 min</p>
              </div>
            </Link>
          </GlassCard>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Live Activity</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                Real-time
              </div>
            </div>
            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-cyan-400">
                  Processing Stream
                </span>
                <span className="font-mono text-xs text-muted-foreground">live</span>
              </div>
              <WaveformVisualizer bars={64} className="h-16" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
                <div className="text-xs text-muted-foreground">Queue</div>
                <div className="mt-1 text-xl font-bold text-white">3</div>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
                <div className="text-xs text-muted-foreground">Processing</div>
                <div className="mt-1 text-xl font-bold text-cyan-400">1</div>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
                <div className="text-xs text-muted-foreground">Avg Wait</div>
                <div className="mt-1 text-xl font-bold text-white">0.6s</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="mt-6">
        <GlassCard className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">Recent Analyses</h3>
            <Link
              href="/history"
              className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentAnalyses.map((analysis) => {
              const config = verdictConfig[analysis.verdict as keyof typeof verdictConfig];
              return (
                <div
                  key={analysis.id}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg border',
                      config.bg,
                      config.border
                    )}
                  >
                    <config.icon className={cn('h-5 w-5', config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <FileAudio className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-medium text-white truncate">
                        {analysis.filename}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{analysis.id}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {analysis.duration}
                      </span>
                      <span>{analysis.timestamp}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block w-32">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Confidence</span>
                      <span className={cn('text-xs font-medium', config.color)}>
                        {analysis.confidence}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5">
                      <div
                        className={cn('h-1.5 rounded-full', config.bar)}
                        style={{ width: `${analysis.confidence}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
                      config.bg,
                      config.border,
                      config.color
                    )}
                  >
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
