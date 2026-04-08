import type { Chapter } from '../../types/tutorial';

export const mimicryChapter: Chapter = {
  id: 'mimicry',
  title: 'Mimicry',
  description:
    'Learn how harmless species evolve to look like dangerous ones, fooling predators into leaving them alone.',
  icon: '🦋',
  lessons: [
    {
      id: 'batesian-mimicry',
      title: 'Batesian Mimicry',
      description:
        'How harmless butterflies survive by copying the appearance of toxic ones.',
      icon: '🎭',
      pages: [
        {
          title: 'Copying the Dangerous',
          content:
            'Batesian mimicry is nature\'s bluff. A harmless species evolves to look like a dangerous or toxic one. Predators that have learned to avoid the toxic "model" also avoid the harmless "mimic."\n\nThe viceroy butterfly resembles the toxic monarch butterfly. Birds that got sick eating monarchs avoid viceroys too — even though viceroys are perfectly edible.',
          illustration: '🦋',
        },
        {
          title: 'The Players',
          content:
            'Batesian mimicry involves three players:\n\n• The Model — a toxic or dangerous species with warning coloration\n• The Mimic — a harmless species that evolves to resemble the model\n• The Predator — must learn (through bad experiences) to avoid the model\'s appearance\n\nThe mimic is essentially a "freeloader" — getting protection without paying the cost of being toxic.',
          keyTerm: {
            term: 'Batesian Mimicry',
            definition:
              'A harmless species (mimic) evolves to resemble a harmful species (model) to gain protection from predators who have learned to avoid the model.',
          },
        },
        {
          title: 'How This Maps to the Simulation',
          content:
            'In our simulation:\n\n• Each butterfly has a "mimicry accuracy" trait (0-1)\n• Higher accuracy = more closely resembles the toxic model\n• Predators have a "learning" level that increases over time\n• Butterflies with accuracy above predator learning survive; below, they get eaten\n• At generation 25, a new predator species arrives — harder to fool\n\nWatch how the population evolves better and better mimicry over time.',
          illustration: '💻',
        },
      ],
    },
    {
      id: 'warning-coloration',
      title: 'Warning Coloration & Mullerian Mimicry',
      description:
        'Why toxic animals advertise their danger, and what happens when toxic species look alike.',
      icon: '⚠️',
      pages: [
        {
          title: 'Aposematism: Advertising Danger',
          content:
            'Toxic animals are often brightly colored — poison dart frogs, monarch butterflies, coral snakes. This seems counterintuitive: why be visible to predators?\n\nBecause it works. Bright colors signal "I\'m dangerous — don\'t eat me." Predators learn this association quickly. One bad experience with a bright orange frog means avoiding all bright orange frogs in the future.',
          keyTerm: {
            term: 'Aposematism',
            definition:
              'Warning coloration — bright, conspicuous patterns that signal toxicity or danger to potential predators.',
          },
        },
        {
          title: 'Mullerian Mimicry',
          content:
            'Unlike Batesian mimicry (where a harmless species copies a toxic one), Mullerian mimicry is when multiple toxic species evolve to look alike.\n\nWhy? If two toxic species share the same warning pattern, predators need only one bad experience to learn to avoid both. This reduces the number of each species that must be sacrificed to "educate" predators.\n\nMonarch and queen butterflies are both toxic and look similar — both benefit from shared warning coloration.',
          keyTerm: {
            term: 'Mullerian Mimicry',
            definition:
              'When two or more toxic species evolve similar warning coloration, sharing the cost of educating predators.',
          },
        },
        {
          title: 'The Difference Matters',
          content:
            'Batesian mimicry is a parasitic relationship — the mimic benefits at the model\'s expense (more mimics = predators learn the pattern is unreliable).\n\nMullerian mimicry is mutualistic — both species benefit from looking alike.\n\nIn our simulation, we model Batesian mimicry. As predators get better at detecting fakes, only the most accurate mimics survive. This drives mimicry accuracy ever higher.',
          illustration: '🔍',
        },
      ],
    },
    {
      id: 'mimicry-rings',
      title: 'Mimicry Rings & Complex Systems',
      description:
        'How mimicry creates elaborate networks of look-alikes in nature.',
      icon: '🔗',
      pages: [
        {
          title: 'Mimicry Rings',
          content:
            'A mimicry ring is a group of species that all share similar warning coloration. Some are truly toxic (Mullerian mimics of each other), and some are harmless freeloaders (Batesian mimics).\n\nIn tropical forests, dozens of butterfly species may participate in a single mimicry ring — all sporting the same orange-and-black pattern. Predators avoid the whole group.',
          keyTerm: {
            term: 'Mimicry Ring',
            definition:
              'A group of species sharing similar warning coloration, including both toxic species and harmless mimics.',
          },
        },
        {
          title: 'The Arms Race of Detection',
          content:
            'Mimicry creates its own arms race. As mimics get better at copying, predators evolve better detection. Some predators can spot subtle differences in wing pattern, flight style, or behavior.\n\nThis drives mimics to be ever more accurate — matching not just color but pattern, shape, size, and even flight behavior. The simulation\'s increasing "predator learning" models this detection arms race.',
          illustration: '🔬',
        },
        {
          title: 'Why Mimicry Isn\'t Perfect',
          content:
            'If mimicry were free, every harmless butterfly would be a perfect mimic. But mimicry has costs:\n\n• Genes that improve mimicry might worsen other traits\n• The model\'s coloration might not suit the mimic\'s habitat\n• Too many mimics dilute the signal (predators learn the pattern is often harmless)\n\nThis creates a dynamic equilibrium: good enough to fool most predators, but not perfect. The simulation shows this — accuracy increases but never reaches 100%.',
          illustration: '⚖️',
        },
      ],
    },
  ],
};
