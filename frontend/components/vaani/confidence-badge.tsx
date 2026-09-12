'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { vaaniTheme, riskFromConfidence, riskColor, type RiskLevel } from '@/lib/vaani-theme';

export interface ConfidenceBadgeProps {
  confidence: number;
  level?: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const labels: Record<RiskLevel, string> = {
  safe: 'Authentic',
  caution: 'Suspicious',
  danger: 'AI Clone',
};

export function ConfidenceBadge({
  confidence,
  level,
  size = 'md',
  showLabel = true,
  className,
}: ConfidenceBadgeProps) {
  const resolvedLevel = level ?? riskFromConfidence(confidence);
  const color = riskColor(resolvedLevel);

  const sizes = {
    sm: { dot: 6, text: 'text-[10px]', pad: 'px-2 py-0.5', gap: 'gap-1' },
    md: { dot: 8, text: 'text-xs', pad: 'px-2.5 py-1', gap: 'gap-1.5' },
    lg: { dot: 10, text: 'text-sm', pad: 'px-3 py-1.5', gap: 'gap-2' },
  };
  const s = sizes[size];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn('inline-flex items-center rounded-full font-bold', s.text, s.pad, s.gap, className)}
      style={{
        background: `${color}15`,
        border: `1px solid ${color}40`,
        color,
      }}
    >
      <motion.span
        className="rounded-full shrink-0"
        style={{ width: s.dot, height: s.dot, background: color, boxShadow: `0 0 6px ${color}` }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {showLabel && <span>{labels[resolvedLevel]}</span>}
      <span className="tabular-nums opacity-80">{confidence.toFixed(0)}%</span>
    </motion.div>
  );
}
