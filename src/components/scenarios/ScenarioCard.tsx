import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Scenario } from '../../types';

const categoryGradients: Record<string, string> = {
  natural: 'from-emerald-50 to-green-50',
  sexual: 'from-purple-50 to-fuchsia-50',
  artificial: 'from-orange-50 to-amber-50',
  speciation: 'from-blue-50 to-sky-50',
};

const categoryAccents: Record<string, string> = {
  natural: 'bg-emerald-500',
  sexual: 'bg-purple-500',
  artificial: 'bg-orange-500',
  speciation: 'bg-blue-500',
};

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const navigate = useNavigate();
  const isDisabled = !scenario.enabled;

  return (
    <motion.button
      onClick={() => !isDisabled && navigate(`/sim/${scenario.id}`)}
      whileHover={isDisabled ? {} : { y: -4, scale: 1.01 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      className={`card-elevated group relative w-full overflow-hidden bg-gradient-to-br ${categoryGradients[scenario.category]} p-6 text-left ${
        isDisabled ? 'cursor-default opacity-60' : ''
      }`}
    >
      {/* Accent bar */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${categoryAccents[scenario.category]}`}
      />

      {/* Coming Soon overlay */}
      {isDisabled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-2xl">
          <span className="rounded-full bg-gray-800 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
            Coming Soon
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {scenario.icon}
        </span>
        <div className="flex gap-1.5">
          <span className={`badge badge-${scenario.category}`}>
            {scenario.category}
          </span>
          <span className={`badge badge-${scenario.difficulty}`}>
            {scenario.difficulty}
          </span>
        </div>
      </div>

      {/* Text */}
      <h3 className="mb-1.5 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
        {scenario.name}
      </h3>
      <p className="mb-4 text-[13px] leading-relaxed text-gray-500">
        {scenario.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          <span>{scenario.parameters.maxGenerations} generations</span>
          <span>&middot;</span>
          <span>{scenario.traits.length} trait{scenario.traits.length > 1 ? 's' : ''}</span>
        </div>
        {!isDisabled && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Start
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        )}
      </div>
    </motion.button>
  );
}
