'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analyze', label: 'Analyze' },
  { href: '/live-call', label: 'Live Call' },
  { href: '/history', label: 'History' },
  { label: 'Privacy', href: '/privacy' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 glow-cyan-sm transition-all group-hover:glow-cyan">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-white">
                VaaniRakshak
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-cyan-400/70">
                Voice Clone Detection
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                    isActive
                      ? 'text-cyan-400'
                      : 'text-muted-foreground hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/analyze"
              className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
            >
              Start Detection
            </Link>
          </div>

          <button
            className="md:hidden flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/analyze"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-lg bg-cyan-500 px-4 py-2.5 text-center text-sm font-semibold text-navy-950"
            >
              Start Detection
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
