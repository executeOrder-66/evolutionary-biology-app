import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scenarios } from '../../data/scenarios';
import { basicEvolutionChapter } from '../../data/chapters/basicEvolution';
import { antibioticResistanceChapter } from '../../data/chapters/antibioticResistance';
import { pepperedMothsChapter } from '../../data/chapters/pepperedMoths';
import { peacockTailsChapter } from '../../data/chapters/peacockTails';
import { dogDomesticationChapter } from '../../data/chapters/dogDomestication';
import { darwinsFinchesChapter } from '../../data/chapters/darwinsFinches';
import { predatorPreyChapter } from '../../data/chapters/predatorPrey';
import { mimicryChapter } from '../../data/chapters/mimicry';
import { antibioticCyclingChapter } from '../../data/chapters/antibioticCycling';
import ScenarioCard from './ScenarioCard';
import ChapterCard from '../tutorial/ChapterCard';
import ProgressBadge from './ProgressBadge';
import { useProgressStore } from '../../store/progressStore';
import type { Chapter } from '../../types/tutorial';

const allChapters: Chapter[] = [
  basicEvolutionChapter,
  antibioticResistanceChapter,
  pepperedMothsChapter,
  peacockTailsChapter,
  dogDomesticationChapter,
  darwinsFinchesChapter,
  predatorPreyChapter,
  mimicryChapter,
  antibioticCyclingChapter,
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const completedStories = useProgressStore((s) => s.completedStories);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('evosim-onboarding-dismissed');
  });

  const dismissOnboarding = () => {
    localStorage.setItem('evosim-onboarding-dismissed', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-full">
      {/* First-time onboarding banner (#14) */}
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-6xl px-4 pt-4 sm:px-6"
        >
          <div className="flex items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-white shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-sm font-bold">New here? Start with the Quick Demo!</p>
                <p className="text-xs text-emerald-100">See natural selection happen in 60 seconds — no biology background needed.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { dismissOnboarding(); navigate('/demo'); }}
                className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm hover:bg-emerald-50 transition-colors"
              >
                Start Demo →
              </button>
              <button
                onClick={dismissOnboarding}
                className="rounded-lg px-2 py-1.5 text-xs font-medium text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 px-6 py-16 sm:py-24">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-600/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-green-400/10 blur-2xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.1 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg backdrop-blur-sm"
          >
            <span className="text-3xl">🧬</span>
          </motion.div>

          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Evolution{' '}
            <span className="bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
              Laboratory
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-emerald-100/80 sm:text-lg">
            Watch evolution unfold in real time. Explore natural selection,
            sexual selection, and artificial selection through interactive
            simulations.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {['Natural Selection', 'Sexual Selection', 'Artificial Selection'].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-emerald-100/90"
                >
                  {label}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Tutorials section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Learn the Science
          </h2>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Read through bite-sized lessons on each topic before exploring the simulations.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allChapters.map((ch) => (
              <div key={ch.id} className="relative">
                <ProgressBadge
                  type="tutorial"
                  chapterId={ch.id}
                  totalLessons={ch.lessons.length}
                />
                <ChapterCard
                  chapter={ch}
                  onOpen={() => navigate(`/tutorial/${ch.id}`)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Guided Stories section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Guided Stories
          </h2>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Step-by-step visual walkthroughs — watch evolution unfold one generation at a time.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Quick demo */}
            <motion.button
              onClick={() => navigate('/demo')}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated group relative w-full overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 p-6 text-left"
            >
              {completedStories.includes('demo') && (
                <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">&#x2713; Done</span>
              )}
              <div className="absolute left-0 top-0 h-full w-1 bg-amber-500" />
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  🌳
                </span>
                <span className="rounded-full bg-amber-100 dark:bg-amber-900/50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                  60 seconds
                </span>
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-amber-700">
                Quick Demo
              </h3>
              <p className="mb-4 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                See natural selection happen in 6 simple steps. No biology background needed.
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Start demo →
              </span>
            </motion.button>

            {/* Bacteria story */}
            <motion.button
              onClick={() => navigate('/story/bacteria')}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated group relative w-full overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-6 text-left"
            >
              {completedStories.includes('bacteria') && (
                <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">&#x2713; Done</span>
              )}
              <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  🧫
                </span>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  17 steps
                </span>
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-emerald-700">
                Antibiotic Resistance
              </h3>
              <p className="mb-4 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                Follow one bacterium from origin to superbug. See how resistance emerges.
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Start story →
              </span>
            </motion.button>

            {/* Moth story */}
            <motion.button
              onClick={() => navigate('/story/moths')}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated group relative w-full overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-950/40 dark:to-amber-950/40 p-6 text-left"
            >
              {completedStories.includes('moths') && (
                <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">&#x2713; Done</span>
              )}
              <div className="absolute left-0 top-0 h-full w-1 bg-stone-500" />
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  🦋
                </span>
                <span className="rounded-full bg-stone-100 dark:bg-stone-900/50 px-2.5 py-0.5 text-[10px] font-bold text-stone-700 dark:text-stone-300">
                  17 steps
                </span>
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-stone-700">
                Peppered Moths
              </h3>
              <p className="mb-4 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                Watch moths change color as pollution darkens the trees.
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-stone-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Start story →
              </span>
            </motion.button>

            {/* Peacock story */}
            <motion.button
              onClick={() => navigate('/story/peacock')}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated group relative w-full overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40 p-6 text-left"
            >
              {completedStories.includes('peacock') && (
                <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">&#x2713; Done</span>
              )}
              <div className="absolute left-0 top-0 h-full w-1 bg-violet-500" />
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  🦚
                </span>
                <span className="rounded-full bg-violet-100 dark:bg-violet-900/50 px-2.5 py-0.5 text-[10px] font-bold text-violet-700 dark:text-violet-300">
                  17 steps
                </span>
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-violet-700">
                Peacock Tails
              </h3>
              <p className="mb-4 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                See how female mate choice drives elaborate tails — and the survival trade-off.
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-violet-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Start story →
              </span>
            </motion.button>

            {/* Dog story */}
            <motion.button
              onClick={() => navigate('/story/dogs')}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated group relative w-full overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/40 dark:to-yellow-950/40 p-6 text-left"
            >
              {completedStories.includes('dogs') && (
                <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">&#x2713; Done</span>
              )}
              <div className="absolute left-0 top-0 h-full w-1 bg-orange-500" />
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  🐕
                </span>
                <span className="rounded-full bg-orange-100 dark:bg-orange-900/50 px-2.5 py-0.5 text-[10px] font-bold text-orange-700 dark:text-orange-300">
                  17 steps
                </span>
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-orange-700">
                Dog Domestication
              </h3>
              <p className="mb-4 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                Watch wolves become dogs as humans select the tamest for breeding.
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Start story →
              </span>
            </motion.button>

            {/* Finch story */}
            <motion.button
              onClick={() => navigate('/story/finches')}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated group relative w-full overflow-hidden bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/40 dark:to-cyan-950/40 p-6 text-left"
            >
              {completedStories.includes('finches') && (
                <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">&#x2713; Done</span>
              )}
              <div className="absolute left-0 top-0 h-full w-1 bg-sky-500" />
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  🐦
                </span>
                <span className="rounded-full bg-sky-100 dark:bg-sky-900/50 px-2.5 py-0.5 text-[10px] font-bold text-sky-700 dark:text-sky-300">
                  17 steps
                </span>
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-sky-700">
                Darwin's Finches
              </h3>
              <p className="mb-4 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                Watch one finch species split into specialists with different beaks.
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-sky-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Start story →
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Scenario grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Choose a Simulation
          </h2>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Select a scenario to explore evolutionary principles
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2"
        >
          {scenarios.map((scenario) => (
            <motion.div key={scenario.id} variants={item}>
              <ScenarioCard scenario={scenario} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
