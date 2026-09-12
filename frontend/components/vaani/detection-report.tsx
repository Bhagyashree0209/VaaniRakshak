'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  FileText,
  Calendar,
  QrCode,
  PenLine,
  CheckCircle2,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme, riskFromConfidence, riskColor, riskGlow, type RiskLevel } from '@/lib/vaani-theme';

export interface DetectionReportProps {
  fileName: string;
  timestamp: string;
  callerName: string;
  callerNumber: string;
  duration: string;
  confidence: number;
  riskSummary: string;
  recommendation: string;
  reportId?: string;
  className?: string;
}

const verdictMap: Record<RiskLevel, { label: string; icon: LucideIcon; color: string }> = {
  safe: { label: 'AUTHENTIC VOICE', icon: ShieldCheck, color: vaaniTheme.green },
  caution: { label: 'SUSPICIOUS — VERIFY', icon: ShieldAlert, color: vaaniTheme.amber },
  danger: { label: 'AI VOICE CLONE DETECTED', icon: ShieldX, color: vaaniTheme.red },
};

export function DetectionReport({
  fileName,
  timestamp,
  callerName,
  callerNumber,
  duration,
  confidence,
  riskSummary,
  recommendation,
  reportId = 'VR-2026-XXXX',
  className,
}: DetectionReportProps) {
  const level = riskFromConfidence(confidence);
  const verdict = verdictMap[level];
  const color = riskColor(level);
  const glow = riskGlow(level);
  const VerdictIcon = verdict.icon;

  return (
    <div
      id="vaani-report"
      className={cn('relative max-w-2xl mx-auto', className)}
      style={{
        background: `linear-gradient(180deg, ${vaaniTheme.bgSoft} 0%, ${vaaniTheme.bg} 100%)`,
        border: `1px solid ${color}40`,
        borderRadius: 16,
        boxShadow: `0 0 32px ${glow.replace('0.45', '0.12')}`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${vaaniTheme.cyan}, ${color})` }}
      />

      <div className="p-8">
        {/* Header / Branding */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 44,
                height: 44,
                background: `linear-gradient(135deg, ${vaaniTheme.cyan}25, ${vaaniTheme.bgSoft})`,
                border: `1px solid ${vaaniTheme.cyan}50`,
                boxShadow: `0 0 12px ${vaaniTheme.cyanGlow.replace('0.45', '0.2')}`,
              }}
            >
              <ShieldCheck size={22} style={{ color: vaaniTheme.cyan }} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: vaaniTheme.text }}>
                VaaniRakshak
              </h1>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: vaaniTheme.textMuted }}>
                AI Voice Clone Detection Report
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest" style={{ color: vaaniTheme.textMuted }}>
              Report ID
            </p>
            <p className="text-xs font-mono font-bold" style={{ color: vaaniTheme.cyan }}>
              {reportId}
            </p>
          </div>
        </div>

        {/* File + timestamp row */}
        <div
          className="flex items-center gap-4 rounded-lg p-3 mb-6"
          style={{ background: 'rgba(148,163,184,0.06)', border: `1px solid ${vaaniTheme.border}` }}
        >
          <div className="flex items-center gap-2">
            <FileText size={14} style={{ color: vaaniTheme.textMuted }} />
            <span className="text-xs font-mono" style={{ color: vaaniTheme.text }}>
              {fileName}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Calendar size={14} style={{ color: vaaniTheme.textMuted }} />
            <span className="text-xs font-mono" style={{ color: vaaniTheme.textMuted }}>
              {timestamp}
            </span>
          </div>
        </div>

        {/* Verdict */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl p-5 mb-6"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}40`,
            boxShadow: `0 0 20px ${glow.replace('0.45', '0.1')}`,
          }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center rounded-full shrink-0"
              style={{
                width: 56,
                height: 56,
                background: `${color}20`,
                border: `1.5px solid ${color}`,
                boxShadow: `0 0 16px ${glow}`,
              }}
            >
              <VerdictIcon size={26} style={{ color }} />
            </motion.div>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: vaaniTheme.textMuted }}>
                Verdict
              </p>
              <p className="text-xl font-bold tracking-tight" style={{ color }}>
                {verdict.label}
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold tabular-nums" style={{ color }}>
                  {confidence.toFixed(0)}%
                </span>
                <span className="text-xs" style={{ color: vaaniTheme.textMuted }}>
                  confidence
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caller info grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <InfoCell label="Caller" value={callerName} />
          <InfoCell label="Number" value={callerNumber} />
          <InfoCell label="Duration" value={duration} />
        </div>

        {/* Risk summary */}
        <Section title="Risk Summary" icon={AlertTriangle} accent={color}>
          <p className="text-sm leading-relaxed" style={{ color: vaaniTheme.text }}>
            {riskSummary}
          </p>
        </Section>

        {/* Recommendation */}
        <Section title="Recommendation" icon={CheckCircle2} accent={vaaniTheme.cyan}>
          <p className="text-sm leading-relaxed" style={{ color: vaaniTheme.text }}>
            {recommendation}
          </p>
        </Section>

        {/* QR + Signature */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* QR verification */}
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(148,163,184,0.06)', border: `1px solid ${vaaniTheme.border}` }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <QrCode size={14} style={{ color: vaaniTheme.cyan }} />
              <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: vaaniTheme.cyan }}>
                Verify Report
              </p>
            </div>
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 88,
                height: 88,
                background: `${vaaniTheme.cyan}10`,
                border: `1px solid ${vaaniTheme.cyan}30`,
              }}
            >
              <QRPlaceholder />
            </div>
            <p className="text-[10px] mt-2 leading-relaxed" style={{ color: vaaniTheme.textMuted }}>
              Scan to verify authenticity at vaanirakshak.in/verify
            </p>
          </div>

          {/* Signature */}
          <div
            className="rounded-xl p-4 flex flex-col justify-between"
            style={{ background: 'rgba(148,163,184,0.06)', border: `1px solid ${vaaniTheme.border}` }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <PenLine size={14} style={{ color: vaaniTheme.cyan }} />
              <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: vaaniTheme.cyan }}>
                Digital Signature
              </p>
            </div>
            <div className="flex-1 flex items-center">
              <SignatureMark color={vaaniTheme.cyan} />
            </div>
            <div className="mt-3 pt-2 border-t" style={{ borderColor: vaaniTheme.border }}>
              <p className="text-xs font-semibold" style={{ color: vaaniTheme.text }}>
                VaaniRakshak Engine v2.6
              </p>
              <p className="text-[10px]" style={{ color: vaaniTheme.textMuted }}>
                SHA-256 · 9f2a1b…e7c4
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: vaaniTheme.border }}>
          <p className="text-[10px]" style={{ color: vaaniTheme.textMuted }}>
            Generated by VaaniRakshak · Smart India Hackathon 2026
          </p>
          <p className="text-[10px] font-mono" style={{ color: vaaniTheme.textMuted }}>
            Page 1 of 1
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ background: 'rgba(148,163,184,0.06)', border: `1px solid ${vaaniTheme.border}` }}
    >
      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: vaaniTheme.textMuted }}>
        {label}
      </p>
      <p className="text-sm font-semibold truncate" style={{ color: vaaniTheme.text }}>
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  accent,
  children,
}: {
  title: string;
  icon: LucideIcon;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={14} style={{ color: accent }} />
        <h3 className="text-[11px] uppercase tracking-widest font-bold" style={{ color: accent }}>
          {title}
        </h3>
      </div>
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(148,163,184,0.04)', border: `1px solid ${vaaniTheme.border}` }}
      >
        {children}
      </div>
    </div>
  );
}

function QRPlaceholder() {
  const cells = React.useMemo(
    () => Array.from({ length: 49 }, () => Math.random() > 0.5),
    []
  );
  return (
    <div className="grid grid-cols-7 gap-px" style={{ width: 68, height: 68 }}>
      {cells.map((on, i) => (
        <div
          key={i}
          style={{
            background: on ? vaaniTheme.cyan : 'transparent',
            opacity: on ? 0.9 : 0,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}

function SignatureMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 40" className="w-full h-10" fill="none">
      <motion.path
        d="M5 28 Q15 10 25 22 T45 18 Q55 8 65 24 T95 14 Q105 22 115 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  );
}
