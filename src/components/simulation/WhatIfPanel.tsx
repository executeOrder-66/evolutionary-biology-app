import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';

interface FactorControl {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

interface ToggleControl {
  label: string;
  factorKey: string;
  targetValue: number;
}

interface ScenarioConfig {
  sliders: FactorControl[];
  toggles: ToggleControl[];
}

const scenarioConfigs: Record<string, ScenarioConfig> = {
  'antibiotic-resistance': {
    sliders: [
      { key: 'antibioticStrength', label: 'Antibiotic Strength', min: 0, max: 1, step: 0.05 },
    ],
    toggles: [
      { label: 'Remove Antibiotics', factorKey: 'antibioticStrength', targetValue: 0 },
    ],
  },
  'peppered-moths': {
    sliders: [
      { key: 'pollutionLevel', label: 'Pollution Level', min: 0, max: 1, step: 0.05 },
    ],
    toggles: [
      { label: 'Clean Air Act', factorKey: 'pollutionLevel', targetValue: 0 },
    ],
  },
  'peacock-tails': {
    sliders: [
      { key: 'predationLevel', label: 'Predation Level', min: 0, max: 1, step: 0.05 },
    ],
    toggles: [],
  },
  'dog-domestication': {
    sliders: [
      { key: 'humanStrictness', label: 'Human Strictness', min: 0, max: 1, step: 0.05 },
    ],
    toggles: [],
  },
  'darwins-finches': {
    sliders: [
      { key: 'nicheCompetition', label: 'Niche Competition', min: 0, max: 1, step: 0.05 },
    ],
    toggles: [],
  },
};

export default function WhatIfPanel() {
  const scenario = useSimulationStore((s) => s.scenario);
  const environment = useSimulationStore((s) => s.environment);
  const branches = useSimulationStore((s) => s.branches);
  const saveBranch = useSimulationStore((s) => s.saveBranch);
  const revertToBranch = useSimulationStore((s) => s.revertToBranch);
  const setEnvironmentFactor = useSimulationStore((s) => s.setEnvironmentFactor);
  const [expanded, setExpanded] = useState(true);
  const [showRevertConfirm, setShowRevertConfirm] = useState(false);
  const revertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = scenario ? scenarioConfigs[scenario.id] : null;

  const handleSliderChange = useCallback(
    (key: string, label: string, newValue: number) => {
      if (!environment) return;
      const oldValue = environment.factors[key] ?? 0;
      saveBranch(`${label}: ${oldValue.toFixed(2)} → ${newValue.toFixed(2)}`, key, oldValue, newValue);
      setEnvironmentFactor(key, newValue);
    },
    [environment, saveBranch, setEnvironmentFactor]
  );

  const handleToggle = useCallback(
    (toggle: ToggleControl) => {
      if (!environment) return;
      const oldValue = environment.factors[toggle.factorKey] ?? 0;
      saveBranch(toggle.label, toggle.factorKey, oldValue, toggle.targetValue);
      setEnvironmentFactor(toggle.factorKey, toggle.targetValue);
    },
    [environment, saveBranch, setEnvironmentFactor]
  );

  if (!config || !environment) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.25 }}
        className="card p-4"
      >
        {/* Header */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between"
        >
          <h3 className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
            <span>🔀</span> What If?
          </h3>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-[11px] text-gray-400">
                Tweak environment variables to fork the simulation and explore alternate outcomes.
              </p>

              {/* Sliders */}
              <div className="mt-3 space-y-3">
                {config.sliders.map((slider) => {
                  const currentValue = environment.factors[slider.key] ?? 0;
                  return (
                    <div key={slider.key}>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-600">
                          {slider.label}
                        </label>
                        <span className="text-[11px] font-mono text-gray-400">
                          {currentValue.toFixed(2)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={currentValue}
                        onChange={(e) =>
                          handleSliderChange(slider.key, slider.label, parseFloat(e.target.value))
                        }
                        className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-emerald-500"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Toggles */}
              {config.toggles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {config.toggles.map((toggle) => {
                    const isActive = environment.factors[toggle.factorKey] === toggle.targetValue;
                    return (
                      <button
                        key={toggle.label}
                        onClick={() => handleToggle(toggle)}
                        disabled={isActive}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-600 cursor-default'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {toggle.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Branch History */}
              {branches.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-gray-500">Branch History</h4>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {branches.map((branch) => (
                      <motion.span
                        key={branch.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700"
                      >
                        Gen {branch.generation}: {branch.label}
                      </motion.span>
                    ))}
                  </div>
                  {showRevertConfirm ? (
                    <div className="mt-2 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-2.5">
                      <p className="text-xs text-red-600 dark:text-red-400 mb-2">
                        Reset simulation to gen 0? Branch history will be cleared.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            revertToBranch();
                            setShowRevertConfirm(false);
                            if (revertTimerRef.current) clearTimeout(revertTimerRef.current);
                          }}
                          className="flex-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
                        >
                          Yes, Reset
                        </button>
                        <button
                          onClick={() => {
                            setShowRevertConfirm(false);
                            if (revertTimerRef.current) clearTimeout(revertTimerRef.current);
                          }}
                          className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowRevertConfirm(true);
                        revertTimerRef.current = setTimeout(() => setShowRevertConfirm(false), 5000);
                      }}
                      className="mt-2 w-full rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-100 dark:hover:bg-red-900/40"
                    >
                      Revert to Start
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
