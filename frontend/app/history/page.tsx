'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  FileAudio,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  Download,
  ChevronLeft,
  ChevronRight,
  Upload,
} from 'lucide-react';
import { GlassCard } from '@/components/site/glass-card';
import { cn } from '@/lib/utils';

type Verdict = 'clone' | 'authentic' | 'all';

interface AnalysisRecord {
  id: string;
  filename: string;
  duration: string;
  verdict: 'clone' | 'authentic';
  confidence: number;
  timestamp: string;
  date: string;
}

const allRecords: AnalysisRecord[] = [
  { id: 'VR-2026-001284', filename: 'voicemail_suspicious.wav', duration: '0:34', verdict: 'clone', confidence: 96.4, timestamp: '2 min ago', date: '2026-09-11' },
  { id: 'VR-2026-001283', filename: 'interview_authentic.mp3', duration: '12:45', verdict: 'authentic', confidence: 98.1, timestamp: '18 min ago', date: '2026-09-11' },
  { id: 'VR-2026-001282', filename: 'call_recording_03.wav', duration: '3:21', verdict: 'clone', confidence: 89.2, timestamp: '1 hour ago', date: '2026-09-11' },
  { id: 'VR-2026-001281', filename: 'podcast_clip.flac', duration: '5:10', verdict: 'authentic', confidence: 95.7, timestamp: '2 hours ago', date: '2026-09-11' },
  { id: 'VR-2026-001280', filename: 'voice_memo_unknown.ogg', duration: '0:52', verdict: 'clone', confidence: 92.8, timestamp: '3 hours ago', date: '2026-09-11' },
  { id: 'VR-2026-001279', filename: 'broadcast_segment.wav', duration: '8:33', verdict: 'authentic', confidence: 97.3, timestamp: '5 hours ago', date: '2026-09-10' },
  { id: 'VR-2026-001278', filename: 'deepfake_suspect.mp3', duration: '1:15', verdict: 'clone', confidence: 99.1, timestamp: '6 hours ago', date: '2026-09-10' },
  { id: 'VR-2026-001277', filename: 'conference_call.wav', duration: '22:08', verdict: 'authentic', confidence: 93.4, timestamp: '8 hours ago', date: '2026-09-10' },
  { id: 'VR-2026-001276', filename: 'anonymous_tip.ogg', duration: '0:47', verdict: 'clone', confidence: 88.5, timestamp: '12 hours ago', date: '2026-09-10' },
  { id: 'VR-2026-001275', filename: 'radio_broadcast.flac', duration: '15:30', verdict: 'authentic', confidence: 96.8, timestamp: '1 day ago', date: '2026-09-09' },
  { id: 'VR-2026-001274', filename: 'synth_voice_test.wav', duration: '0:22', verdict: 'clone', confidence: 99.7, timestamp: '1 day ago', date: '2026-09-09' },
  { id: 'VR-2026-001273', filename: 'interview_raw.mp3', duration: '31:02', verdict: 'authentic', confidence: 94.2, timestamp: '2 days ago', date: '2026-09-08' },
];

const verdictConfig = {
  clone: {
    label: 'AI Clone',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: XCircle,
    bar: 'bg-red-400',
  },
  authentic: {
    label: 'Authentic',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: CheckCircle2,
    bar: 'bg-green-400',
  },
};

const getDecision = (verdict: 'clone' | 'authentic', confidence: number) => {
  if (verdict === 'authentic') {
    return {
      label: 'Proceed',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
    };
  }

  if (confidence >= 95) {
    return {
      label: 'Escalate',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    };
  }

  return {
    label: 'Call Back',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  };
};

const filterTabs: { value: Verdict; label: string; count: number }[] = [
  { value: 'all', label: 'All', count: allRecords.length },
  { value: 'clone', label: 'Clones Detected', count: allRecords.filter((r) => r.verdict === 'clone').length },
  { value: 'authentic', label: 'Authentic', count: allRecords.filter((r) => r.verdict === 'authentic').length },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<Verdict>('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const filtered = allRecords.filter((r) => {
    const matchesFilter = filter === 'all' || r.verdict === filter;
    const matchesSearch = r.filename.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / recordsPerPage);
  const paginated = filtered.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Analysis History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse and filter all past voice clone detection analyses
          </p>
        </div>
        <Link
          href="/analyze"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
        >
          <Upload className="h-4 w-4" />
          New Analysis
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <GlassCard className="p-5" hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <FileAudio className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{allRecords.length}</div>
              <div className="text-xs text-muted-foreground">Total Analyses</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5" hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {allRecords.filter((r) => r.verdict === 'clone').length}
              </div>
              <div className="text-xs text-muted-foreground">Clones Detected</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5" hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20">
              <ShieldCheck className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {allRecords.filter((r) => r.verdict === 'authentic').length}
              </div>
              <div className="text-xs text-muted-foreground">Authentic Audio</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filter + Search */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setFilter(tab.value);
                setCurrentPage(1);
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all',
                filter === tab.value
                  ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                  : 'glass border border-transparent text-muted-foreground hover:text-white'
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-xs',
                  filter === tab.value ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-muted-foreground'
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search filename or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 rounded-lg glass border border-white/5 px-9 py-2 text-sm text-white placeholder:text-muted-foreground focus:border-cyan-500/30 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  File
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Analysis ID
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Verdict
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginated.map((record) => {
                const config = verdictConfig[record.verdict];
                const decision = getDecision(record.verdict, record.confidence);
                return (
                  <tr
                    key={record.id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-lg border',
                            config.bg,
                            config.border
                          )}
                        >
                          <config.icon className={cn('h-4 w-4', config.color)} />
                        </div>
                        <span className="text-sm font-medium text-white truncate max-w-[180px]">
                          {record.filename}
                        </span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className="font-mono text-xs text-muted-foreground">{record.id}</span>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {record.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-white/5">
                          <div
                            className={cn('h-1.5 rounded-full', config.bar)}
                            style={{ width: `${record.confidence}%` }}
                          />
                        </div>
                        <span className={cn('text-xs font-medium', config.color)}>
                          {record.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
  <div className="flex flex-col gap-1">
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.bg,
        config.border,
        config.color
      )}
    >
      {config.label}
    </span>

    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold',
        decision.bg,
        decision.border,
        decision.color
      )}
    >
      {decision.label}
    </span>
  </div>
</td>
                    <td className="hidden lg:table-cell px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                        <span className="text-xs text-muted-foreground/70">{record.timestamp}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {paginated.length === 0 && (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10">
      <FileAudio className="h-8 w-8 text-cyan-400" />
    </div>

    <h3 className="mt-5 text-xl font-semibold text-white">
      No analyses yet
    </h3>

    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
      Upload your first audio sample to start detecting AI-generated voice clones.
    </p>

    <Link
      href="/analyze"
      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-cyan-400 glow-cyan-sm hover:glow-cyan"
    >
      <Upload className="h-4 w-4" />
      Start First Analysis
    </Link>
  </div>
)}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
            <span className="text-xs text-muted-foreground">
              Showing {(currentPage - 1) * recordsPerPage + 1}–
              {Math.min(currentPage * recordsPerPage, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg glass border border-white/5 text-muted-foreground transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all',
                    currentPage === i + 1
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                      : 'glass border border-transparent text-muted-foreground hover:text-white'
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg glass border border-white/5 text-muted-foreground transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
