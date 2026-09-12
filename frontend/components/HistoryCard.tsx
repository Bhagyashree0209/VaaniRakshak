import { Clock3, FileAudio, ShieldCheck, ShieldQuestion, ShieldX } from 'lucide-react';

type Prediction = 'Real' | 'Cloned';

export type Analysis = { fileName: string; prediction: Prediction; confidence: number; timestamp: string; action: 'Proceed' | 'Verify' | 'Escalate' };

export default function HistoryCard({ analysis }: { analysis: Analysis }) {
  const isReal = analysis.prediction === 'Real';
  const isHigh = analysis.action === 'Escalate';
  const Icon = isHigh ? ShieldX : isReal ? ShieldCheck : ShieldQuestion;
  const tone = isHigh ? 'text-rose-300 bg-rose-400/10' : isReal ? 'text-emerald-300 bg-emerald-400/10' : 'text-amber-200 bg-amber-300/10';
  return <article className="flex items-center gap-4 border-b border-white/[0.06] py-4 last:border-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-white/[0.05] text-slate-400"><FileAudio size={18} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-200">{analysis.fileName}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><Clock3 size={12} /> {analysis.timestamp}</p></div><div className="text-right"><div className={`mb-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}><Icon size={12} /> {analysis.prediction}</div><p className="text-xs font-medium text-slate-500">{analysis.confidence}% confidence</p></div></article>;
}
