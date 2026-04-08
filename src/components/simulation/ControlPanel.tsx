import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';

export default function ControlPanel() {
  const status = useSimulationStore((s) => s.status);
  const generation = useSimulationStore((s) => s.generation);
  const scenario = useSimulationStore((s) => s.scenario);
  const maxGen = scenario?.parameters.maxGenerations ?? 0;
  const speed = useSimulationStore((s) => s.speed);
  const play = useSimulationStore((s) => s.play);
  const pause = useSimulationStore((s) => s.pause);
  const reset = useSimulationStore((s) => s.reset);
  const stepForward = useSimulationStore((s) => s.stepForward);
  const setSpeed = useSimulationStore((s) => s.setSpeed);

  const autoPause = useSimulationStore((s) => s.autoPauseAtMilestones);
  const setAutoPause = useSimulationStore((s) => s.setAutoPauseAtMilestones);

  const isRunning = status === 'running';
  const isCompleted = status === 'completed';
  const progress = maxGen > 0 ? (generation / maxGen) * 100 : 0;

  // Find next milestone generation for the skip button
  const nextMilestoneGen = scenario?.educationalContent.steps.find(
    (s) => s.triggerGeneration > generation
  )?.triggerGeneration;

  const skipToNextMilestone = () => {
    if (!nextMilestoneGen) return;
    const stepsNeeded = nextMilestoneGen - generation;
    for (let i = 0; i < stepsNeeded; i++) {
      stepForward();
    }
  };

  return (
    <div className="card overflow-hidden">
      {/* Progress bar – full width, with bookmarks */}
      <div className="relative h-1 w-full bg-gray-100 dark:bg-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
        {/* Bookmark dots (#21) */}
        {useSimulationStore.getState().bookmarks.map((bGen) => (
          <div
            key={bGen}
            className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-amber-400 border border-white dark:border-gray-800"
            style={{ left: `${maxGen > 0 ? (bGen / maxGen) * 100 : 0}%` }}
            title={`Bookmark: Gen ${bGen}`}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
        {/* Left controls */}
        <div className="flex items-center gap-1.5">
          {/* Reset */}
          <ControlButton
            onClick={reset}
            label="Reset"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M20.985 4.356v4.992"
              />
            }
          />

          {/* Step forward (one generation) */}
          <ControlButton
            onClick={stepForward}
            disabled={isRunning || isCompleted}
            label="Next generation"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z"
              />
            }
          />

          {/* Play/Pause – primary */}
          <motion.button
            onClick={isRunning ? pause : play}
            disabled={isCompleted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary ml-1 flex h-11 w-11 items-center justify-center disabled:opacity-30 disabled:shadow-none disabled:transform-none"
          >
            {isRunning ? (
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 pl-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            )}
          </motion.button>

          {/* Skip to next milestone */}
          {nextMilestoneGen && !isRunning && (
            <motion.button
              onClick={skipToNextMilestone}
              disabled={isCompleted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-1 flex items-center gap-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 disabled:opacity-25"
              title={`Skip to generation ${nextMilestoneGen}`}
            >
              Skip to gen {nextMilestoneGen}
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
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z"
                />
              </svg>
            </motion.button>
          )}
        </div>

        {/* Center: generation counter + bookmark */}
        <div className="flex items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold tabular-nums text-gray-900 dark:text-gray-100">
              {generation}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">/ {maxGen} gen</span>
          </div>
          {/* Bookmark button (#21) */}
          {generation > 0 && (
            <button
              onClick={() => useSimulationStore.getState().toggleBookmark(generation)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                useSimulationStore.getState().bookmarks.includes(generation)
                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-500'
                  : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'
              }`}
              title={useSimulationStore.getState().bookmarks.includes(generation) ? 'Remove bookmark' : 'Bookmark this generation'}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4.5A1.5 1.5 0 016.5 3h7A1.5 1.5 0 0115 4.5v11.394l-5-2.5-5 2.5V4.5z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Right: speed */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg
              className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            {/* Speed presets (#19) */}
            <div className="flex gap-0.5">
              {[1, 2, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold transition-colors ${
                    speed === s
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
            <label htmlFor="speed-slider" className="sr-only">Playback speed</label>
            <input
              id="speed-slider"
              type="range"
              min={0.25}
              max={5}
              step={0.25}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-20"
              aria-label="Playback speed"
            />
            <span className="w-8 text-right text-xs font-semibold tabular-nums text-gray-600 dark:text-gray-400">
              {speed}x
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar: auto-pause + keyboard hints */}
      <div className="border-t border-gray-50 dark:border-gray-700 px-5 py-1.5 flex items-center justify-between gap-2">
        {/* Auto-pause toggle (#22) */}
        <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoPause}
            onChange={(e) => setAutoPause(e.target.checked)}
            className="h-3 w-3 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
          />
          Pause at milestones
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <kbd className="rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-[11px]">Space</kbd> play/pause
          &nbsp;&nbsp;
          <kbd className="rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-[11px]">→</kbd> step
          &nbsp;&nbsp;
          <kbd className="rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-[11px]">R</kbd> reset
          &nbsp;&nbsp;
          <kbd className="rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-[11px]">+/-</kbd> speed
        </p>
      </div>
    </div>
  );
}

function ControlButton({
  onClick,
  disabled = false,
  label,
  icon,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  icon: ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 disabled:opacity-25"
    >
      <svg
        className="h-[18px] w-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        {icon}
      </svg>
    </motion.button>
  );
}
