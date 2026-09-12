'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { vaaniTheme, riskFromConfidence, riskColor, riskGlow } from '@/lib/vaani-theme';

interface RiskMeterProps {
  confidence: number;
  className?: string;
  label?: string;
}

export function RiskMeter({ confidence, className, label = 'AI Clone Risk' }: RiskMeterProps) {
  const level = riskFromConfidence(confidence);
  const color = riskColor(level);
  const glow = riskGlow(level);

  const segments = [
    { threshold: 0, label: 'Safe', color: vaaniTheme.green },
    { threshold: 40, label: 'Caution', color: vaaniTheme.amber },
    { threshold: 70, label: 'Danger', color: vaaniTheme.red },
  ];

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium tracking-wider uppercase" style={{ color: vaaniTheme.textMuted }}>
          {label}
        </span>
        <span className="text-sm font-bold tabular-nums" style={{ color }}>
          {confidence.toFixed(0)}%
        </span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(148,163,184,0.1)' }}>
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${vaaniTheme.green}, ${vaaniTheme.amber}, ${vaaniTheme.red})` }}
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
        <div
          className="absolute top-0 h-full w-0.5"
          style={{ left: '40%', background: 'rgba(255,255,255,0.2)' }}
        />
        <div
          className="absolute top-0 h-full w-0.5"
          style={{ left: '70%', background: 'rgba(255,255,255,0.2)' }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {segments.map((s) => (
          <span
            key={s.label}
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: level === s.label.toLowerCase() || (s.label === 'Safe' && level === 'safe') ? s.color : vaaniTheme.textMuted }}
          >
            {s.label}
          </span>
        ))}
      </div>
      <motion.div
        className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{ background: `${color}15`, border: `1px solid ${color}40` }}
        animate={{ boxShadow: [`0 0 0px ${glow}`, `0 0 16px ${glow}`, `0 0 0px ${glow}`] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: color }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
        </span>
        <span className="text-xs font-semibold" style={{ color }}>
          {level === 'danger' ? 'Potential AI Voice Detected' : level === 'caution' ? 'Voice pattern uncertain' : 'Voice appears authentic'}
        </span>
      </motion.div>
    </div>
  );
}
