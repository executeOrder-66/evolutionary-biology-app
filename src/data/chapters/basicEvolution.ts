import type { Chapter } from '../../types/tutorial';

export const basicEvolutionChapter: Chapter = {
  id: 'basic-evolution',
  title: 'Basic Evolution',
  description:
    'Learn the fundamental concepts of evolution — from DNA to natural selection to speciation.',
  icon: '🧬',
  lessons: [
    // ── Lesson 1: What Is Evolution? ──
    {
      id: 'what-is-evolution',
      title: 'What Is Evolution?',
      description: 'The big picture — what evolution means and why it matters.',
      icon: '🌍',
      pages: [
        {
          title: 'A Simple Definition',
          content:
            'Evolution is the change in the traits of a population over generations.\n\nIt doesn\'t happen to individuals — it happens to groups. A single bacterium doesn\'t evolve. A population of bacteria does, as some traits become more common and others disappear.',
          illustration: '🔄',
        },
        {
          title: 'Evolution Is Not Progress',
          content:
            'A common misconception is that evolution means "getting better." It doesn\'t. Evolution simply means change over time.\n\nA species can evolve to become smaller, slower, or simpler if that helps it survive in its environment. There is no ladder — only adaptation to current conditions.',
          illustration: '📏',
        },
        {
          title: 'Evolution Is Happening Right Now',
          content:
            'Evolution isn\'t just something that happened millions of years ago to dinosaurs. It\'s happening right now, all around us.\n\nBacteria evolve resistance to antibiotics in hospitals. Insects evolve resistance to pesticides on farms. Viruses evolve to evade vaccines. These are all evolution in action.',
          illustration: '⏰',
        },
        {
          title: 'The Key Ingredients',
          content:
            'For evolution to happen, you need three things:\n\n1. Variation — individuals differ from each other\n2. Inheritance — parents pass traits to offspring\n3. Selection — some traits help survival better than others\n\nIf all three are present, evolution is inevitable. It\'s not a theory about whether it happens — it\'s a description of what always happens when these conditions are met.',
          diagramId: 'three-ingredients',
          keyTerm: {
            term: 'Evolution',
            definition:
              'The change in inherited traits within a population across successive generations.',
          },
        },
      ],
    },

    // ── Lesson 2: Traits, Genes, and Inheritance ──
    {
      id: 'traits-and-inheritance',
      title: 'Traits, Genes, and Inheritance',
      description: 'How traits are passed from parents to offspring.',
      icon: '🧪',
      pages: [
        {
          title: 'What Is a Trait?',
          content:
            'A trait is any characteristic of an organism. Eye color, height, fur thickness, resistance to disease — these are all traits.\n\nSome traits are visible (like color), while others are invisible (like how efficiently a cell produces energy). Both kinds matter for evolution.',
          illustration: '🎨',
          keyTerm: {
            term: 'Trait',
            definition:
              'Any observable or measurable characteristic of an organism.',
          },
        },
        {
          title: 'Traits Come From Genes',
          content:
            'Genes are instructions stored in DNA that tell cells how to build and maintain an organism. Different versions of a gene produce different versions of a trait.\n\nFor example, one version of a gene might produce dark fur, while another version produces light fur. These different versions are called alleles.',
          diagramId: 'dna-to-trait',
        },
        {
          title: 'Inheritance: Passing Traits Down',
          content:
            'When organisms reproduce, they pass copies of their genes to their offspring. This is inheritance.\n\nIn bacteria, this is simple: a bacterium splits in two, and each copy gets nearly identical genes. In animals, offspring get a mix of genes from both parents.\n\nThis is why children resemble their parents — but aren\'t identical to them.',
          illustration: '👨‍👩‍👧',
        },
        {
          title: 'Mutation: The Source of New Variation',
          content:
            'Occasionally, a small error occurs when DNA is copied. This is called a mutation.\n\nMost mutations have no noticeable effect. Some are harmful. Rarely, a mutation produces a trait that happens to be useful in the current environment.\n\nMutations are random — they don\'t happen "because" an organism needs them. But they provide the raw material that natural selection acts on.',
          diagramId: 'mutation',
          keyTerm: {
            term: 'Mutation',
            definition:
              'A random change in DNA that can create new trait variations. Mutations are the ultimate source of genetic diversity.',
          },
        },
      ],
    },

    // ── Lesson 3: Natural Selection ──
    {
      id: 'natural-selection',
      title: 'Natural Selection',
      description:
        'The engine of evolution — how the environment shapes populations.',
      icon: '🏔️',
      pages: [
        {
          title: 'The Core Idea',
          content:
            'Natural selection is simple: organisms with traits that help them survive and reproduce in their environment will have more offspring. Those offspring inherit the helpful traits. Over time, the population shifts.\n\nThis isn\'t a conscious process. Nobody is "selecting." The environment just makes survival harder for some and easier for others.',
          illustration: '⚡',
        },
        {
          title: 'Variation Is the Starting Point',
          content:
            'Natural selection can only work if individuals are different from each other. If every bacterium had exactly the same resistance to antibiotics, antibiotics would either kill all of them or none of them.\n\nBut because there\'s variation — some have slightly more resistance, some less — antibiotics kill the vulnerable ones and spare the resistant ones. That difference is where selection begins.',
          illustration: '🌈',
        },
        {
          title: 'Fitness: It\'s Not About Strength',
          content:
            'In biology, "fitness" doesn\'t mean being strong or fast. It means how well an organism survives and reproduces in its current environment.\n\nA slow, small bacterium with antibiotic resistance has higher fitness than a fast, large one without resistance — if antibiotics are present. Fitness always depends on context.',
          keyTerm: {
            term: 'Fitness',
            definition:
              'An organism\'s ability to survive and reproduce in its specific environment. High fitness = more likely to pass on genes.',
          },
          illustration: '🏆',
        },
        {
          title: 'Selection Pressure',
          content:
            'A selection pressure is any environmental factor that affects who survives. Predators, disease, temperature, food scarcity, antibiotics — these are all selection pressures.\n\nWhen a new selection pressure appears (like antibiotics in a hospital), it changes which traits are beneficial. The population then shifts toward traits that handle the new pressure.',
          diagramId: 'selection-pressure',
          keyTerm: {
            term: 'Selection Pressure',
            definition:
              'An environmental factor that makes certain traits more or less advantageous for survival.',
          },
        },
        {
          title: 'Natural Selection in Action',
          content:
            'Here\'s a real example: In England, peppered moths were mostly light-colored, blending in with pale tree bark. During the Industrial Revolution, soot darkened the trees.\n\nSuddenly, light moths were easy for birds to spot, while dark moths were camouflaged. Within decades, the population shifted from mostly light to mostly dark. When pollution was cleaned up, the population shifted back.\n\nNo individual moth changed color. The population changed because survivors passed on their traits.',
          diagramId: 'natural-selection-before-after',
        },
      ],
    },

    // ── Lesson 4: Other Types of Selection ──
    {
      id: 'types-of-selection',
      title: 'Beyond Natural Selection',
      description:
        'Sexual selection, artificial selection, and other evolutionary forces.',
      icon: '🦚',
      pages: [
        {
          title: 'Sexual Selection',
          content:
            'Not all selection is about survival. Sexual selection is about mating.\n\nIf females prefer males with bright feathers, then bright-feathered males reproduce more — even if bright feathers make them easier for predators to spot. The trait spreads because of mating advantage, not survival advantage.\n\nPeacock tails are the classic example: they\'re costly to maintain and dangerous, but females prefer them.',
          keyTerm: {
            term: 'Sexual Selection',
            definition:
              'Selection driven by mate preferences rather than environmental survival. Can produce traits that are actually harmful for survival but boost reproduction.',
          },
          illustration: '🦚',
        },
        {
          title: 'Artificial Selection',
          content:
            'When humans deliberately choose which organisms get to reproduce, that\'s artificial selection.\n\nWe\'ve been doing it for thousands of years. Dogs were bred from wolves by selecting the tamest, friendliest individuals. Corn was bred from a tiny grass called teosinte by selecting plants with bigger kernels.\n\nArtificial selection works exactly like natural selection — but humans are the selection pressure.',
          keyTerm: {
            term: 'Artificial Selection',
            definition:
              'Selective breeding by humans. Same mechanism as natural selection, but the "environment" is human preference.',
          },
          illustration: '🐕',
        },
        {
          title: 'Genetic Drift',
          content:
            'Sometimes traits become more or less common purely by chance, especially in small populations. This is genetic drift.\n\nImagine a storm kills half a population randomly. The survivors might happen to be mostly brown — not because brown is better, but by luck. Now the next generation is mostly brown.\n\nDrift is strongest in small populations. In large populations, random chance averages out.',
          keyTerm: {
            term: 'Genetic Drift',
            definition:
              'Random changes in trait frequency due to chance, not selection. Most significant in small populations.',
          },
          illustration: '🎰',
        },
        {
          title: 'All Forces Work Together',
          content:
            'In real populations, natural selection, sexual selection, genetic drift, and mutation all happen simultaneously.\n\nA population of birds might be evolving brighter plumage through sexual selection, while natural selection pushes for duller colors to avoid predators, while genetic drift randomly shifts beak size, while mutations occasionally introduce new color patterns.\n\nEvolution is the sum of all these forces.',
          illustration: '🔀',
        },
      ],
    },

    // ── Lesson 5: Speciation and the Big Picture ──
    {
      id: 'speciation',
      title: 'How New Species Form',
      description:
        'From populations to species — how evolution creates biodiversity.',
      icon: '🌳',
      pages: [
        {
          title: 'What Is a Species?',
          content:
            'A species is generally defined as a group of organisms that can interbreed and produce fertile offspring.\n\nDogs and wolves can interbreed — they\'re closely related species (some scientists consider them the same species). Dogs and cats cannot — they\'re different species. Horses and donkeys can mate, but their offspring (mules) are infertile — so they\'re separate species.',
          keyTerm: {
            term: 'Species',
            definition:
              'A group of organisms capable of interbreeding and producing fertile offspring.',
          },
          illustration: '🐾',
        },
        {
          title: 'Isolation Starts the Process',
          content:
            'Speciation usually begins when a population is split into groups that can\'t interbreed — often by a physical barrier like a mountain range, river, or ocean.\n\nEach group faces different environments and different selection pressures. Over many generations, they accumulate different traits. Eventually, they become so different that even if the barrier disappeared, they could no longer interbreed.',
          diagramId: 'speciation',
        },
        {
          title: 'Adaptive Radiation',
          content:
            'When a species arrives in a new environment with many empty ecological niches, it can rapidly diversify into many new species. This is adaptive radiation.\n\nThe most famous example is Darwin\'s finches in the Galapagos Islands. One ancestral finch species arrived and diversified into 13+ species, each adapted to a different food source — different beak shapes for seeds, insects, cactus, and more.',
          diagramId: 'adaptive-radiation',
          keyTerm: {
            term: 'Adaptive Radiation',
            definition:
              'Rapid diversification of a single species into many new species, each adapted to a different ecological niche.',
          },
        },
        {
          title: 'The Tree of Life',
          content:
            'All life on Earth shares a common ancestor. Over billions of years, populations split, adapted, and diverged — producing the incredible diversity of life we see today.\n\nEvery living thing — from bacteria to blue whales, from mushrooms to humans — is connected through this branching tree of descent. Evolution is the process that built it, branch by branch, generation by generation.',
          diagramId: 'tree-of-life',
        },
      ],
    },
  ],
};
