'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { vaaniTheme } from '@/lib/vaani-theme';

export interface HistoryDateGroupProps {
  label: string;
  count?: number;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
}

export function HistoryDateGroup({
  label,
  count,
  children,
  className,
  defaultExpanded = true,
}: HistoryDateGroupProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div className={cn('', className)}>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-2 w-full mb-3 group"
      >
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to right, ${vaaniTheme.borderCyan}, transparent)` }}
        />
        <span
          className="text-xs font-bold uppercase tracking-wider transition-colors group-hover:opacity-80"
          style={{ color: vaaniTheme.cyan }}
        >
          {label}
          {typeof count === 'number' && (
            <span
              className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums"
              style={{ background: `${vaaniTheme.cyan}15`, color: vaaniTheme.textMuted }}
            >
              {count}
            </span>
          )}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to left, ${vaaniTheme.borderCyan}, transparent)` }}
        />
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          className="text-xs"
          style={{ color: vaaniTheme.textMuted }}
        >
          ▸
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="space-y-2.5">{children}</div>
      </motion.div>
    </div>
  );
}
