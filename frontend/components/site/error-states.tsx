'use client';

import {
  FileX,
  Scissors,
  VolumeX,
  ServerOff,
  UploadCloud,
  Loader2,
  X,
  RotateCcw,
} from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';
import { cn } from '@/lib/utils';

export type ErrorType =
  | 'unsupported-format'
  | 'too-short'
  | 'silent-audio'
  | 'backend-unavailable'
  | 'upload-failed';

interface ErrorStateProps {
  type: ErrorType;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const errorConfig: Record<ErrorType, {
  icon: typeof FileX;
  title: string;
  message: string;
  suggestion: string;
  color: string;
  bg: string;
  border: string;
}> = {
  'unsupported-format': {
    icon: FileX,
    title: 'Unsupported Audio Format',
    message: 'The file you uploaded is not in a supported audio format.',
    suggestion: 'Please upload a WAV, MP3, FLAC, or OGG file.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
  },
  'too-short': {
    icon: Scissors,
    title: 'Audio Too Short',
    message: 'The audio clip is too short for reliable analysis.',
    suggestion: 'Please provide at least 1 second of audio for detection.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
  },
  'silent-audio': {
    icon: VolumeX,
    title: 'Silent Audio Detected',
    message: 'No speech was detected in the uploaded audio.',
    suggestion: 'Ensure the recording contains clear speech and minimal background noise.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
  },
  'backend-unavailable': {
  icon: ServerOff,
  title: 'Demo Mode Active',
  message: 'The premium interface is running in preview mode while the final Epoch-100 AI model is being prepared.',
  suggestion: 'You can explore the complete UI. Live AI detection will be enabled after the final model is integrated.',
  color: 'text-cyan-400',
  bg: 'bg-cyan-500/5',
  border: 'border-cyan-500/20',
},
  'upload-failed': {
    icon: UploadCloud,
    title: 'Upload Failed',
    message: 'We could not upload your file. The file may be corrupted or too large.',
    suggestion: 'Try a different file or reduce the file size before uploading.',
    color: 'text-red-400',
    bg: 'bg-red-500/5',
    border: 'border-red-500/20',
  },
};

export function ErrorState({ type, onRetry, onDismiss }: ErrorStateProps) {
  const cfg = errorConfig[type];
  return (
    <GlassCard className={cn('relative overflow-hidden p-8', cfg.border)} >
      <div className="flex flex-col items-center text-center">
        <div className={cn('flex h-14 w-14 items-center justify-center rounded-full border-2', cfg.bg, cfg.border)}>
          <cfg.icon className={cn('h-7 w-7', cfg.color)} />
        </div>
        <h3 className={cn('mt-4 text-xl font-bold', cfg.color)}>{cfg.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{cfg.message}</p>
        <div className={cn('mt-3 flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs', cfg.bg, cfg.border)}>
          <span className={cn('font-medium', cfg.color)}>{cfg.suggestion}</span>
        </div>
        <div className="mt-6 flex items-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-lg glass px-4 py-2 text-sm font-semibold text-white transition-all hover:border-cyan-500/30"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="inline-flex items-center gap-2 rounded-lg glass px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:text-white"
            >
              <X className="h-4 w-4" />
              Dismiss
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export function LoadingState() {
  return (
    <GlassCard className="relative overflow-hidden p-8" glow>
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 animate-spin-slow" />
          <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-white">Analysis in Progress</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Processing spectrogram and neural embeddings...
        </p>
      </div>
    </GlassCard>
  );
}
