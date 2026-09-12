'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, ShieldAlert, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { vaaniTheme, type RiskLevel } from '@/lib/vaani-theme';
import { IncomingCallPopup } from '@/components/vaani/incoming-call-popup';
import { GlassCard } from '@/components/vaani/glass-card';

const states: { label: string; level: RiskLevel }[] = [
  { label: 'Verified Caller', level: 'safe' },
  { label: 'Unverified Caller', level: 'caution' },
  { label: 'AI Voice Detected', level: 'danger' },
];

export default function IncomingCallPreview() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: vaaniTheme.bg, color: vaaniTheme.text }}
    >
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/feature-preview"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-80"
          style={{ color: vaaniTheme.textMuted }}
        >
          <ArrowLeft size={16} />
          Back to Feature Preview
        </Link>

        <h1 className="text-2xl font-bold mb-2" style={{ color: vaaniTheme.text }}>
          Incoming Call Popup
        </h1>
        <p className="text-sm mb-8" style={{ color: vaaniTheme.textMuted }}>
          Floating notification appears bottom-right with vibration, glow, and answer/reject buttons.
        </p>

        <div className="space-y-4 mb-6">
          {states.map((s, i) => (
            <GlassCard key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {s.level === 'danger' ? (
                  <ShieldAlert size={20} style={{ color: vaaniTheme.red }} />
                ) : s.level === 'caution' ? (
                  <Phone size={20} style={{ color: vaaniTheme.amber }} />
                ) : (
                  <ShieldCheck size={20} style={{ color: vaaniTheme.green }} />
                )}
                <span className="text-sm font-semibold" style={{ color: vaaniTheme.text }}>
                  {s.label}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="rounded-lg px-4 py-2 text-xs font-semibold"
                style={{
                  background: `${vaaniTheme.cyan}15`,
                  border: `1px solid ${vaaniTheme.cyan}40`,
                  color: vaaniTheme.cyan,
                }}
              >
                {openIndex === i ? 'Hide' : 'Show Popup'}
              </motion.button>
            </GlassCard>
          ))}
        </div>
      </div>

      {states.map((s, i) => (
        <IncomingCallPopup
          key={i}
          open={openIndex === i}
          callerName="Rajesh Kumar"
          callerNumber="+91 98765 43210"
          level={s.level}
        />
      ))}
    </div>
  );
}
