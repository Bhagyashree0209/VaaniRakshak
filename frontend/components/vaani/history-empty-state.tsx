'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { AudioLines, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme } from '@/lib/vaani-theme';

export interface HistoryEmptyStateProps {
  title?: string;
  message?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function HistoryEmptyState({
  title = 'No detection records yet',
  message = 'When VaaniRakshak analyses a call, it will appear here with a full risk report.',
  icon: Icon = AudioLines,
  action,
  className,
}: HistoryEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full mb-5"
        style={{
          width: 72,
          height: 72,
          background: `radial-gradient(circle, ${vaaniTheme.cyan}15 0%, transparent 70%)`,
          border: `1px solid ${vaaniTheme.borderCyan}`,
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={28} style={{ color: vaaniTheme.cyan }} />
      </motion.div>
      <h3 className="text-base font-bold mb-1.5" style={{ color: vaaniTheme.text }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs leading-relaxed" style={{ color: vaaniTheme.textMuted }}>
        {message}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
