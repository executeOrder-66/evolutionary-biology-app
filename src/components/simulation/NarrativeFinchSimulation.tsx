import NarrativeStoryShell from './NarrativeStoryShell';
import type { StoryConfig, StoryNode } from './NarrativeStoryShell';

// ─── Trait colors & labels ───

const BEAK_COLOR: Record<string, string> = {
  tiny: '#fdba74',
  small: '#f97316',
  medium: '#78716c',
  large: '#2563eb',
  massive: '#1e3a5f',
};

const BEAK_LABEL: Record<string, string> = {
  tiny: '',
  small: 'S',
  medium: '',
  large: 'L',
  massive: 'X',
};

// ─── Node builders ───

function buildPhase1(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    // Gen 0: single medium finch arrives
    n('p1-A', 0, null, 'medium', true),
    // Gen 1: first breeding — 2 offspring
    n('p1-B', 1, 'p1-A', 'medium', true),
    n('p1-C', 1, 'p1-A', 'medium', true),
    // Gen 2: 4 offspring, all medium
    n('p1-D', 2, 'p1-B', 'medium', true),
    n('p1-E', 2, 'p1-B', 'medium', true),
    n('p1-F', 2, 'p1-C', 'medium', true),
    n('p1-G', 2, 'p1-C', 'medium', true),
    // Gen 3: 8 offspring — two mutations appear
    n('p1-H', 3, 'p1-D', 'medium', true),
    n('p1-I', 3, 'p1-D', 'medium', true),
    n('p1-J', 3, 'p1-E', 'medium', true),
    n('p1-K', 3, 'p1-E', 'medium', true),
    n('p1-L', 3, 'p1-F', 'small', true, { mutationEvent: true }),
    n('p1-M', 3, 'p1-F', 'large', true, { mutationEvent: true }),
    n('p1-N', 3, 'p1-G', 'medium', true),
    n('p1-O', 3, 'p1-G', 'medium', true),
  ];
}

function buildPhase2(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    // Gen 0: focused branch — medium parent with small + large children
    n('p2-F', 0, null, 'medium', true),
    n('p2-S', 1, 'p2-F', 'small', true, { mutationEvent: true }),
    n('p2-L', 1, 'p2-F', 'large', true, { mutationEvent: true }),
    // Gen 2: all lineages grow equally — food is abundant
    n('p2-S1', 2, 'p2-S', 'small', true),
    n('p2-S2', 2, 'p2-S', 'small', true),
    n('p2-L1', 2, 'p2-L', 'large', true),
    n('p2-L2', 2, 'p2-L', 'large', true),
    // Gen 3: normal growth, some natural death
    n('p2-S1a', 3, 'p2-S1', 'small', true),
    n('p2-S1b', 3, 'p2-S1', 'small', false, { deathCause: 'natural' }),
    n('p2-S2a', 3, 'p2-S2', 'small', true),
    n('p2-S2b', 3, 'p2-S2', 'medium', true),
    n('p2-L1a', 3, 'p2-L1', 'large', true),
    n('p2-L1b', 3, 'p2-L1', 'large', true),
    n('p2-L2a', 3, 'p2-L2', 'large', true),
    n('p2-L2b', 3, 'p2-L2', 'medium', false, { deathCause: 'natural' }),
    // Gen 4: FOOD NICHES! Medium generalists lose to specialists
    n('p2-S1a1', 4, 'p2-S1a', 'small', true),
    n('p2-S1a2', 4, 'p2-S1a', 'small', true),
    n('p2-S2a1', 4, 'p2-S2a', 'small', true),
    n('p2-S2a2', 4, 'p2-S2a', 'small', true),
    n('p2-S2b1', 4, 'p2-S2b', 'medium', false, { deathCause: 'competition' }),
    n('p2-S2b2', 4, 'p2-S2b', 'medium', false, { deathCause: 'competition' }),
    n('p2-L1a1', 4, 'p2-L1a', 'large', true),
    n('p2-L1a2', 4, 'p2-L1a', 'large', true),
    n('p2-L1b1', 4, 'p2-L1b', 'large', true),
    n('p2-L1b2', 4, 'p2-L1b', 'large', true),
    n('p2-L2a1', 4, 'p2-L2a', 'large', true),
    n('p2-L2a2', 4, 'p2-L2a', 'large', true),
    // Gen 5: specialists multiply, medium declines further
    n('p2-s5a', 5, 'p2-S1a1', 'small', true),
    n('p2-s5b', 5, 'p2-S1a1', 'small', true),
    n('p2-s5c', 5, 'p2-S1a2', 'small', true),
    n('p2-s5d', 5, 'p2-S2a1', 'small', true),
    n('p2-s5e', 5, 'p2-S2a2', 'small', true),
    n('p2-l5a', 5, 'p2-L1a1', 'large', true),
    n('p2-l5b', 5, 'p2-L1a2', 'large', true),
    n('p2-l5c', 5, 'p2-L1b1', 'large', true),
    n('p2-l5d', 5, 'p2-L1b2', 'large', true),
    n('p2-l5e', 5, 'p2-L2a1', 'large', true),
    n('p2-l5f', 5, 'p2-L2a2', 'large', true),
    // Gen 6: MUTATIONS! tiny and massive appear. A few medium remain but struggle.
    n('p2-t6a', 6, 'p2-s5a', 'tiny', true, { mutationEvent: true }),
    n('p2-s6a', 6, 'p2-s5a', 'small', true),
    n('p2-s6b', 6, 'p2-s5b', 'small', true),
    n('p2-s6c', 6, 'p2-s5c', 'small', true),
    n('p2-s6d', 6, 'p2-s5d', 'small', true),
    n('p2-m6a', 6, 'p2-s5e', 'medium', true),
    n('p2-l6a', 6, 'p2-l5a', 'large', true),
    n('p2-l6b', 6, 'p2-l5b', 'large', true),
    n('p2-x6a', 6, 'p2-l5c', 'massive', true, { mutationEvent: true }),
    n('p2-l6c', 6, 'p2-l5c', 'large', true),
    n('p2-l6d', 6, 'p2-l5d', 'large', true),
    n('p2-l6e', 6, 'p2-l5e', 'large', true),
    n('p2-l6f', 6, 'p2-l5f', 'large', true),
    n('p2-m6b', 6, 'p2-l5f', 'medium', false, { deathCause: 'competition' }),
  ];
}

function buildPhase3(): StoryNode[] {
  const n = (
    id: string, gen: number, parentId: string | null,
    trait: string, alive: boolean,
    opts?: Partial<StoryNode>,
  ): StoryNode => ({ id, gen, parentId, trait, alive, ...opts });

  return [
    // Gen 0: focused subtree with all beak types
    n('p3-root', 0, null, 'medium', true),
    // Gen 1: branches for each specialist line
    n('p3-s', 1, 'p3-root', 'small', true),
    n('p3-l', 1, 'p3-root', 'large', true),
    // Gen 2: tiny, small, medium, large, massive present
    n('p3-t1', 2, 'p3-s', 'tiny', true, { mutationEvent: true }),
    n('p3-s1', 2, 'p3-s', 'small', true),
    n('p3-l1', 2, 'p3-l', 'large', true),
    n('p3-x1', 2, 'p3-l', 'massive', true, { mutationEvent: true }),
    // Gen 3: medium eliminated, specialists thrive
    n('p3-t1a', 3, 'p3-t1', 'tiny', true),
    n('p3-t1b', 3, 'p3-t1', 'tiny', true),
    n('p3-s1a', 3, 'p3-s1', 'small', true),
    n('p3-s1b', 3, 'p3-s1', 'small', true),
    n('p3-s1c', 3, 'p3-s1', 'small', true),
    n('p3-l1a', 3, 'p3-l1', 'large', true),
    n('p3-l1b', 3, 'p3-l1', 'large', true),
    n('p3-l1c', 3, 'p3-l1', 'large', true),
    n('p3-x1a', 3, 'p3-x1', 'massive', true),
    // Gen 4: small and large dominate, tiny and massive smaller niches
    n('p3-t2a', 4, 'p3-t1a', 'tiny', true),
    n('p3-t2b', 4, 'p3-t1b', 'tiny', true),
    n('p3-s2a', 4, 'p3-s1a', 'small', true),
    n('p3-s2b', 4, 'p3-s1a', 'small', true),
    n('p3-s2c', 4, 'p3-s1b', 'small', true),
    n('p3-s2d', 4, 'p3-s1b', 'small', true),
    n('p3-s2e', 4, 'p3-s1c', 'small', true),
    n('p3-l2a', 4, 'p3-l1a', 'large', true),
    n('p3-l2b', 4, 'p3-l1a', 'large', true),
    n('p3-l2c', 4, 'p3-l1b', 'large', true),
    n('p3-l2d', 4, 'p3-l1c', 'large', true),
    n('p3-x2a', 4, 'p3-x1a', 'massive', true),
    // Gen 5: final distribution — Small=5, Large=4, Tiny=2, Massive=1, Medium=0
    n('p3-s3a', 5, 'p3-s2a', 'small', true),
    n('p3-s3b', 5, 'p3-s2b', 'small', true),
    n('p3-s3c', 5, 'p3-s2c', 'small', true),
    n('p3-s3d', 5, 'p3-s2d', 'small', true),
    n('p3-s3e', 5, 'p3-s2e', 'small', true),
    n('p3-l3a', 5, 'p3-l2a', 'large', true),
    n('p3-l3b', 5, 'p3-l2b', 'large', true),
    n('p3-l3c', 5, 'p3-l2c', 'large', true),
    n('p3-l3d', 5, 'p3-l2d', 'large', true),
    n('p3-t3a', 5, 'p3-t2a', 'tiny', true),
    n('p3-t3b', 5, 'p3-t2b', 'tiny', true),
    n('p3-x3a', 5, 'p3-x2a', 'massive', true),
  ];
}

// ─── Config ───

const finchConfig: StoryConfig = {
  title: "Darwin's Finches \u2014 Adaptive Radiation",
  phaseLabels: ['Part 1 \u2014 Arrival', 'Part 2 \u2014 Niche Competition', 'Part 3 \u2014 Adaptive Radiation'],
  ariaPrefix: 'Finch family tree',
  summaryTitle: 'Beak Size Distribution \u2014 Final Generation',

  traitColors: BEAK_COLOR,
  traitLabels: BEAK_LABEL,
  legend: [
    { key: 'tiny', label: 'Tiny (insects)' },
    { key: 'small', label: 'Small seeds (S)' },
    { key: 'medium', label: 'Medium (generalist)' },
    { key: 'large', label: 'Large seeds (L)' },
    { key: 'massive', label: 'Massive (nuts) (X)' },
  ],

  buildPhase1,
  buildPhase2,
  buildPhase3,

  highlights: [
    { atStep: 4, nodeIds: ['p1-F', 'p1-L', 'p1-M'] },
    { atStep: 11, nodeIds: ['p2-t6a', 'p2-s6a', 'p2-m6a', 'p2-x6a', 'p2-l6a', 'p2-l6f'] },
  ],

  eventLine: { p2Gen: 4, label: '\uD83C\uDFDD\uFE0F Food Niches!', color: '#0284c7' },
  eventBadge: {
    label: '\uD83C\uDFDD\uFE0F Niche Competition',
    className: 'flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 ring-1 ring-sky-100',
    dotClassName: 'h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500',
  },

  soundMap: { 3: 'mutation', 8: 'alert', 10: 'mutation', 16: 'complete' },

  narratives: [
    {
      title: 'A Finch Arrives',
      text: 'A single medium-beaked finch arrives on a Gal\u00e1pagos island. It finds abundant food \u2014 seeds of all sizes, insects, and fruit. This ordinary bird is about to become the ancestor of an extraordinary radiation of species.',
    },
    {
      title: 'First Breeding',
      text: 'The finch breeds successfully, producing two offspring. Both inherit their parent\u2019s medium-sized beak. With plentiful food and no competitors, survival is easy.',
    },
    {
      title: 'Population Doubles',
      text: 'Four medium-beaked finches now populate the island. All share the same beak shape and diet. They\u2019re thriving in this new, uncrowded environment.',
    },
    {
      title: '\u26A1 Beak Mutations Appear!',
      text: 'Eight offspring this generation \u2014 but two are different! One has a smaller beak (S, good for small seeds) and one has a larger beak (L, good for large seeds). These mutations are random \u2014 not a response to any need. With food abundant, all beak sizes survive equally well.',
    },
    {
      title: '\uD83D\uDD0D Focusing on the Key Branch',
      text: 'To follow the story of beak diversification, let\u2019s zoom into the highlighted branch \u2014 the medium-beaked parent that produced both a small-beaked and a large-beaked mutant. This is where adaptive radiation begins.',
    },
    {
      title: 'The Focused Branch',
      text: 'Here\u2019s our focused view: the medium-beaked parent and its two mutant offspring \u2014 one small-beaked (S) and one large-beaked (L). Both lineages will now grow side by side.',
    },
    {
      title: 'Both Lineages Grow',
      text: 'Small-beaked and large-beaked lineages both thrive. Food is still abundant, so there\u2019s no advantage to any particular beak size yet. Some medium-beaked offspring appear too.',
    },
    {
      title: 'Normal Growth Continues',
      text: 'The population grows, with a few natural deaths. Both specialist lineages and the remaining medium-beaked birds coexist peacefully. But the island\u2019s resources won\u2019t last forever\u2026',
    },
    {
      title: '\uD83C\uDFDD\uFE0F Food Niches!',
      text: 'Competition intensifies as the population grows! Medium-beaked generalists are \u201Cjack of all trades, master of none\u201D \u2014 small beaks crack small seeds more efficiently, large beaks crack large seeds better. Medium beaks can\u2019t compete with either specialist and start dying off.',
    },
    {
      title: 'Specialists Multiply',
      text: 'Small-beaked and large-beaked finches continue to thrive in their respective food niches. Medium-beaked finches decline further \u2014 outcompeted on every front. This is character displacement in action.',
    },
    {
      title: '\uD83E\uDDEC New Mutations Emerge!',
      text: 'More variation appears! Some small-beaked finches develop tiny beaks \u2014 perfect for catching insects. Some large-beaked finches develop massive beaks \u2014 powerful enough to crack tough nuts. A few medium-beaked holdouts remain, but they\u2019re struggling.',
    },
    {
      title: '\uD83D\uDD0D Zooming Into the Radiation',
      text: 'The tree is branching rapidly. Let\u2019s focus on the highlighted subtree containing all five beak types \u2014 tiny, small, medium, large, and massive. This is adaptive radiation: one ancestor diversifying into multiple specialized forms.',
    },
    {
      title: 'Five Beak Types, One Ancestor',
      text: 'Here\u2019s the full picture of adaptive radiation. From a single medium-beaked ancestor, five distinct beak sizes have emerged. Each specializes in a different food source. But can they all coexist?',
    },
    {
      title: '\u2620\uFE0F Medium Beaks Eliminated',
      text: 'The generalist medium-beaked finches are gone \u2014 unable to compete with any specialist. Tiny beaks feast on insects. Massive beaks crack nuts. Small and large beaks dominate the seed niches. Specialization wins.',
    },
    {
      title: 'Specialists Dominate',
      text: 'Small-beaked finches are the most common \u2014 small seeds are the most abundant food source. Large-beaked finches are second. Tiny (insect) and massive (nut) specialists occupy smaller but stable niches.',
    },
    {
      title: '\uD83C\uDF3F Distinct Species Emerge',
      text: 'The population has split into distinct groups by beak size. Small-beaked finches are most common, large-beaked second, with tiny and massive as niche specialists. Medium beaks are extinct. From one finch, many species.',
    },
    {
      title: '\uD83D\uDCCA The Full Journey',
      text: 'From one medium-beaked finch to a diverse community of specialists. This is adaptive radiation \u2014 when a single ancestor diversifies to fill multiple ecological niches. Darwin observed exactly this pattern in the Gal\u00e1pagos, helping him develop the theory of evolution by natural selection.',
    },
  ],

  quizzes: [
    {
      atStep: 3,
      question: 'Two finches developed different beak sizes by random mutation. Did they mutate BECAUSE they needed different beaks?',
      options: [
        'Yes \u2014 they sensed different food sources and adapted their beaks',
        'No \u2014 mutations are random. Selection will later favor these differences',
        'Yes \u2014 evolution gives organisms what they need to survive',
      ],
      correctIndex: 1,
      explanation:
        'Mutations are random errors during DNA replication. The finches didn\u2019t mutate because they "needed" different beaks. But natural selection will later favor these random differences when food competition begins.',
    },
    {
      atStep: 8,
      question: 'Why are medium-beaked finches struggling while small and large beaks thrive?',
      options: [
        'Medium beaks are weaker and break more easily',
        'Medium beaks are generalists competing with specialists \u2014 being "okay at everything" loses to being "great at one thing"',
        'The medium-beaked finches are older and dying of age',
      ],
      correctIndex: 1,
      explanation:
        'Medium beaks are generalists \u2014 they can eat small and large seeds, but not as efficiently as the specialists. Small beaks crack small seeds better, large beaks crack large seeds better. Being "okay at everything" loses to being "great at one thing." This is called competitive exclusion.',
    },
    {
      atStep: 16,
      question: 'If all the large seeds disappeared from the island, what would happen?',
      options: [
        'Nothing \u2014 large-beaked finches would just eat other food',
        'All finches would die without large seeds',
        'Large-beaked finches would decline, and small/tiny beaks would dominate \u2014 the population adapts to available food',
      ],
      correctIndex: 2,
      explanation:
        'Large-beaked finches would decline because their primary food source is gone. Small and tiny beaks would dominate. The population adapts to whatever food is available \u2014 there\u2019s no permanent "best" beak. Evolution is always relative to the current environment.',
    },
  ],

  summary: [
    { label: 'Small (S)', count: 5, color: BEAK_COLOR.small, max: 5 },
    { label: 'Large (L)', count: 4, color: BEAK_COLOR.large, max: 5 },
    { label: 'Tiny', count: 2, color: BEAK_COLOR.tiny, max: 5 },
    { label: 'Massive (X)', count: 1, color: BEAK_COLOR.massive, max: 5 },
    { label: 'Medium', count: 0, color: BEAK_COLOR.medium, max: 5, extinct: true },
  ],

  nodeColor: (n: StoryNode) => {
    if (n.alive) return BEAK_COLOR[n.trait] ?? '#999';
    return n.deathCause === 'natural' ? '#e5e7eb' : '#fecaca';
  },
  nodeStroke: (n: StoryNode) => {
    if (n.alive) return 'none';
    return n.deathCause === 'natural' ? '#d1d5db' : '#f87171';
  },
  nodeStrokeWidth: (n: StoryNode) => (n.alive ? 0 : 1.5),
  nodeLabelColor: () => 'white',
  edgeColor: (n: StoryNode) => {
    if (n.alive) return BEAK_COLOR[n.trait] ?? '#999';
    return n.deathCause === 'natural' ? '#d1d5db' : '#fca5a5';
  },
  deadTextColor: (n: StoryNode) =>
    n.deathCause === 'natural' ? '#9ca3af' : '#ef4444',
  nodeAriaLabel: (n: StoryNode) =>
    `Finch, ${n.trait} beak, ${n.alive ? 'alive' : 'dead'}${n.mutationEvent ? ', mutation' : ''}`,

  theme: {
    playBtnBg: 'bg-sky-500',
    playBtnHover: 'bg-sky-600',
    narrativeBorder: 'border-sky-100',
    narrativeBg: 'bg-sky-50/60',
    narrativeText: 'text-sky-900',
    narrativeBold: 'text-sky-800',
    svgBg: '#f0f9ff',
    highlightColor: '#0284c7',
    toolBtnBg: 'bg-sky-100',
    toolBtnHover: 'bg-sky-200',
    toolBtnText: 'text-sky-500',
    stepBg: 'bg-sky-100',
    stepText: 'text-sky-600',
    quizTheme: 'emerald',
  },
};

export default function NarrativeFinchSimulation() {
  return <NarrativeStoryShell config={finchConfig} />;
}
