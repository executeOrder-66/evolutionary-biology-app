import { motion } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';

export default function SimulationSummary() {
  const status = useSimulationStore((s) => s.status);
  const lineageData = useSimulationStore((s) => s.lineageData);
  const population = useSimulationStore((s) => s.population);
  const scenario = useSimulationStore((s) => s.scenario);
  const reset = useSimulationStore((s) => s.reset);

  const traitName = scenario?.traits[0]?.name ?? '';

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

        {/* Try again */}
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
      </div>
    </motion.div>
  );
}
