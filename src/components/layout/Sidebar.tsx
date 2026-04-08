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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const activeScenario = useSimulationStore((s) => s.scenario);
  const pause = useSimulationStore((s) => s.pause);

  const grouped = scenarios.reduce<Record<string, Scenario[]>>((acc, s) => {
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
                      <p className="truncate text-[11px] text-gray-400 dark:text-gray-500">
                        {scenario.difficulty} &middot; {scenario.parameters.maxGenerations} gens
                      </p>
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
      <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-3">
        <p className="text-center text-[10px] text-gray-300 dark:text-gray-600">
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
