'use client';

import { useState, useCallback } from 'react';
import DemoPicker from "@/components/DemoPicker";
import {
  Upload,
  FileAudio,
  X,
  ScanLine,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Activity,
  Gauge,
} from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';
import { WaveformVisualizer } from '@/components/site/waveform-visualizer';
import { ScanOverlay } from '@/components/site/scan-overlay';
import { RecordingPanel } from '@/components/site/recording-panel';
import { PredictionResult, type Verdict } from '@/components/site/prediction-result';
import { ErrorState, type ErrorType } from '@/components/site/error-states';
import { FeatureCards } from '@/components/site/feature-cards';
import { cn } from '@/lib/utils';

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error';

export default function AnalyzePage() {
  const [state, setState] = useState<AnalysisState>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'record'>('upload');

  const runAnalysis = useCallback(async (file: File) => {
    setState('analyzing');
    setProgress(0);
    setVerdict(null);
    setConfidence(0);
    setErrorType(null);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 95));
    }, 40);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();

      clearInterval(progressInterval);
      setProgress(100);

      setVerdict(
        data.prediction.toLowerCase() === "real"
          ? "real"
          : "cloned"
      );

      setConfidence(Math.round(data.confidence * 1000) / 10);

      setState("complete");
    } catch (err) {
      clearInterval(progressInterval);
      setErrorType("backend-unavailable");
      setState("error");
      console.error(err);
    }
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      setFileName(file.name);
      setFileSize(`${(file.size / 1024 / 1024).toFixed(2)} MB`);

      const supportedTypes = [
        'audio/wav',
        'audio/mpeg',
        'audio/mp3',
        'audio/flac',
        'audio/ogg',
        'audio/x-wav',
        'audio/wave',
      ];

      const ext = file.name.split('.').pop()?.toLowerCase();
      const supportedExts = ['wav', 'mp3', 'flac', 'ogg'];

      // Validate BEFORE sending to backend
      if (!supportedTypes.includes(file.type) && !supportedExts.includes(ext || '')) {
        setErrorType('unsupported-format');
        setState('error');
        return;
      }

      if (file.size < 1000) {
        setErrorType('too-short');
        setState('error');
        return;
      }

      // Only one API call
      runAnalysis(file);
    },
    [runAnalysis]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleRecordingComplete = useCallback(
    (file: File, duration: number) => {
      if (duration < 1) {
        setErrorType('too-short');
        setState('error');
        return;
      }

      setFileName(file.name);
      setFileSize(`${duration}s`);

      runAnalysis(file);
    },
    [runAnalysis]
  );

  const reset = () => {
    setState('idle');
    setFileName(null);
    setFileSize(null);
    setProgress(0);
    setVerdict(null);
    setConfidence(0);
    setErrorType(null);
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-medium text-cyan-400">
          <ScanLine className="h-3.5 w-3.5" />
          AI Voice Clone Detection
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Analyze Audio
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload a file or record directly to detect AI-generated voice clones
        </p>
      </div>

      {state === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setInputMode('upload')}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                inputMode === 'upload'
                  ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                  : 'glass border border-transparent text-muted-foreground hover:text-white'
              )}
            >
              <Upload className="h-4 w-4" />
              Upload File
            </button>

            <button
              onClick={() => setInputMode('record')}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                inputMode === 'record'
                  ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                  : 'glass border border-transparent text-muted-foreground hover:text-white'
              )}
            >
              <FileAudio className="h-4 w-4" />
              Record Audio
            </button>
          </div>

          {inputMode === 'upload' && (
            <GlassCard className="p-8" hover>
              <DemoPicker onSelect={handleFile} />

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-700" />
                <span className="text-xs uppercase text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-700" />
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-16 text-center transition-all',
                  dragActive
                    ? 'border-cyan-500/50 bg-cyan-500/10 glow-cyan-sm'
                    : 'border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/30'
                )}
              >
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-full border transition-all',
                    dragActive
                      ? 'border-cyan-500/40 bg-cyan-500/15 glow-cyan-sm'
                      : 'border-cyan-500/20 bg-cyan-500/10'
                  )}
                >
                  <Upload className={cn('h-7 w-7 text-cyan-400', dragActive && 'animate-bounce')} />
                </div>

                <div>
                  <p className="text-lg font-medium text-white">
                    {dragActive ? 'Drop your audio here' : 'Drag & drop audio file'}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    or click to browse — WAV, MP3, FLAC, OGG up to 30 min
                  </p>
                </div>

                <label className="mt-2 cursor-pointer rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan">
                  Select File
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: 'Private & Secure', desc: 'Audio never leaves your browser' },
                  { icon: Activity, label: 'Real-Time Results', desc: 'Analysis in under a second' },
                  { icon: Gauge, label: '99.2% Accuracy', desc: 'Trained on millions of samples' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <item.icon className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-white">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {inputMode === 'record' && (
            <GlassCard className="p-8" hover>
              <RecordingPanel onRecordingComplete={handleRecordingComplete} />
            </GlassCard>
          )}

          <div className="pt-4">
            <h3 className="mb-5 text-center text-lg font-semibold text-white">
              Why VaaniRakshak
            </h3>
            <FeatureCards />
          </div>
        </div>
      )}

      {state === 'analyzing' && (
        <div className="space-y-6">
          {fileName && (
            <div className="flex items-center justify-center gap-3 rounded-lg glass px-4 py-3 text-sm animate-slide-up">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <FileAudio className="h-4 w-4 text-cyan-400" />
              </div>
              <span className="font-medium text-white">{fileName}</span>
              {fileSize && <span className="text-muted-foreground">{fileSize}</span>}
              <button onClick={reset} className="ml-2 text-muted-foreground hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <GlassCard className="relative overflow-hidden p-8" glow>
            <ScanOverlay />

            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 animate-spin-slow" />
                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                Analyzing Audio
              </h3>

              <p className="mt-1 text-sm text-muted-foreground font-mono">
                {fileName}
              </p>

              <div className="mt-6 w-full rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                <WaveformVisualizer bars={56} className="h-16" color="cyan" />
              </div>

              <div className="mt-6 w-full">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Processing spectrogram & neural embeddings</span>
                  <span className="font-mono text-cyan-400">{progress}%</span>
                </div>

                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid w-full grid-cols-3 gap-3">
                {[
                  { label: 'Spectral Analysis', done: progress > 33 },
                  { label: 'Neural Inference', done: progress > 66 },
                  { label: 'Verdict', done: progress >= 100 },
                ].map((stage) => (
                  <div
                    key={stage.label}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all',
                      stage.done
                        ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
                        : 'border-white/5 bg-white/[0.02] text-muted-foreground'
                    )}
                  >
                    {stage.done ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    )}
                    {stage.label}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {state === 'complete' && verdict && (
        <PredictionResult
          verdict={verdict}
          confidence={confidence}
          fileName={fileName}
          fileSize={fileSize}
          onReset={reset}
        />
      )}

      {state === 'error' && errorType && (
        <ErrorState type={errorType} onRetry={reset} onDismiss={reset} />
      )}
    </div>
  );
}