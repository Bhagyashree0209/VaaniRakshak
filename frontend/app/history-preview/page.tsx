'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { vaaniTheme } from '@/lib/vaani-theme';
import { GlassCard } from '@/components/vaani/glass-card';
import { HistorySearchBar } from '@/components/vaani/history-search-bar';
import { FilterChips, type FilterChip } from '@/components/vaani/filter-chips';
import { ExportReportButton } from '@/components/vaani/export-report-button';
import { HistoryDateGroup } from '@/components/vaani/history-date-group';
import { HistoryCard, type HistoryRecord } from '@/components/vaani/history-card';
import { HistoryEmptyState } from '@/components/vaani/history-empty-state';

const sampleChips: FilterChip[] = [
  { label: 'All', value: 'all', count: 24 },
  { label: 'AI Clone', value: 'clone', level: 'danger', count: 6 },
  { label: 'Suspicious', value: 'suspicious', level: 'caution', count: 9 },
  { label: 'Authentic', value: 'authentic', level: 'safe', count: 9 },
];

const todayRecords: HistoryRecord[] = [
  { id: '1', callerName: 'Rajesh Kumar', callerNumber: '+91 98765 43210', confidence: 87, duration: '3:24', timestamp: '14:32' },
  { id: '2', callerName: 'Priya Sharma', callerNumber: '+91 90000 12345', confidence: 23, duration: '1:08', timestamp: '11:15' },
  { id: '3', callerName: 'Unknown', callerNumber: '+91 70000 99999', confidence: 54, duration: '0:42', timestamp: '09:48' },
];

const yesterdayRecords: HistoryRecord[] = [
  { id: '4', callerName: 'State Bank', callerNumber: '+91 80 1234 5678', confidence: 91, duration: '5:12', timestamp: '18:30' },
  { id: '5', callerName: 'Mom', callerNumber: '+91 98200 11111', confidence: 8, duration: '12:45', timestamp: '20:15' },
];

export default function HistoryPreview() {
  const [showEmpty, setShowEmpty] = React.useState(false);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: vaaniTheme.bg, color: vaaniTheme.text }}
    >
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/feature-preview"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-80"
          style={{ color: vaaniTheme.textMuted }}
        >
          <ArrowLeft size={16} />
          Back to Feature Preview
        </Link>

        <h1 className="text-2xl font-bold mb-2" style={{ color: vaaniTheme.text }}>
          History Components
        </h1>
        <p className="text-sm mb-8" style={{ color: vaaniTheme.textMuted }}>
          Search bar, filter chips, export button, date grouping, record cards, and empty state.
        </p>

        <div className="flex items-center justify-end gap-3 mb-4">
          <button
            onClick={() => setShowEmpty(false)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{
              background: showEmpty ? 'rgba(148,163,184,0.08)' : `${vaaniTheme.cyan}15`,
              border: `1px solid ${showEmpty ? vaaniTheme.border : `${vaaniTheme.cyan}40`}`,
              color: showEmpty ? vaaniTheme.textMuted : vaaniTheme.cyan,
            }}
          >
            With Data
          </button>
          <button
            onClick={() => setShowEmpty(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{
              background: !showEmpty ? 'rgba(148,163,184,0.08)' : `${vaaniTheme.cyan}15`,
              border: `1px solid ${!showEmpty ? vaaniTheme.border : `${vaaniTheme.cyan}40`}`,
              color: !showEmpty ? vaaniTheme.textMuted : vaaniTheme.cyan,
            }}
          >
            Empty State
          </button>
        </div>

        <GlassCard className="p-6">
          {showEmpty ? (
            <HistoryEmptyState />
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <HistorySearchBar className="flex-1" />
                <ExportReportButton />
              </div>

              <FilterChips chips={sampleChips} className="mb-6" />

              <div className="space-y-6">
                <HistoryDateGroup label="Today" count={todayRecords.length}>
                  {todayRecords.map((r) => (
                    <HistoryCard key={r.id} record={r} />
                  ))}
                </HistoryDateGroup>
                <HistoryDateGroup label="Yesterday" count={yesterdayRecords.length}>
                  {yesterdayRecords.map((r) => (
                    <HistoryCard key={r.id} record={r} />
                  ))}
                </HistoryDateGroup>
              </div>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
