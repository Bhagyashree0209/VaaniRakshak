'use client';

import { useEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';

interface DemoPickerProps {
  onSelect: (file: File) => void;
}

interface DemoSample {
  id: string;
  language: string;
  type: 'real' | 'cloned';
}

export default function DemoPicker({ onSelect }: DemoPickerProps) {
  const [samples, setSamples] = useState<DemoSample[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    async function loadSamples() {
      try {
        const res = await fetch('/demo_dataset/demo_samples.json');
        const data = await res.json();

        // Convert object -> array
        const sampleArray: DemoSample[] = Object.entries(data).map(
          ([filename, info]: any) => ({
            id: filename,
            language: info.language,
            type: info.label,
          })
        );

        setSamples(sampleArray);
      } catch (err) {
        console.error('Failed to load demo samples', err);
      }
    }

    loadSamples();
  }, []);

  const handleLoad = async () => {
    if (!selected) return;

    const sample = samples.find((s) => s.id === selected);
    if (!sample) return;

    const folder = sample.type === 'real' ? 'real' : 'cloned';

    const response = await fetch(`/demo_dataset/${folder}/${sample.id}`);
    const blob = await response.blob();

    const file = new File([blob], sample.id, {
      type: blob.type || 'audio/wav',
    });

    onSelect(file);
  };

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white">
          Verified Demo Dataset
        </h3>
        <p className="text-xs text-slate-400">
          18 verified samples (9 Real • 9 Cloned)
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-cyan-500"
        >
          <option value="">Choose a verified demo sample</option>

          {samples.map((sample) => (
            <option key={sample.id} value={sample.id}>
              {sample.language} • {sample.type.toUpperCase()} • {sample.id}
            </option>
          ))}
        </select>

        <button
          onClick={handleLoad}
          disabled={!selected}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PlayCircle className="h-4 w-4" />
          Load Demo
        </button>
      </div>
    </div>
  );
}