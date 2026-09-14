import Link from 'next/link';
import {
  ShieldCheck,
  AudioLines,
  Brain,
  Zap,
  FileAudio,
  Lock,
  Activity,
  CheckCircle2,
  ArrowRight,
  Upload,
  ScanLine,
  PhoneCall,
} from 'lucide-react';
import { SectionHeading } from '@/components/site/section-heading';
import { GlassCard } from '@/components/site/glass-card';
import { HeroIllustration } from '@/components/site/hero-illustration';
import { FeatureCards } from '@/components/site/feature-cards';
import { BeforeAfterComparison } from '@/components/site/before-after-comparison';
import { PredictionDemo } from '@/components/site/prediction-demo';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Detection',
    description:
      'Deep learning models trained on millions of audio samples detect synthetic voice clones with industry-leading accuracy.',
  },
  {
    icon: Zap,
    title: 'Real-Time Analysis',
    description:
      'Sub-second inference delivers instant verdicts on whether an audio sample is authentic or AI-generated.',
  },
  {
    icon: AudioLines,
    title: 'Spectral Analysis',
    description:
      'Multi-layered spectrogram and waveform inspection reveals artifacts invisible to the human ear.',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description:
      'All audio is processed with end-to-end encryption. Your data is never stored or shared without consent.',
  },
  {
    icon: Activity,
    title: 'Confidence Scoring',
    description:
      'Every analysis includes a detailed confidence score and breakdown of contributing detection signals.',
  },
  {
    icon: FileAudio,
    title: 'Multi-Format Support',
    description:
      'Upload WAV, MP3, FLAC, or OGG files up to 30 minutes in length for comprehensive analysis.',
  },
];

const steps = [
  {
    icon: Upload,
    title: 'Upload Audio',
    description: 'Drag and drop or select an audio file from your device for analysis.',
  },
  {
    icon: ScanLine,
    title: 'AI Analysis',
    description: 'Our models scan the spectrogram, waveform, and frequency patterns in real time.',
  },
  {
    icon: ShieldCheck,
    title: 'Get Results',
    description: 'Receive a detailed report with confidence scores and detection breakdown.',
  },
];

const stats = [
  { value: '99.2%', label: 'Detection Accuracy' },
  { value: '< 0.8s', label: 'Average Inference Time' },
  { value: '18+', label: 'Demo Audio Samples' },
  { value: '3', label: 'Languages Supported' },
];

export default function Home() {
  return (
    <div className="relative">
      {/* ─────────────────────────────
          SECTION 1: HERO
      ───────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-bg-glow-shift" />
          <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-cyan-600/8 blur-3xl animate-bg-glow-shift" style={{ animationDelay: '3s' }} />
          <div className="absolute left-1/4 bottom-1/4 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl animate-bg-glow-shift" style={{ animationDelay: '5s' }} />
        </div>
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-medium text-cyan-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Smart India Hackathon 2026
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Protect Every Voice
                <br />
                <span className="gradient-text text-glow">Before You Trust It</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                VaaniRakshak detects AI-generated voice clones instantly using cutting-edge deep
                learning — safeguarding individuals and organizations from synthetic voice fraud.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/analyze"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
                >
                  <AudioLines className="h-4 w-4" />
                  Analyze Voice
                </Link>
                <Link
                  href="/live-call"
                  className="inline-flex items-center justify-center gap-2 rounded-lg glass px-6 py-3 text-sm font-semibold text-white transition-all hover:border-cyan-500/30"
                >
                  <PhoneCall className="h-4 w-4 text-cyan-400" />
                  Live Call Demo
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  No signup required
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  Free to use
                </div>
              </div>
            </div>
            <div className="animate-fade-in-slow">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────
          STATS BAND
      ───────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-6 text-center" hover>
              <div className="text-3xl font-bold gradient-text sm:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────
          SECTION 2: UPLOAD & RECORDING
          (Points to /analyze page)
      ───────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Upload & Analyze"
          title="Drop Your Audio, Get the Truth"
          description="Upload a file or record live audio to instantly detect whether a voice is real or AI-generated."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Upload card */}
          <GlassCard className="group p-6 hover:border-cyan-500/30 transition-all" hover>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5 group-hover:glow-cyan-sm transition-all">
              <Upload className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">File Upload</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Drag & drop or browse a WAV, MP3, FLAC, or OGG file. Supports recordings up to 30 minutes long.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-cyan-500/20 bg-cyan-500/5 px-4 py-8 text-center group-hover:border-cyan-500/30 transition-all">
              <Upload className="h-8 w-8 text-cyan-400/50" />
              <p className="text-xs text-muted-foreground">WAV · MP3 · FLAC · OGG</p>
            </div>
            <Link
              href="/analyze"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
            >
              <Upload className="h-4 w-4" />
              Upload & Analyze
            </Link>
          </GlassCard>

          {/* Record card */}
          <GlassCard className="group p-6 hover:border-cyan-500/30 transition-all" hover>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5 group-hover:glow-cyan-sm transition-all">
              <AudioLines className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Live Recording</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Record directly in your browser. The pulsing microphone captures audio, then instantly runs detection on your recording.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-cyan-500/15 bg-cyan-500/5 px-4 py-8">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-pulse-ring" />
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">
                  <AudioLines className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <p className="font-mono text-xs text-cyan-400">00:00</p>
              <p className="text-xs text-muted-foreground">Click record to begin</p>
            </div>
            <Link
              href="/analyze?mode=record"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg glass px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-cyan-500/30"
            >
              <AudioLines className="h-4 w-4 text-cyan-400" />
              Start Recording
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* ─────────────────────────────
          SECTION 3: PREDICTION DEMO
      ───────────────────────────── */}
      <PredictionDemo />

      {/* ─────────────────────────────
          SECTION 4: FEATURE CARDS
      ───────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Built for Deepfake Defense"
          description="A comprehensive toolkit that combines deep learning, spectral analysis, and real-time inference to protect against voice clone threats."
        />
        <div className="mt-12">
          <FeatureCards />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="p-6" hover>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <feature.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────
          SECTION 5: BEFORE VS AFTER
      ───────────────────────────── */}
      <BeforeAfterComparison />

      {/* ─────────────────────────────
          HOW IT WORKS
      ───────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="Three Steps to Verdict"
          description="From upload to result in under a second. Our pipeline handles the heavy lifting so you can focus on the decision."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <GlassCard className="h-full p-6" hover>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <step.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="font-mono text-3xl font-bold text-cyan-500/20">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </GlassCard>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 z-10 items-center">
                  <ArrowRight className="h-5 w-5 text-cyan-500/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────
          CTA BANNER
      ───────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <GlassCard className="relative overflow-hidden p-10 text-center lg:p-16" glow>
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="relative space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Detect Voice Clones?
            </h2>
            <p className="mx-auto max-w-xl text-base text-muted-foreground leading-relaxed">
              Upload your first audio sample and see VaaniRakshak's detection engine in action.
              No account needed.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
              >
                Start Detection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/live-call"
                className="inline-flex items-center justify-center gap-2 rounded-lg glass px-6 py-3 text-sm font-semibold text-white transition-all hover:border-cyan-500/30"
              >
                <PhoneCall className="h-4 w-4 text-cyan-400" />
                Try Live Call Mode
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
