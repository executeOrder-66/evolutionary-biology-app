import type { Chapter } from '../../types/tutorial';

export const predatorPreyChapter: Chapter = {
  id: 'predator-prey',
  title: 'Predator-Prey Arms Race',
  description:
    'Explore how predators and prey drive each other to evolve faster, stronger, and smarter in an endless evolutionary arms race.',
  icon: '🐇',
  lessons: [
    {
      id: 'arms-race-basics',
      title: 'The Evolutionary Arms Race',
      description:
        'How predators and prey push each other to evolve in an escalating cycle.',
      icon: '⚔️',
      pages: [
        {
          title: 'Predator vs. Prey',
          content:
            'In nature, predators and prey are locked in a constant struggle. Rabbits that run faster escape foxes. But foxes that run faster catch rabbits. Each improvement by one side creates pressure on the other to improve too.\n\nThis back-and-forth escalation is called an evolutionary arms race. Neither side ever truly "wins" — they just keep getting faster, stronger, or more cunning.',
          illustration: '🐇',
        },
        {
          title: 'Co-evolution in Action',
          content:
            'Co-evolution means two species evolve in response to each other. The prey evolves a defense, then the predator evolves a counter. Then the prey evolves a counter-counter.\n\nExamples are everywhere:\n• Cheetahs and gazelles both evolved extreme speed\n• Snakes evolved venom; some prey evolved venom resistance\n• Bats use echolocation; some moths evolved ultrasonic clicks to jam it',
          keyTerm: {
            term: 'Co-evolution',
            definition:
              'When two or more species reciprocally affect each other\'s evolution. Changes in one create selection pressure on the other.',
          },
        },
        {
          title: 'How This Maps to the Simulation',
          content:
            'In our simulation:\n\n• Rabbits have a "speed" trait (0-1)\n• Predator speed starts low (0.3) and increases over time — modeling co-evolving foxes\n• Rabbits faster than predators survive; slower ones get caught\n• At generation 20, a "superpredator" arrives — a sudden jump in predator speed\n\nWatch how the rabbit population adapts (or crashes) in response to ever-faster predators.',
          illustration: '💻',
        },
      ],
    },
    {
      id: 'coevolution-deep-dive',
      title: 'Co-evolution and Escalation',
      description:
        'Why the arms race never ends and what drives escalation.',
      icon: '🔄',
      pages: [
        {
          title: 'Why It Never Stops',
          content:
            'An arms race has no finish line. Every adaptation by prey creates new selection pressure on predators, and vice versa. If rabbits get faster, slow foxes starve and fast foxes thrive. Then only the fastest rabbits survive the faster foxes.\n\nThis ratchet effect means both species are constantly evolving — standing still means falling behind.',
          illustration: '🔄',
        },
        {
          title: 'Costs and Trade-offs',
          content:
            'Speed isn\'t free. Faster muscles require more energy, more food, and more oxygen. There are physical limits too — bones can only be so light before they break.\n\nThis is why arms races don\'t produce infinitely fast animals. At some point, the cost of being faster outweighs the benefit. Evolution finds a balance between performance and efficiency.',
          illustration: '⚖️',
        },
        {
          title: 'Punctuated Change',
          content:
            'Arms races don\'t always progress smoothly. Sometimes a sudden event — a new predator species arriving, a habitat change — causes a rapid burst of evolution.\n\nIn the simulation, the "superpredator" event at generation 20 models this. A sudden jump in predator ability forces rapid adaptation or extinction. This mirrors real invasive predator events.',
          illustration: '📈',
        },
      ],
    },
    {
      id: 'red-queen',
      title: 'The Red Queen Hypothesis',
      description:
        'Running as fast as you can just to stay in the same place.',
      icon: '♛',
      pages: [
        {
          title: 'The Red Queen',
          content:
            'In Lewis Carroll\'s "Through the Looking-Glass," the Red Queen tells Alice: "It takes all the running you can do, to keep in the same place."\n\nBiologist Leigh Van Valen borrowed this metaphor for evolution. Species must constantly evolve just to maintain their current fitness relative to other evolving species. Stop evolving, and you fall behind.',
          keyTerm: {
            term: 'Red Queen Hypothesis',
            definition:
              'The idea that organisms must constantly evolve to maintain their fitness relative to other co-evolving species. Standing still is falling behind.',
          },
        },
        {
          title: 'Evidence in the Fossil Record',
          content:
            'The fossil record supports the Red Queen. Extinction rates for many groups remain roughly constant over millions of years — species don\'t get "safer" over time despite evolving.\n\nThis makes sense if your competitors and predators are also evolving. No matter how well adapted you become, everyone else is adapting too. Relative fitness stays the same even as absolute capabilities increase.',
          illustration: '🦴',
        },
        {
          title: 'Red Queen in the Simulation',
          content:
            'Watch the simulation carefully. Even as rabbits evolve faster speeds, their average fitness doesn\'t necessarily improve — because predators are getting faster too.\n\nThe rabbits are running faster (higher speed trait) but their survival rate stays roughly constant. They\'re running as fast as they can just to stay in the same place. That\'s the Red Queen in action.',
          illustration: '📊',
        },
      ],
    },
  ],
};
