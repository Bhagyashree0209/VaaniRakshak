'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, FileLock2, LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/privacy', label: 'Privacy center', icon: FileLock2 },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/dashboard" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition group-hover:bg-cyan-300/20"><ShieldCheck size={21} /></span>
          <span><span className="block text-[15px] font-bold tracking-tight text-white">VaaniRakshak</span><span className="block text-[10px] font-medium uppercase tracking-[.2em] text-slate-500">Voice safety network</span></span>
        </Link>
        <nav className="flex items-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return <Link key={href} href={href} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition sm:px-4 ${active ? 'bg-cyan-300 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,.15)]' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'}`}><Icon size={15} /> <span className="hidden sm:inline">{label}</span></Link>;
          })}
        </nav>
        <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> System protected</div>
        <Activity className="text-slate-600 sm:hidden" size={18} />
      </div>
    </header>
  );
}
