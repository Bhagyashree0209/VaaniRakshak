'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { vaaniTheme } from '@/lib/vaani-theme';
import { DetectionReport } from '@/components/vaani/detection-report';

export default function ReportPreview() {
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
          Detection Report
        </h1>
        <p className="text-sm mb-8" style={{ color: vaaniTheme.textMuted }}>
          Official cybersecurity report with branding, verdict, QR verification, and digital signature.
        </p>

        <DetectionReport
          fileName="recording_9876543210_20260912.wav"
          timestamp="2026-09-12 14:32:18 IST"
          callerName="Rajesh Kumar"
          callerNumber="+91 98765 43210"
          duration="3:24"
          confidence={87}
          reportId="VR-2026-0912-A3F7"
          riskSummary="Spectral analysis detected synthetic voice patterns with 87% confidence. The audio exhibits unnatural prosody, inconsistent breathing pauses, and formant anomalies consistent with AI voice cloning models. Voice fingerprint matched known clone signatures in the VaaniRakshak threat database."
          recommendation="Do not share any OTP, passwords, or financial information with this caller. Hang up immediately and call back on the registered number from your contacts. Report this incident to the National Cybercrime Helpline at 1930."
        />
      </div>
    </div>
  );
}
