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
  {
    id: 'predator-prey',
    name: 'Predator-Prey Arms Race',
    description:
      'Watch rabbits evolve speed to escape foxes while predators co-evolve to keep up. A classic evolutionary arms race!',
    category: 'natural',
    difficulty: 'intermediate',
    icon: '🐇',
    enabled: true,
    parameters: {
      maxGenerations: 60,
      minPopulationSize: 80,
      maxPopulationSize: 400,
      updateInterval: 500,
    },
    genetics: {
      mutationRate: 0.01,
      recombinationRate: 0.1,
      offspringPerReproduction: 3,
    },
    traits: [
      {
        name: 'speed',
        displayName: 'Speed',
        description:
          'Running speed of the rabbit. Faster rabbits are more likely to escape predators.',
        min: 0,
        max: 1,
        units: 'level',
        mutationRate: 0.01,
        mutationMagnitude: 0.04,
      },
    ],
    educationalContent: {
      objectives: [
        'See how predators and prey drive each other to evolve',
        'Understand the Red Queen hypothesis — running to stay in place',
        'Watch how a sudden predator change causes rapid adaptation or extinction',
      ],
      background:
        'Predator-prey arms races are one of the most powerful engines of evolution. Rabbits that run faster escape foxes and survive to reproduce. But foxes that run faster catch more rabbits and have more offspring. Over generations, both species get faster — but neither gains a lasting advantage. This is co-evolution in action.',
      steps: [
        {
          triggerGeneration: 0,
          title: 'Meet the Rabbits',
          content:
            'A population of rabbits with varying speeds. Predators (foxes) are currently slow — most rabbits can outrun them. All families are thriving.',
        },
        {
          triggerGeneration: 5,
          title: 'Predators Getting Faster',
          content:
            'Fox speed is gradually increasing through their own evolution. The slowest rabbits are starting to get caught. Watch the speed trait begin to shift upward.',
        },
        {
          triggerGeneration: 15,
          title: 'The Arms Race Heats Up',
          content:
            'Predator speed keeps climbing. Slow rabbit families are declining as only the fastest survive. This is co-evolution — each side driving the other to adapt.',
        },
        {
          triggerGeneration: 20,
          title: '⚡ Superpredator Arrives!',
          content:
            'A new, much faster predator has entered the ecosystem! Predator speed just jumped sharply. Many rabbits that were "fast enough" before are now too slow. Watch for a population crash.',
        },
        {
          triggerGeneration: 30,
          title: 'Adapting to the New Threat',
          content:
            'The population is recovering — but only the fastest families survived the superpredator event. Average speed has increased dramatically. This is the Red Queen effect: running faster just to stay alive.',
        },
        {
          triggerGeneration: 50,
          title: 'The Arms Race Continues',
          content:
            'The surviving rabbits are much faster than their ancestors, but predators keep evolving too. Neither side can rest — this arms race has no finish line. In nature, this process has produced cheetahs and gazelles, the fastest land animals on Earth.',
        },
      ],
      keyConcepts: [
        {
          term: 'Co-evolution',
          definition:
            'When two species evolve in response to each other. Changes in prey drive changes in predators, and vice versa.',
        },
        {
          term: 'Red Queen Hypothesis',
          definition:
            'Species must constantly evolve just to maintain their fitness relative to co-evolving species. Running as fast as you can to stay in the same place.',
        },
        {
          term: 'Arms Race',
          definition:
            'An escalating cycle of adaptations between competing species, where each improvement by one side drives counter-improvement by the other.',
        },
        {
          term: 'Superpredator Event',
          definition:
            'A sudden increase in predation pressure, such as a new predator species arriving. Forces rapid adaptation or extinction.',
        },
      ],
    },
  },
  {
    id: 'mimicry',
    name: 'Mimicry',
    description:
      'See how harmless butterflies evolve to look like toxic ones (Batesian mimicry) in an arms race against predators learning to spot fakes.',
    category: 'natural',
    difficulty: 'intermediate',
    icon: '🦋',
    enabled: true,
    parameters: {
      maxGenerations: 50,
      minPopulationSize: 100,
      maxPopulationSize: 500,
      updateInterval: 500,
    },
    genetics: {
      mutationRate: 0.01,
      recombinationRate: 0.1,
      offspringPerReproduction: 3,
    },
    traits: [
      {
        name: 'mimicryAccuracy',
        displayName: 'Mimicry Accuracy',
        description:
          'How closely the harmless butterfly resembles the toxic model species. Higher = better disguise.',
        min: 0,
        max: 1,
        units: 'level',
        mutationRate: 0.01,
        mutationMagnitude: 0.04,
      },
    ],
    educationalContent: {
      objectives: [
        'Understand Batesian mimicry — harmless species copying dangerous ones',
        'See how predator learning drives mimics to evolve better disguises',
        'Learn how ecological disruptions (new predators) impact mimicry systems',
      ],
      background:
        'Batesian mimicry is one of nature\'s most elegant survival strategies. Harmless butterflies evolve wing patterns that closely resemble toxic species. Predators that have learned to avoid the toxic "model" also avoid the harmless "mimic." But predators are evolving too — getting better at spotting fakes. This creates an arms race between mimicry accuracy and predator detection.',
      steps: [
        {
          triggerGeneration: 0,
          title: 'Meet the Butterflies',
          content:
            'A population of harmless butterflies with varying degrees of resemblance to a toxic model species. Predator detection is currently low — even rough mimics fool them.',
        },
        {
          triggerGeneration: 8,
          title: 'Early Mimicry',
          content:
            'Predators are starting to learn. Butterflies with very poor mimicry are being eaten more often. Natural selection is beginning to favor better mimics.',
        },
        {
          triggerGeneration: 15,
          title: 'Predators Getting Smarter',
          content:
            'Predator detection ability keeps improving. Only butterflies with reasonably good mimicry are surviving now. Poor mimics are declining rapidly.',
        },
        {
          triggerGeneration: 25,
          title: '🦅 New Predator Species!',
          content:
            'A new predator species has arrived in the ecosystem! This species is even better at detecting fakes. Predator detection just jumped. Watch for a population crash as many mimics are suddenly exposed.',
        },
        {
          triggerGeneration: 35,
          title: 'Refined Mimicry',
          content:
            'The population is recovering with dramatically improved mimicry accuracy. Only the most convincing mimics survived the new predator. This is evolution refining a disguise under intense selection pressure.',
        },
        {
          triggerGeneration: 45,
          title: 'Master Mimics',
          content:
            'The surviving butterflies are near-perfect mimics of the toxic model. But predators keep evolving too — the arms race between mimicry and detection never truly ends. In nature, this process has produced some of the most stunning examples of biological deception.',
        },
      ],
      keyConcepts: [
        {
          term: 'Batesian Mimicry',
          definition:
            'A harmless species evolves to resemble a harmful or toxic species, gaining protection from predators who have learned to avoid the model.',
        },
        {
          term: 'Aposematism',
          definition:
            'Warning coloration — bright, conspicuous colors that advertise toxicity or danger to predators.',
        },
        {
          term: 'Predator Learning',
          definition:
            'Predators improve their ability to distinguish mimics from toxic models over time, creating selection pressure for more accurate mimicry.',
        },
        {
          term: 'Frequency-dependent Selection',
          definition:
            'When the fitness of a trait depends on how common it is. Mimicry works best when mimics are rare relative to toxic models.',
        },
      ],
    },
  },
  {
    id: 'antibiotic-cycling',
    name: 'Antibiotic Cycling',
    description:
      'Simulate a hospital alternating between two antibiotics to prevent resistance buildup. Watch how bacteria adapt to cycling drug pressures.',
    category: 'natural',
    difficulty: 'advanced',
    icon: '💊',
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
        name: 'resistanceA',
        displayName: 'Resistance to Drug A',
        description:
          'How well protected a bacterium is against Antibiotic A. Higher = more resistant.',
        min: 0,
        max: 1,
        units: 'level',
        mutationRate: 0.008,
        mutationMagnitude: 0.03,
      },
      {
        name: 'resistanceB',
        displayName: 'Resistance to Drug B',
        description:
          'How well protected a bacterium is against Antibiotic B. Higher = more resistant.',
        min: 0,
        max: 1,
        units: 'level',
        mutationRate: 0.008,
        mutationMagnitude: 0.03,
      },
    ],
    educationalContent: {
      objectives: [
        'See how alternating antibiotics creates shifting selection pressures',
        'Understand the fitness cost of multi-drug resistance',
        'Learn why antibiotic cycling is used in hospitals',
      ],
      background:
        'Antibiotic cycling is a real strategy used in hospitals. By alternating which antibiotic is used, doctors hope to prevent bacteria from building up resistance to any single drug. The key insight is that resistance is costly — bacteria resistant to Drug A waste energy maintaining that resistance when Drug B is being used instead. This simulation models two antibiotics cycling in and out, with bacteria evolving resistance to both.',
      steps: [
        {
          triggerGeneration: 0,
          title: 'Before Treatment',
          content:
            'A population of bacteria with varying levels of resistance to two different antibiotics (A and B). No drugs are active yet, so all families are growing. Having resistance is actually a slight disadvantage — it costs energy.',
        },
        {
          triggerGeneration: 5,
          title: '💊 Antibiotic A Introduced!',
          content:
            'Antibiotic A has been administered. Bacteria with low resistance to Drug A are dying. Watch the "Resistance to Drug A" trait climb as resistant bacteria dominate.',
        },
        {
          triggerGeneration: 15,
          title: 'Drug A Removed',
          content:
            'Antibiotic A has been stopped. The population is now resistant to Drug A but that resistance is costly. During this rest period, resistance to A may decline slightly.',
        },
        {
          triggerGeneration: 20,
          title: '💉 Switch to Antibiotic B!',
          content:
            'Antibiotic B is now active! Bacteria that invested everything in Drug A resistance may be vulnerable to Drug B. Watch for a new wave of selection — now favoring Drug B resistance.',
        },
        {
          triggerGeneration: 30,
          title: 'Drug B Removed',
          content:
            'Antibiotic B is stopped. The population now has some resistance to both drugs, but maintaining dual resistance is costly. The fitness penalty for multi-drug resistance creates an evolutionary trade-off.',
        },
        {
          triggerGeneration: 35,
          title: '💊 Antibiotic A Returns!',
          content:
            'Drug A is back! Did resistance to A decline during the cycling? Or did bacteria maintain both resistances despite the cost? This is the critical question antibiotic cycling tries to exploit.',
        },
        {
          triggerGeneration: 45,
          title: 'Cycling Results',
          content:
            'Look at the final resistance levels for both drugs. Has cycling prevented the bacteria from becoming fully resistant to either drug? Or have they evolved multi-drug resistance despite the fitness cost? In real hospitals, this outcome determines whether cycling is an effective strategy.',
        },
      ],
      keyConcepts: [
        {
          term: 'Antibiotic Cycling',
          definition:
            'Rotating which antibiotic is used over time to prevent bacteria from developing strong resistance to any single drug.',
        },
        {
          term: 'Fitness Cost of Resistance',
          definition:
            'Maintaining antibiotic resistance requires energy. Resistant bacteria grow slower than non-resistant ones when no antibiotic is present.',
        },
        {
          term: 'Multi-Drug Resistance',
          definition:
            'When bacteria evolve resistance to multiple antibiotics simultaneously — the most dangerous outcome and a major global health threat.',
        },
        {
          term: 'Trade-off',
          definition:
            'Investing in one trait (like resistance to Drug A) comes at the cost of another (like resistance to Drug B or growth rate). Organisms can\'t be good at everything.',
        },
      ],
    },
  },
];
