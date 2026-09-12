'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Download, FileDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme } from '@/lib/vaani-theme';

export interface ExportReportButtonProps {
  onClick?: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
}

export function ExportReportButton({
  onClick,
  loading = false,
  label = 'Export Report',
  className,
}: ExportReportButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.04 }}
      whileTap={{ scale: loading ? 1 : 0.96 }}
      className={cn(
        'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${vaaniTheme.cyan}20, ${vaaniTheme.cyan}08)`,
        border: `1px solid ${vaaniTheme.cyan}40`,
        color: vaaniTheme.cyan,
        boxShadow: `0 0 12px ${vaaniTheme.cyanGlow.replace('0.45', '0.15')}`,
      }}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <FileDown size={16} />
      )}
      {loading ? 'Generating…' : label}
    </motion.button>
  );
}
