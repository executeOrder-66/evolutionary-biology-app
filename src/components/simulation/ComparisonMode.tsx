import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { GenerationSnapshot } from '../../types';

interface ComparisonModeProps {
  currentHistory: GenerationSnapshot[];
  scenarioName: string;
  traitName: string;
  traitDisplayName: string;
  onClose: () => void;
}

/**
 * Side-by-side comparison of current run vs a saved snapshot.
 * Users can save the current run, then run a new simulation and compare.
 */
export default function ComparisonMode({
  currentHistory,
  scenarioName,
  traitName,
  traitDisplayName,
  onClose,
}: ComparisonModeProps) {
  const [savedRun, setSavedRun] = useState<GenerationSnapshot[] | null>(() => {
    const stored = localStorage.getItem(`evosim-compare-${scenarioName}`);
    return stored ? JSON.parse(stored) : null;
  });

  const saveCurrentRun = useCallback(() => {
    localStorage.setItem(`evosim-compare-${scenarioName}`, JSON.stringify(currentHistory));
    setSavedRun(currentHistory);
  }, [currentHistory, scenarioName]);

  const clearSaved = useCallback(() => {
    localStorage.removeItem(`evosim-compare-${scenarioName}`);
    setSavedRun(null);
  }, [scenarioName]);

  if (!savedRun) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Compare Runs</h3>
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600">Close</button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Save the current simulation run, then run a new one with different settings to compare side-by-side.
        </p>
        <button
          onClick={saveCurrentRun}
          disabled={currentHistory.length < 2}
          className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-40"
        >
          Save Current Run as Baseline
        </button>
      </motion.div>
    );
  }

  // Compare saved vs current
  const maxGen = Math.max(
    savedRun[savedRun.length - 1]?.generation ?? 0,
    currentHistory[currentHistory.length - 1]?.generation ?? 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Run Comparison</h3>
        <div className="flex gap-2">
          <button onClick={clearSaved} className="text-xs text-red-400 hover:text-red-600">Clear Baseline</button>
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600">Close</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Baseline</p>
          <p className="text-lg font-extrabold text-blue-600">
            {((savedRun[savedRun.length - 1]?.traitMeans[traitName] ?? 0) * 100).toFixed(0)}%
          </p>
          <p className="text-[11px] text-blue-400">avg {traitDisplayName}</p>
          <p className="text-[11px] text-blue-400">Pop: {savedRun[savedRun.length - 1]?.populationSize ?? 0}</p>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Current</p>
          <p className="text-lg font-extrabold text-emerald-600">
            {currentHistory.length > 0
              ? ((currentHistory[currentHistory.length - 1].traitMeans[traitName] ?? 0) * 100).toFixed(0)
              : '—'}%
          </p>
          <p className="text-[11px] text-emerald-400">avg {traitDisplayName}</p>
          <p className="text-[11px] text-emerald-400">
            Pop: {currentHistory.length > 0 ? currentHistory[currentHistory.length - 1].populationSize : '—'}
          </p>
        </div>
      </div>

      {/* Mini comparison chart */}
      <ComparisonChart
        saved={savedRun}
        current={currentHistory}
        traitName={traitName}
        maxGen={maxGen}
      />
    </motion.div>
  );
}

function ComparisonChart({
  saved,
  current,
  traitName,
  maxGen,
}: {
  saved: GenerationSnapshot[];
  current: GenerationSnapshot[];
  traitName: string;
  maxGen: number;
}) {
  const w = 200;
  const h = 50;

  function toPath(data: GenerationSnapshot[], color: string) {
    if (data.length < 2) return null;
    const points = data.map((d) => {
      const x = (d.generation / Math.max(maxGen, 1)) * w;
      const val = d.traitMeans[traitName] ?? 0;
      const y = h - val * h;
      return `${x},${y}`;
    });
    return (
      <path
        d={'M ' + points.join(' L ')}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    );
  }

  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-2">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 50 }}>
        {toPath(saved, '#3b82f6')}
        {toPath(current, '#10b981')}
      </svg>
      <div className="flex justify-center gap-4 mt-1 text-[10px]">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-3 rounded bg-blue-500" /> Baseline
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-3 rounded bg-emerald-500" /> Current
        </span>
      </div>
    </div>
  );
}
