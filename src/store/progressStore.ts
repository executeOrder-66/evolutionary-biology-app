import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressStore {
  // Tutorial completion: chapterId → set of completed lesson indices
  completedLessons: Record<string, number[]>;
  // Quiz scores: storyId → array of { questionIndex, correct }
  quizResults: Record<string, { questionIndex: number; correct: boolean }[]>;
  // Stories completed
  completedStories: string[];
  // Simulations run (scenarioId → highest generation reached)
  simulationProgress: Record<string, number>;

  // Actions
  markLessonComplete: (chapterId: string, lessonIndex: number) => void;
  recordQuizAnswer: (storyId: string, questionIndex: number, correct: boolean) => void;
  markStoryComplete: (storyId: string) => void;
  updateSimulationProgress: (scenarioId: string, generation: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      quizResults: {},
      completedStories: [],
      simulationProgress: {},

      markLessonComplete: (chapterId, lessonIndex) => {
        const current = get().completedLessons[chapterId] ?? [];
        if (current.includes(lessonIndex)) return;
        set({
          completedLessons: {
            ...get().completedLessons,
            [chapterId]: [...current, lessonIndex],
          },
        });
      },

      recordQuizAnswer: (storyId, questionIndex, correct) => {
        const current = get().quizResults[storyId] ?? [];
        const filtered = current.filter((r) => r.questionIndex !== questionIndex);
        set({
          quizResults: {
            ...get().quizResults,
            [storyId]: [...filtered, { questionIndex, correct }],
          },
        });
      },

      markStoryComplete: (storyId) => {
        const current = get().completedStories;
        if (current.includes(storyId)) return;
        set({ completedStories: [...current, storyId] });
      },

      updateSimulationProgress: (scenarioId, generation) => {
        const current = get().simulationProgress[scenarioId] ?? 0;
        if (generation <= current) return;
        set({
          simulationProgress: {
            ...get().simulationProgress,
            [scenarioId]: generation,
          },
        });
      },

      resetProgress: () =>
        set({
          completedLessons: {},
          quizResults: {},
          completedStories: [],
          simulationProgress: {},
        }),
    }),
    {
      name: 'evosim-progress',
      storage: createJSONStorage(() => {
        try { return localStorage; } catch { return undefined as unknown as Storage; }
      }),
    }
  )
);
