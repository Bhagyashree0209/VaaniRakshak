'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  PhoneCall,
  PhoneIncoming,
  GitBranch,
  History,
  FileText,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { vaaniTheme } from '@/lib/vaani-theme';

const features = [
  {
    href: '/live-call-demo',
    title: 'Live Monitoring',
    description: 'Monitor a live phone call with real-time waveform, AI risk meter and safety guidance.',
    icon: PhoneCall,
    accent: vaaniTheme.cyan,
  },
  {
    href: '/incoming-call',
    title: 'Incoming Call Alert',
    description: 'Experience floating call notifications with verified, suspicious and AI-clone alerts.',
    icon: PhoneIncoming,
    accent: vaaniTheme.green,
  },
  {
    href: '/timeline',
    title: 'Detection Journey',
    description: 'Follow the animated journey from call connection to AI clone detection.',
    icon: GitBranch,
    accent: vaaniTheme.amber,
  },
  {
    href: '/history-preview',
    title: 'Call History',
    description: 'Browse previous detections with search, filters and grouped call records.',
    icon: History,
    accent: vaaniTheme.cyan,
  },
  {
    href: '/report-preview',
    title: 'Official Report',
    description: 'View a professional forensic report with verdict, confidence and verification details.',
    icon: FileText,
    accent: vaaniTheme.red,
  },
];

export default function FeaturePreviewHub() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: vaaniTheme.bg, color: vaaniTheme.text }}
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center justify-center rounded-2xl mb-5"
            style={{
              width: 56,
              height: 56,
              background: `linear-gradient(135deg, ${vaaniTheme.cyan}25, ${vaaniTheme.bgSoft})`,
              border: `1px solid ${vaaniTheme.cyan}50`,
              boxShadow: `0 0 20px ${vaaniTheme.cyanGlow}`,
            }}
          >
            <ShieldCheck size={28} style={{ color: vaaniTheme.cyan }} />
          </div>
          <div className="flex flex-col items-center text-center mb-12">
  <div className="mb-5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
    Live Call Monitor
  </div>

  <h1 className="text-4xl font-bold text-white mb-4">
    Live Call Command Center
  </h1>

  <p className="max-w-2xl text-gray-400 leading-relaxed">
    Real-time AI voice clone protection during active phone calls.
    Explore monitoring, incoming call alerts, verification tools,
    detection timeline, call history and official forensic reports.
  </p>
</div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={f.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-start gap-4 rounded-2xl p-5 h-full"
                    style={{
                      background: `linear-gradient(135deg, rgba(6, 18, 39, 0.7) 0%, rgba(2, 11, 26, 0.85) 100%)`,
                      border: `1px solid ${f.accent}30`,
                      boxShadow: `0 0 16px ${f.accent}15`,
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-xl shrink-0"
                      style={{
                        width: 44,
                        height: 44,
                        background: `${f.accent}15`,
                        border: `1px solid ${f.accent}40`,
                      }}
                    >
                      <Icon size={20} style={{ color: f.accent }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold mb-1" style={{ color: vaaniTheme.text }}>
                        {f.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: vaaniTheme.textMuted }}>
                        {f.description}
                      </p>
                    </div>
                    <ArrowRight size={18} className="shrink-0 mt-1" style={{ color: f.accent }} />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="mt-16 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
  <p className="text-gray-300 leading-relaxed">
    These simulations demonstrate how VaaniRakshak guides users from
    live detection to identity verification during suspicious AI voice-clone calls.
  </p>
</div>
    </div>
  );
}
