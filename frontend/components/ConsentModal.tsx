'use client';

import { useEffect, useState } from 'react';
import { FileLock2, MicOff, ShieldCheck, X } from 'lucide-react';

const CONSENT_KEY = 'vaani-rakshak-consent-v1';

export default function ConsentModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(window.localStorage.getItem(CONSENT_KEY) !== 'accepted'); }, []);
  const accept = () => { window.localStorage.setItem(CONSENT_KEY, 'accepted'); setOpen(false); };
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-5 backdrop-blur-md">
    <div className="relative w-full max-w-lg rounded-[24px] border border-cyan-300/20 bg-[#0b1629] p-7 shadow-2xl shadow-cyan-950/30 sm:p-9">
    <button onClick={accept} aria-label="Close consent notice" className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-white/10 hover:text-white"><X size={18} />
    </button>
    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-cyan-300/10 text-cyan-300">
    <ShieldCheck size={24} />
    </div>
    <p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Before you begin</p>
    <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Your voice stays yours.</h2>
    <p className="mt-3 text-sm leading-6 text-slate-400">VaaniRakshak checks voice signals for fraud without keeping a playable recording. We only use a privacy-first result to help you decide what to do next.</p>
    <div className="mt-6 space-y-3"><div className="flex gap-3 rounded-2xl bg-white/[0.04] p-3 text-xs leading-5 text-slate-300">
    <MicOff className="mt-0.5 shrink-0 text-emerald-300" size={16} /> Raw audio is not stored by default.</div>
    <div className="flex gap-3 rounded-2xl bg-white/[0.04] p-3 text-xs leading-5 text-slate-300">
    <FileLock2 className="mt-0.5 shrink-0 text-cyan-300" size={16} /> Results are retained only as long as needed for safety and review.</div>
    </div>
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
  <button
    onClick={accept}
    className="flex-1 rounded-[14px] bg-cyan-300 px-4 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
  >
    I understand and continue
  </button>

  <a
    href="/privacy"
    className="flex-1 rounded-[14px] border border-cyan-300/30 bg-transparent px-4 py-3.5 text-center text-sm font-bold text-cyan-300 transition hover:bg-cyan-300/10"
  >
    Learn More
  </a>
</div>
    <p className="mt-4 text-center text-[11px] text-slate-600">You can review these choices anytime in Privacy center.</p>
    </div>
    </div>;
}
