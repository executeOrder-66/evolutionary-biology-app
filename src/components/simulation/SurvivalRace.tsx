import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';

export default function SurvivalRace() {
  const lineageData = useSimulationStore((s) => s.lineageData);
  const generation = useSimulationStore((s) => s.generation);
  const scenario = useSimulationStore((s) => s.scenario);

  const traitName = scenario?.traits[0]?.name ?? '';

  if (!lineageData || lineageData.trees.length === 0) return null;

  const maxCount = Math.max(
    1,
    ...lineageData.trees.map((tree) => {
      const bucket = tree.generationBuckets.get(lineageData.maxGeneration);
      return bucket?.length ?? 0;
    })
  );

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Family Survival — Generation {generation}
      </h4>

      {lineageData.trees.map((tree) => {
        const bucket = tree.generationBuckets.get(lineageData.maxGeneration);
        const count = bucket?.length ?? 0;
        const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
        const isExtinct = tree.extinctAtGeneration !== null;

        // Compute average trait of living descendants
        let avgTrait = tree.initialTrait;
        if (bucket && bucket.length > 0) {
          let sum = 0;
          let n = 0;
          for (const id of bucket) {
            const node = tree.nodes.get(id);
            if (node) {
              sum += node.traits[traitName] ?? 0;
              n++;
            }
          }
          if (n > 0) avgTrait = sum / n;
        }

        return (
          <div
            key={tree.ancestorId}
            className={`flex items-center gap-3 transition-opacity duration-500 ${
              isExtinct ? 'opacity-50' : ''
            }`}
          >
            {/* Ancestor identity */}
            <div className="w-28 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-3 w-3 rounded-full flex-shrink-0 ${
                    isExtinct ? 'grayscale' : ''
                  }`}
                  style={{ backgroundColor: tree.color }}
                />
                <span
                  className={`text-[13px] font-bold truncate ${
                    isExtinct ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {tree.label}
                </span>
              </div>
              <span className="pl-5 text-[11px] text-gray-500 dark:text-gray-400">
                {tree.description}
              </span>
            </div>

            {/* Bar */}
            <div className="flex-1 h-6 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: isExtinct ? '#d1d5db' : tree.color }}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(pct, count > 0 ? 3 : 0)}%`,
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                }}
              />

              {/* Count + avg trait label */}
              {count > 0 && (
                <span
                  className="absolute inset-y-0 flex items-center gap-1 text-[11px] font-bold"
                  style={{
                    left: Math.max(pct, 6) + '%',
                    marginLeft: 6,
                    color: tree.color,
                  }}
                >
                  {count}
                  <span className="font-normal text-gray-400">
                    · {Math.round(avgTrait * 100)}% resistant
                  </span>
                </span>
              )}
            </div>

            {/* Extinct badge */}
            <AnimatePresence>
              {isExtinct && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="flex-shrink-0 rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-400 ring-1 ring-red-100"
                >
                  EXTINCT
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
