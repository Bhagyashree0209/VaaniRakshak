'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneOff,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Radio,
  ArrowLeft,
  Volume2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme, riskFromConfidence, riskColor, riskGlow } from '@/lib/vaani-theme';
import { GlassCard } from '@/components/vaani/glass-card';
import { LiveWaveform } from '@/components/vaani/live-waveform';
import { RiskMeter } from '@/components/vaani/risk-meter';
import { ListeningPulse } from '@/components/vaani/listening-pulse';
import { CallTimer } from '@/components/vaani/call-timer';
import { VoiceSafetyAssistant } from '@/components/vaani/voice-safety-assistant';

export default function LiveCallDetectionPage() {
  const [callActive, setCallActive] = React.useState(true);
  const [confidence, setConfidence] = React.useState(12);
  const [showWarning, setShowWarning] = React.useState(false);

  const level = riskFromConfidence(confidence);
  const color = riskColor(level);
  const glow = riskGlow(level);

  // Simulate real-time confidence changes
  React.useEffect(() => {
    if (!callActive) return;
    const id = setInterval(() => {
      setConfidence((prev) => {
        const delta = (Math.random() - 0.35) * 18;
        const next = Math.max(2, Math.min(96, prev + delta));
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, [callActive]);

  // Toggle warning banner when danger
  React.useEffect(() => {
    if (level === 'danger') setShowWarning(true);
    else {
      const t = setTimeout(() => setShowWarning(false), 800);
      return () => clearTimeout(t);
    }
  }, [level]);

  const handleEndCall = () => setCallActive(false);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: vaaniTheme.bg, color: vaaniTheme.text }}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: vaaniTheme.cyan }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: level === 'danger' ? vaaniTheme.red : vaaniTheme.cyan }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: vaaniTheme.textMuted }}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <motion.span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: callActive ? `${vaaniTheme.cyan}15` : `${vaaniTheme.textMuted}15`,
                border: `1px solid ${callActive ? `${vaaniTheme.cyan}40` : `${vaaniTheme.textMuted}30`}`,
                color: callActive ? vaaniTheme.cyan : vaaniTheme.textMuted,
              }}
              animate={callActive ? { opacity: [1, 0.6, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Radio size={12} />
              {callActive ? 'LIVE MONITORING' : 'CALL ENDED'}
            </motion.span>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Call info + waveform (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Caller card */}
            <GlassCard className="p-6" glowColor={glow} borderColor={`${color}40`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <ListeningPulse active={callActive} level={level} size={88} />
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: vaaniTheme.textMuted }}>
                      Incoming Call
                    </p>
                    <h1 className="text-2xl font-bold" style={{ color: vaaniTheme.text }}>
                      +91 98765 43210
                    </h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                      >
                        {level === 'danger' ? 'High Risk' : level === 'caution' ? 'Moderate Risk' : 'Low Risk'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CallTimer active={callActive} />
                  <div className="flex items-center gap-1 text-xs" style={{ color: vaaniTheme.textMuted }}>
                    <Volume2 size={12} />
                    Audio quality: Good
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Waveform card */}
            <GlassCard className="p-6" glowColor={glow}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={16} style={{ color }} />
                  <span className="text-sm font-semibold" style={{ color: vaaniTheme.text }}>
                    Live Audio Waveform
                  </span>
                </div>
                <span className="text-xs font-mono" style={{ color: vaaniTheme.textMuted }}>
                  16 kHz · mono
                </span>
              </div>
              <div className="h-32">
                <LiveWaveform active={callActive} level={level} bars={56} />
              </div>
            </GlassCard>

            {/* Risk meter card */}
            <GlassCard className="p-6" glowColor={glow} borderColor={`${color}40`}>
              <RiskMeter confidence={confidence} />
            </GlassCard>

            {/* Warning banner */}
            <AnimatePresence>
              {showWarning && callActive && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 rounded-xl p-4"
                  style={{
                    background: `${vaaniTheme.red}15`,
                    border: `1px solid ${vaaniTheme.red}50`,
                    boxShadow: `0 0 20px ${vaaniTheme.redGlow}`,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <ShieldAlert size={24} style={{ color: vaaniTheme.red }} />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: vaaniTheme.red }}>
                      Potential AI Voice Detected
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: vaaniTheme.textMuted }}>
                      Audio patterns suggest synthetic voice generation. Exercise caution.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={handleEndCall}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-colors"
                style={{
                  background: `${vaaniTheme.red}20`,
                  border: `1px solid ${vaaniTheme.red}50`,
                  color: vaaniTheme.red,
                  boxShadow: `0 0 16px ${vaaniTheme.redGlow}`,
                }}
              >
                <PhoneOff size={18} />
                End Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-colors"
                style={{
                  background: `${vaaniTheme.cyan}15`,
                  border: `1px solid ${vaaniTheme.cyan}40`,
                  color: vaaniTheme.cyan,
                }}
              >
                <ShieldCheck size={18} />
                Continue Monitoring
              </motion.button>
            </div>
          </div>

          {/* Right: Safety assistant */}
          <div className="space-y-5">
            <VoiceSafetyAssistant />

            {/* Quick stats card */}
            <GlassCard className="p-5" glowColor={vaaniTheme.cyanGlow}>
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: vaaniTheme.textMuted }}>
                Session Stats
              </p>
              <div className="space-y-3">
                <StatRow label="Samples analyzed" value="1,284" />
                <StatRow label="Voice fingerprints" value="3" />
                <StatRow label="Avg. confidence" value={`${Math.round(confidence)}%`} accent={color} />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs" style={{ color: vaaniTheme.textMuted }}>
        {label}
      </span>
      <span
        className="text-sm font-bold tabular-nums"
        style={{ color: accent ?? vaaniTheme.text }}
      >
        {value}
      </span>
    </div>
  );
}
