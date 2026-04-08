import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scenarios } from '../../data/scenarios';
import { useSimulationStore } from '../../store/simulationStore';
import type { Scenario } from '../../types';

const categoryLabels: Record<string, string> = {
  natural: 'Natural Selection',
  sexual: 'Sexual Selection',
  artificial: 'Artificial Selection',
  speciation: 'Speciation',
};

const categoryIcons: Record<string, string> = {
  natural: '🌿',
  sexual: '💜',
  artificial: '🔬',
  speciation: '🌍',
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIFFICULTY_DOTS: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

/** Scenarios that have guided story routes */
const STORY_SCENARIOS = new Set([
  'antibiotic-resistance',
  'peppered-moths',
  'peacock-tails',
  'dog-domestication',
  'darwins-finches',
]);

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const activeScenario = useSimulationStore((s) => s.scenario);
  const pause = useSimulationStore((s) => s.pause);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScenarios = scenarios.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.difficulty.toLowerCase().includes(q)
    );
  });

  const grouped = filteredScenarios.reduce<Record<string, Scenario[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  function handleSelect(scenario: Scenario) {
    if (!scenario.enabled) return;
    pause();
    navigate(`/sim/${scenario.id}`);
    onClose();
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Sidebar header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Simulations</h2>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">Choose a scenario</p>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 lg:hidden"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search (#15) */}
      <div className="px-3 py-2">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search scenarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 py-1.5 pl-8 pr-3 text-xs text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Scenario list */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-5">
            <div className="mb-2 flex items-center gap-1.5 px-2">
              <span className="text-xs">{categoryIcons[category]}</span>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {categoryLabels[category]}
              </h3>
            </div>

            <div className="space-y-0.5">
              {items.map((scenario) => {
                const isActive = activeScenario?.id === scenario.id;
                return (
                  <motion.button
                    key={scenario.id}
                    onClick={() => handleSelect(scenario)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 shadow-sm shadow-emerald-100 dark:shadow-none'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-lg transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'bg-emerald-100 dark:bg-emerald-800/50' : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      {scenario.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-[13px] font-semibold leading-tight ${
                          isActive ? 'text-emerald-800 dark:text-emerald-300' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {scenario.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
                        {/* Difficulty dots (#16) */}
                        <span className="flex items-center gap-0.5" title={scenario.difficulty}>
                          {Array.from({ length: 3 }, (_, i) => (
                            <span
                              key={i}
                              className={`inline-block h-1.5 w-1.5 rounded-full ${
                                i < (DIFFICULTY_DOTS[scenario.difficulty] ?? 1)
                                  ? scenario.difficulty === 'advanced'
                                    ? 'bg-red-400'
                                    : scenario.difficulty === 'intermediate'
                                      ? 'bg-amber-400'
                                      : 'bg-emerald-400'
                                  : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </span>
                        <span className="truncate">{scenario.parameters.maxGenerations} gens</span>
                        {/* Story badge (#17) */}
                        {STORY_SCENARIOS.has(scenario.id) && (
                          <span className="ml-auto flex-shrink-0 rounded bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-300" title="Has guided story">
                            📖
                          </span>
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-3 space-y-2">
        <button
          onClick={() => { navigate('/glossary'); onClose(); }}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <span>📖</span> Glossary
        </button>
        <button
          onClick={() => { navigate('/classroom'); onClose(); }}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <span>🎓</span> Classroom
        </button>
        <p className="text-center text-[11px] text-gray-500 dark:text-gray-400">
          {scenarios.length} simulations available
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-xl lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 lg:block">
        {sidebarContent}
      </aside>
    </>
  );
}
