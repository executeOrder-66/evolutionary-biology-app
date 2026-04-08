import NarrativeStoryShell from './NarrativeStoryShell';
import type { StoryConfig, StoryNode } from './NarrativeStoryShell';

// ─── Trait colors & labels ───

const RES_COLOR: Record<string, string> = {
  none: '#94a3b8',
  small: '#86efac',
  medium: '#22c55e',
  high: '#166534',
};

const RES_LABEL: Record<string, string> = {
  none: '',
  small: 'S',
  medium: 'M',
  high: 'H',
};

// ─── Node builders ───

function buildPhase1(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    n('p1-A', 0, null, 'none', true),
    n('p1-B', 1, 'p1-A', 'none', true),
    n('p1-C', 1, 'p1-A', 'none', true),
    n('p1-D', 2, 'p1-B', 'none', true),
    n('p1-E', 2, 'p1-B', 'none', true),
    n('p1-F', 2, 'p1-C', 'none', true),
    n('p1-G', 2, 'p1-C', 'none', true),
    n('p1-H', 3, 'p1-D', 'none', true),
    n('p1-I', 3, 'p1-D', 'none', true),
    n('p1-J', 3, 'p1-E', 'none', true),
    n('p1-K', 3, 'p1-E', 'none', true),
    n('p1-L', 3, 'p1-F', 'none', true),
    n('p1-M', 3, 'p1-F', 'medium', true, { mutationEvent: true }),
    n('p1-N', 3, 'p1-G', 'none', true),
    n('p1-O', 3, 'p1-G', 'none', true),
  ];
}

function buildPhase2(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    n('p2-F', 0, null, 'none', true),
    n('p2-L', 1, 'p2-F', 'none', true),
    n('p2-M', 1, 'p2-F', 'medium', true, { mutationEvent: true }),
    n('p2-L1', 2, 'p2-L', 'none', true),
    n('p2-L2', 2, 'p2-L', 'none', true),
    n('p2-M1', 2, 'p2-M', 'medium', true),
    n('p2-M2', 2, 'p2-M', 'medium', true),
    n('p2-L1a', 3, 'p2-L1', 'none', true),
    n('p2-L1b', 3, 'p2-L1', 'none', false, { deathCause: 'natural' }),
    n('p2-L2a', 3, 'p2-L2', 'none', true),
    n('p2-L2b', 3, 'p2-L2', 'none', true),
    n('p2-M1a', 3, 'p2-M1', 'medium', true),
    n('p2-M1b', 3, 'p2-M1', 'medium', true),
    n('p2-M2a', 3, 'p2-M2', 'medium', true),
    n('p2-M2b', 3, 'p2-M2', 'medium', false, { deathCause: 'natural' }),
    n('p2-L1a1', 4, 'p2-L1a', 'none', false, { deathCause: 'antibiotic' }),
    n('p2-L1a2', 4, 'p2-L1a', 'none', false, { deathCause: 'antibiotic' }),
    n('p2-L2a1', 4, 'p2-L2a', 'none', false, { deathCause: 'antibiotic' }),
    n('p2-L2a2', 4, 'p2-L2a', 'none', false, { deathCause: 'antibiotic' }),
    n('p2-L2b1', 4, 'p2-L2b', 'none', false, { deathCause: 'antibiotic' }),
    n('p2-L2b2', 4, 'p2-L2b', 'none', false, { deathCause: 'antibiotic' }),
    n('p2-M1a1', 4, 'p2-M1a', 'medium', true),
    n('p2-M1a2', 4, 'p2-M1a', 'medium', true),
    n('p2-M1b1', 4, 'p2-M1b', 'medium', true),
    n('p2-M1b2', 4, 'p2-M1b', 'medium', false, { deathCause: 'antibiotic' }),
    n('p2-M2a1', 4, 'p2-M2a', 'medium', true),
    n('p2-M2a2', 4, 'p2-M2a', 'medium', true),
    n('p2-a', 5, 'p2-M1a1', 'medium', true),
    n('p2-b', 5, 'p2-M1a1', 'medium', true),
    n('p2-c', 5, 'p2-M1a2', 'medium', true),
    n('p2-d', 5, 'p2-M1a2', 'medium', false, { deathCause: 'antibiotic' }),
    n('p2-e', 5, 'p2-M1b1', 'medium', true),
    n('p2-f', 5, 'p2-M1b1', 'medium', true),
    n('p2-g', 5, 'p2-M2a1', 'medium', true),
    n('p2-h', 5, 'p2-M2a1', 'medium', true),
    n('p2-i', 5, 'p2-M2a2', 'medium', true),
    n('p2-j', 5, 'p2-M2a2', 'medium', false, { deathCause: 'antibiotic' }),
    n('p2-a1', 6, 'p2-a', 'high', true, { mutationEvent: true }),
    n('p2-a2', 6, 'p2-a', 'medium', true),
    n('p2-b1', 6, 'p2-b', 'medium', true),
    n('p2-b2', 6, 'p2-b', 'medium', false, { deathCause: 'antibiotic' }),
    n('p2-c1', 6, 'p2-c', 'medium', true),
    n('p2-c2', 6, 'p2-c', 'small', false, { deathCause: 'antibiotic', mutationEvent: true }),
    n('p2-e1', 6, 'p2-e', 'medium', true),
    n('p2-e2', 6, 'p2-e', 'high', true, { mutationEvent: true }),
    n('p2-f1', 6, 'p2-f', 'medium', true),
    n('p2-f2', 6, 'p2-f', 'medium', true),
    n('p2-g1', 6, 'p2-g', 'medium', true),
    n('p2-g2', 6, 'p2-g', 'small', true, { mutationEvent: true }),
    n('p2-h1', 6, 'p2-h', 'high', true, { mutationEvent: true }),
    n('p2-h2', 6, 'p2-h', 'medium', true),
    n('p2-i1', 6, 'p2-i', 'medium', true),
    n('p2-i2', 6, 'p2-i', 'medium', true),
  ];
}

function buildPhase3(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    n('p3-root', 0, null, 'medium', true),
    n('p3-g', 1, 'p3-root', 'medium', true),
    n('p3-h', 1, 'p3-root', 'medium', true),
    n('p3-g1', 2, 'p3-g', 'medium', true),
    n('p3-g2', 2, 'p3-g', 'small', true, { mutationEvent: true }),
    n('p3-h1', 2, 'p3-h', 'high', true, { mutationEvent: true }),
    n('p3-h2', 2, 'p3-h', 'medium', true),
    n('p3-g1a', 3, 'p3-g1', 'medium', true),
    n('p3-g1b', 3, 'p3-g1', 'medium', false, { deathCause: 'antibiotic' }),
    n('p3-g2a', 3, 'p3-g2', 'small', false, { deathCause: 'antibiotic' }),
    n('p3-g2b', 3, 'p3-g2', 'small', false, { deathCause: 'antibiotic' }),
    n('p3-h1a', 3, 'p3-h1', 'high', true),
    n('p3-h1b', 3, 'p3-h1', 'high', true),
    n('p3-h2a', 3, 'p3-h2', 'medium', true),
    n('p3-h2b', 3, 'p3-h2', 'medium', false, { deathCause: 'antibiotic' }),
    n('p3-g1a1', 4, 'p3-g1a', 'medium', true),
    n('p3-g1a2', 4, 'p3-g1a', 'medium', false, { deathCause: 'antibiotic' }),
    n('p3-h1a1', 4, 'p3-h1a', 'high', true),
    n('p3-h1a2', 4, 'p3-h1a', 'high', true),
    n('p3-h1b1', 4, 'p3-h1b', 'high', true),
    n('p3-h1b2', 4, 'p3-h1b', 'high', true),
    n('p3-h2a1', 4, 'p3-h2a', 'medium', true),
    n('p3-h2a2', 4, 'p3-h2a', 'medium', false, { deathCause: 'antibiotic' }),
    n('p3-gx1', 5, 'p3-g1a1', 'medium', false, { deathCause: 'antibiotic' }),
    n('p3-gx2', 5, 'p3-g1a1', 'medium', false, { deathCause: 'antibiotic' }),
    n('p3-ha1', 5, 'p3-h1a1', 'high', true),
    n('p3-ha2', 5, 'p3-h1a1', 'high', true),
    n('p3-ha3', 5, 'p3-h1a2', 'high', true),
    n('p3-ha4', 5, 'p3-h1a2', 'high', true),
    n('p3-hb1', 5, 'p3-h1b1', 'high', true),
    n('p3-hb2', 5, 'p3-h1b1', 'high', true),
    n('p3-hb3', 5, 'p3-h1b2', 'high', true),
    n('p3-hb4', 5, 'p3-h1b2', 'high', true),
    n('p3-hx1', 5, 'p3-h2a1', 'medium', false, { deathCause: 'antibiotic' }),
    n('p3-hx2', 5, 'p3-h2a1', 'medium', true),
  ];
}

// ─── Config ───

const bacteriaConfig: StoryConfig = {
  title: 'From One Bacterium to Superbug',
  phaseLabels: ['Part 1 \u2014 Origin', 'Part 2 \u2014 Selection', 'Part 3 \u2014 Domination'],
  ariaPrefix: 'Bacteria family tree',
  summaryTitle: 'Resistance Distribution \u2014 Final Generation',

  traitColors: RES_COLOR,
  traitLabels: RES_LABEL,
  legend: [
    { key: 'none', label: 'No Resistance' },
    { key: 'small', label: 'Small (S)' },
    { key: 'medium', label: 'Medium (M)' },
    { key: 'high', label: 'High (H)' },
  ],

  buildPhase1,
  buildPhase2,
  buildPhase3,

  highlights: [
    { atStep: 4, nodeIds: ['p1-F', 'p1-L', 'p1-M'] },
    { atStep: 11, nodeIds: ['p2-M2a1', 'p2-g', 'p2-h', 'p2-g1', 'p2-g2', 'p2-h1', 'p2-h2'] },
  ],

  eventLine: { p2Gen: 4, label: '\uD83D\uDC8A Antibiotics', color: '#ef4444' },
  eventBadge: {
    label: 'Antibiotics Active',
    className: 'flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100',
    dotClassName: 'h-1.5 w-1.5 animate-pulse rounded-full bg-red-500',
  },

  soundMap: { 3: 'mutation', 8: 'alert', 10: 'mutation', 16: 'complete' },

  narratives: [
    {
      title: 'A Single Bacterium',
      text: "Our story begins with a single bacterium. It has no antibiotic resistance \u2014 just an ordinary microbe. Like all bacteria, it will reproduce by splitting in two (binary fission).",
    },
    {
      title: 'First Division',
      text: "The bacterium has divided into two identical daughter cells. Both are genetic copies of the parent with no resistance. This is how bacteria normally reproduce \u2014 quickly and without sexual reproduction.",
    },
    {
      title: 'Second Division',
      text: 'Each daughter has divided again. We now have four bacteria, all genetically similar. So far, nothing unusual \u2014 just normal bacterial growth.',
    },
    {
      title: '\u26A1 A Mutation Appears!',
      text: "Another round of division produces eight bacteria. But look \u2014 one daughter cell (glowing ring) has developed a random mutation giving it medium antibiotic resistance (M)! Mutations happen randomly during DNA replication. Most are harmless, but this one will matter.",
    },
    {
      title: '\uD83D\uDD0D Focusing on the Key Branch',
      text: "The population is growing fast. To follow the story of resistance, let\u2019s zoom into the highlighted branch \u2014 the parent that produced both a normal daughter and the resistant mutant. This is where the drama unfolds.",
    },
    {
      title: 'The Focused Branch',
      text: "Here\u2019s our focused view. The parent had two daughters: one with no resistance (left) and one carrying the medium resistance mutation (right, marked M). Both will grow their own lineages side by side.",
    },
    {
      title: 'Both Lineages Grow',
      text: "Both branches have divided again. The non-resistant lineage (gray) and the resistant lineage (green) are growing equally. Without antibiotics, the resistance mutation offers no advantage \u2014 it\u2019s just a neutral difference.",
    },
    {
      title: 'Normal Growth Continues',
      text: "Growth continues, but a couple of bacteria die from natural causes \u2014 competition for nutrients, random cell damage. Marked with \u2715. Both lineages still have healthy populations. Everything seems peaceful\u2026",
    },
    {
      title: '\uD83D\uDC8A Antibiotics Strike!',
      text: "A dose of antibiotics hits the population! Non-resistant bacteria are killed instantly (red \u2715). Most medium-resistant bacteria survive, but even some can\u2019t fully withstand the drug. This is natural selection in action: the environment changed, and only the adapted survive.",
    },
    {
      title: 'The Resistant Survivors Multiply',
      text: "The surviving medium-resistant bacteria continue dividing. Antibiotics are still present, occasionally killing the less fortunate ones. But the resistant lineage is recovering while the non-resistant lineage is completely gone.",
    },
    {
      title: '\uD83E\uDDEC New Mutations Emerge!',
      text: "Random mutations are creating variation in resistance levels! Some develop high resistance (H, dark green) \u2014 nearly immune. Others mutate to lower resistance (S, light green) \u2014 and the antibiotics kill them. Most stay at medium (M). This variation sets the stage for another round of selection.",
    },
    {
      title: '\uD83D\uDD0D Zooming Into the Competition',
      text: "The tree is getting crowded. To watch the three resistance levels compete, let\u2019s focus on the highlighted branch \u2014 the most recent ancestor that has High (H), Medium (M), and Small (S) resistant descendants. This is where the final showdown happens.",
    },
    {
      title: 'Three Resistance Levels, One Branch',
      text: "Here\u2019s our focused subtree. The root (M) had two medium-resistant children. By the current generation, mutations have produced three different resistance levels: High (H, dark green), Medium (M, green), and Small (S, light green). With antibiotics still raging, who will dominate?",
    },
    {
      title: '\u2620\uFE0F Small Resistance Eliminated',
      text: "The answer comes fast. Small-resistant bacteria (S) are killed immediately \u2014 they simply can\u2019t withstand the antibiotic dose. Both are gone in one generation. High-resistant (H) bacteria divide freely, producing two healthy offspring each. Medium-resistant (M) are under pressure \u2014 some survive, some don\u2019t.",
    },
    {
      title: 'High Resistance Takes the Lead',
      text: "High-resistant bacteria now outnumber medium-resistant ones 4 to 2. The H strain divides freely while antibiotics keep picking off M bacteria. This is natural selection within the resistant population itself \u2014 a second round of the same process.",
    },
    {
      title: '\uD83D\uDC51 The Superbug Wins',
      text: "The high-resistant strain (H) now dominates overwhelmingly \u2014 8 out of 9 survivors carry high resistance. The last medium-resistant bacterium is barely hanging on. Every generation of antibiotic exposure pushes the population toward higher and higher resistance.",
    },
    {
      title: '\uD83D\uDCCA The Full Journey',
      text: "From one ordinary bacterium to a population dominated by highly resistant superbugs. The journey reveals evolution\u2019s core mechanism: variation (random mutations) + selection (antibiotics) = adaptation (resistance). This is happening right now in hospitals worldwide.",
    },
  ],

  quizzes: [
    {
      atStep: 3,
      question: 'This mutation gave one bacterium medium resistance. Did the bacterium "choose" to become resistant?',
      options: [
        'Yes \u2014 it needed protection so it evolved',
        'No \u2014 the mutation was a random copying error during DNA replication',
        'Yes \u2014 bacteria can sense threats and adapt',
      ],
      correctIndex: 1,
      explanation:
        'Mutations are random errors that happen during DNA copying. The bacterium didn\'t "decide" to become resistant \u2014 it just got lucky. Evolution works by selecting among existing random variation.',
    },
    {
      atStep: 8,
      question: 'Why did ALL non-resistant bacteria die when antibiotics were introduced?',
      options: [
        'The antibiotics changed their DNA',
        'They chose not to resist',
        'They had no protection \u2014 the drug killed them before they could reproduce',
      ],
      correctIndex: 2,
      explanation:
        'Antibiotics don\'t change DNA \u2014 they kill bacteria that lack protection. Non-resistant bacteria simply couldn\'t survive the drug. This is natural selection: the environment (antibiotics) determines who lives and dies.',
    },
    {
      atStep: 13,
      question: 'Why are the Small-resistant (S) bacteria being eliminated even though they have SOME resistance?',
      options: [
        'The antibiotics are too strong for their level of resistance',
        'They forgot how to reproduce',
        'The High-resistant bacteria are attacking them',
      ],
      correctIndex: 0,
      explanation:
        'Having "some" resistance isn\'t enough if the antibiotic is strong. Only bacteria with resistance above the antibiotic threshold survive well. This is why antibiotic-resistant superbugs keep getting MORE resistant over time \u2014 each round of selection raises the bar.',
    },
    {
      atStep: 16,
      question: 'If hospitals stopped using antibiotics entirely, what would likely happen over many generations?',
      options: [
        'Nothing \u2014 resistance is permanent',
        'Resistant bacteria would stay dominant forever',
        'Non-resistant bacteria might make a comeback, since resistance has a small energy cost when antibiotics are absent',
      ],
      correctIndex: 2,
      explanation:
        'Resistance costs energy to maintain. Without antibiotic pressure, that cost becomes a disadvantage. Over time, non-resistant bacteria (which don\'t waste energy on defenses) could outcompete resistant ones. This is exactly what happened with peppered moths when pollution was cleaned up!',
    },
  ],

  summary: [
    { label: 'High (H)', count: 8, color: RES_COLOR.high, max: 9 },
    { label: 'Medium (M)', count: 1, color: RES_COLOR.medium, max: 9 },
    { label: 'Small (S)', count: 0, color: RES_COLOR.small, max: 9, extinct: true },
    { label: 'None', count: 0, color: RES_COLOR.none, max: 9, extinct: true },
  ],

  nodeColor: (n: StoryNode) => {
    if (n.alive) return RES_COLOR[n.trait] ?? '#999';
    return n.deathCause === 'antibiotic' ? '#fecaca' : '#e5e7eb';
  },
  nodeStroke: (n: StoryNode) => {
    if (n.alive) return 'none';
    return n.deathCause === 'antibiotic' ? '#f87171' : '#d1d5db';
  },
  nodeStrokeWidth: (n: StoryNode) => (n.alive ? 0 : 1.5),
  nodeLabelColor: () => 'white',
  edgeColor: (n: StoryNode) => {
    if (n.alive) return RES_COLOR[n.trait] ?? '#999';
    return n.deathCause === 'antibiotic' ? '#fca5a5' : '#d1d5db';
  },
  deadTextColor: (n: StoryNode) =>
    n.deathCause === 'antibiotic' ? '#ef4444' : '#9ca3af',
  nodeAriaLabel: (n: StoryNode) =>
    `Bacterium, ${n.trait} resistance, ${n.alive ? 'alive' : 'dead'}${n.mutationEvent ? ', mutation' : ''}`,

  theme: {
    playBtnBg: 'bg-emerald-500',
    playBtnHover: 'bg-emerald-600',
    narrativeBorder: 'border-emerald-100',
    narrativeBg: 'bg-emerald-50/60',
    narrativeText: 'text-emerald-800',
    narrativeBold: 'text-emerald-700',
    svgBg: '#f9fafb',
    highlightColor: '#22c55e',
    toolBtnBg: 'bg-gray-100',
    toolBtnHover: 'bg-gray-200',
    toolBtnText: 'text-gray-500',
    stepBg: 'bg-gray-100',
    stepText: 'text-gray-600',
    quizTheme: 'emerald',
  },
};

export default function NarrativeSimulation() {
  return <NarrativeStoryShell config={bacteriaConfig} />;
}
