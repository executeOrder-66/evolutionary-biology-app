import { useProgressStore } from '../../store/progressStore';

interface TutorialBadgeProps {
  type: 'tutorial';
  chapterId: string;
  totalLessons: number;
}

interface StoryBadgeProps {
  type: 'story';
  storyId: string;
}

interface SimulationBadgeProps {
  type: 'simulation';
  scenarioId: string;
  maxGenerations: number;
}

type ProgressBadgeProps = TutorialBadgeProps | StoryBadgeProps | SimulationBadgeProps;

export default function ProgressBadge(props: ProgressBadgeProps) {
  const { completedLessons, completedStories, simulationProgress } =
    useProgressStore();

  if (props.type === 'tutorial') {
    const done = completedLessons[props.chapterId]?.length ?? 0;
    if (done === 0) return null;
    const allDone = done >= props.totalLessons;
    return (
      <span
        className={`absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold ${
          allDone
            ? 'bg-emerald-500 text-white'
            : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        {allDone ? '\u2713' : `${done}/${props.totalLessons}`}
      </span>
    );
  }

  if (props.type === 'story') {
    if (!completedStories.includes(props.storyId)) return null;
    return (
      <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
        \u2713 Done
      </span>
    );
  }

  if (props.type === 'simulation') {
    const gen = simulationProgress[props.scenarioId] ?? 0;
    if (gen === 0) return null;
    const allDone = gen >= props.maxGenerations;
    return (
      <span
        className={`absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold ${
          allDone
            ? 'bg-emerald-500 text-white'
            : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        {allDone ? '\u2713' : `Gen ${gen}/${props.maxGenerations}`}
      </span>
    );
  }

  return null;
}
