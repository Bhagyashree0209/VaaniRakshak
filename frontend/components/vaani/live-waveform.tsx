'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { vaaniTheme, type RiskLevel, riskColor } from '@/lib/vaani-theme';

interface LiveWaveformProps {
  active?: boolean;
  bars?: number;
  level?: RiskLevel;
  className?: string;
  speed?: number;
}

export function LiveWaveform({
  active = true,
  bars = 48,
  level = 'safe',
  className,
  speed = 1,
}: LiveWaveformProps) {
  const color = riskColor(level);
  const heights = React.useRef<number[]>(
    Array.from({ length: bars }, () => 0.2 + Math.random() * 0.8)
  );

  return (
    <div
      className={cn('flex items-center justify-center gap-[3px] w-full h-full', className)}
      aria-hidden
    >
      {heights.current.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-full"
          style={{
            background: `linear-gradient(to top, ${color}, ${color}80)`,
            boxShadow: `0 0 6px ${color}66`,
            minHeight: 4,
          }}
          animate={
            active
              ? { height: [`${h * 20}%`, `${h * 90}%`, `${h * 35}%`] }
              : { height: '8%' }
          }
          transition={{
            duration: (0.6 + Math.random() * 0.8) / speed,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (i * 0.03) % 1,
          }}
        />
      ))}
    </div>
  );
}
