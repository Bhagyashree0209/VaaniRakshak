export const vaaniTheme = {
  bg: '#020B1A',
  bgSoft: '#061227',
  cyan: '#22D3EE',
  cyanGlow: 'rgba(34, 211, 238, 0.45)',
  cyanSoft: 'rgba(34, 211, 238, 0.12)',
  red: '#EF4444',
  redGlow: 'rgba(239, 68, 68, 0.45)',
  redSoft: 'rgba(239, 68, 68, 0.12)',
  green: '#22C55E',
  greenGlow: 'rgba(34, 197, 94, 0.45)',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  amber: '#F59E0B',
  amberGlow: 'rgba(245, 158, 11, 0.4)',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: 'rgba(148, 163, 184, 0.15)',
  borderCyan: 'rgba(34, 211, 238, 0.25)',
} as const;

export type RiskLevel = 'safe' | 'caution' | 'danger';

export function riskFromConfidence(confidence: number): RiskLevel {
  if (confidence >= 70) return 'danger';
  if (confidence >= 40) return 'caution';
  return 'safe';
}

export function riskColor(level: RiskLevel): string {
  switch (level) {
    case 'danger':
      return vaaniTheme.red;
    case 'caution':
      return vaaniTheme.amber;
    case 'safe':
      return vaaniTheme.green;
  }
}

export function riskGlow(level: RiskLevel): string {
  switch (level) {
    case 'danger':
      return vaaniTheme.redGlow;
    case 'caution':
      return vaaniTheme.amberGlow;
    case 'safe':
      return vaaniTheme.greenGlow;
  }
}
