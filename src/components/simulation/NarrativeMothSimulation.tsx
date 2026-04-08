import NarrativeStoryShell from './NarrativeStoryShell';
import type { StoryConfig, StoryNode } from './NarrativeStoryShell';

// ─── Trait colors & labels ───

const COL_COLOR: Record<string, string> = {
  light: '#e8d5b5',
  spotted: '#a07850',
  dark: '#5c3318',
  melanic: '#1a1210',
};

const COL_LABEL: Record<string, string> = {
  light: '',
  spotted: 'S',
  dark: 'D',
  melanic: 'B',
};

// ─── Node builders ───

function buildPhase1(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    n('p1-A', 0, null, 'light', true),
    n('p1-B', 1, 'p1-A', 'light', true),
    n('p1-C', 1, 'p1-A', 'light', true),
    n('p1-D', 2, 'p1-B', 'light', true),
    n('p1-E', 2, 'p1-B', 'light', true),
    n('p1-F', 2, 'p1-C', 'light', true),
    n('p1-G', 2, 'p1-C', 'light', true),
    n('p1-H', 3, 'p1-D', 'light', true),
    n('p1-I', 3, 'p1-D', 'light', true),
    n('p1-J', 3, 'p1-E', 'spotted', false, { mutationEvent: true, deathCause: 'predation' }),
    n('p1-K', 3, 'p1-E', 'light', true),
    n('p1-L', 3, 'p1-F', 'light', true),
    n('p1-M', 3, 'p1-F', 'spotted', true, { mutationEvent: true }),
    n('p1-N', 3, 'p1-G', 'light', true),
    n('p1-O', 3, 'p1-G', 'light', true),
  ];
}

function buildPhase2(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    n('p2-F', 0, null, 'light', true),
    n('p2-L', 1, 'p2-F', 'light', true),
    n('p2-M', 1, 'p2-F', 'spotted', true, { mutationEvent: true }),
    n('p2-L1', 2, 'p2-L', 'light', true),
    n('p2-L2', 2, 'p2-L', 'light', true),
    n('p2-M1', 2, 'p2-M', 'spotted', true),
    n('p2-M2', 2, 'p2-M', 'spotted', true),
    n('p2-L1a', 3, 'p2-L1', 'light', true),
    n('p2-L1b', 3, 'p2-L1', 'light', false, { deathCause: 'natural' }),
    n('p2-L2a', 3, 'p2-L2', 'light', true),
    n('p2-L2b', 3, 'p2-L2', 'light', true),
    n('p2-M1a', 3, 'p2-M1', 'spotted', true),
    n('p2-M1b', 3, 'p2-M1', 'spotted', true),
    n('p2-M2a', 3, 'p2-M2', 'spotted', true),
    n('p2-M2b', 3, 'p2-M2', 'spotted', false, { deathCause: 'natural' }),
    n('p2-L1a1', 4, 'p2-L1a', 'light', false, { deathCause: 'predation' }),
    n('p2-L1a2', 4, 'p2-L1a', 'light', false, { deathCause: 'predation' }),
    n('p2-L2a1', 4, 'p2-L2a', 'light', false, { deathCause: 'predation' }),
    n('p2-L2a2', 4, 'p2-L2a', 'light', false, { deathCause: 'predation' }),
    n('p2-L2b1', 4, 'p2-L2b', 'light', false, { deathCause: 'predation' }),
    n('p2-L2b2', 4, 'p2-L2b', 'light', false, { deathCause: 'predation' }),
    n('p2-M1a1', 4, 'p2-M1a', 'spotted', true),
    n('p2-M1a2', 4, 'p2-M1a', 'spotted', true),
    n('p2-M1b1', 4, 'p2-M1b', 'spotted', true),
    n('p2-M1b2', 4, 'p2-M1b', 'spotted', false, { deathCause: 'predation' }),
    n('p2-M2a1', 4, 'p2-M2a', 'spotted', true),
    n('p2-M2a2', 4, 'p2-M2a', 'spotted', true),
    n('p2-a', 5, 'p2-M1a1', 'spotted', true),
    n('p2-b', 5, 'p2-M1a1', 'spotted', true),
    n('p2-c', 5, 'p2-M1a2', 'spotted', true),
    n('p2-d', 5, 'p2-M1a2', 'spotted', false, { deathCause: 'predation' }),
    n('p2-e', 5, 'p2-M1b1', 'spotted', true),
    n('p2-f', 5, 'p2-M1b1', 'spotted', true),
    n('p2-g', 5, 'p2-M2a1', 'spotted', true),
    n('p2-h', 5, 'p2-M2a1', 'spotted', true),
    n('p2-i', 5, 'p2-M2a2', 'spotted', true),
    n('p2-j', 5, 'p2-M2a2', 'spotted', false, { deathCause: 'predation' }),
    n('p2-a1', 6, 'p2-a', 'melanic', true, { mutationEvent: true }),
    n('p2-a2', 6, 'p2-a', 'spotted', true),
    n('p2-b1', 6, 'p2-b', 'spotted', true),
    n('p2-b2', 6, 'p2-b', 'spotted', false, { deathCause: 'predation' }),
    n('p2-c1', 6, 'p2-c', 'spotted', true),
    n('p2-c2', 6, 'p2-c', 'light', false, { deathCause: 'predation', mutationEvent: true }),
    n('p2-e1', 6, 'p2-e', 'spotted', true),
    n('p2-e2', 6, 'p2-e', 'dark', true, { mutationEvent: true }),
    n('p2-f1', 6, 'p2-f', 'spotted', true),
    n('p2-f2', 6, 'p2-f', 'spotted', true),
    n('p2-g1', 6, 'p2-g', 'spotted', true),
    n('p2-g2', 6, 'p2-g', 'dark', true, { mutationEvent: true }),
    n('p2-h1', 6, 'p2-h', 'melanic', true, { mutationEvent: true }),
    n('p2-h2', 6, 'p2-h', 'spotted', true),
    n('p2-i1', 6, 'p2-i', 'spotted', true),
    n('p2-i2', 6, 'p2-i', 'spotted', true),
  ];
}

function buildPhase3(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    n('p3-root', 0, null, 'spotted', true),
    n('p3-g', 1, 'p3-root', 'spotted', true),
    n('p3-h', 1, 'p3-root', 'spotted', true),
    n('p3-g1', 2, 'p3-g', 'spotted', true),
    n('p3-g2', 2, 'p3-g', 'dark', true, { mutationEvent: true }),
    n('p3-h1', 2, 'p3-h', 'melanic', true, { mutationEvent: true }),
    n('p3-h2', 2, 'p3-h', 'spotted', true),
    n('p3-g1a', 3, 'p3-g1', 'spotted', true),
    n('p3-g1b', 3, 'p3-g1', 'spotted', false, { deathCause: 'predation' }),
    n('p3-g2a', 3, 'p3-g2', 'dark', true),
    n('p3-g2b', 3, 'p3-g2', 'dark', true),
    n('p3-h1a', 3, 'p3-h1', 'melanic', true),
    n('p3-h1b', 3, 'p3-h1', 'melanic', true),
    n('p3-h2a', 3, 'p3-h2', 'spotted', false, { deathCause: 'predation' }),
    n('p3-h2b', 3, 'p3-h2', 'spotted', false, { deathCause: 'predation' }),
    n('p3-g1a1', 4, 'p3-g1a', 'spotted', false, { deathCause: 'predation' }),
    n('p3-g1a2', 4, 'p3-g1a', 'spotted', false, { deathCause: 'predation' }),
    n('p3-g2a1', 4, 'p3-g2a', 'dark', true),
    n('p3-g2a2', 4, 'p3-g2a', 'dark', false, { deathCause: 'predation' }),
    n('p3-g2b1', 4, 'p3-g2b', 'dark', true),
    n('p3-g2b2', 4, 'p3-g2b', 'dark', false, { deathCause: 'predation' }),
    n('p3-h1a1', 4, 'p3-h1a', 'melanic', true),
    n('p3-h1a2', 4, 'p3-h1a', 'melanic', true),
    n('p3-h1b1', 4, 'p3-h1b', 'melanic', true),
    n('p3-h1b2', 4, 'p3-h1b', 'melanic', true),
    n('p3-gx1', 5, 'p3-g2a1', 'dark', false, { deathCause: 'predation' }),
    n('p3-gx2', 5, 'p3-g2a1', 'dark', false, { deathCause: 'predation' }),
    n('p3-gx3', 5, 'p3-g2b1', 'dark', true),
    n('p3-gx4', 5, 'p3-g2b1', 'dark', false, { deathCause: 'predation' }),
    n('p3-ha1', 5, 'p3-h1a1', 'melanic', true),
    n('p3-ha2', 5, 'p3-h1a1', 'melanic', true),
    n('p3-ha3', 5, 'p3-h1a2', 'melanic', true),
    n('p3-ha4', 5, 'p3-h1a2', 'melanic', true),
    n('p3-hb1', 5, 'p3-h1b1', 'melanic', true),
    n('p3-hb2', 5, 'p3-h1b1', 'melanic', true),
    n('p3-hb3', 5, 'p3-h1b2', 'melanic', true),
    n('p3-hb4', 5, 'p3-h1b2', 'melanic', true),
  ];
}

// ─── Config ───

const mothConfig: StoryConfig = {
  title: 'The Peppered Moth Story',
  phaseLabels: ['Part 1 \u2014 Clean Forests', 'Part 2 \u2014 Pollution', 'Part 3 \u2014 Melanism'],
  ariaPrefix: 'Peppered moth family tree',
  summaryTitle: 'Coloration Distribution \u2014 Final Generation',

  traitColors: COL_COLOR,
  traitLabels: COL_LABEL,
  legend: [
    { key: 'light', label: 'Light (peppered)' },
    { key: 'spotted', label: 'Spotted (S)' },
    { key: 'dark', label: 'Dark (D)' },
    { key: 'melanic', label: 'Black (B)' },
  ],

  buildPhase1,
  buildPhase2,
  buildPhase3,

  highlights: [
    { atStep: 4, nodeIds: ['p1-F', 'p1-L', 'p1-M'] },
    { atStep: 11, nodeIds: ['p2-M2a1', 'p2-g', 'p2-h', 'p2-g1', 'p2-g2', 'p2-h1', 'p2-h2'] },
  ],

  eventLine: { p2Gen: 4, label: '\uD83C\uDFED Pollution', color: '#4b5563' },
  eventBadge: {
    label: 'Trees Darkened',
    className: 'flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 ring-1 ring-gray-200',
    dotClassName: 'h-1.5 w-1.5 animate-pulse rounded-full bg-gray-500',
  },

  svgBgWhenActive: '#e0dbd5',

  soundMap: { 3: 'mutation', 8: 'alert', 10: 'mutation', 16: 'complete' },

  narratives: [
    {
      title: 'A Single Peppered Moth',
      text: 'Our story begins with a single peppered moth resting on a lichen-covered tree trunk. Its light, speckled wings blend perfectly with the pale bark \u2014 almost invisible to hungry birds.',
    },
    {
      title: 'First Generation',
      text: 'The moth has produced two offspring. Both inherited their parent\u2019s light coloring. On clean, pale tree trunks, these moths are well-camouflaged and safe from predators.',
    },
    {
      title: 'Population Growing',
      text: 'The second generation brings four moths. All still carry the light peppered pattern \u2014 perfectly matched to the lichen-covered bark of pre-industrial England.',
    },
    {
      title: '\u26A1 A Dark Mutation!',
      text: 'Eight moths now \u2014 but look! Two have developed slightly darker wing patterns (glowing rings). On light bark, they stand out. A sharp-eyed bird spots one and eats it (red \u2715)! The other got lucky, hiding in a shadow. In clean forests, being darker is usually a death sentence.',
    },
    {
      title: '\uD83D\uDD0D Focusing on the Key Branch',
      text: 'The population keeps growing. Let\u2019s zoom into the highlighted branch \u2014 the parent that produced both a normal light moth and the surviving darker mutant. Will this dark mutation ever matter?',
    },
    {
      title: 'The Focused Branch',
      text: 'Here\u2019s our focused view. The parent moth had two offspring: one with normal light coloring (left) and one carrying the spotted mutation (right, marked S). In clean forests, both are doing fine for now.',
    },
    {
      title: 'Equal Growth',
      text: 'Both lineages have reproduced. Light moths (cream) and spotted moths (tan) are growing equally. Without any environmental change, the darker coloring offers no advantage \u2014 it\u2019s just a neutral variation.',
    },
    {
      title: 'Peaceful Times',
      text: 'Growth continues. A few moths die from natural causes \u2014 bats, storms, old age. Marked with \u2715. Both lineages still have healthy populations. The forests are clean, bark is pale, and all moths are well-hidden\u2026',
    },
    {
      title: '\uD83C\uDFED Industrial Pollution Arrives!',
      text: 'Factory smoke blackens the trees! Soot kills the pale lichen and darkens the bark. Suddenly, light-colored moths stand out like beacons \u2014 birds eat them all (red \u2715)! The spotted moths, being slightly darker, mostly survive. The environment has flipped who\u2019s camouflaged.',
    },
    {
      title: 'The Spotted Survivors',
      text: 'The surviving spotted moths continue breeding while every light moth is gone. Birds still occasionally catch the spotted ones \u2014 they\u2019re not perfectly camouflaged on dark bark, but they\u2019re far better hidden than the light form was.',
    },
    {
      title: '\uD83E\uDDEC New Variations Emerge!',
      text: 'Mutations are creating a range of darkness! Some become truly dark (D) \u2014 excellent camouflage on soot-covered bark. Others become fully melanic/black (B) \u2014 nearly invisible on darkened trees. One mutates back to light coloring \u2014 a bird catches it instantly.',
    },
    {
      title: '\uD83D\uDD0D Zooming Into the Competition',
      text: 'The tree is getting crowded. Let\u2019s focus on the highlighted branch \u2014 the most recent ancestor with Spotted (S), Dark (D), and Black (B) descendants. This is where the final contest for camouflage plays out.',
    },
    {
      title: 'Three Shades, One Branch',
      text: 'Here\u2019s our focused subtree. The root (spotted) had two children. By now, mutations have produced three coloration levels: Black (B, nearly invisible on dark bark), Dark (D, well-camouflaged), and Spotted (S, still partially visible). On soot-blackened trees, who blends in best?',
    },
    {
      title: '\u2620\uFE0F Spotted Moths Exposed',
      text: 'The answer is swift. Spotted moths (S) are still too light for darkened bark \u2014 birds pick most of them off. Black moths (B) are perfectly camouflaged and breed freely. Dark moths (D) do well but occasionally get caught. Nature is selecting for the darkest camouflage.',
    },
    {
      title: 'Black Moths Take Over',
      text: 'Black moths now outnumber dark moths 4 to 2. The last spotted moth has been caught. On soot-blackened bark, the darkest wings give the best hiding. This is industrial melanism \u2014 one of the most famous examples of evolution observed in real time.',
    },
    {
      title: '\uD83D\uDC51 The Black Form Dominates',
      text: 'Black moths make up 8 of the 9 survivors. The last dark moth is barely hanging on. In industrial England, peppered moth populations shifted from nearly all light to nearly all black in just decades \u2014 one of the fastest evolutionary changes ever documented.',
    },
    {
      title: '\uD83D\uDCCA The Full Journey',
      text: 'From a light peppered moth on clean bark to a population of nearly all-black moths on soot-darkened trees. The recipe: variation (random mutations in wing darkness) + selection (bird predation on visible moths) = adaptation (camouflage matching the environment). This was one of the first observed cases of natural selection in action.',
    },
  ],

  quizzes: [
    {
      atStep: 3,
      question: 'One spotted mutant was eaten by a bird, but the other survived. Why is being darker a disadvantage on light bark?',
      options: [
        'Dark moths are weaker than light moths',
        'Dark moths stand out on light bark, making them visible to predators',
        'Birds prefer the taste of dark moths',
      ],
      correctIndex: 1,
      explanation:
        'Camouflage is everything. On light, lichen-covered bark, a darker moth is like a dark spot on a white wall \u2014 easy for sharp-eyed birds to spot. Fitness depends on the environment!',
    },
    {
      atStep: 8,
      question: 'Pollution darkened the trees. Why did this suddenly make light moths vulnerable?',
      options: [
        'The pollution poisoned the light moths directly',
        'Light moths lost their camouflage \u2014 they now stood out on dark bark and birds could see them',
        'Dark moths became aggressive toward light moths',
      ],
      correctIndex: 1,
      explanation:
        'The pollution didn\'t harm moths directly \u2014 it changed the tree bark color. Light moths that were once invisible now stood out. The same trait (light wings) went from helpful to deadly when the environment changed.',
    },
    {
      atStep: 16,
      question: 'In the 1950s, Britain cleaned up its air pollution. What do you think happened to the moth populations?',
      options: [
        'Nothing \u2014 the dark moths stayed dominant forever',
        'The population shifted back toward light moths as trees became pale again',
        'All moths went extinct from the pollution damage',
      ],
      correctIndex: 1,
      explanation:
        'That\'s exactly what happened! As trees lightened, dark moths lost their camouflage and light moths regained theirs. The population reversed. This proved that the shift was caused by natural selection, not a one-way change.',
    },
  ],

  summary: [
    { label: 'Black (B)', count: 8, color: COL_COLOR.melanic, max: 9 },
    { label: 'Dark (D)', count: 1, color: COL_COLOR.dark, max: 9 },
    { label: 'Spotted (S)', count: 0, color: COL_COLOR.spotted, max: 9, extinct: true },
    { label: 'Light', count: 0, color: COL_COLOR.light, max: 9, extinct: true },
  ],

  nodeColor: (n: StoryNode) => {
    if (n.alive) return COL_COLOR[n.trait] ?? '#999';
    return n.deathCause === 'predation' ? '#fecaca' : '#e5e7eb';
  },
  nodeStroke: (n: StoryNode) => {
    if (n.alive) return n.trait === 'light' ? '#d4c4a8' : 'none';
    return n.deathCause === 'predation' ? '#f87171' : '#d1d5db';
  },
  nodeStrokeWidth: (n: StoryNode) => {
    if (n.alive) return n.trait === 'light' ? 1 : 0;
    return 1.5;
  },
  nodeLabelColor: (n: StoryNode) =>
    n.trait === 'light' ? '#7c6a50' : 'white',
  edgeColor: (n: StoryNode) => {
    if (n.alive) return COL_COLOR[n.trait] ?? '#999';
    return n.deathCause === 'predation' ? '#fca5a5' : '#d1d5db';
  },
  deadTextColor: (n: StoryNode) =>
    n.deathCause === 'predation' ? '#ef4444' : '#9ca3af',
  nodeAriaLabel: (n: StoryNode) =>
    `Moth, ${n.trait} coloration, ${n.alive ? 'alive' : 'dead'}${n.mutationEvent ? ', mutation' : ''}`,

  theme: {
    playBtnBg: 'bg-amber-500',
    playBtnHover: 'bg-amber-600',
    narrativeBorder: 'border-amber-100',
    narrativeBg: 'bg-amber-50/60',
    narrativeText: 'text-amber-900',
    narrativeBold: 'text-amber-800',
    svgBg: '#faf6ee',
    highlightColor: '#a07850',
    toolBtnBg: 'bg-gray-100',
    toolBtnHover: 'bg-gray-200',
    toolBtnText: 'text-gray-500',
    stepBg: 'bg-gray-100',
    stepText: 'text-gray-600',
    quizTheme: 'stone',
  },
};

export default function NarrativeMothSimulation() {
  return <NarrativeStoryShell config={mothConfig} />;
}
