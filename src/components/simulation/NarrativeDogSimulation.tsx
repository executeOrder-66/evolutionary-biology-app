import NarrativeStoryShell from './NarrativeStoryShell';
import type { StoryConfig, StoryNode } from './NarrativeStoryShell';

// ─── Trait colors & labels ───

const TAM_COLOR: Record<string, string> = {
  wild: '#78716c',
  wary: '#d97706',
  friendly: '#2563eb',
  docile: '#8b5cf6',
};

const TAM_LABEL: Record<string, string> = {
  wild: '',
  wary: 'W',
  friendly: 'F',
  docile: 'D',
};

// ─── Node builders ───

function n(
  id: string, gen: number, parentId: string | null,
  trait: string, alive: boolean,
  opts?: Partial<StoryNode>,
): StoryNode {
  return { id, gen, parentId, trait, alive, ...opts };
}

function buildPhase1(): StoryNode[] {
  return [
    n('p1-A', 0, null, 'wild', true),
    n('p1-B', 1, 'p1-A', 'wild', true),
    n('p1-C', 1, 'p1-A', 'wild', true),
    n('p1-D', 2, 'p1-B', 'wild', true),
    n('p1-E', 2, 'p1-B', 'wild', true),
    n('p1-F', 2, 'p1-C', 'wild', true),
    n('p1-G', 2, 'p1-C', 'wild', true),
    n('p1-H', 3, 'p1-D', 'wild', true),
    n('p1-I', 3, 'p1-D', 'wild', true),
    n('p1-J', 3, 'p1-E', 'wary', false, { mutationEvent: true, deathCause: 'natural' }),
    n('p1-K', 3, 'p1-E', 'wild', true),
    n('p1-L', 3, 'p1-F', 'wild', true),
    n('p1-M', 3, 'p1-F', 'wary', true, { mutationEvent: true }),
    n('p1-N', 3, 'p1-G', 'wild', true),
    n('p1-O', 3, 'p1-G', 'wild', true),
  ];
}

function buildPhase2(): StoryNode[] {
  return [
    n('p2-F', 0, null, 'wild', true),
    n('p2-L', 1, 'p2-F', 'wild', true),
    n('p2-M', 1, 'p2-F', 'wary', true, { mutationEvent: true }),
    n('p2-L1', 2, 'p2-L', 'wild', true),
    n('p2-L2', 2, 'p2-L', 'wild', true),
    n('p2-M1', 2, 'p2-M', 'wary', true),
    n('p2-M2', 2, 'p2-M', 'wary', true),
    n('p2-L1a', 3, 'p2-L1', 'wild', true),
    n('p2-L1b', 3, 'p2-L1', 'wild', false, { deathCause: 'natural' }),
    n('p2-L2a', 3, 'p2-L2', 'wild', true),
    n('p2-L2b', 3, 'p2-L2', 'wild', true),
    n('p2-M1a', 3, 'p2-M1', 'wary', true),
    n('p2-M1b', 3, 'p2-M1', 'wary', true),
    n('p2-M2a', 3, 'p2-M2', 'wary', true),
    n('p2-M2b', 3, 'p2-M2', 'wary', false, { deathCause: 'natural' }),
    n('p2-L1a1', 4, 'p2-L1a', 'wild', false, { deathCause: 'rejected' }),
    n('p2-L1a2', 4, 'p2-L1a', 'wild', false, { deathCause: 'rejected' }),
    n('p2-L2a1', 4, 'p2-L2a', 'wild', false, { deathCause: 'rejected' }),
    n('p2-L2a2', 4, 'p2-L2a', 'wild', false, { deathCause: 'rejected' }),
    n('p2-L2b1', 4, 'p2-L2b', 'wild', false, { deathCause: 'rejected' }),
    n('p2-L2b2', 4, 'p2-L2b', 'wild', false, { deathCause: 'rejected' }),
    n('p2-M1a1', 4, 'p2-M1a', 'wary', true),
    n('p2-M1a2', 4, 'p2-M1a', 'wary', true),
    n('p2-M1b1', 4, 'p2-M1b', 'wary', true),
    n('p2-M1b2', 4, 'p2-M1b', 'wary', false, { deathCause: 'rejected' }),
    n('p2-M2a1', 4, 'p2-M2a', 'wary', true),
    n('p2-M2a2', 4, 'p2-M2a', 'wary', true),
    n('p2-a', 5, 'p2-M1a1', 'wary', true),
    n('p2-b', 5, 'p2-M1a1', 'wary', true),
    n('p2-c', 5, 'p2-M1a2', 'wary', true),
    n('p2-d', 5, 'p2-M1a2', 'wary', false, { deathCause: 'natural' }),
    n('p2-e', 5, 'p2-M1b1', 'wary', true),
    n('p2-f', 5, 'p2-M1b1', 'wary', true),
    n('p2-g', 5, 'p2-M2a1', 'wary', true),
    n('p2-h', 5, 'p2-M2a1', 'wary', true),
    n('p2-i', 5, 'p2-M2a2', 'wary', true),
    n('p2-j', 5, 'p2-M2a2', 'wary', false, { deathCause: 'natural' }),
    n('p2-a1', 6, 'p2-a', 'docile', true, { mutationEvent: true }),
    n('p2-a2', 6, 'p2-a', 'wary', true),
    n('p2-b1', 6, 'p2-b', 'wary', true),
    n('p2-b2', 6, 'p2-b', 'wary', false, { deathCause: 'natural' }),
    n('p2-c1', 6, 'p2-c', 'wary', true),
    n('p2-c2', 6, 'p2-c', 'wild', false, { deathCause: 'rejected', mutationEvent: true }),
    n('p2-e1', 6, 'p2-e', 'wary', true),
    n('p2-e2', 6, 'p2-e', 'friendly', true, { mutationEvent: true }),
    n('p2-f1', 6, 'p2-f', 'wary', true),
    n('p2-f2', 6, 'p2-f', 'wary', true),
    n('p2-g1', 6, 'p2-g', 'wary', true),
    n('p2-g2', 6, 'p2-g', 'friendly', true, { mutationEvent: true }),
    n('p2-h1', 6, 'p2-h', 'docile', true, { mutationEvent: true }),
    n('p2-h2', 6, 'p2-h', 'wary', true),
    n('p2-i1', 6, 'p2-i', 'wary', true),
    n('p2-i2', 6, 'p2-i', 'wary', true),
  ];
}

function buildPhase3(): StoryNode[] {
  return [
    n('p3-root', 0, null, 'wary', true),
    n('p3-g', 1, 'p3-root', 'wary', true),
    n('p3-h', 1, 'p3-root', 'wary', true),
    n('p3-g1', 2, 'p3-g', 'wary', true),
    n('p3-g2', 2, 'p3-g', 'friendly', true, { mutationEvent: true }),
    n('p3-h1', 2, 'p3-h', 'docile', true, { mutationEvent: true }),
    n('p3-h2', 2, 'p3-h', 'wary', true),
    n('p3-g1a', 3, 'p3-g1', 'wary', true),
    n('p3-g1b', 3, 'p3-g1', 'wary', false, { deathCause: 'rejected' }),
    n('p3-g2a', 3, 'p3-g2', 'friendly', true),
    n('p3-g2b', 3, 'p3-g2', 'friendly', true),
    n('p3-h1a', 3, 'p3-h1', 'docile', true),
    n('p3-h1b', 3, 'p3-h1', 'docile', true),
    n('p3-h2a', 3, 'p3-h2', 'wary', false, { deathCause: 'rejected' }),
    n('p3-h2b', 3, 'p3-h2', 'wary', false, { deathCause: 'natural' }),
    n('p3-g1a1', 4, 'p3-g1a', 'wary', false, { deathCause: 'rejected' }),
    n('p3-g1a2', 4, 'p3-g1a', 'wary', false, { deathCause: 'rejected' }),
    n('p3-g2a1', 4, 'p3-g2a', 'friendly', true),
    n('p3-g2a2', 4, 'p3-g2a', 'friendly', true),
    n('p3-g2b1', 4, 'p3-g2b', 'friendly', true),
    n('p3-g2b2', 4, 'p3-g2b', 'friendly', false, { deathCause: 'natural' }),
    n('p3-h1a1', 4, 'p3-h1a', 'docile', true),
    n('p3-h1a2', 4, 'p3-h1a', 'docile', false, { deathCause: 'natural' }),
    n('p3-h1b1', 4, 'p3-h1b', 'docile', true),
    n('p3-h1b2', 4, 'p3-h1b', 'docile', true),
    n('p3-fa1', 5, 'p3-g2a1', 'friendly', true),
    n('p3-fa2', 5, 'p3-g2a1', 'friendly', true),
    n('p3-fa3', 5, 'p3-g2a2', 'friendly', true),
    n('p3-fa4', 5, 'p3-g2a2', 'friendly', true),
    n('p3-fb1', 5, 'p3-g2b1', 'friendly', true),
    n('p3-fb2', 5, 'p3-g2b1', 'friendly', true),
    n('p3-fb3', 5, 'p3-g2b1', 'friendly', true),
    n('p3-da1', 5, 'p3-h1a1', 'docile', true),
    n('p3-da2', 5, 'p3-h1a1', 'docile', false, { deathCause: 'natural' }),
    n('p3-db1', 5, 'p3-h1b1', 'docile', true),
    n('p3-db2', 5, 'p3-h1b2', 'docile', true),
    n('p3-w1', 5, 'p3-h1b2', 'wary', true),
  ];
}

// ─── Config ───

const dogConfig: StoryConfig = {
  title: 'The Dog Domestication Story',
  phaseLabels: ['Part 1 \u2014 Wild Pack', 'Part 2 \u2014 Human Contact', 'Part 3 \u2014 Domestication'],
  ariaPrefix: 'Wolf domestication family tree',
  summaryTitle: 'Tameness Distribution \u2014 Final Generation',

  traitColors: TAM_COLOR,
  traitLabels: TAM_LABEL,
  legend: [
    { key: 'wild', label: 'Wild' },
    { key: 'wary', label: 'Wary (W)' },
    { key: 'friendly', label: 'Friendly (F)' },
    { key: 'docile', label: 'Docile (D)' },
  ],

  buildPhase1,
  buildPhase2,
  buildPhase3,

  highlights: [
    { atStep: 4, nodeIds: ['p1-F', 'p1-L', 'p1-M'] },
    { atStep: 11, nodeIds: ['p2-M2a1', 'p2-g', 'p2-h', 'p2-g1', 'p2-g2', 'p2-h1', 'p2-h2'] },
  ],

  eventLine: { p2Gen: 4, label: '\uD83C\uDFD5\uFE0F Humans Select!', color: '#d97706' },
  eventBadge: {
    label: '\uD83C\uDFD5\uFE0F Humans Selecting',
    className: 'flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200',
    dotClassName: 'h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500',
  },

  svgBgWhenActive: undefined,

  narratives: [
    {
      title: 'A Wild Wolf',
      text: 'Our story begins with a single wild wolf \u2014 wary of everything, surviving by instinct. Wolves like this have roamed for hundreds of thousands of years, long before humans built their first camps.',
    },
    {
      title: 'First Litter',
      text: 'The wolf has produced two pups. Both are wild and fearful of humans, just like their parent. Wolves in a pack depend on each other, but they trust nothing outside the pack.',
    },
    {
      title: 'The Pack Grows',
      text: 'Four wolves now. All wild, all avoiding human settlements. Their survival depends on hunting skill, pack cooperation, and staying far from anything unfamiliar.',
    },
    {
      title: '\u26A1 A Temperament Mutation!',
      text: 'Eight wolves \u2014 but two have developed a slightly less fearful temperament (glowing rings, marked W). One wary wolf approaches a human camp and finds scraps of food! The other wary wolf is killed by a rival pack member (\u2715). The wild wolves avoid humans entirely.',
    },
    {
      title: '\uD83D\uDD0D Focusing on the Key Branch',
      text: 'The pack continues to grow. Let\u2019s zoom into the highlighted branch \u2014 the parent that produced both a normal wild wolf and the surviving wary mutant. This wary wolf\u2019s willingness to approach humans will change everything.',
    },
    {
      title: 'The Focused Branch',
      text: 'Here\u2019s our focused view. The parent wolf had two offspring: one fully wild (left) and one carrying the wary mutation (right, marked W). The wary wolf lingers near human camps, scavenging food. The wild one keeps its distance.',
    },
    {
      title: 'Both Lineages Grow',
      text: 'Both lineages reproduce equally in the wild. Wild wolves (stone gray) and wary wolves (amber) coexist. Without human intervention, the wary temperament is just a neutral variation \u2014 neither helpful nor harmful.',
    },
    {
      title: 'Life in the Wild',
      text: 'Growth continues. A few wolves die from natural causes \u2014 disease, injury, starvation. Marked with \u2715. Both lineages still have healthy numbers. But something is about to change\u2026',
    },
    {
      title: '\uD83C\uDFD5\uFE0F Humans Select!',
      text: 'Humans start actively choosing! They feed and shelter the tamest wolves \u2014 the wary ones that approach without aggression. Wild wolves that snarl or snap are driven away (red \u2715). This is artificial selection: humans decide who stays and who goes. Unlike natural selection, the pressure comes from human preferences, not the environment.',
    },
    {
      title: 'The Wary Wolves Thrive',
      text: 'With human food and shelter, the surviving wary wolves multiply faster than they ever could in the wild. Human camps provide warmth, protection from predators, and reliable meals. The wolves didn\u2019t choose this \u2014 humans created the selection pressure.',
    },
    {
      title: '\uD83E\uDDEC New Temperaments Emerge!',
      text: 'Mutations create a range of tameness! Some become friendly (F) \u2014 they actively approach humans, wag their tails, even help with guarding. Others become docile (D) \u2014 completely tame, content to sit by the fire. One mutates back to wild \u2014 humans drive it away immediately.',
    },
    {
      title: '\uD83D\uDD0D Zooming Into the Competition',
      text: 'The pack around camp is getting crowded. Let\u2019s focus on the highlighted branch \u2014 the most recent ancestor with Wary (W), Friendly (F), and Docile (D) descendants. This is where humans\u2019 preferences determine the future of dogs.',
    },
    {
      title: 'Three Temperaments, One Branch',
      text: 'Here\u2019s our focused subtree. The root (wary) had two children. By now, mutations have produced three tameness levels: Friendly (F, actively seeks humans), Docile (D, completely tame), and Wary (W, still skittish). Which temperament will humans favor most?',
    },
    {
      title: '\uD83D\uDC3E Wary Wolves Lose Favor',
      text: 'Humans want companions, not just scavengers. Wary wolves that flinch and growl are pushed away (\u2715). Friendly wolves get the most food \u2014 they\u2019re useful for guarding camp and joining hunts. Docile wolves are pampered as pets. Humans are now the selection pressure, choosing based on utility and affection.',
    },
    {
      title: 'Friendly Wolves Dominate',
      text: 'Friendly wolves now outnumber the others. They\u2019re the perfect balance: tame enough to live with humans, active enough to be useful. They guard camps, help track prey, and bond with families. Docile wolves are kept as gentle companions. Wary wolves are being pushed to the fringes.',
    },
    {
      title: '\uD83D\uDC15 The First Dogs',
      text: 'Friendly wolves make up 7 of 11 survivors. Docile ones are 3, kept as cherished pets. Only 1 wary wolf remains on the edge of camp. Wild wolves are gone entirely. This is the domestication syndrome \u2014 selecting for tameness brought changes in behavior, appearance, and even biology. Wolves didn\u2019t choose to become dogs; humans made that choice for them.',
    },
    {
      title: '\uD83D\uDCCA The Full Journey',
      text: 'From a wild wolf avoiding humans to a population of friendly, human-bonded dogs. The recipe: variation (random mutations in temperament) + artificial selection (humans choosing the tamest) = domestication. Unlike natural selection where the environment decides, here humans were the selecting force. This process took thousands of years, but the principle is clear: artificial selection reshapes species according to human preferences.',
    },
  ],

  quizzes: [
    {
      atStep: 3,
      question: 'One wary wolf approached a human camp and got food. Did humans deliberately choose to feed it?',
      options: [
        'Yes \u2014 humans planned to domesticate wolves from the start',
        'Probably not \u2014 the wolf scavenged scraps, and humans simply tolerated the less-fearful ones',
        'Humans trained the wolf like a modern dog',
      ],
      correctIndex: 1,
      explanation:
        'Early domestication was likely accidental. Wolves that were less afraid of humans hung around camps for scraps. Humans tolerated them (they ate waste and barked at dangers). This "self-domestication" happened before any deliberate breeding.',
    },
    {
      atStep: 8,
      question: 'Humans started driving away wild wolves and keeping wary ones. How is this different from natural selection?',
      options: [
        'It\'s not different \u2014 it\'s the same mechanism',
        'The selection pressure is human preference instead of the natural environment',
        'Artificial selection is faster because humans are smarter than nature',
      ],
      correctIndex: 1,
      explanation:
        'The mechanism is identical \u2014 some individuals reproduce more than others based on a trait. The only difference is WHO does the selecting: nature (predators, climate, disease) vs. humans (feeding, sheltering, breeding the ones they prefer).',
    },
    {
      atStep: 16,
      question: 'In real domestication, selecting for tameness also changed wolves\' ears, tails, and coat colors. Why?',
      options: [
        'Humans selected for those traits too',
        'The genes controlling tameness are linked to genes controlling physical features',
        'It\'s a coincidence',
      ],
      correctIndex: 1,
      explanation:
        'This is the domestication syndrome! The genes controlling fear and aggression (neural crest cells) also influence ear cartilage, tail shape, and coat color. Selecting for tameness alone accidentally changes the whole animal \u2014 as proven by the Russian fox experiment.',
    },
  ],

  summary: [
    { label: 'Friendly (F)', count: 7, color: TAM_COLOR.friendly, max: 11 },
    { label: 'Docile (D)', count: 3, color: TAM_COLOR.docile, max: 11 },
    { label: 'Wary (W)', count: 1, color: TAM_COLOR.wary, max: 11 },
    { label: 'Wild', count: 0, color: TAM_COLOR.wild, max: 11, extinct: true },
  ],

  soundMap: { 3: 'mutation', 8: 'alert', 10: 'mutation', 16: 'complete' },

  nodeColor: (node: StoryNode) => {
    if (node.alive) return TAM_COLOR[node.trait];
    return (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#fecaca' : '#e5e7eb';
  },
  nodeStroke: (node: StoryNode) => {
    if (node.alive) return node.trait === 'wild' ? '#a8a29e' : 'none';
    return (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#f87171' : '#d1d5db';
  },
  nodeLabelColor: (node: StoryNode) =>
    node.trait === 'wild' ? '#fafaf9' : 'white',
  nodeStrokeWidth: (node: StoryNode) =>
    node.alive ? (node.trait === 'wild' ? 1 : 0) : 1.5,
  edgeColor: (node: StoryNode) => {
    if (node.alive) return TAM_COLOR[node.trait];
    return (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#fca5a5' : '#d1d5db';
  },
  deadTextColor: (node: StoryNode) =>
    (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#ef4444' : '#9ca3af',
  nodeAriaLabel: (node: StoryNode) =>
    `Wolf, ${node.trait} temperament, ${node.alive ? 'alive' : 'dead'}${node.mutationEvent ? ', mutation' : ''}`,

  theme: {
    playBtnBg: 'bg-orange-500',
    playBtnHover: 'bg-orange-600',
    narrativeBorder: 'border-orange-100',
    narrativeBg: 'bg-orange-50/60',
    narrativeText: 'text-orange-900',
    narrativeBold: 'text-orange-800',
    svgBg: '#fffbf5',
    highlightColor: '#d97706',
    toolBtnBg: 'bg-orange-100',
    toolBtnHover: 'bg-orange-200',
    toolBtnText: 'text-orange-500',
    stepBg: 'bg-orange-100',
    stepText: 'text-orange-700',
    quizTheme: 'orange',
  },
};

// ─── Component ───

export default function NarrativeDogSimulation() {
  return <NarrativeStoryShell config={dogConfig} />;
}
