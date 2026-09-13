import Link from 'next/link';
import { ShieldCheck, GitBranch, ExternalLink } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analyze Audio', href: '/analyze' },
    { label: 'Live Call Mode', href: '/live-call' },
    { label: 'History', href: '/history' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Research Papers', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Data Protection', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 transition-all group-hover:glow-cyan-sm">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-white">VaaniRakshak</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-cyan-400/70">
                  Voice Clone Detection
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs italic">
              "Protecting voices from AI cloning."
            </p>

            {/* SIH badge */}
            <div className="inline-flex flex-col gap-0.5 rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-3 py-2">
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                Smart India Hackathon 2026
              </span>
              <span className="text-xs text-muted-foreground">Team Debug</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg glass border border-white/5 hover:border-cyan-500/30 transition-colors group"
                aria-label="GitHub"
              >
                <GitBranch className="h-4 w-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 rounded-lg glass border border-white/5 hover:border-cyan-500/30 px-3 py-2 transition-colors group"
                aria-label="Project Demo"
              >
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs text-muted-foreground group-hover:text-cyan-400 transition-colors">Live Demo</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-sm font-semibold text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 VaaniRakshak · Team Debug · Smart India Hackathon 2026 · All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <span className="text-white/10">|</span>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Terms of Use</Link>
            <span className="text-white/10">|</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
              <GitBranch className="h-3 w-3" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
