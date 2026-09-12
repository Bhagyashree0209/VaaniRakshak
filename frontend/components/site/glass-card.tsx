import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({ children, className, glow = false, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-xl transition-all duration-300',
        hover && 'hover:border-cyan-500/30 hover:bg-white/5',
        glow && 'glow-cyan-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
