'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { vaaniTheme } from '@/lib/vaani-theme';

export interface HistorySearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function HistorySearchBar({
  value: controlledValue,
  onChange,
  placeholder = 'Search by caller name or number…',
  className,
}: HistorySearchBarProps) {
  const [internal, setInternal] = React.useState('');
  const value = controlledValue ?? internal;
  const setValue = onChange ?? setInternal;

  return (
    <div
      className={cn('relative flex items-center rounded-xl transition-all duration-200', className)}
      style={{
        background: 'rgba(6, 18, 39, 0.6)',
        border: `1px solid ${vaaniTheme.borderCyan}`,
        boxShadow: `0 0 12px ${vaaniTheme.cyanGlow.replace('0.45', '0.1')}`,
      }}
    >
      <Search
        size={18}
        className="ml-3.5 shrink-0"
        style={{ color: vaaniTheme.cyan }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent py-2.5 px-3 text-sm outline-none placeholder:text-slate-500"
        style={{ color: vaaniTheme.text }}
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="mr-3 p-0.5 rounded-md transition-colors hover:bg-white/10"
          style={{ color: vaaniTheme.textMuted }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
