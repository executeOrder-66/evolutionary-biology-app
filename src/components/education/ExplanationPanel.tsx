import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '../../store/simulationStore';
import type { ContentStep } from '../../types';

/** Maps scenario id → tutorial chapter id and guided story route */
const SCENARIO_LINKS: Record<string, { tutorialId: string; storyRoute: string; storyLabel: string; storyIcon: string }> = {
  'antibiotic-resistance': { tutorialId: 'antibiotic-resistance', storyRoute: '/story/bacteria', storyLabel: 'Guided Story: Bacteria → Superbug', storyIcon: '🧫' },
  'peppered-moths': { tutorialId: 'peppered-moths', storyRoute: '/story/moths', storyLabel: 'Guided Story: Peppered Moths', storyIcon: '🦋' },
  'peacock-tails': { tutorialId: 'peacock-tails', storyRoute: '/story/peacock', storyLabel: 'Guided Story: Peacock Tails', storyIcon: '🦚' },
  'dog-domestication': { tutorialId: 'dog-domestication', storyRoute: '/story/dogs', storyLabel: 'Guided Story: Wolf → Dog', storyIcon: '🐕' },
  'darwins-finches': { tutorialId: 'darwins-finches', storyRoute: '/story/finches', storyLabel: "Guided Story: Darwin's Finches", storyIcon: '🐦' },
};

export default function ExplanationPanel() {
  const navigate = useNavigate();
  const scenario = useSimulationStore((s) => s.scenario);
  const activeStep = useSimulationStore((s) => s.activeContentStep);
  const generation = useSimulationStore((s) => s.generation);
  const status = useSimulationStore((s) => s.status);

  const [browsed, setBrowsed] = useState<{
    forStep: ContentStep | null;
    index: number;
  } | null>(null);

  if (!scenario) return null;

  const { educationalContent } = scenario;
  const steps = educationalContent.steps;
  const totalSteps = steps.length;

  const autoStepIndex = steps.findIndex((s) => s === activeStep);

  // User's browse override is only valid if the milestone hasn't changed since they clicked
  const userOverrideValid =
    browsed !== null && browsed.forStep === activeStep;
  const displayIndex = userOverrideValid ? browsed.index : autoStepIndex;
  const displayStep = displayIndex >= 0 ? steps[displayIndex] : null;

  const canGoPrev = displayIndex > 0;
  const canGoNext = displayIndex < totalSteps - 1;
  const isViewingPast = userOverrideValid && browsed.index !== autoStepIndex;

  const goTo = (index: number) => {
    setBrowsed({ forStep: activeStep, index });
  };

  return (
    <div className="space-y-3">
      {/* Active explanation card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayStep?.title ?? 'bg'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="card relative overflow-hidden p-5"
        >
          {/* Green accent line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-400 to-teal-500" />

          <div className="mb-1.5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {displayStep?.title ?? 'Background'}
            </h3>
            {totalSteps > 0 && displayIndex >= 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                {displayIndex + 1}/{totalSteps}
              </span>
            )}
          </div>
          <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
            {displayStep?.content ?? educationalContent.background}
          </p>

          {/* Viewing a different step than current */}
          {isViewingPast && (
            <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
              Viewing milestone {displayIndex + 1} (simulation is at gen{' '}
              {generation})
            </p>
          )}

          {/* Prev / Next milestone buttons */}
          {generation > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => goTo(Math.max(0, displayIndex - 1))}
                disabled={!canGoPrev}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 disabled:opacity-25 disabled:hover:bg-transparent"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Prev
              </button>

              {isViewingPast && (
                <button
                  onClick={() => setBrowsed(null)}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                >
                  Back to current
                </button>
              )}

              <button
                onClick={() =>
                  goTo(Math.min(totalSteps - 1, displayIndex + 1))
                }
                disabled={!canGoNext}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 disabled:opacity-25 disabled:hover:bg-transparent"
              >
                Next
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Learning objectives – shown before simulation starts */}
      {status === 'idle' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card overflow-hidden border-emerald-100 dark:border-emerald-800/30 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 p-5"
        >
          <h3 className="mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"
              />
            </svg>
            Learning Objectives
          </h3>
          <ul className="space-y-2">
            {educationalContent.objectives.map((obj, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[13px] leading-snug text-emerald-800 dark:text-emerald-200"
              >
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-200/60 dark:bg-emerald-900/40 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  {i + 1}
                </span>
                {obj}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Milestones timeline */}
      {generation > 0 && (
        <div className="card p-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Milestones
          </h3>
          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100 dark:bg-gray-700" />

            {steps.map((step, i) => {
              const reached = generation >= step.triggerGeneration;
              const isCurrent = i === displayIndex;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative flex w-full gap-3 py-2 text-left min-h-[44px] items-start"
                >
                  {/* Dot — visual size 15px, touch target 44px via padding */}
                  <div
                    className={`relative z-10 mt-0.5 flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isCurrent
                        ? 'border-emerald-500 bg-emerald-500 shadow-md shadow-emerald-200'
                        : reached
                          ? 'border-emerald-400 bg-emerald-400'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                  >
                    {reached && (
                      <svg
                        className="h-2 w-2 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-semibold leading-tight ${
                        isCurrent
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : reached
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-300 dark:text-gray-600'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Gen {step.triggerGeneration}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Key concepts */}
      <div className="card p-5">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Key Concepts
        </h3>
        <div className="space-y-3">
          {educationalContent.keyConcepts.map((concept, i) => (
            <div key={i} className="group">
              <dt className="mb-0.5 text-[13px] font-semibold text-gray-800 dark:text-gray-200">
                {concept.term}
              </dt>
              <dd className="text-[12px] leading-relaxed text-gray-400 dark:text-gray-500">
                {concept.definition}
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Guided story button */}
      {SCENARIO_LINKS[scenario.id] && (
        <button
          onClick={() => navigate(SCENARIO_LINKS[scenario.id].storyRoute)}
          className="card group flex w-full items-center gap-3 p-4 text-left transition-all hover:shadow-md hover:border-emerald-200"
        >
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/30 text-xl transition-transform group-hover:scale-110">
            {SCENARIO_LINKS[scenario.id].storyIcon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-gray-800 dark:text-gray-200">
              {SCENARIO_LINKS[scenario.id].storyLabel}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Step-by-step visual walkthrough
            </p>
          </div>
          <svg
            className="h-4 w-4 flex-shrink-0 text-gray-300 transition-colors group-hover:text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Tutorial deep-dive button */}
      {SCENARIO_LINKS[scenario.id] && (
        <button
          onClick={() => navigate(`/tutorial/${SCENARIO_LINKS[scenario.id].tutorialId}`)}
          className="card group flex w-full items-center gap-3 p-4 text-left transition-all hover:shadow-md hover:border-emerald-200"
        >
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-xl transition-transform group-hover:scale-110">
            📖
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-gray-800 dark:text-gray-200">
              Full Tutorial
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Lessons explaining the science behind this simulation
            </p>
          </div>
          <svg
            className="h-4 w-4 flex-shrink-0 text-gray-300 transition-colors group-hover:text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
