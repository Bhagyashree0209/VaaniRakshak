'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { vaaniTheme, type RiskLevel, riskColor } from '@/lib/vaani-theme';

interface ListeningPulseProps {
  active?: boolean;
  level?: RiskLevel;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ListeningPulse({
  active = true,
  level = 'safe',
  size = 120,
  className,
  children,
}: ListeningPulseProps) {
  const color = riskColor(level);

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {active &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ border: `2px solid ${color}` }}
            initial={{ width: size * 0.4, height: size * 0.4, opacity: 0.6 }}
            animate={{ width: size, height: size, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeOut',
            }}
          />
        ))}
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          border: `1px solid ${color}50`,
        }}
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children ?? (
          <motion.div
            className="rounded-full"
            style={{ background: color, boxShadow: `0 0 12px ${color}` }}
            animate={active ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}
