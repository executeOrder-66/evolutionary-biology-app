import { useSimulationStore } from '../../store/simulationStore';

export default function DataTableView() {
  const history = useSimulationStore((s) => s.history);
  const scenario = useSimulationStore((s) => s.scenario);

  const traitName = scenario?.traits[0]?.name ?? '';
  const traitDisplayName = scenario?.traits[0]?.displayName ?? 'Trait';

  if (history.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        Run the simulation to see data
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-xl border border-gray-100 dark:border-gray-700" style={{ maxHeight: 400 }}>
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <tr>
            <th className="px-4 py-2">Gen</th>
            <th className="px-4 py-2">Population</th>
            <th className="px-4 py-2">Avg {traitDisplayName}</th>
            <th className="px-4 py-2">Avg Fitness</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
          {history.map((h) => (
            <tr key={h.generation} className="text-gray-700 dark:text-gray-300">
              <td className="px-4 py-1.5 tabular-nums font-medium">{h.generation}</td>
              <td className="px-4 py-1.5 tabular-nums">{h.populationSize}</td>
              <td className="px-4 py-1.5 tabular-nums">
                {((h.traitMeans[traitName] ?? 0) * 100).toFixed(1)}%
              </td>
              <td className="px-4 py-1.5 tabular-nums">
                {(h.meanFitness * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
