import type { Chapter } from '../../types/tutorial';

export const antibioticCyclingChapter: Chapter = {
  id: 'antibiotic-cycling',
  title: 'Antibiotic Cycling',
  description:
    'Learn how hospitals fight resistance by alternating antibiotics, and why multi-drug resistance is so dangerous.',
  icon: '💊',
  lessons: [
    {
      id: 'cycling-strategy',
      title: 'The Cycling Strategy',
      description:
        'Why hospitals alternate between antibiotics instead of using just one.',
      icon: '🔄',
      pages: [
        {
          title: 'The Problem with One Antibiotic',
          content:
            'When a hospital uses the same antibiotic continuously, bacteria evolve resistance to it — as you saw in the Antibiotic Resistance simulation. The drug becomes useless.\n\nBut what if we switch antibiotics? Bacteria that evolved resistance to Drug A might be vulnerable to Drug B. By alternating, we can hit the bacteria with a challenge they haven\'t adapted to.',
          illustration: '💊',
        },
        {
          title: 'How Cycling Works',
          content:
            'Antibiotic cycling means rotating through different antibiotics on a schedule:\n\n1. Use Antibiotic A for a period — resistance to A builds up\n2. Switch to Antibiotic B — bacteria resistant to A may be vulnerable to B\n3. Switch back to A — during the B period, resistance to A may have decreased\n\nThe hope is that resistance to each drug fades when it\'s not being used, because maintaining resistance has a fitness cost.',
          keyTerm: {
            term: 'Antibiotic Cycling',
            definition:
              'A strategy of periodically rotating which antibiotic is used in a hospital to slow the evolution of resistance.',
          },
        },
        {
          title: 'The Simulation',
          content:
            'In our simulation:\n\n• Bacteria have TWO resistance traits: resistanceA and resistanceB\n• Antibiotic A is active during generations 5-15 and 35-45\n• Antibiotic B is active during generations 20-30\n• Between antibiotics, bacteria recover but resistance is costly\n• Having high resistance to BOTH drugs carries an extra fitness penalty\n\nWatch how resistance levels rise and fall as different antibiotics cycle in and out.',
          illustration: '💻',
        },
      ],
    },
    {
      id: 'multi-drug-resistance',
      title: 'Multi-Drug Resistance',
      description:
        'The nightmare scenario: bacteria that resist multiple antibiotics at once.',
      icon: '⚠️',
      pages: [
        {
          title: 'The Trade-off',
          content:
            'Resistance isn\'t free. Maintaining the molecular machinery for antibiotic resistance costs energy. Resistant bacteria grow slower than non-resistant ones when no antibiotic is present.\n\nMaintaining resistance to TWO different antibiotics is even more costly. In the simulation, bacteria with high resistance to both A and B suffer a fitness penalty — they\'re spending so much energy on defense that they can\'t compete.',
          illustration: '⚖️',
        },
        {
          title: 'When the Trade-off Fails',
          content:
            'Sometimes bacteria evolve resistance to multiple drugs anyway — these are the dreaded "superbugs" like MRSA and XDR-TB.\n\nThis can happen when:\n• Resistance genes are linked on the same DNA segment\n• Antibiotics are used simultaneously rather than cycled\n• The resistance mechanism happens to work against multiple drugs\n\nIn the simulation, watch for bacteria that develop high resistance to both A and B despite the fitness cost.',
          keyTerm: {
            term: 'Multi-Drug Resistance',
            definition:
              'When a microorganism evolves resistance to multiple different antibiotics, making it extremely difficult to treat.',
          },
        },
        {
          title: 'Why This Matters',
          content:
            'Multi-drug resistant bacteria kill over 1 million people per year worldwide. The WHO has called antibiotic resistance "one of the greatest threats to global health."\n\nIf bacteria evolve resistance to ALL available antibiotics, we\'re back to the pre-antibiotic era — when a simple infection could be fatal. This is why antibiotic cycling and other resistance management strategies are so important.',
          illustration: '🏥',
        },
      ],
    },
    {
      id: 'hospital-protocols',
      title: 'Hospital Resistance Protocols',
      description:
        'Real-world strategies for managing antibiotic resistance in clinical settings.',
      icon: '🏥',
      pages: [
        {
          title: 'Beyond Simple Cycling',
          content:
            'Hospitals use several strategies beyond simple cycling:\n\n• Antibiotic stewardship — using the narrowest-spectrum drug that works\n• Combination therapy — using two drugs simultaneously so bacteria must resist both\n• De-escalation — starting broad, then switching to a targeted drug once the pathogen is identified\n• Antibiograms — tracking local resistance patterns to guide drug choice',
          keyTerm: {
            term: 'Antibiotic Stewardship',
            definition:
              'A coordinated program to improve and measure the appropriate use of antibiotics, selecting the optimal drug, dose, duration, and route.',
          },
        },
        {
          title: 'Does Cycling Actually Work?',
          content:
            'The evidence for cycling is mixed. Some studies show it reduces resistance; others show little benefit. The challenge is that bacteria don\'t always lose resistance when the drug is removed — resistance genes can persist if there\'s no strong fitness cost.\n\nCombination therapy (using two drugs at once) often outperforms cycling in clinical studies, because bacteria must simultaneously evolve resistance to both drugs — a much harder challenge.',
          illustration: '📊',
        },
        {
          title: 'Evolution as a Clinical Tool',
          content:
            'Understanding evolution helps doctors fight resistance:\n\n• Predicting which resistance mutations will appear\n• Designing drug combinations that are hard to evolve resistance against\n• Using "collateral sensitivity" — where resistance to one drug makes bacteria MORE sensitive to another\n• Developing "evolution-proof" treatment strategies\n\nThe same evolutionary principles in our simulation guide real clinical decisions. Evolution isn\'t just theory — it\'s a tool for saving lives.',
          illustration: '🧬',
        },
      ],
    },
  ],
};
