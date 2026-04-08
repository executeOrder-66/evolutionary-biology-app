import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../../store/simulationStore';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const scenario = useSimulationStore((s) => s.scenario);
  const status = useSimulationStore((s) => s.status);
  const generation = useSimulationStore((s) => s.generation);

  return (
    <header className="glass-heavy sticky top-0 z-50 border-b border-white/30">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-200">
              <span className="text-lg leading-none">🧬</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-[15px] font-bold tracking-tight text-gray-900">
                {t('common.appName')}
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                Evolution Lab
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Active scenario pill */}
        <AnimatePresence mode="wait">
          {scenario && (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="hidden items-center gap-2.5 rounded-full border border-gray-200/80 bg-white/60 px-4 py-1.5 shadow-sm backdrop-blur-sm sm:flex"
            >
              <span className="text-lg">{scenario.icon}</span>
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {scenario.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  {scenario.category} selection
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Status + Language */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {scenario && (
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 sm:flex">
                <div
                  className={`h-2 w-2 rounded-full ${
                    status === 'running'
                      ? 'animate-pulse-soft bg-emerald-500'
                      : status === 'paused'
                        ? 'bg-amber-400'
                        : status === 'completed'
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                  }`}
                />
                <span className="text-xs font-medium capitalize text-gray-500">
                  {status}
                </span>
              </div>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-gray-600">
                Gen {generation}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
