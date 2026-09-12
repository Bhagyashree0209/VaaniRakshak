'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { vaaniTheme } from '@/lib/vaani-theme';

interface CallTimerProps {
  active: boolean;
  className?: string;
  startAt?: number;
}

function format(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function CallTimer({ active, className, startAt = 0 }: CallTimerProps) {
  const [seconds, setSeconds] = React.useState(startAt);

  React.useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <span
      className={cn('font-mono text-2xl font-bold tabular-nums tracking-wider', className)}
      style={{ color: vaaniTheme.text }}
    >
      {format(seconds)}
    </span>
  );
}
