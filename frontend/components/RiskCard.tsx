import { ArrowRight, CircleCheck, ShieldAlert, TriangleAlert } from 'lucide-react';

type RiskTone = 'green' | 'yellow' | 'red';

const riskStyles: Record<RiskTone, { icon: typeof CircleCheck; label: string; description: string; className: string; iconClass: string }> = {
  green: { icon: CircleCheck, label: 'Proceed', description: 'Voice appears consistent with a real caller.', className: 'border-emerald-400/20 bg-emerald-400/[0.07] hover:border-emerald-400/40', iconClass: 'bg-emerald-400/15 text-emerald-300' },
  yellow: { icon: TriangleAlert, label: 'Verify', description: 'Pause and call back through a trusted number.', className: 'border-amber-300/20 bg-amber-300/[0.07] hover:border-amber-300/40', iconClass: 'bg-amber-300/15 text-amber-200' },
  red: { icon: ShieldAlert, label: 'Escalate', description: 'Treat this call as high risk and involve a human.', className: 'border-rose-400/20 bg-rose-400/[0.07] hover:border-rose-400/40', iconClass: 'bg-rose-400/15 text-rose-300' },
};

export default function RiskCard({ tone, stat, detail }: { tone: RiskTone; stat?: string; detail?: string }) {
  const style = riskStyles[tone];
  const Icon = style.icon;
  return <div className={`group rounded-[20px] border p-5 transition duration-300 hover:-translate-y-0.5 ${style.className}`}>
    <div className="flex items-start justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-[14px] ${style.iconClass}`}><Icon size={20} /></span>{stat && <span className="text-2xl font-bold tracking-tight text-white">{stat}</span>}</div>
    <div className="mt-7 flex items-end justify-between gap-3"><div><h3 className="text-base font-bold text-white">{style.label}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{detail ?? style.description}</p></div><ArrowRight className="mb-1 text-slate-600 transition group-hover:translate-x-1 group-hover:text-white" size={17} /></div>
  </div>;
}
