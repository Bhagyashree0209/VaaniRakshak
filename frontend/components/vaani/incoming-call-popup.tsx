'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme, type RiskLevel, riskColor, riskGlow } from '@/lib/vaani-theme';
import { GlassCard } from '@/components/vaani/glass-card';

export interface IncomingCallPopupProps {
  open: boolean;
  callerName: string;
  callerNumber?: string;
  level?: RiskLevel;
  onAnswer?: () => void;
  onReject?: () => void;
  className?: string;
}

export function IncomingCallPopup({
  open,
  callerName,
  callerNumber,
  level = 'safe',
  onAnswer,
  onReject,
  className,
}: IncomingCallPopupProps) {
  const color = riskColor(level);
  const glow = riskGlow(level);

  const StatusIcon =
    level === 'danger' ? ShieldAlert : level === 'caution' ? Shield : ShieldCheck;
  const statusText =
    level === 'danger'
      ? 'AI Voice Detected'
      : level === 'caution'
      ? 'Unverified Caller'
      : 'Verified Caller';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn('fixed bottom-6 right-6 z-50', className)}
          initial={{ opacity: 0, y: 80, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <motion.div
            animate={{ rotate: [0, -1.5, 1.5, -1, 1, 0] }}
            transition={{ duration: 0.4, repeat: 6, repeatDelay: 1.5 }}
          >
            <GlassCard
              glowColor={glow}
              borderColor={`${color}50`}
              className="w-80 p-5"
            >
              {/* Status bar */}
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 mb-4"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <StatusIcon size={14} style={{ color }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color }}>
                  {statusText}
                </span>
              </div>

              {/* Avatar + caller info */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center rounded-full text-lg font-bold shrink-0"
                  style={{
                    width: 52,
                    height: 52,
                    background: `linear-gradient(135deg, ${color}40, ${vaaniTheme.bgSoft})`,
                    border: `1px solid ${color}50`,
                    color: vaaniTheme.text,
                    boxShadow: `0 0 16px ${glow}`,
                  }}
                >
                  {callerName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold truncate" style={{ color: vaaniTheme.text }}>
                    {callerName}
                  </p>
                  {callerNumber && (
                    <p className="text-sm truncate" style={{ color: vaaniTheme.textMuted }}>
                      {callerNumber}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-0.5">
                    <motion.span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: color }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-[11px]" style={{ color: vaaniTheme.textMuted }}>
                      Incoming call…
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={onReject}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    background: `${vaaniTheme.red}20`,
                    border: `1px solid ${vaaniTheme.red}50`,
                    color: vaaniTheme.red,
                  }}
                >
                  <PhoneOff size={16} />
                  Reject
                </motion.button>
                <motion.button
                  onClick={onAnswer}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    background: `${vaaniTheme.green}20`,
                    border: `1px solid ${vaaniTheme.green}50`,
                    color: vaaniTheme.green,
                  }}
                >
                  <Phone size={16} />
                  Answer
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
