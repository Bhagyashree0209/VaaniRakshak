'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { vaaniTheme } from '@/lib/vaani-theme';
import { GlassCard } from '@/components/vaani/glass-card';
import { DetectionTimeline } from '@/components/vaani/detection-timeline';

export default function TimelinePreview() {
  const [replayKey, setReplayKey] = React.useState(0);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: vaaniTheme.bg, color: vaaniTheme.text }}
    >
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link
          href="/feature-preview"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-80"
          style={{ color: vaaniTheme.textMuted }}
        >
          <ArrowLeft size={16} />
          Back to Feature Preview
        </Link>

        <h1 className="text-2xl font-bold mb-2" style={{ color: vaaniTheme.text }}>
          Detection Timeline
        </h1>
        <p className="text-sm mb-6" style={{ color: vaaniTheme.textMuted }}>
          Animated event flow from call start through clone detection to verification recommendation.
        </p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setReplayKey((k) => k + 1)}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold mb-6"
          style={{
            background: `${vaaniTheme.cyan}15`,
            border: `1px solid ${vaaniTheme.cyan}40`,
            color: vaaniTheme.cyan,
          }}
        >
          <RotateCcw size={16} />
          Replay Animation
        </motion.button>

        <GlassCard className="p-8">
          <DetectionTimeline key={replayKey} autoPlay intervalMs={1400} />
        </GlassCard>
      </div>
    </div>
  );
}
