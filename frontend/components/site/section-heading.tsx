import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(center && 'text-center', 'space-y-3', className)}>
      {eyebrow && (
        <div className={cn(center && 'flex justify-center')}>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-400">
            <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn('text-base text-muted-foreground leading-relaxed', center && 'mx-auto max-w-2xl')}>
          {description}
        </p>
      )}
    </div>
  );
}
