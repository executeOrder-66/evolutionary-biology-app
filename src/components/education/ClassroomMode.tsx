import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../../hooks/usePageTitle';
import { scenarios } from '../../data/scenarios';
import { useProgressStore } from '../../store/progressStore';

const CLASSROOM_KEY = 'evosim-classroom';

interface ClassroomConfig {
  name: string;
  enabledScenarios: string[];
  createdAt: string;
}

export default function ClassroomPage() {
  usePageTitle('Classroom Mode');
  const navigate = useNavigate();
  const progress = useProgressStore();

  const [config, setConfig] = useState<ClassroomConfig | null>(() => {
    const stored = localStorage.getItem(CLASSROOM_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [editing, setEditing] = useState(!config);
  const [name, setName] = useState(config?.name ?? '');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(config?.enabledScenarios ?? scenarios.map((s) => s.id))
  );

  const toggleScenario = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const save = () => {
    const cfg: ClassroomConfig = {
      name: name || 'My Classroom',
      enabledScenarios: [...selectedIds],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(CLASSROOM_KEY, JSON.stringify(cfg));
    setConfig(cfg);
    setEditing(false);
  };

  const reset = () => {
    localStorage.removeItem(CLASSROOM_KEY);
    setConfig(null);
    setEditing(true);
    setName('');
    setSelectedIds(new Set(scenarios.map((s) => s.id)));
  };

  // Export progress as CSV
  const exportProgress = () => {
    const headers = ['Scenario', 'Max Generation Reached', 'Tutorial Completed', 'Story Completed'];
    const rows = scenarios.map((s) => {
      const simProg = progress.simulationProgress[s.id] ?? 0;
      const tutDone = (progress.completedLessons[s.id]?.length ?? 0) > 0 ? 'Yes' : 'No';
      const storyDone = progress.completedStories.includes(s.id) ? 'Yes' : 'No';
      return [s.name, simProg, tutDone, storyDone].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `classroom-progress-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            🎓 Classroom Mode
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure which scenarios are available and track student progress
          </p>
        </div>
      </div>

      {editing ? (
        <div className="card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Class Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Biology 101 - Section A"
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Enabled Scenarios</label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Select which simulations students can access
            </p>
            <div className="space-y-1.5">
              {scenarios.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(s.id)}
                    onChange={() => toggleScenario(s.id)}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.difficulty} · {s.category}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={save}
            disabled={selectedIds.size === 0}
            className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-40"
          >
            Save Configuration
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{config?.name}</h2>
                <p className="text-xs text-gray-400">{config?.enabledScenarios.length} scenarios enabled</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Edit
                </button>
                <button
                  onClick={reset}
                  className="rounded-lg border border-red-200 dark:border-red-800 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Progress tracking */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Student Progress</h3>
              <button
                onClick={exportProgress}
                className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Export CSV
              </button>
            </div>
            <div className="space-y-2">
              {scenarios
                .filter((s) => config?.enabledScenarios.includes(s.id))
                .map((s) => {
                  const maxGen = progress.simulationProgress[s.id] ?? 0;
                  const pct = s.parameters.maxGenerations > 0
                    ? Math.round((maxGen / s.parameters.maxGenerations) * 100)
                    : 0;
                  return (
                    <div key={s.id} className="flex items-center gap-3">
                      <span className="text-lg">{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{s.name}</p>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tabular-nums">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
