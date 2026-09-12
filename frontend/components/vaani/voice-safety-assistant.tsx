'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  PhoneCall,
  MessageCircleQuestion,
  KeyRound,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme } from '@/lib/vaani-theme';
import { GlassCard } from '@/components/vaani/glass-card';

interface SafetyTip {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const tips: SafetyTip[] = [
  {
    icon: PhoneCall,
    title: 'Call back on registered number',
    description: 'Hang up and dial the number you have on record. AI clones cannot receive callbacks on the real line.',
    accent: vaaniTheme.cyan,
  },
  {
    icon: MessageCircleQuestion,
    title: 'Ask a personal question',
    description: 'Ask something only the real person would know — a shared memory, a middle name, a recent event.',
    accent: vaaniTheme.green,
  },
  {
    icon: KeyRound,
    title: "Don't share OTP or passwords",
    description: 'Never reveal one-time codes, PINs, or passwords — no legitimate caller will ever ask for them.',
    accent: vaaniTheme.red,
  },
];

export interface VoiceSafetyAssistantProps {
  className?: string;
  compact?: boolean;
}

export function VoiceSafetyAssistant({ className, compact = false }: VoiceSafetyAssistantProps) {
  return (
    <GlassCard className={cn('p-6', className)} glowColor={vaaniTheme.cyanGlow}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <AnimatedShield />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold" style={{ color: vaaniTheme.text }}>
              Voice Safety Assistant
            </h3>
            <motion.span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                background: `${vaaniTheme.cyan}20`,
                color: vaaniTheme.cyan,
                border: `1px solid ${vaaniTheme.cyan}40`,
              }}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Active
            </motion.span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: vaaniTheme.textMuted }}>
            Real-time guidance during suspicious calls
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="space-y-3">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.03]"
              style={{ border: `1px solid ${vaaniTheme.border}` }}
            >
              <div
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{
                  width: 38,
                  height: 38,
                  background: `${tip.accent}15`,
                  border: `1px solid ${tip.accent}30`,
                }}
              >
                <Icon size={18} style={{ color: tip.accent }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: vaaniTheme.text }}>
                  {tip.title}
                </p>
                {!compact && (
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: vaaniTheme.textMuted }}>
                    {tip.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <div
        className="mt-5 flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ background: `${vaaniTheme.cyan}08`, border: `1px solid ${vaaniTheme.cyan}20` }}
      >
        <Sparkles size={14} style={{ color: vaaniTheme.cyan }} />
        <p className="text-xs" style={{ color: vaaniTheme.textMuted }}>
          VaaniRakshak is monitoring audio patterns for synthetic voice signatures.
        </p>
      </div>
    </GlassCard>
  );
}

function AnimatedShield() {
  return (
    <div className="relative" style={{ width: 48, height: 48 }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${vaaniTheme.cyan}30 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative flex items-center justify-center rounded-xl"
        style={{
          width: 48,
          height: 48,
          background: `linear-gradient(135deg, ${vaaniTheme.cyan}30, ${vaaniTheme.bgSoft})`,
          border: `1px solid ${vaaniTheme.cyan}50`,
          boxShadow: `0 0 16px ${vaaniTheme.cyanGlow}`,
        }}
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ShieldCheck size={24} style={{ color: vaaniTheme.cyan }} />
      </motion.div>
    </div>
  );
}
