'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme, riskFromConfidence, riskColor } from '@/lib/vaani-theme';
import { ConfidenceBadge } from '@/components/vaani/confidence-badge';

export interface HistoryRecord {
  id: string;
  callerName: string;
  callerNumber: string;
  confidence: number;
  duration: string;
  timestamp: string;
}

export interface HistoryCardProps {
  record: HistoryRecord;
  onClick?: () => void;
  className?: string;
}

export function HistoryCard({ record, onClick, className }: HistoryCardProps) {
  const level = riskFromConfidence(record.confidence);
  const color = riskColor(level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.01,
        y: -2,
        boxShadow: `0 0 16px ${color}20`,
        borderColor: `${color}40`,
      }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-xl p-3.5 cursor-pointer transition-colors',
        className
      )}
      style={{
        background: 'rgba(6, 18, 39, 0.5)',
        border: `1px solid ${vaaniTheme.border}`,
        boxShadow: 'none',
      }}
    >
      {/* Avatar */}
      <div
        className="flex items-center justify-center rounded-xl shrink-0 text-sm font-bold"
        style={{
          width: 44,
          height: 44,
          background: `linear-gradient(135deg, ${color}25, ${vaaniTheme.bgSoft})`,
          border: `1px solid ${color}40`,
          color: vaaniTheme.text,
        }}
      >
        {record.callerName.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold truncate" style={{ color: vaaniTheme.text }}>
            {record.callerName}
          </p>
          <ConfidenceBadge confidence={record.confidence} size="sm" />
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="flex items-center gap-1 text-xs" style={{ color: vaaniTheme.textMuted }}>
            <Phone size={11} />
            {record.callerNumber}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: vaaniTheme.textMuted }}>
            <Clock size={11} />
            {record.duration}
          </span>
        </div>
      </div>

      {/* Time + arrow */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-mono" style={{ color: vaaniTheme.textMuted }}>
          {record.timestamp}
        </span>
        <ChevronRight size={16} style={{ color: vaaniTheme.textMuted }} />
      </div>
    </motion.div>
  );
}
