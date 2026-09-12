'use client';

import { ShieldCheck, Mic } from 'lucide-react';

export function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Animated background glow blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl animate-bg-glow-shift" />
        <div className="absolute left-1/3 top-1/3 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl animate-bg-glow-shift" style={{ animationDelay: '2s' }} />
        <div className="absolute right-1/4 bottom-1/4 h-56 w-56 rounded-full bg-cyan-600/10 blur-3xl animate-bg-glow-shift" style={{ animationDelay: '4s' }} />
      </div>

      {/* Orbiting rings */}
      <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/10" />
        <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-spin-slow" style={{ borderTopColor: 'rgba(34, 211, 238, 0.4)' }} />

        {/* Middle ring */}
        <div className="absolute inset-8 rounded-full border border-cyan-500/15" />
        <div className="absolute inset-8 rounded-full border border-cyan-500/15 animate-spin-slow" style={{ animationDuration: '6s', borderBottomColor: 'rgba(34, 211, 238, 0.3)' }} />

        {/* Inner ring */}
        <div className="absolute inset-16 rounded-full border border-cyan-500/20" />

        {/* Pulsing rings emanating from center */}
        <div className="absolute inset-16 rounded-full border-2 border-cyan-400/30 animate-pulse-ring" />
        <div className="absolute inset-16 rounded-full border-2 border-cyan-400/20 animate-pulse-ring" style={{ animationDelay: '0.7s' }} />
        <div className="absolute inset-16 rounded-full border-2 border-cyan-400/10 animate-pulse-ring" style={{ animationDelay: '1.4s' }} />

        {/* Center: Shield with Mic */}
        <div className="relative z-10 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-cyan-500/30 bg-navy-900/80 backdrop-blur-xl glow-cyan animate-glow-pulse sm:h-28 sm:w-28">
            {/* Shield */}
            <ShieldCheck className="absolute h-14 w-14 text-cyan-400 sm:h-16 sm:w-16" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }} />
            {/* Mic overlay */}
            <Mic className="absolute bottom-3 h-6 w-6 text-cyan-300/80 sm:bottom-4 sm:h-7 sm:w-7" style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.5))' }} />
          </div>
        </div>

        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '12s' }}>
          <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400 glow-cyan-sm" />
        </div>
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
          <div className="absolute left-1/2 bottom-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300/60" />
        </div>
        <div className="absolute inset-4 animate-spin-slow" style={{ animationDuration: '9s' }}>
          <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-400/70" />
        </div>
      </div>
    </div>
  );
}
