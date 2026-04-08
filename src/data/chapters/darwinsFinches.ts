import type { Chapter } from '../../types/tutorial';

export const darwinsFinchesChapter: Chapter = {
  id: 'darwins-finches',
  title: "Darwin's Finches",
  description:
    'Learn about adaptive radiation — how one finch species diversified into 13+ species on the Galápagos Islands, each with a beak shaped by its food source.',
  icon: '🐦',
  lessons: [
    {
      id: 'the-galapagos',
      title: 'The Galápagos Islands',
      description: 'Why islands are evolution laboratories.',
      icon: '🏝️',
      pages: [
        {
          title: 'A Natural Laboratory',
          content:
            'The Galápagos Islands sit 1,000 km off the coast of Ecuador in the Pacific Ocean. They are volcanic — formed by lava erupting from the ocean floor. When they first emerged, they were completely lifeless.\n\nOver millions of years, a few species arrived by chance — carried by wind, waves, or floating debris. These colonizers found an empty world with no competitors, no predators, and abundant resources. A perfect stage for evolution.',
          illustration: '🏝️',
        },
        {
          title: 'Why Islands Matter',
          content:
            'Islands are special for evolution because:\n\n• Isolation — populations can\'t easily mix with mainland relatives\n• Empty niches — no existing species to compete with\n• Small populations — genetic changes spread faster\n• Varied environments — different islands have different conditions\n\nThis combination makes islands "evolution laboratories" where new species form much faster than on continents.',
          keyTerm: {
            term: 'Ecological Niche',
            definition:
              'The specific role a species plays in its ecosystem — what it eats, where it lives, and how it interacts with other species. Empty niches are opportunities for new species.',
          },
        },
        {
          title: 'The Finch Arrival',
          content:
            'Around 2-3 million years ago, a small flock of finches from mainland South America reached the Galápagos — probably blown off course by a storm.\n\nThey found islands rich in food: seeds of many sizes, insects, cactus fruits, and more. With no other bird species competing for these resources, the finches had the islands to themselves.\n\nThis was the starting point for one of the most famous examples of evolution in action.',
          illustration: '🐦',
        },
      ],
    },
    {
      id: 'adaptive-radiation',
      title: 'Adaptive Radiation',
      description: 'How one species becomes many through ecological opportunity.',
      icon: '🌳',
      pages: [
        {
          title: 'What Is Adaptive Radiation?',
          content:
            'Adaptive radiation is the rapid diversification of a single ancestral species into many new species, each adapted to a different ecological niche.\n\nIt happens when a species encounters many empty niches — opportunities to eat different foods, live in different habitats, or behave in different ways. Each niche favors different traits, so different populations evolve in different directions.',
          keyTerm: {
            term: 'Adaptive Radiation',
            definition:
              'Rapid evolution of many new species from a single ancestor, driven by adaptation to different ecological niches. Classic examples: Darwin\'s finches, Hawaiian honeycreepers, cichlid fish.',
          },
        },
        {
          title: 'The Key Ingredients',
          content:
            'Adaptive radiation requires:\n\n1. Ecological opportunity — empty niches waiting to be filled (e.g., no competing bird species on the Galápagos)\n2. Ancestral variation — the founding species has enough genetic diversity for selection to act on\n3. Key innovation — a trait that can be modified to exploit different niches (for finches, this is beak shape)\n\nWhen all three align, evolution can produce dramatic diversification in a relatively short time.',
          illustration: '🔑',
        },
        {
          title: 'Disruptive Selection',
          content:
            'Normal natural selection often pushes a population toward one optimal trait value (directional selection). But when multiple niches exist, selection can favor extremes over the middle.\n\nThis is disruptive selection: small beaks are best for small seeds, large beaks are best for large seeds, and medium beaks are "okay but not great" at both. Over time, the population splits toward the extremes.\n\nDisruptive selection is how one population begins to divide into two.',
          keyTerm: {
            term: 'Disruptive Selection',
            definition:
              'Selection that favors extreme trait values over intermediate ones. Can split a single population into two groups, potentially leading to speciation.',
          },
        },
        {
          title: 'In the Simulation',
          content:
            'In our simulation, you\'ll see this process:\n\n• Initially, all finches have medium beaks and do equally well\n• As population grows, food competition intensifies\n• Small-beaked and large-beaked specialists outcompete medium-beaked generalists\n• The population splits into distinct groups\n\nWatch the histogram and family bars — you\'ll see the population shift from one central cluster to two separate groups at the extremes. This bimodal distribution is the signature of disruptive selection.',
          illustration: '💻',
        },
      ],
    },
    {
      id: 'beak-diversity',
      title: 'Beak Diversity',
      description: 'How one beak became many — the mechanics of finch diversification.',
      icon: '🔬',
      pages: [
        {
          title: '13+ Species From One Ancestor',
          content:
            'Today there are at least 13 recognized species of Darwin\'s finches, each with a distinctively shaped beak:\n\n• Ground finches — short, strong beaks for cracking seeds\n• Tree finches — longer beaks for catching insects in bark\n• Cactus finches — pointed beaks for eating cactus flowers and fruits\n• Warbler finch — thin, sharp beak for picking small insects\n• Woodpecker finch — uses cactus spines as tools to extract insects!\n\nAll descended from one ancestral species. Beak shape is the key trait that diversified.',
          illustration: '🐦',
        },
        {
          title: 'Form Follows Function',
          content:
            'Each beak shape is perfectly adapted to its food source:\n\n• Crushing large seeds requires a deep, wide beak with powerful muscles\n• Picking tiny insects requires a thin, precise beak\n• Probing cactus flowers requires a long, curved beak\n\nThe beak isn\'t just a tool — it determines what a finch can eat, which determines where it can live, which determines who it competes with. Beak shape defines the ecological niche.',
          keyTerm: {
            term: 'Character Displacement',
            definition:
              'When similar species living in the same area evolve to become more different from each other, reducing competition. Finch beaks on the same island diverge more than on separate islands.',
          },
        },
        {
          title: 'The Grants\' Discovery',
          content:
            'Biologists Peter and Rosemary Grant spent 40 years studying finches on the tiny island of Daphne Major. They documented evolution happening in real time:\n\nDuring a severe drought in 1977, only large, hard seeds survived. Small-beaked finches starved. The next generation had measurably larger beaks — natural selection in a single generation.\n\nThen in 1983, heavy rains produced abundant small seeds. Small-beaked finches thrived. Beak size shifted back.\n\nEvolution isn\'t a one-way street — it responds to current conditions.',
          illustration: '📊',
        },
        {
          title: 'From Finches to Everything',
          content:
            'The finch story is a miniature version of how all life diversified:\n\n• All mammals descended from a single ancestral species — and radiated into bats, whales, horses, and humans\n• All flowering plants descended from one ancestor — and diversified into 300,000+ species\n• All life on Earth shares a single common ancestor — and radiated into every living thing\n\nDarwin\'s finches show us the mechanism in a setting small enough to study. The same process, repeated over billions of years, built the entire tree of life.',
          illustration: '🌍',
        },
      ],
    },
  ],
};
