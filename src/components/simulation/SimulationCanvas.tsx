import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';
import LineageTreeView from './LineageTreeView';
import SurvivalRace from './SurvivalRace';
import DataTableView from './DataTableView';

type ViewMode = 'lineage' | 'histogram' | 'individuals' | 'table';

export default function SimulationCanvas() {
  const population = useSimulationStore((s) => s.population);
  const scenario = useSimulationStore((s) => s.scenario);
  const environment = useSimulationStore((s) => s.environment);
  const generation = useSimulationStore((s) => s.generation);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const stored = localStorage.getItem(`evosim-view-${scenario?.id}`);
    return (stored as ViewMode) || 'lineage';
  });

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (scenario) localStorage.setItem(`evosim-view-${scenario.id}`, mode);
  };

  const traitName = scenario?.traits[0]?.name ?? '';
  const traitDisplayName = scenario?.traits[0]?.displayName ?? 'Trait';

  const histogram = useMemo(() => {
    if (!population || population.individuals.length === 0) return [];
    const bins = 24;
    const counts = new Array(bins).fill(0) as number[];
    for (const ind of population.individuals) {
      const val = ind.traits[traitName] ?? 0;
      const bin = Math.min(Math.floor(val * bins), bins - 1);
      counts[bin]++;
    }
    const max = Math.max(...counts, 1);
    return counts.map((count, i) => ({
      range: `${(i / bins).toFixed(2)} – ${((i + 1) / bins).toFixed(2)}`,
      count,
      height: (count / max) * 100,
      value: (i + 0.5) / bins,
    }));
  }, [population, traitName]);

  const antibioticActive =
    environment && environment.factors.antibioticPresent > 0;
  const antibioticStrength = environment?.factors.antibioticStrength ?? 0;

  // Detect the moment antibiotics are first introduced
  const justIntroduced = generation === 10 && antibioticActive;

  if (!population) {
    return (
      <div className="card overflow-hidden">
        {/* Skeleton loading (#24) */}
        <div className="border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-5 py-2.5">
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="ml-auto h-6 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>
        <div className="flex h-64 flex-col items-center justify-center gap-3 p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800">
            <svg className="h-8 w-8 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Select a scenario to begin exploring
          </p>
        </div>
      </div>
    );
  }

  const meanTrait = population.statistics.traitMeans[traitName] ?? 0;

  return (
    <div className="card overflow-hidden">
      {/* Antibiotic introduction drama overlay */}
      <AnimatePresence>
        {justIntroduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-red-900/20 backdrop-blur-sm rounded-2xl pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="rounded-2xl bg-red-50 border-2 border-red-200 px-8 py-5 shadow-2xl text-center"
            >
              <p className="text-2xl mb-1">💊</p>
              <p className="text-lg font-bold text-red-700">Antibiotics Introduced!</p>
              <p className="text-sm text-red-500 mt-1">Watch which families survive...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact status bar */}
      <div className="border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-5 py-2.5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <StatPill label="Generation" value={generation} />
          <StatPill label="Population" value={population.size} />
          <StatPill
            label={`Avg Resistance`}
            value={resistanceLabel(meanTrait)}
            accent
          />
          <StatPill
            label="Survival Chance"
            value={`${Math.round(population.statistics.meanFitness * 100)}%`}
            tooltip="Average chance each bacterium has of surviving to reproduce. Higher = population is better adapted to its environment."
          />

          <div className="ml-auto flex items-center gap-1">
            {/* Environment status */}
            <AnimatePresence>
              {antibioticActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative mr-2 flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  Antibiotics {Math.round(antibioticStrength * 100)}%
                  <div className="chart-tooltip absolute top-full left-1/2 mt-2 hidden -translate-x-1/2 whitespace-normal max-w-[220px] group-hover:block">
                    Antibiotic strength increases gradually, simulating how drug concentration builds up in the body. Max strength: 55%.
                  </div>
                </motion.span>
              )}
            </AnimatePresence>

            {/* View toggle */}
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
              {(['lineage', 'histogram', 'individuals', 'table'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleSetViewMode(mode)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-all ${
                    viewMode === mode
                      ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {mode === 'lineage' ? 'families' : mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visualization area */}
      <div className="relative p-5">
        <AnimatePresence mode="wait">
          {viewMode === 'lineage' ? (
            <motion.div
              key="lineage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SurvivalRace />
              <div className="mt-4">
                <LineageTreeView />
              </div>
            </motion.div>
          ) : viewMode === 'histogram' ? (
            <motion.div
              key="histogram"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {traitDisplayName} Distribution
              </h3>
              <div className="flex h-48 items-end gap-[2px]">
                {histogram.map((bin, i) => (
                  <div key={i} className="group relative flex-1">
                    <motion.div
                      layout
                      className="w-full rounded-t-sm"
                      style={{
                        backgroundColor: traitColor(
                          bin.value,
                          scenario?.id
                        ),
                        minHeight: bin.count > 0 ? 3 : 0,
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${bin.height}%` }}
                      transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 200,
                        delay: i * 0.01,
                      }}
                    />
                    {/* Tooltip */}
                    <div className="chart-tooltip absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 group-hover:block">
                      {bin.count} bacteria
                      <br />
                      Resistance: {bin.range}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                  Low resistance
                </span>
                <div
                  className="mx-4 h-1.5 flex-1 rounded-full"
                  style={{
                    background: traitGradient(scenario?.id),
                  }}
                />
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                  High resistance
                </span>
              </div>
            </motion.div>
          ) : viewMode === 'table' ? (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DataTableView />
            </motion.div>
          ) : (
            <motion.div
              key="individuals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Individual Bacteria ({population.size})
              </h3>
              <div className="flex flex-wrap gap-[3px]">
                {population.individuals.slice(0, 300).map((ind) => (
                  <motion.div
                    key={ind.id}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="group relative h-3 w-3 cursor-default rounded-full transition-transform hover:scale-[2] hover:z-10"
                    style={{
                      backgroundColor: traitColor(
                        ind.traits[traitName] ?? 0,
                        scenario?.id
                      ),
                      opacity: 0.4 + ind.fitness * 0.6,
                    }}
                  >
                    <div className="chart-tooltip absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 group-hover:block">
                      Resistance: {resistanceLabel(ind.traits[traitName] ?? 0)}
                      <br />
                      Survival chance: {Math.round(ind.fitness * 100)}%
                    </div>
                  </motion.div>
                ))}
                {population.size > 300 && (
                  <span className="self-center pl-2 text-xs text-gray-500 dark:text-gray-400">
                    +{population.size - 300} more
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  accent = false,
  tooltip,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
  tooltip?: string;
}) {
  return (
    <div className="group relative flex items-baseline gap-1.5">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span
        className={`text-sm font-bold tabular-nums ${
          accent ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'
        }`}
      >
        {value}
      </span>
      {tooltip && (
        <div className="chart-tooltip absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-normal max-w-[240px] group-hover:block">
          {tooltip}
        </div>
      )}
    </div>
  );
}

/** Human-readable resistance label */
function resistanceLabel(value: number): string {
  if (value < 0.2) return 'Very low';
  if (value < 0.4) return 'Low';
  if (value < 0.6) return 'Medium';
  if (value < 0.8) return 'High';
  return 'Very high';
}

function traitColor(value: number, scenarioId?: string): string {
  switch (scenarioId) {
    case 'antibiotic-resistance':
      return `hsl(${130 - value * 130}, ${60 + value * 20}%, ${55 - value * 15}%)`;
    case 'peppered-moths': {
      const l = 90 - value * 75;
      return `hsl(200, 5%, ${l}%)`;
    }
    case 'peacock-tails':
      return `hsl(${260 + value * 40}, ${50 + value * 30}%, ${55 - value * 10}%)`;
    case 'dog-domestication':
      return `hsl(${25 + value * 10}, ${40 + value * 20}%, ${45 + value * 10}%)`;
    default:
      return `hsl(${155 - value * 40}, 60%, ${50 - value * 10}%)`;
  }
}

function traitGradient(scenarioId?: string): string {
  switch (scenarioId) {
    case 'antibiotic-resistance':
      return 'linear-gradient(90deg, hsl(130,60%,55%), hsl(0,80%,40%))';
    case 'peppered-moths':
      return 'linear-gradient(90deg, hsl(200,5%,90%), hsl(200,5%,15%))';
    case 'peacock-tails':
      return 'linear-gradient(90deg, hsl(260,50%,55%), hsl(300,80%,45%))';
    case 'dog-domestication':
      return 'linear-gradient(90deg, hsl(25,40%,45%), hsl(35,60%,55%))';
    default:
      return 'linear-gradient(90deg, hsl(155,60%,50%), hsl(115,60%,40%))';
  }
}
