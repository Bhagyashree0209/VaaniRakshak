'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
  bars?: number;
  className?: string;
  active?: boolean;
  color?: 'cyan' | 'green' | 'red' | 'amber';
}

const colorMap = {
  cyan: 'bg-cyan-400',
  green: 'bg-green-400',
  red: 'bg-red-400',
  amber: 'bg-amber-400',
};

export function WaveformVisualizer({
  bars = 48,
  className,
  active = true,
  color = 'cyan',
}: WaveformVisualizerProps) {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
    setHeights(initial);
    if (!active) return;

    const interval = setInterval(() => {
      setHeights(Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2));
    }, 150);

    return () => clearInterval(interval);
  }, [bars, active]);

  return (
    <div className={cn('flex items-center justify-center gap-1 h-20', className)}>
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn(
            'w-1 rounded-full transition-all duration-150',
            colorMap[color]
          )}
          style={{
            height: `${h * 100}%`,
            opacity: active ? 0.6 + h * 0.4 : 0.3,
            boxShadow: active ? `0 0 8px currentColor` : 'none',
          }}
        />
      ))}
    </div>
  );
}
