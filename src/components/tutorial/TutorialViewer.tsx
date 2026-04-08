import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Chapter } from '../../types/tutorial';
import TutorialDiagram from './TutorialDiagrams';
import { useProgressStore } from '../../store/progressStore';

interface TutorialViewerProps {
  chapter: Chapter;
  onClose: () => void;
}

export default function TutorialViewer({ chapter, onClose }: TutorialViewerProps) {
  const [lessonIdx, setLessonIdx] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const markLessonComplete = useProgressStore((s) => s.markLessonComplete);

  // Mark lesson complete when user views it
  useEffect(() => {
    markLessonComplete(chapter.id, lessonIdx);
  }, [chapter.id, lessonIdx, markLessonComplete]);

  const lesson = chapter.lessons[lessonIdx];
  const page = lesson.pages[pageIdx];

  const totalPages = chapter.lessons.reduce((s, l) => s + l.pages.length, 0);
  const currentPageGlobal =
    chapter.lessons.slice(0, lessonIdx).reduce((s, l) => s + l.pages.length, 0) +
    pageIdx +
    1;

  const canPrev = pageIdx > 0 || lessonIdx > 0;
  const canNext =
    pageIdx < lesson.pages.length - 1 ||
    lessonIdx < chapter.lessons.length - 1;

  function goNext() {
    setDirection(1);
    if (pageIdx < lesson.pages.length - 1) {
      setPageIdx(pageIdx + 1);
    } else if (lessonIdx < chapter.lessons.length - 1) {
      setLessonIdx(lessonIdx + 1);
      setPageIdx(0);
    }
  }

  function goPrev() {
    setDirection(-1);
    if (pageIdx > 0) {
      setPageIdx(pageIdx - 1);
    } else if (lessonIdx > 0) {
      const prevLesson = chapter.lessons[lessonIdx - 1];
      setLessonIdx(lessonIdx - 1);
      setPageIdx(prevLesson.pages.length - 1);
    }
  }

  function goToLesson(idx: number) {
    setDirection(idx > lessonIdx ? 1 : -1);
    setLessonIdx(idx);
    setPageIdx(0);
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden">
      {/* Top bar — fixed in grid row */}
      <div className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {chapter.icon} {chapter.title}
              </h2>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                Lesson {lessonIdx + 1}/{chapter.lessons.length}: {lesson.title}
              </p>
            </div>
          </div>

          <span className="text-[12px] tabular-nums text-gray-400 dark:text-gray-500">
            {currentPageGlobal} / {totalPages}
          </span>
        </div>

        {/* Lesson tabs */}
        <div className="mx-auto max-w-3xl overflow-x-auto px-6 pb-2">
          <div className="flex gap-1">
            {chapter.lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => goToLesson(i)}
                className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                  i === lessonIdx
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : i < lessonIdx
                      ? 'text-emerald-500 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                      : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-1">{l.icon}</span>
                {l.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page content — scrollable middle area */}
      <div className="overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-6 py-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${lessonIdx}-${pageIdx}`}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25 }}
          >
            {/* Illustration emoji (only if no diagram) */}
            {page.illustration && !page.diagramId && (
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-3xl">
                {page.illustration}
              </div>
            )}

            {/* Title */}
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              {page.title}
            </h3>

            {/* Diagram */}
            {page.diagramId && <TutorialDiagram id={page.diagramId} />}

            {/* Body text */}
            <div className="space-y-4 text-[16px] leading-relaxed text-gray-600 dark:text-gray-300">
              {renderContent(page.content)}
            </div>

            {/* Key term callout */}
            {page.keyTerm && (
              <div className="mt-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-900/20 px-5 py-4">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Key Term
                </p>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  {page.keyTerm.term}
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-emerald-700 dark:text-emerald-300">
                  {page.keyTerm.definition}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      </div>

      {/* Bottom navigation — pinned to bottom by grid */}
      <div className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-25 disabled:hover:bg-transparent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>

          {/* Progress dots */}
          <div className="flex gap-0.5">
            {chapter.lessons.map((l, li) =>
              l.pages.map((_, pi) => {
                const idx =
                  chapter.lessons
                    .slice(0, li)
                    .reduce((s, ll) => s + ll.pages.length, 0) + pi;
                const isCurrent = idx === currentPageGlobal - 1;
                const isPast = idx < currentPageGlobal - 1;
                return (
                  <div
                    key={`${li}-${pi}`}
                    className={`h-1.5 rounded-full transition-all ${
                      isCurrent
                        ? 'w-4 bg-emerald-500'
                        : isPast
                          ? 'w-1.5 bg-emerald-300'
                          : 'w-1.5 bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                );
              })
            )}
          </div>

          {canNext ? (
            <button
              onClick={goNext}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
            >
              Next
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
            >
              Done
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Render plain-text content with paragraph breaks and simple bullet lists. */
function renderContent(text: string) {
  const blocks = text.split('\n\n');
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    const lines = trimmed.split('\n');
    const isList = lines.every(
      (l) => l.trim().startsWith('•') || l.trim().startsWith('-') || /^\d+\.\s/.test(l.trim())
    );

    if (isList) {
      return (
        <ul key={i} className="space-y-2 pl-1">
          {lines.map((line, j) => (
            <li key={j} className="flex gap-2.5 text-[16px] leading-relaxed text-gray-600 dark:text-gray-300">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                {/^\d+\./.test(line.trim())
                  ? line.trim().match(/^(\d+)/)?.[1]
                  : '•'}
              </span>
              <span>
                {line
                  .trim()
                  .replace(/^[•-]\s*/, '')
                  .replace(/^\d+\.\s*/, '')}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-[16px] leading-relaxed text-gray-600 dark:text-gray-300">
        {trimmed}
      </p>
    );
  });
}
