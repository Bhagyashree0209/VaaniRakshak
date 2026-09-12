import { Brain, PhoneCall, Lock } from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';

const features = [
  {
    icon: Brain,
    title: 'AI Voice Detection',
    description: 'Deep learning models trained on millions of samples detect synthetic voice clones with 99.2% accuracy in real time.',
  },
  {
    icon: PhoneCall,
    title: 'Live Call Monitoring',
    description: 'Analyze live phone calls in real time with sub-second inference, protecting against voice fraud as it happens.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'All audio is processed with end-to-end encryption. Your data never leaves your browser and is never stored.',
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {features.map((feature) => (
        <GlassCard key={feature.title} className="group p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/5 hover:-translate-y-1" hover>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 transition-all group-hover:glow-cyan-sm group-hover:border-cyan-500/40">
            <feature.icon className="h-6 w-6 text-cyan-400" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}
