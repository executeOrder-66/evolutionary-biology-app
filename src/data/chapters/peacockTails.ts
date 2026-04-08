import type { Chapter } from '../../types/tutorial';

export const peacockTailsChapter: Chapter = {
  id: 'peacock-tails',
  title: 'Peacock Tail Evolution',
  description:
    'Explore sexual selection — how female mate choice drives the evolution of elaborate traits, and why there\'s always a trade-off.',
  icon: '🦚',
  lessons: [
    {
      id: 'sexual-selection-basics',
      title: 'What Is Sexual Selection?',
      description: 'How mate preferences shape evolution differently from survival pressures.',
      icon: '💕',
      pages: [
        {
          title: 'Not All Selection Is About Survival',
          content:
            'Natural selection is about surviving. Sexual selection is about mating.\n\nIf females consistently prefer males with a certain trait — say, bright feathers or a loud song — then males with that trait reproduce more, even if the trait offers zero survival benefit.\n\nOver generations, the preferred trait becomes more common and more exaggerated. This is sexual selection.',
          keyTerm: {
            term: 'Sexual Selection',
            definition:
              'A form of natural selection where traits evolve because they increase mating success rather than survival.',
          },
          illustration: '💕',
        },
        {
          title: 'Darwin\'s Puzzle',
          content:
            'Charles Darwin was puzzled by the peacock\'s tail. Natural selection should favor traits that help survival — but a massive, colorful tail makes a peacock slower and more visible to predators.\n\nHe wrote: "The sight of a feather in a peacock\'s tail, whenever I gaze at it, makes me sick!" It seemed to contradict his own theory.\n\nThe solution: the tail evolved not for survival, but for mating success.',
          illustration: '🦚',
        },
        {
          title: 'Female Choice Drives the Change',
          content:
            'Peahens (female peacocks) prefer males with larger, more colorful tail displays. A male with a bigger tail gets more mates and has more offspring.\n\nThis means:\n• Genes for large tails spread through the population\n• Each generation, tails get slightly larger on average\n• The trait escalates over time\n\nThe females are the "selection pressure" — not predators, not disease, not climate. Just mate preference.',
          illustration: '👁️',
        },
      ],
    },
    {
      id: 'the-tradeoff',
      title: 'The Trade-off',
      description: 'Why peacock tails are large but not infinitely large.',
      icon: '⚖️',
      pages: [
        {
          title: 'Two Forces Pulling in Opposite Directions',
          content:
            'Sexual selection pushes tail size UP — females prefer bigger.\n\nNatural selection pushes tail size DOWN — bigger tails attract predators, cost energy to grow, and slow the bird down.\n\nThe result is a balance: tails evolve to be as large as possible without being so costly that the male dies before he can mate.',
          keyTerm: {
            term: 'Evolutionary Trade-off',
            definition:
              'When a trait that provides one advantage (like attracting mates) simultaneously carries a cost (like attracting predators). Evolution finds a balance.',
          },
          illustration: '⚖️',
        },
        {
          title: 'The Sweet Spot',
          content:
            'This is why peacock tails are large but not infinite:\n\n• A small tail: safe from predators but females ignore you → few offspring\n• A medium tail: some female interest, low predation risk → moderate offspring\n• A large tail: females love it, some predation risk → many offspring\n• An extravagant tail: maximum female interest, but high predation → fewer offspring than expected\n\nThe "sweet spot" is a large but not maximal tail — the best balance of attraction and survival.',
          illustration: '📊',
        },
        {
          title: 'In the Simulation',
          content:
            'Watch for this trade-off in the simulation:\n\n• Before mating season, tail size doesn\'t matter much\n• When female choice kicks in, small-tailed males can\'t find mates\n• Large-tailed males do the best overall\n• Extravagant-tailed males attract the most females but sometimes get caught by predators\n\nThe result: the population converges on a large (but not maximum) tail size. This is the hallmark of sexual selection with a survival trade-off.',
          illustration: '💻',
        },
        {
          title: 'Honest Signals',
          content:
            'Why do females prefer large tails? One theory (the "handicap principle") suggests that a large tail is an honest signal of quality.\n\nOnly a truly healthy, well-fed, parasite-free male can afford to grow and maintain a large tail. A weak male can\'t fake it. So by preferring large tails, females are indirectly choosing the healthiest mates.\n\nThe tail is costly precisely BECAUSE it\'s hard to maintain — that\'s what makes it a reliable indicator.',
          keyTerm: {
            term: 'Handicap Principle',
            definition:
              'The idea that costly traits (like large tails) are honest signals of genetic quality — only fit individuals can afford them.',
          },
        },
      ],
    },
    {
      id: 'fisherian-runaway',
      title: 'Fisherian Runaway',
      description: 'The feedback loop that makes elaborate traits escalate.',
      icon: '🔄',
      pages: [
        {
          title: 'The Feedback Loop',
          content:
            'Geneticist R.A. Fisher proposed a powerful idea: female preference and male trait can escalate together in a feedback loop.\n\nHere\'s how:\n1. Some females happen to prefer slightly larger tails\n2. Large-tailed males mate more → their sons have large tails AND their daughters inherit the preference\n3. Now more females prefer large tails → even larger tails are favored\n4. The cycle accelerates\n\nThis is Fisherian runaway selection.',
          keyTerm: {
            term: 'Fisherian Runaway',
            definition:
              'A positive feedback loop where female preference and male trait co-evolve, driving both to escalate over generations.',
          },
          illustration: '🔄',
        },
        {
          title: 'What Stops the Runaway?',
          content:
            'If runaway selection pushes tails to grow endlessly, what eventually stops them?\n\nNatural selection. At some point, the survival cost becomes so high that males with the most extreme tails die before they can mate. The runaway slams into the wall of physical reality.\n\nThe population stabilizes at the point where sexual advantage exactly balances survival disadvantage. This equilibrium is what we see in living peacocks today.',
          illustration: '🛑',
        },
        {
          title: 'Sexual Selection Beyond Peacocks',
          content:
            'Sexual selection explains many of nature\'s most spectacular features:\n\n• Elk antlers — used in combat for mates\n• Bird of paradise dances — elaborate courtship displays\n• Frog calls — louder calls attract females but also attract predators\n• Firefly flashes — brighter flashes attract mates and predators\n\nIn every case, the same trade-off applies: the trait that attracts mates also carries a cost. Evolution finds the balance.',
          illustration: '🌍',
        },
      ],
    },
  ],
};
