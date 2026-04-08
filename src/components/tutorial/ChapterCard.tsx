import { motion } from 'framer-motion';
import type { Chapter } from '../../types/tutorial';

interface ChapterCardProps {
  chapter: Chapter;
  onOpen: () => void;
}

export default function ChapterCard({ chapter, onOpen }: ChapterCardProps) {
  const totalPages = chapter.lessons.reduce((s, l) => s + l.pages.length, 0);

  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="card-elevated group relative w-full overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-6 text-left"
    >
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />

      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
          {chapter.icon}
        </span>
        <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
          {chapter.lessons.length} lessons &middot; {totalPages} pages
        </span>
      </div>

      <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
        {chapter.title}
      </h3>
      <p className="mb-4 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
        {chapter.description}
      </p>

      {/* Lesson preview */}
      <div className="space-y-1.5">
        {chapter.lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500"
          >
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100/60 dark:bg-emerald-900/40 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              {i + 1}
            </span>
            <span>{lesson.icon}</span>
            <span>{lesson.title}</span>
            <span className="text-[10px] text-gray-300 dark:text-gray-600">
              ({lesson.pages.length} pages)
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Start learning
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </motion.button>
  );
}
