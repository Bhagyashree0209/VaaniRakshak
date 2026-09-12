'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  AudioLines,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme, type RiskLevel, riskColor, riskGlow } from '@/lib/vaani-theme';

export type TimelineStatus = 'pending' | 'active' | 'done';

export interface TimelineEvent {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  level: RiskLevel;
  status: TimelineStatus;
  timestamp?: string;
}

export interface DetectionTimelineProps {
  events?: TimelineEvent[];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
  onComplete?: () => void;
}

const defaultEvents: TimelineEvent[] = [
  {
    id: 'started',
    icon: PhoneCall,
    title: 'Call Started',
    subtitle: 'Incoming call connected · monitoring initiated',
    level: 'safe',
    status: 'done',
  },
  {
    id: 'analysed',
    icon: AudioLines,
    title: 'Voice Analysed',
    subtitle: 'Audio fingerprint extracted · spectral features compared',
    level: 'safe',
    status: 'done',
  },
  {
    id: 'risk',
    icon: TrendingUp,
    title: 'Risk Increasing',
    subtitle: 'Anomaly score rising · unnatural prosody detected',
    level: 'caution',
    status: 'done',
  },
  {
    id: 'clone',
    icon: ShieldAlert,
    title: 'Clone Detected',
    subtitle: 'Synthetic voice signature matched · high confidence',
    level: 'danger',
    status: 'done',
  },
  {
    id: 'verify',
    icon: ShieldCheck,
    title: 'Verification Recommended',
    subtitle: 'Callback advised · do not share sensitive information',
    level: 'danger',
    status: 'done',
  },
];

export function DetectionTimeline({
  events = defaultEvents,
  autoPlay = true,
  intervalMs = 1400,
  className,
  onComplete,
}: DetectionTimelineProps) {
  const [visibleCount, setVisibleCount] = React.useState(autoPlay ? 0 : events.length);

  React.useEffect(() => {
    if (!autoPlay) return;
    if (visibleCount >= events.length) {
      onComplete?.();
      return;
    }
    const id = setTimeout(() => setVisibleCount((c) => c + 1), intervalMs);
    return () => clearTimeout(id);
  }, [visibleCount, autoPlay, intervalMs, events.length, onComplete]);

  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div
        className="absolute left-[19px] top-2 bottom-2 w-0.5"
        style={{
          background: `linear-gradient(to bottom, ${vaaniTheme.cyan}50, ${vaaniTheme.amber}50, ${vaaniTheme.red}50)`,
        }}
      />

      <div className="space-y-1">
        {events.map((event, i) => {
          const isVisible = i < visibleCount;
          return (
            <AnimatePresence key={event.id}>
              {isVisible && (
                <TimelineNode
                  event={event}
                  isLast={i === events.length - 1}
                  delay={0.1}
                />
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}

function TimelineNode({
  event,
  isLast,
  delay,
}: {
  event: TimelineEvent;
  isLast: boolean;
  delay: number;
}) {
  const Icon = event.icon;
  const color = riskColor(event.level);
  const glow = riskGlow(event.level);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="relative flex items-start gap-4 pb-6"
    >
      {/* Node dot */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 40,
          height: 40,
          background: `linear-gradient(135deg, ${color}30, ${vaaniTheme.bgSoft})`,
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 16px ${glow}`,
        }}
        animate={{ boxShadow: [`0 0 8px ${glow}`, `0 0 20px ${glow}`, `0 0 8px ${glow}`] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={18} style={{ color }} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-bold" style={{ color: vaaniTheme.text }}>
            {event.title}
          </h4>
          {event.timestamp && (
            <span className="text-xs font-mono" style={{ color: vaaniTheme.textMuted }}>
              {event.timestamp}
            </span>
          )}
        </div>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: vaaniTheme.textMuted }}>
          {event.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
