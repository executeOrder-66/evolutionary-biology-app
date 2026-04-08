import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'antibiotic-resistance',
    name: 'Antibiotic Resistance',
    description:
      'Watch how bacteria evolve resistance to antibiotics through natural selection. Non-resistant bacteria die off while resistant ones survive and multiply.',
    category: 'natural',
    difficulty: 'beginner',
    icon: '🦠',
    enabled: true,
    parameters: {
      maxGenerations: 50,
      minPopulationSize: 100,
      maxPopulationSize: 500,
      updateInterval: 500,
    },
    genetics: {
      mutationRate: 0.05,
      recombinationRate: 0.1,
      offspringPerReproduction: 3,
    },
    traits: [
      {
        name: 'resistance',
        displayName: 'Antibiotic Resistance',
        description:
          'How well protected a bacterium is against antibiotics. Higher = more likely to survive.',
        min: 0,
        max: 1,
        units: 'level',
        mutationRate: 0.008,
        mutationMagnitude: 0.03,
      },
    ],
    educationalContent: {
      objectives: [
        'See how antibiotics create a survival-of-the-fittest situation',
        'Watch which family lines survive and which go extinct',
        'Understand why overusing antibiotics breeds "superbugs"',
      ],
      background:
        'Antibiotic resistance is evolution happening in real time. When bacteria face antibiotics, the ones with natural protection survive while the rest are killed. The survivors pass their protection to their children, and within a few generations the entire population becomes resistant. This is why doctors warn against overusing antibiotics.',
      steps: [
        {
          triggerGeneration: 0,
          title: 'Meet the Families',
          content:
            'You\'re looking at a population of bacteria. We\'re tracking 5 families — from Tiny (almost no protection) to Tank (heavily armored). Right now there are no antibiotics, so everyone is doing fine. Notice the colored bars showing each family\'s size.',
        },
        {
          triggerGeneration: 5,
          title: 'Life Before Antibiotics',
          content:
            'All five families are growing and thriving. Without antibiotics, having armor is actually a tiny disadvantage — it takes energy to maintain. So unprotected bacteria like Tiny and Scout are doing just as well as armored ones.',
        },
        {
          triggerGeneration: 10,
          title: '💊 Antibiotics Introduced!',
          content:
            'A dose of antibiotics has just hit the population! This is the critical moment. Bacteria without protection will start dying. Watch the family bars — you should see Tiny and Scout\'s families begin to shrink rapidly.',
        },
        {
          triggerGeneration: 15,
          title: 'The Killing Floor',
          content:
            'The antibiotics are getting stronger. Unprotected families are being wiped out — their branches in the family tree have stopped growing. Meanwhile, Tank and Rusty\'s families are the main survivors. This IS natural selection happening before your eyes.',
        },
        {
          triggerGeneration: 25,
          title: 'Survival of the Protected',
          content:
            'By now, the least-protected families have likely gone extinct (look for "EXTINCT" badges). The population has crashed and is recovering — but now it\'s made up almost entirely of well-armored bacteria. The antibiotics selected for resistance.',
        },
        {
          triggerGeneration: 40,
          title: 'The Superbug Problem',
          content:
            'The population has recovered, but look who\'s left: almost all bacteria are now descendants of the most resistant ancestors. This is exactly what happens in hospitals — antibiotics kill vulnerable bacteria but breed resistant "superbugs." The bacteria didn\'t choose to become resistant; the antibiotics chose which ones survived.',
        },
      ],
      keyConcepts: [
        {
          term: 'Natural Selection',
          definition:
            'When the environment (like antibiotics) determines which individuals survive to have children. It\'s not random — traits that help survival get passed on.',
        },
        {
          term: 'Selection Pressure',
          definition:
            'An environmental challenge (like antibiotics) that makes some individuals more likely to survive than others.',
        },
        {
          term: 'Survival Chance',
          definition:
            'How likely a bacterium is to survive and reproduce in the current environment. Resistant bacteria have high survival chances when antibiotics are present.',
        },
        {
          term: 'Population Bottleneck',
          definition:
            'A sharp drop in population size when many individuals are killed (like by antibiotics). The survivors shape the future population.',
        },
        {
          term: 'Mutation',
          definition:
            'A small, random change passed to offspring. Mutations are rare and tiny — evolution works by selecting among existing variation, not by creating new traits on demand.',
        },
      ],
    },
  },
  {
    id: 'peppered-moths',
    name: 'Peppered Moths',
    description:
      'Explore industrial melanism — how peppered moths evolved darker coloring during the Industrial Revolution as pollution darkened tree bark.',
    category: 'natural',
    difficulty: 'beginner',
    icon: '🦋',
    enabled: true,
    parameters: {
      maxGenerations: 60,
      minPopulationSize: 200,
      maxPopulationSize: 500,
      updateInterval: 500,
    },
    genetics: {
      mutationRate: 0.005,
      recombinationRate: 0.1,
      offspringPerReproduction: 2,
    },
    traits: [
      {
        name: 'coloration',
        displayName: 'Wing Coloration',
        description:
          'Wing darkness level. 0 = light/peppered, 1 = dark/melanic.',
        min: 0,
        max: 1,
        mutationRate: 0.01,
        mutationMagnitude: 0.1,
      },
    ],
    educationalContent: {
      objectives: [
        'Understand how environmental changes drive natural selection',
        'Learn about the classic peppered moth case study',
        'See how camouflage affects survival',
      ],
      background:
        'Before the Industrial Revolution, most peppered moths in England were light-colored, blending in with pale tree bark. As factories polluted the air, soot darkened the trees. Dark (melanic) moths, once rare, became better camouflaged while light moths became easy targets for birds.',
      steps: [
        {
          triggerGeneration: 0,
          title: 'Pre-Industrial Population',
          content:
            'The population starts with mostly light-colored moths that blend in with clean, lichen-covered tree bark.',
        },
        {
          triggerGeneration: 15,
          title: 'Pollution Begins',
          content:
            'Industrial pollution is darkening the tree bark. Light moths are becoming more visible to predators.',
        },
        {
          triggerGeneration: 30,
          title: 'Industrial Melanism',
          content:
            'Dark moths now have a survival advantage. Watch the population shift toward darker coloration.',
        },
      ],
      keyConcepts: [
        {
          term: 'Industrial Melanism',
          definition:
            'The darkening of species in polluted industrial areas, a classic example of natural selection.',
        },
        {
          term: 'Camouflage',
          definition:
            'A survival strategy where an organism blends with its environment to avoid predation.',
        },
      ],
    },
  },
  {
    id: 'peacock-tails',
    name: 'Peacock Tail Evolution',
    description:
      'See how female mate choice drives the evolution of elaborate peacock tails — a classic example of sexual selection.',
    category: 'sexual',
    difficulty: 'intermediate',
    icon: '🦚',
    enabled: true,
    parameters: {
      maxGenerations: 60,
      minPopulationSize: 80,
      maxPopulationSize: 300,
      updateInterval: 500,
    },
    genetics: {
      mutationRate: 0.01,
      recombinationRate: 0.15,
      offspringPerReproduction: 2,
    },
    traits: [
      {
        name: 'tailSize',
        displayName: 'Tail Size',
        description:
          'Size and elaborateness of the tail display. Larger tails attract mates but reduce survival.',
        min: 0,
        max: 1,
        mutationRate: 0.02,
        mutationMagnitude: 0.1,
      },
    ],
    educationalContent: {
      objectives: [
        'Understand how sexual selection differs from natural selection',
        'Learn about the trade-off between mating success and survival',
        'Observe how mate preferences shape trait evolution',
      ],
      background:
        "Peacock tails are a textbook example of sexual selection. Female peahens prefer males with larger, more elaborate tails. However, large tails are costly — they require energy to grow and maintain, and make males more visible to predators.",
      steps: [
        {
          triggerGeneration: 0,
          title: 'Modest Beginnings',
          content:
            'The population starts with relatively small tails. There is natural variation in tail size.',
        },
        {
          triggerGeneration: 15,
          title: 'Female Choice at Work',
          content:
            'Females prefer larger-tailed males, giving them a reproductive advantage.',
        },
        {
          triggerGeneration: 35,
          title: 'The Trade-off',
          content:
            'Tails are getting larger, but the survival cost is increasing.',
        },
      ],
      keyConcepts: [
        {
          term: 'Sexual Selection',
          definition:
            'Selection driven by mate choice rather than environmental survival pressures.',
        },
        {
          term: 'Fisherian Runaway',
          definition:
            'A process where female preference and male trait escalate together.',
        },
      ],
    },
  },
  {
    id: 'dog-domestication',
    name: 'Dog Domestication',
    description:
      'Simulate thousands of years of selective breeding as wolves are gradually transformed into domesticated dogs.',
    category: 'artificial',
    difficulty: 'intermediate',
    icon: '🐕',
    enabled: true,
    parameters: {
      maxGenerations: 80,
      minPopulationSize: 50,
      maxPopulationSize: 200,
      updateInterval: 500,
    },
    genetics: {
      mutationRate: 0.01,
      recombinationRate: 0.2,
      offspringPerReproduction: 3,
    },
    traits: [
      {
        name: 'tameness',
        displayName: 'Tameness',
        description:
          'How docile and friendly the animal is toward humans.',
        min: 0,
        max: 1,
        mutationRate: 0.02,
        mutationMagnitude: 0.1,
      },
      {
        name: 'size',
        displayName: 'Body Size',
        description: 'Overall body size.',
        min: 0,
        max: 1,
        mutationRate: 0.01,
        mutationMagnitude: 0.08,
      },
    ],
    educationalContent: {
      objectives: [
        'Understand how artificial selection differs from natural selection',
        'Learn about the domestication process',
        'See how humans have shaped animal traits over generations',
      ],
      background:
        'Dogs were the first domesticated animal, descended from wolves around 15,000-40,000 years ago. Early humans selectively bred wolves that were less fearful and more cooperative.',
      steps: [
        {
          triggerGeneration: 0,
          title: 'Wolf Ancestors',
          content: 'We begin with a population of wolf-like animals.',
        },
        {
          triggerGeneration: 20,
          title: 'Early Domestication',
          content:
            'Humans are selecting the tamest individuals for breeding.',
        },
        {
          triggerGeneration: 50,
          title: 'Domestication Syndrome',
          content:
            'As tameness increases, correlated changes appear in multiple traits.',
        },
      ],
      keyConcepts: [
        {
          term: 'Artificial Selection',
          definition:
            'Selective breeding by humans to produce desired traits.',
        },
        {
          term: 'Domestication Syndrome',
          definition:
            'A suite of traits that commonly appear in domesticated animals.',
        },
      ],
    },
  },
  {
    id: 'darwins-finches',
    name: "Darwin's Finches",
    description:
      "Watch one finch species diversify into specialists with different beak sizes — the classic example of adaptive radiation on the Galápagos Islands.",
    category: 'speciation',
    difficulty: 'intermediate',
    icon: '🐦',
    enabled: true,
    parameters: {
      maxGenerations: 60,
      minPopulationSize: 120,
      maxPopulationSize: 500,
      updateInterval: 500,
    },
    genetics: {
      mutationRate: 0.01,
      recombinationRate: 0.1,
      offspringPerReproduction: 2,
    },
    traits: [
      {
        name: 'beakSize',
        displayName: 'Beak Size',
        description:
          'Size and shape of the beak. Small beaks crack small seeds; large beaks crack large seeds.',
        min: 0,
        max: 1,
        units: 'size',
        mutationRate: 0.015,
        mutationMagnitude: 0.06,
      },
    ],
    educationalContent: {
      objectives: [
        'See how one species can diversify into multiple specialists',
        'Understand how different food sources create divergent selection pressures',
        'Learn why adaptive radiation happens on islands',
      ],
      background:
        "Darwin's finches are 13+ species of birds found on the Galápagos Islands. They all descended from a single ancestral species that arrived from South America. Over time, different populations adapted to different food sources — small seeds, large seeds, insects, cactus — by evolving different beak sizes and shapes. This is adaptive radiation: rapid diversification driven by available ecological niches.",
      steps: [
        {
          triggerGeneration: 0,
          title: 'One Species Arrives',
          content:
            "A single finch species has arrived on the Galápagos Islands. There's a range of beak sizes in the population, but they're all one species eating whatever food they find.",
        },
        {
          triggerGeneration: 8,
          title: 'Abundant Food',
          content:
            "With no competition from other bird species, all beak sizes are doing well. There's plenty of food for everyone. The population is growing rapidly in this new paradise.",
        },
        {
          triggerGeneration: 15,
          title: '🏝️ Food Niches Emerge!',
          content:
            "As the population grows, competition for food increases. Now beak size matters: small beaks are better at cracking small seeds, while large beaks handle large, tough seeds. Medium beaks aren't great at either — they're generalists competing with specialists on both sides.",
        },
        {
          triggerGeneration: 25,
          title: 'Divergent Selection',
          content:
            "The population is splitting! Small-beaked finches dominate the small-seed niche, large-beaked finches dominate the large-seed niche. Medium-beaked birds face the most competition and are declining. This is disruptive selection — the extremes are favored over the middle.",
        },
        {
          triggerGeneration: 40,
          title: 'Specialists Emerge',
          content:
            "Two distinct groups are forming: small-beak specialists and large-beak specialists. Each is well-adapted to its food source. The medium-beaked generalists are being outcompeted on both fronts.",
        },
        {
          triggerGeneration: 55,
          title: 'Adaptive Radiation Complete',
          content:
            "From one generalist species, two specialist populations have emerged — each adapted to a different ecological niche. In real life, this process repeated across many islands and food types, eventually producing 13+ distinct finch species. This is adaptive radiation: diversification driven by ecological opportunity.",
        },
      ],
      keyConcepts: [
        {
          term: 'Adaptive Radiation',
          definition:
            'Rapid diversification of a single species into many new forms, each adapted to a different ecological niche. Often happens on islands with empty niches.',
        },
        {
          term: 'Disruptive Selection',
          definition:
            'Selection that favors extreme trait values over intermediate ones, potentially splitting a population into two groups.',
        },
        {
          term: 'Ecological Niche',
          definition:
            "A species' role in its ecosystem — what it eats, where it lives, when it's active. Different niches reduce competition between species.",
        },
        {
          term: 'Speciation',
          definition:
            'The formation of new species. Often begins when populations become reproductively isolated and adapt to different environments.',
        },
      ],
    },
  },
];
