'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { vaaniTheme, type RiskLevel, riskColor } from '@/lib/vaani-theme';

export interface FilterChip {
  label: string;
  value: string;
  level?: RiskLevel;
  count?: number;
}

export interface FilterChipsProps {
  chips: FilterChip[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
}

export function FilterChips({ chips, selected = [], onChange, className }: FilterChipsProps) {
  const [internal, setInternal] = React.useState<string[]>([]);
  const active = onChange ? selected : internal;
  const setActive = onChange ?? setInternal;

  const toggle = (value: string) => {
    if (active.includes(value)) {
      setActive(active.filter((v) => v !== value));
    } else {
      setActive([...active, value]);
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {chips.map((chip) => {
        const isSelected = active.includes(chip.value);
        const accent = chip.level ? riskColor(chip.level) : vaaniTheme.cyan;
        return (
          <motion.button
            key={chip.value}
            onClick={() => toggle(chip.value)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
            style={{
              background: isSelected ? `${accent}20` : 'rgba(6, 18, 39, 0.5)',
              border: `1px solid ${isSelected ? `${accent}60` : vaaniTheme.border}`,
              color: isSelected ? accent : vaaniTheme.textMuted,
              boxShadow: isSelected ? `0 0 10px ${accent}30` : 'none',
            }}
          >
            {chip.level && (
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: accent }}
              />
            )}
            {chip.label}
            {typeof chip.count === 'number' && (
              <span
                className="ml-0.5 px-1.5 rounded-full text-[10px] font-bold tabular-nums"
                style={{
                  background: isSelected ? `${accent}25` : 'rgba(148,163,184,0.1)',
                  color: isSelected ? accent : vaaniTheme.textMuted,
                }}
              >
                {chip.count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
