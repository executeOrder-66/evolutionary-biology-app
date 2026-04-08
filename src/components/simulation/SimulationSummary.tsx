import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';

export default function SimulationSummary() {
  const status = useSimulationStore((s) => s.status);
  const lineageData = useSimulationStore((s) => s.lineageData);
  const population = useSimulationStore((s) => s.population);
  const scenario = useSimulationStore((s) => s.scenario);
  const reset = useSimulationStore((s) => s.reset);

  const history = useSimulationStore((s) => s.history);
  const traitName = scenario?.traits[0]?.name ?? '';

  // Export CSV (#27)
  const exportCSV = useCallback(() => {
    if (!history.length || !scenario) return;
    const headers = ['Generation', 'Population', `Avg ${scenario.traits[0]?.displayName ?? 'Trait'}`, 'Avg Fitness'];
    const rows = history.map((h) => [
      h.generation,
      h.populationSize,
      (h.traitMeans[traitName] ?? 0).toFixed(4),
      h.meanFitness.toFixed(4),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scenario.id}-simulation-data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [history, scenario, traitName]);

  if (status !== 'completed' || !lineageData || !population) return null;

  // Gather family outcomes
  const families = lineageData.trees.map((tree) => {
    const bucket = tree.generationBuckets.get(lineageData.maxGeneration);
    const count = bucket?.length ?? 0;
    return {
      label: tree.label,
      color: tree.color,
      description: tree.description,
      initialTrait: tree.initialTrait,
      descendants: count,
      extinct: tree.extinctAtGeneration !== null,
      extinctGen: tree.extinctAtGeneration,
    };
  });

  const survivors = families.filter((f) => !f.extinct);
  const extinct = families.filter((f) => f.extinct);
  const avgResistance = population.statistics.traitMeans[traitName] ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-5 text-white">
        <h3 className="text-lg font-bold">Simulation Complete</h3>
        <p className="mt-1 text-sm text-emerald-100">
          Here&apos;s what happened over {lineageData.maxGeneration} generations
        </p>
      </div>

      <div className="space-y-5 px-6 py-5">
        {/* What happened */}
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            What Happened
          </h4>
          <p className="text-[14px] leading-relaxed text-gray-600">
            {extinct.length === families.length ? (
              'All tracked families went extinct, but the population survived — it\'s now dominated by highly resistant bacteria from the general population.'
            ) : (
              <>
                <strong className="text-gray-800">
                  {extinct.length} of {families.length} families went extinct
                </strong>{' '}
                after antibiotics were introduced.{' '}
                {extinct
                  .sort((a, b) => (a.extinctGen ?? 0) - (b.extinctGen ?? 0))
                  .map((f) => (
                    <span key={f.label}>
                      <span style={{ color: f.color }} className="font-semibold">
                        {f.label}
                      </span>{' '}
                      (gen {f.extinctGen}){', '}
                    </span>
                  ))}
                {survivors.length > 0 && (
                  <>
                    while{' '}
                    {survivors.map((f, i) => (
                      <span key={f.label}>
                        <span style={{ color: f.color }} className="font-semibold">
                          {f.label}
                        </span>
                        {i < survivors.length - 1 ? ' and ' : ' '}
                      </span>
                    ))}
                    survived with {survivors.reduce((s, f) => s + f.descendants, 0)} descendants.
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {/* Before vs After comparison */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Before vs After
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Generation 0
              </p>
              <p className="mt-1 text-2xl font-extrabold text-gray-800">
                ~50%
              </p>
              <p className="text-[11px] text-gray-400">avg resistance</p>
              <p className="mt-1 text-[11px] text-gray-400">
                5 families, all thriving
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Generation {lineageData.maxGeneration}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                {Math.round(avgResistance * 100)}%
              </p>
              <p className="text-[11px] text-emerald-500">avg resistance</p>
              <p className="mt-1 text-[11px] text-emerald-500">
                {survivors.length > 0
                  ? `${survivors.length} family surviving`
                  : 'All tracked families extinct'}
              </p>
            </div>
          </div>
        </div>

        {/* Family outcomes */}
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Family Outcomes
          </h4>
          <div className="space-y-1.5">
            {families.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 text-[13px]"
              >
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                    f.extinct ? 'grayscale opacity-40' : ''
                  }`}
                  style={{ backgroundColor: f.color }}
                />
                <span
                  className={`font-semibold ${
                    f.extinct ? 'text-gray-400 line-through' : 'text-gray-700'
                  }`}
                >
                  {f.label}
                </span>
                <span className="text-gray-400">
                  ({Math.round(f.initialTrait * 100)}% resistant)
                </span>
                <span className="ml-auto text-[12px]">
                  {f.extinct ? (
                    <span className="text-red-400">
                      Extinct at gen {f.extinctGen}
                    </span>
                  ) : (
                    <span className="font-semibold text-emerald-600">
                      {f.descendants} descendants
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Why it matters */}
        <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-700">
            Why This Matters
          </h4>
          <p className="text-[13px] leading-relaxed text-amber-800">
            This is exactly what happens in hospitals. Antibiotics kill
            vulnerable bacteria but leave resistant ones to multiply. The
            surviving population is now almost entirely resistant — a
            &ldquo;superbug&rdquo; population. This is why doctors warn against
            overusing antibiotics.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {/* Export CSV (#27) */}
          <button
            onClick={exportCSV}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export CSV
          </button>

          {/* Share URL (#28) */}
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('scenario', scenario?.id ?? '');
              navigator.clipboard.writeText(url.toString());
              alert('Simulation URL copied to clipboard!');
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Share
          </button>

          {/* Print (#30) */}
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            title="Print summary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m0 0a48.303 48.303 0 018.5 0m-8.5 0V6.923a2.25 2.25 0 01.65-1.591l.94-.94A2.25 2.25 0 018.931 4h6.138a2.25 2.25 0 011.591.659l.94.94a2.25 2.25 0 01.65 1.591v.407" />
            </svg>
          </button>
        </div>

        {/* Try again (#32) */}
        <div className="space-y-2">
          <button
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M20.985 4.356v4.992"
              />
            </svg>
            Run Again (different random seed)
          </button>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            Current results are preserved above. Running again will generate a new simulation.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
