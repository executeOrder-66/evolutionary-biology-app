import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../../store/simulationStore';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const scenario = useSimulationStore((s) => s.scenario);
  const status = useSimulationStore((s) => s.status);
  const generation = useSimulationStore((s) => s.generation);

  return (
    <header className="glass-heavy sticky top-0 z-50 border-b border-white/30 dark:border-white/10">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200 lg:hidden"
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
              <h1 className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {t('common.appName')}
              </h1>
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
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
              className="hidden items-center gap-2.5 rounded-full border border-gray-200/80 bg-white/60 px-4 py-1.5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:flex"
            >
              <span className="text-lg">{scenario.icon}</span>
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-tight dark:text-gray-200">
                  {scenario.name}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {scenario.category} selection
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Status + Language */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          {scenario && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {/* Shape varies by status for colorblind accessibility */}
                {status === 'running' ? (
                  <div className="h-2.5 w-2.5 animate-pulse-soft rounded-full bg-emerald-500" aria-hidden="true" />
                ) : status === 'paused' ? (
                  <div className="h-2.5 w-2.5 rounded-sm bg-amber-400" aria-hidden="true" />
                ) : status === 'completed' ? (
                  <svg className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-gray-300 dark:border-gray-500" aria-hidden="true" />
                )}
                <span className="text-xs font-medium capitalize text-gray-600 dark:text-gray-300">
                  {status}
                </span>
              </div>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-gray-600 dark:bg-white/10 dark:text-gray-300">
                Gen {generation}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
