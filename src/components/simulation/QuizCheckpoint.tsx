import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizQuestion {
  /** The step index at which this question appears */
  atStep: number;
  question: string;
  options: string[];
  /** Index of the correct option */
  correctIndex: number;
  /** Shown after answering (whether correct or not) */
  explanation: string;
}

interface QuizCheckpointProps {
  quiz: QuizQuestion;
  themeColor?: string; // e.g. 'emerald', 'amber', 'violet', 'orange'
}

export default function QuizCheckpoint({
  quiz,
  themeColor = 'emerald',
}: QuizCheckpointProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === quiz.correctIndex;

  const colors: Record<string, { border: string; bg: string; text: string; accent: string }> = {
    emerald: { border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-800', accent: 'bg-emerald-500' },
    amber: { border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-800', accent: 'bg-amber-500' },
    violet: { border: 'border-violet-200', bg: 'bg-violet-50', text: 'text-violet-800', accent: 'bg-violet-500' },
    orange: { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-800', accent: 'bg-orange-500' },
    stone: { border: 'border-stone-200', bg: 'bg-stone-50', text: 'text-stone-800', accent: 'bg-stone-500' },
    sky: { border: 'border-sky-200', bg: 'bg-sky-50', text: 'text-sky-800', accent: 'bg-sky-500' },
  };

  const c = colors[themeColor] ?? colors.emerald;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`mt-3 rounded-xl border ${c.border} ${c.bg} p-4`}
    >
      <p className="mb-3 text-[13px] font-bold leading-snug ${c.text}">
        <span className="mr-1.5">💡</span>
        {quiz.question}
      </p>

      <div className="space-y-2">
        {quiz.options.map((option, i) => {
          const isThis = selected === i;
          const isRight = i === quiz.correctIndex;

          let btnClass =
            'w-full rounded-lg border px-3 py-2 text-left text-[12px] font-medium transition-all ';

          if (!answered) {
            btnClass += 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 cursor-pointer';
          } else if (isRight) {
            btnClass += 'border-emerald-400 bg-emerald-50 text-emerald-800';
          } else if (isThis && !isRight) {
            btnClass += 'border-red-300 bg-red-50 text-red-700';
          } else {
            btnClass += 'border-gray-100 bg-gray-50/50 text-gray-400';
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={btnClass}
            >
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 text-[10px] font-bold">
                {answered && isRight ? '✓' : answered && isThis && !isRight ? '✗' : String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-3 overflow-hidden"
          >
            <div
              className={`rounded-lg px-3 py-2 text-[12px] leading-relaxed ${
                isCorrect
                  ? 'bg-emerald-100/80 text-emerald-800'
                  : 'bg-amber-100/80 text-amber-800'
              }`}
            >
              <span className="font-bold">
                {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
              </span>{' '}
              {quiz.explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
