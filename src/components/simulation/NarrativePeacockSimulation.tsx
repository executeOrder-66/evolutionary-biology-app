import NarrativeStoryShell from './NarrativeStoryShell';
import type { StoryConfig, StoryNode } from './NarrativeStoryShell';

// ─── Trait colors & labels ───

const TAIL_COLOR: Record<string, string> = {
  small: '#93c5fd',
  medium: '#3b82f6',
  large: '#7c3aed',
  extravagant: '#c026d3',
};

const TAIL_LABEL: Record<string, string> = {
  small: '',
  medium: 'M',
  large: 'L',
  extravagant: 'E',
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
    n('p1-A', 0, null, 'small', true),
    n('p1-B', 1, 'p1-A', 'small', true),
    n('p1-C', 1, 'p1-A', 'small', true),
    n('p1-D', 2, 'p1-B', 'small', true),
    n('p1-E', 2, 'p1-B', 'small', true),
    n('p1-F', 2, 'p1-C', 'small', true),
    n('p1-G', 2, 'p1-C', 'small', true),
    n('p1-H', 3, 'p1-D', 'small', true),
    n('p1-I', 3, 'p1-D', 'small', true),
    n('p1-J', 3, 'p1-E', 'medium', false, { mutationEvent: true, deathCause: 'predation' }),
    n('p1-K', 3, 'p1-E', 'small', true),
    n('p1-L', 3, 'p1-F', 'small', true),
    n('p1-M', 3, 'p1-F', 'medium', true, { mutationEvent: true }),
    n('p1-N', 3, 'p1-G', 'small', true),
    n('p1-O', 3, 'p1-G', 'small', true),
  ];
}

function buildPhase2(): StoryNode[] {
  return [
    n('p2-F', 0, null, 'small', true),
    n('p2-L', 1, 'p2-F', 'small', true),
    n('p2-M', 1, 'p2-F', 'medium', true, { mutationEvent: true }),
    n('p2-L1', 2, 'p2-L', 'small', true),
    n('p2-L2', 2, 'p2-L', 'small', true),
    n('p2-M1', 2, 'p2-M', 'medium', true),
    n('p2-M2', 2, 'p2-M', 'medium', true),
    n('p2-L1a', 3, 'p2-L1', 'small', true),
    n('p2-L1b', 3, 'p2-L1', 'small', false, { deathCause: 'natural' }),
    n('p2-L2a', 3, 'p2-L2', 'small', true),
    n('p2-L2b', 3, 'p2-L2', 'small', true),
    n('p2-M1a', 3, 'p2-M1', 'medium', true),
    n('p2-M1b', 3, 'p2-M1', 'medium', true),
    n('p2-M2a', 3, 'p2-M2', 'medium', true),
    n('p2-M2b', 3, 'p2-M2', 'medium', false, { deathCause: 'natural' }),
    n('p2-L1a1', 4, 'p2-L1a', 'small', false, { deathCause: 'rejected' }),
    n('p2-L1a2', 4, 'p2-L1a', 'small', false, { deathCause: 'rejected' }),
    n('p2-L2a1', 4, 'p2-L2a', 'small', false, { deathCause: 'rejected' }),
    n('p2-L2a2', 4, 'p2-L2a', 'small', false, { deathCause: 'rejected' }),
    n('p2-L2b1', 4, 'p2-L2b', 'small', false, { deathCause: 'rejected' }),
    n('p2-L2b2', 4, 'p2-L2b', 'small', false, { deathCause: 'rejected' }),
    n('p2-M1a1', 4, 'p2-M1a', 'medium', true),
    n('p2-M1a2', 4, 'p2-M1a', 'medium', true),
    n('p2-M1b1', 4, 'p2-M1b', 'medium', true),
    n('p2-M1b2', 4, 'p2-M1b', 'medium', false, { deathCause: 'predation' }),
    n('p2-M2a1', 4, 'p2-M2a', 'medium', true),
    n('p2-M2a2', 4, 'p2-M2a', 'medium', true),
    n('p2-a', 5, 'p2-M1a1', 'medium', true),
    n('p2-b', 5, 'p2-M1a1', 'medium', true),
    n('p2-c', 5, 'p2-M1a2', 'medium', true),
    n('p2-d', 5, 'p2-M1a2', 'medium', false, { deathCause: 'predation' }),
    n('p2-e', 5, 'p2-M1b1', 'medium', true),
    n('p2-f', 5, 'p2-M1b1', 'medium', true),
    n('p2-g', 5, 'p2-M2a1', 'medium', true),
    n('p2-h', 5, 'p2-M2a1', 'medium', true),
    n('p2-i', 5, 'p2-M2a2', 'medium', true),
    n('p2-j', 5, 'p2-M2a2', 'medium', false, { deathCause: 'natural' }),
    n('p2-a1', 6, 'p2-a', 'extravagant', true, { mutationEvent: true }),
    n('p2-a2', 6, 'p2-a', 'medium', true),
    n('p2-b1', 6, 'p2-b', 'medium', true),
    n('p2-b2', 6, 'p2-b', 'medium', false, { deathCause: 'natural' }),
    n('p2-c1', 6, 'p2-c', 'medium', true),
    n('p2-c2', 6, 'p2-c', 'small', false, { deathCause: 'rejected', mutationEvent: true }),
    n('p2-e1', 6, 'p2-e', 'medium', true),
    n('p2-e2', 6, 'p2-e', 'large', true, { mutationEvent: true }),
    n('p2-f1', 6, 'p2-f', 'medium', true),
    n('p2-f2', 6, 'p2-f', 'medium', true),
    n('p2-g1', 6, 'p2-g', 'medium', true),
    n('p2-g2', 6, 'p2-g', 'large', true, { mutationEvent: true }),
    n('p2-h1', 6, 'p2-h', 'extravagant', false, { mutationEvent: true, deathCause: 'predation' }),
    n('p2-h2', 6, 'p2-h', 'medium', true),
    n('p2-i1', 6, 'p2-i', 'medium', true),
    n('p2-i2', 6, 'p2-i', 'medium', true),
  ];
}

function buildPhase3(): StoryNode[] {
  return [
    n('p3-root', 0, null, 'medium', true),
    n('p3-g', 1, 'p3-root', 'medium', true),
    n('p3-h', 1, 'p3-root', 'medium', true),
    n('p3-g1', 2, 'p3-g', 'medium', true),
    n('p3-g2', 2, 'p3-g', 'large', true, { mutationEvent: true }),
    n('p3-h1', 2, 'p3-h', 'extravagant', true, { mutationEvent: true }),
    n('p3-h2', 2, 'p3-h', 'medium', true),
    n('p3-g1a', 3, 'p3-g1', 'medium', false, { deathCause: 'rejected' }),
    n('p3-g1b', 3, 'p3-g1', 'medium', true),
    n('p3-g2a', 3, 'p3-g2', 'large', true),
    n('p3-g2b', 3, 'p3-g2', 'large', true),
    n('p3-h1a', 3, 'p3-h1', 'extravagant', true),
    n('p3-h1b', 3, 'p3-h1', 'extravagant', false, { deathCause: 'predation' }),
    n('p3-h2a', 3, 'p3-h2', 'medium', false, { deathCause: 'rejected' }),
    n('p3-h2b', 3, 'p3-h2', 'medium', false, { deathCause: 'rejected' }),
    n('p3-g1b1', 4, 'p3-g1b', 'medium', false, { deathCause: 'rejected' }),
    n('p3-g1b2', 4, 'p3-g1b', 'medium', false, { deathCause: 'rejected' }),
    n('p3-g2a1', 4, 'p3-g2a', 'large', true),
    n('p3-g2a2', 4, 'p3-g2a', 'large', true),
    n('p3-g2b1', 4, 'p3-g2b', 'large', true),
    n('p3-g2b2', 4, 'p3-g2b', 'large', true),
    n('p3-h1a1', 4, 'p3-h1a', 'extravagant', true),
    n('p3-h1a2', 4, 'p3-h1a', 'extravagant', false, { deathCause: 'predation' }),
    n('p3-gx1', 5, 'p3-g2a1', 'large', true),
    n('p3-gx2', 5, 'p3-g2a1', 'large', true),
    n('p3-gx3', 5, 'p3-g2a2', 'large', true),
    n('p3-gx4', 5, 'p3-g2a2', 'large', true),
    n('p3-gx5', 5, 'p3-g2b1', 'large', true),
    n('p3-gx6', 5, 'p3-g2b1', 'large', true),
    n('p3-gx7', 5, 'p3-g2b2', 'large', true),
    n('p3-gx8', 5, 'p3-g2b2', 'medium', true),
    n('p3-ha1', 5, 'p3-h1a1', 'extravagant', true),
    n('p3-ha2', 5, 'p3-h1a1', 'extravagant', true),
  ];
}

// ─── Config ───

const peacockConfig: StoryConfig = {
  title: 'The Peacock\u2019s Tail Story',
  phaseLabels: ['Part 1 \u2014 Small Beginnings', 'Part 2 \u2014 Female Choice', 'Part 3 \u2014 The Trade-off'],
  ariaPrefix: 'Peacock family tree',
  summaryTitle: 'Tail Size Distribution \u2014 Final Generation',

  traitColors: TAIL_COLOR,
  traitLabels: TAIL_LABEL,
  legend: [
    { key: 'small', label: 'Small tail' },
    { key: 'medium', label: 'Medium (M)' },
    { key: 'large', label: 'Large (L)' },
    { key: 'extravagant', label: 'Extravagant (E)' },
  ],

  buildPhase1,
  buildPhase2,
  buildPhase3,

  highlights: [
    { atStep: 4, nodeIds: ['p1-F', 'p1-L', 'p1-M'] },
    { atStep: 11, nodeIds: ['p2-M2a1', 'p2-g', 'p2-h', 'p2-g1', 'p2-g2', 'p2-h1', 'p2-h2'] },
  ],

  eventLine: { p2Gen: 4, label: '\uD83E\uDD9A Mating Season!', color: '#7c3aed' },
  eventBadge: {
    label: '\uD83E\uDD9A Females Choosing',
    className: 'flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600 ring-1 ring-violet-200',
    dotClassName: 'h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500',
  },

  svgBgWhenActive: undefined,

  narratives: [
    {
      title: 'A Single Peacock',
      text: 'Our story begins with a single peacock on an open grassland. His tail is modest \u2014 small and practical. He can run from predators, forage easily, and survive. But will survival alone be enough to pass on his genes?',
    },
    {
      title: 'First Generation',
      text: 'The peacock has produced two offspring. Both inherited their father\'s small tail. In the grassland, these compact tails are no hindrance \u2014 the birds move quickly and stay safe from predators.',
    },
    {
      title: 'Population Growing',
      text: 'The second generation brings four peacocks, all with small tails. The population is healthy and well-adapted to avoiding predators. But evolution has another force waiting in the wings \u2014 one driven not by survival, but by attraction.',
    },
    {
      title: '\u26A1 A Bigger Tail Appears!',
      text: 'Eight peacocks now \u2014 but look! Two have developed medium-sized tails (glowing rings). The bigger tail makes them easier for predators to spot. A fox catches one (red \u2715)! The other survives by luck. Bigger tails seem like a bad idea... or are they?',
    },
    {
      title: '\uD83D\uDD0D Focusing on the Key Branch',
      text: 'The population keeps growing. Let\'s zoom into the highlighted branch \u2014 the parent that produced both a normal small-tailed peacock and the surviving medium-tailed mutant. Something interesting is about to happen.',
    },
    {
      title: 'The Focused Branch',
      text: 'Here\'s our focused view. The parent had two offspring: one with a normal small tail (left) and one carrying the medium-tail mutation (right, marked M). Both are surviving fine. But survival isn\'t the only game in town.',
    },
    {
      title: 'Equal Growth',
      text: 'Both lineages have reproduced. Small-tailed (light blue) and medium-tailed (blue, M) peacocks are growing equally. Without female preference kicking in, the bigger tail is just a neutral \u2014 maybe slightly costly \u2014 variation.',
    },
    {
      title: 'Peaceful Times',
      text: 'Growth continues with some natural deaths \u2014 disease, accidents, old age (\u2715). Both lineages are healthy. The peacocks display their tails occasionally, but the real test hasn\'t come yet...',
    },
    {
      title: '\uD83E\uDD9A Mating Season!',
      text: 'The peahens are choosing mates! They\'re drawn to the medium tails \u2014 bigger, more colorful, more impressive. Every small-tailed male is rejected (red \u2715) \u2014 no mate, no offspring! The medium-tailed males attract all the females. This is sexual selection: survival alone isn\'t enough \u2014 you must also be chosen.',
    },
    {
      title: 'Medium Tails Flourish',
      text: 'The medium-tailed survivors continue breeding. Their genes spread rapidly since they\'re the only ones reproducing. A few are still caught by predators \u2014 larger tails do carry risk \u2014 but the mating advantage far outweighs the danger.',
    },
    {
      title: '\uD83E\uDDEC New Tail Sizes Emerge!',
      text: 'Mutations are creating variety! Some develop large tails (L) \u2014 very impressive to females. Others grow extravagant tails (E) \u2014 the most dazzling of all, but heavy and conspicuous. One mutates back to small \u2014 instantly rejected by females. An extravagant male is caught by a predator. The trade-off is becoming clear.',
    },
    {
      title: '\uD83D\uDD0D Zooming Into the Competition',
      text: 'The tree is getting crowded. Let\'s focus on the highlighted branch \u2014 the ancestor with Medium (M), Large (L), and Extravagant (E) descendants. This is where the trade-off between attraction and survival plays out.',
    },
    {
      title: 'Three Sizes, One Branch',
      text: 'Here\'s our focused subtree. The root (medium) had two children. Mutations have produced three tail sizes: Extravagant (E, most attractive but heaviest), Large (L, very attractive and manageable), and Medium (M, modest display). Who wins when females want big tails but predators punish them?',
    },
    {
      title: '\u2620\uFE0F The Trade-off Bites',
      text: 'Medium-tailed males are increasingly rejected \u2014 females now want bigger displays. But extravagant tails attract predators! One E male is caught by a fox. Large-tailed males hit the sweet spot: attractive enough for mates, agile enough to escape predators. This is the trade-off at work.',
    },
    {
      title: 'Large Tails Take Over',
      text: 'Large-tailed males now dominate. They\'re the Goldilocks of sexual selection \u2014 big enough to impress females, not so big that predators catch them easily. The extravagant males reproduce more per mating, but keep getting picked off. Medium males can barely find mates anymore.',
    },
    {
      title: '\uD83D\uDC51 The Balanced Trait Wins',
      text: 'Large tails make up most of the population. A couple of extravagant males survive, one medium hangs on, but small tails are gone. Unlike natural selection where the best-camouflaged wins, sexual selection creates a BALANCE: the trait can\'t grow forever because predators impose a ceiling. This is why peacock tails are large \u2014 but not infinitely large.',
    },
    {
      title: '\uD83D\uDCCA The Full Journey',
      text: 'From a small-tailed peacock to a population dominated by large tails. The recipe: variation (random mutations in tail size) + sexual selection (female preference for bigger tails) + natural selection (predators catching the biggest tails) = a balanced outcome. The most extreme trait does NOT win \u2014 the optimally balanced trait does. This explains one of biology\'s great puzzles: why ornaments are elaborate but not unlimited.',
    },
  ],

  quizzes: [
    {
      atStep: 3,
      question: 'A medium-tailed mutant was eaten by a predator. If bigger tails attract predators, why would this trait ever spread?',
      options: [
        'It wouldn\'t \u2014 bigger tails are always bad',
        'Bigger tails attract females, giving those males more offspring despite the predation risk',
        'Predators eventually learn to ignore bigger tails',
      ],
      correctIndex: 1,
      explanation:
        'This is the core of sexual selection: a trait can spread even if it\'s dangerous, as long as the mating advantage outweighs the survival cost. More offspring > longer life, evolutionarily speaking.',
    },
    {
      atStep: 8,
      question: 'Females are rejecting small-tailed males. Is this "unfair" from an evolutionary perspective?',
      options: [
        'Yes \u2014 small tails are healthier, so females are making a mistake',
        'No \u2014 by choosing larger tails, females may be selecting for healthier, fitter mates',
        'Evolution doesn\'t involve "choices" at all',
      ],
      correctIndex: 1,
      explanation:
        'A large tail is an "honest signal" \u2014 only a healthy male can afford to grow and maintain one. By preferring large tails, females are indirectly choosing the fittest mates. This is the handicap principle.',
    },
    {
      atStep: 16,
      question: 'The Large (L) tail won over the Extravagant (E) tail. Why didn\'t the MOST extreme trait dominate?',
      options: [
        'The most extreme trait always wins in evolution',
        'Extravagant tails attracted the most mates but also the most predators \u2014 the sweet spot was Large',
        'Females changed their preference mid-simulation',
      ],
      correctIndex: 1,
      explanation:
        'This is the evolutionary trade-off in action. Sexual selection pushes tails larger, but natural selection (predation) pushes them smaller. The "winner" is the best balance \u2014 large enough to attract mates, not so large that predators catch you. This is why peacock tails are big but not infinite!',
    },
  ],

  summary: [
    { label: 'Large (L)', count: 8, color: TAIL_COLOR.large, max: 11 },
    { label: 'Extravagant (E)', count: 2, color: TAIL_COLOR.extravagant, max: 11 },
    { label: 'Medium (M)', count: 1, color: TAIL_COLOR.medium, max: 11 },
    { label: 'Small', count: 0, color: TAIL_COLOR.small, max: 11, extinct: true },
  ],

  soundMap: { 3: 'mutation', 8: 'alert', 10: 'mutation', 16: 'complete' },

  nodeColor: (node: StoryNode) => {
    if (node.alive) return TAIL_COLOR[node.trait];
    return (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#fecaca' : '#e5e7eb';
  },
  nodeStroke: (node: StoryNode) => {
    if (node.alive) return node.trait === 'small' ? '#7dd3fc' : 'none';
    return (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#f87171' : '#d1d5db';
  },
  nodeLabelColor: (node: StoryNode) =>
    node.trait === 'small' ? '#1e40af' : 'white',
  nodeStrokeWidth: (node: StoryNode) =>
    node.alive ? (node.trait === 'small' ? 1 : 0) : 1.5,
  edgeColor: (node: StoryNode) => {
    if (node.alive) return TAIL_COLOR[node.trait];
    return (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#fca5a5' : '#d1d5db';
  },
  deadTextColor: (node: StoryNode) =>
    (node.deathCause === 'predation' || node.deathCause === 'rejected') ? '#ef4444' : '#9ca3af',
  nodeAriaLabel: (node: StoryNode) =>
    `Peacock, ${node.trait} tail, ${node.alive ? 'alive' : 'dead'}${node.mutationEvent ? ', mutation' : ''}`,

  theme: {
    playBtnBg: 'bg-violet-500',
    playBtnHover: 'bg-violet-600',
    narrativeBorder: 'border-violet-100',
    narrativeBg: 'bg-violet-50/60',
    narrativeText: 'text-violet-900',
    narrativeBold: 'text-violet-800',
    svgBg: '#faf8ff',
    highlightColor: '#7c3aed',
    toolBtnBg: 'bg-violet-100',
    toolBtnHover: 'bg-violet-200',
    toolBtnText: 'text-violet-500',
    stepBg: 'bg-violet-100',
    stepText: 'text-violet-600',
    quizTheme: 'violet',
  },
};

// ─── Component ───

export default function NarrativePeacockSimulation() {
  return <NarrativeStoryShell config={peacockConfig} />;
}

export { NarrativePeacockSimulation };
