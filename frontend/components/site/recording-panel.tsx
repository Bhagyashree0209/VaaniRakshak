'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Square } from 'lucide-react';
import { WaveformVisualizer } from '@/components/site/waveform-visualizer';
import { cn } from '@/lib/utils';

interface RecordingPanelProps {
  onRecordingComplete: (file: File, duration: number) => void;
  disabled?: boolean;
}

export function RecordingPanel({ onRecordingComplete, disabled }: RecordingPanelProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
  if (disabled) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.start();

    setElapsed(0);
    setIsRecording(true);
  } catch (error) {
    console.error('Microphone access denied:', error);
    alert('Please allow microphone access to record audio.');
  }
};

  const handleStop = () => {
  const mediaRecorder = mediaRecorderRef.current;

  if (!mediaRecorder) return;

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: 'audio/webm',
    });

    const recordedFile = new File(
      [audioBlob],
      `recording_${Date.now()}.webm`,
      { type: 'audio/webm' }
    );

    // Stop microphone completely
    mediaRecorder.stream.getTracks().forEach((track) => track.stop());

    setIsRecording(false);

    // Send real file to parent page
    onRecordingComplete(recordedFile, elapsed);
  };

  mediaRecorder.stop();
};

  return (
    <div className="flex flex-col items-center gap-5 rounded-xl border border-cyan-500/15 bg-cyan-500/5 p-6">
      <div className="relative flex items-center justify-center">
        {isRecording && (
          <>
            <div className="absolute h-20 w-20 rounded-full border-2 border-cyan-400/40 animate-pulse-ring" />
            <div className="absolute h-20 w-20 rounded-full border-2 border-cyan-400/30 animate-pulse-ring" style={{ animationDelay: '0.7s' }} />
          </>
        )}
        <button
          onClick={isRecording ? handleStop : handleStart}
          disabled={disabled}
          className={cn(
            'relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all',
            isRecording
              ? 'border-cyan-400/50 bg-cyan-500/15 animate-mic-pulse'
              : 'border-cyan-500/20 bg-cyan-500/10 hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:glow-cyan-sm',
            disabled && 'opacity-40 cursor-not-allowed'
          )}
        >
          {isRecording ? (
            <Square className="h-6 w-6 text-cyan-400" fill="currentColor" />
          ) : (
            <Mic className="h-7 w-7 text-cyan-400" />
          )}
        </button>
      </div>

      <div className="text-center">
        <div className="font-mono text-2xl font-bold text-white tabular-nums">
          {formatTime(elapsed)}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {isRecording ? 'Recording in progress...' : 'Click to start recording'}
        </p>
      </div>

      <div className="w-full rounded-lg border border-cyan-500/15 bg-navy-900/50 p-3">
        <WaveformVisualizer
          bars={40}
          className="h-12"
          color="cyan"
          active={isRecording}
        />
      </div>

      <div className="flex items-center gap-3">
        {!isRecording ? (
          <button
            onClick={handleStart}
            disabled={disabled}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-4 py-2 text-sm font-semibold text-cyan-400 transition-all hover:bg-cyan-500/25 hover:border-cyan-500/40',
              disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            <Mic className="h-4 w-4" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500/15 border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/25 hover:border-red-500/40"
          >
            <Square className="h-4 w-4" fill="currentColor" />
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
}
