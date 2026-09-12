'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { vaaniTheme } from '@/lib/vaani-theme';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  borderColor?: string;
  interactive?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      children,
      glowColor = vaaniTheme.cyanGlow,
      borderColor = vaaniTheme.borderCyan,
      interactive = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl border backdrop-blur-xl',
        interactive && 'transition-transform duration-300 hover:scale-[1.02]',
        className
      )}
      style={{
        background: `linear-gradient(135deg, rgba(6, 18, 39, 0.7) 0%, rgba(2, 11, 26, 0.85) 100%)`,
        borderColor,
        boxShadow: `0 0 24px ${glowColor.replace('0.45', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
      {...props}
    >
      {children}
    </div>
  )
);
GlassCard.displayName = 'GlassCard';
