import type { Chapter } from '../../types/tutorial';

export const antibioticResistanceChapter: Chapter = {
  id: 'antibiotic-resistance',
  title: 'Antibiotic Resistance',
  description:
    'Understand the simulation — how bacteria evolve resistance and why it matters for public health.',
  icon: '🦠',
  lessons: [
    // ── Lesson 1: Bacteria Basics ──
    {
      id: 'bacteria-basics',
      title: 'Bacteria Basics',
      description:
        'What bacteria are and how they reproduce — the foundation for understanding the simulation.',
      icon: '🔬',
      pages: [
        {
          title: 'What Are Bacteria?',
          content:
            'Bacteria are tiny, single-celled organisms. They\'re everywhere — in soil, water, your gut, and on your skin. Most are harmless or even helpful. But some cause diseases like tuberculosis, strep throat, and food poisoning.\n\nA single bacterium is far too small to see with the naked eye. But they reproduce so fast that a single cell can become millions overnight.',
          illustration: '🦠',
        },
        {
          title: 'Binary Fission: How Bacteria Reproduce',
          content:
            'Bacteria reproduce by splitting in two — a process called binary fission. One cell copies its DNA, then divides into two identical daughter cells.\n\nThis is asexual reproduction: there\'s only one parent, and the offspring are near-clones. This is exactly how reproduction works in our simulation — each bacterium splits into copies of itself.',
          diagramId: 'binary-fission',
          keyTerm: {
            term: 'Binary Fission',
            definition:
              'Asexual reproduction where a single cell divides into two nearly identical copies. How bacteria reproduce in both real life and the simulation.',
          },
        },
        {
          title: 'Variation in Bacteria',
          content:
            'Even though bacteria clone themselves, they\'re not all identical. Small copying errors (mutations) during DNA replication introduce tiny differences.\n\nOver many generations, these small differences add up. Some bacteria end up slightly more resistant to heat. Others might digest food faster. Some might have a slightly thicker cell wall that blocks certain chemicals.\n\nThis variation is the raw material for evolution.',
          diagramId: 'variation',
        },
        {
          title: 'How This Maps to the Simulation',
          content:
            'In our simulation:\n\n• Each colored circle is one bacterium\n• Each generation, bacteria split into clones (with small random mutations)\n• The "resistance level" represents how resistant a bacterium is to antibiotics\n• The 5 families (Tiny → Tank) represent groups with different starting resistance levels\n\nEverything you see in the simulation mirrors real bacterial biology — just sped up so you can watch evolution happen in seconds instead of days.',
          illustration: '💻',
        },
      ],
    },

    // ── Lesson 2: What Are Antibiotics? ──
    {
      id: 'what-are-antibiotics',
      title: 'What Are Antibiotics?',
      description:
        'How antibiotics work and why some bacteria survive them.',
      icon: '💊',
      pages: [
        {
          title: 'Antibiotics Kill Bacteria',
          content:
            'Antibiotics are chemicals that kill bacteria or stop them from growing. Penicillin, the first antibiotic, was discovered in 1928 and has saved millions of lives.\n\nDifferent antibiotics work in different ways: some destroy the cell wall, some block DNA copying, some interfere with protein production. But they all have the same goal — kill the bacteria causing an infection.',
          illustration: '💊',
        },
        {
          title: 'Not All Bacteria Are Equally Vulnerable',
          content:
            'Here\'s the crucial point: antibiotics don\'t kill all bacteria equally.\n\nSome bacteria happen to have traits that partially protect them — a thicker cell wall, an enzyme that breaks down the antibiotic, or a pump that pushes the antibiotic out of the cell.\n\nThese bacteria didn\'t "plan" to be resistant. They just happened to have traits that help against this particular threat.',
          illustration: '🛡️',
        },
        {
          title: 'The Selection Event',
          content:
            'When antibiotics are introduced to a population of bacteria, it\'s a selection event:\n\n• Bacteria with NO protection → die immediately\n• Bacteria with SOME protection → most die, a few survive\n• Bacteria with STRONG protection → most survive\n\nThe survivors then reproduce. Their offspring inherit the protection. Within a few generations, the entire population is resistant.\n\nIn the simulation, this is exactly what happens at Generation 10 when the "Antibiotics Introduced!" alert appears.',
          diagramId: 'selection-event',
        },
        {
          title: 'Antibiotic Strength Matters',
          content:
            'In the simulation, antibiotic strength gradually increases from 0% to 55% over several generations. This models how drug concentration builds up in the body.\n\nAt low strength, even moderately resistant bacteria survive. As strength increases, only the most resistant families remain.\n\nThis is why you see families go extinct one by one, from least resistant to most resistant — each increase in antibiotic strength raises the bar for survival.',
          diagramId: 'antibiotic-ramp',
        },
      ],
    },

    // ── Lesson 3: Reading the Simulation ──
    {
      id: 'reading-the-simulation',
      title: 'Reading the Simulation',
      description:
        'A step-by-step guide to understanding everything on screen.',
      icon: '📊',
      pages: [
        {
          title: 'The Family Survival Bars',
          content:
            'The colored horizontal bars at the top of the simulation show how each family is doing:\n\n• Bar length = how many descendants that family has right now\n• Bar color = matches the family color (red for Tiny, green for Tank, etc.)\n• "EXTINCT" badge = this family has no living members left\n\nWatch these bars as the simulation runs. Before antibiotics, all bars are roughly equal. After antibiotics, you\'ll see less-protected families shrink and disappear while protected families grow.',
          diagramId: 'survival-bars',
        },
        {
          title: 'The Family Tree',
          content:
            'Below the bars is the family tree visualization:\n\n• Each circle is a bacterium (up to 4 shown per family per generation)\n• Rows = generations (time flows downward)\n• Vertical dashed lines separate the 5 families\n• The red horizontal dashed line marks when antibiotics are introduced\n\nA thriving family has circles in every row. An extinct family\'s column goes empty after a certain generation — the branch stopped growing.',
          diagramId: 'family-tree-reading',
        },
        {
          title: 'The Status Bar',
          content:
            'At the top of the simulation you\'ll see key numbers:\n\n• Generation — how many reproduction cycles have passed\n• Population — total living bacteria (all families combined)\n• Avg Resistance — the average resistance level across all bacteria\n• Survival Chance — how likely the average bacterium is to survive this generation\n• Antibiotics badge — appears after Gen 10, shows current antibiotic strength\n\nWatch "Avg Resistance" climb after antibiotics arrive — that\'s evolution happening in real time.',
          diagramId: 'status-bar',
        },
        {
          title: 'The Charts Below',
          content:
            'Three mini-charts track trends over time:\n\n• Avg Resistance Level — should climb after antibiotics arrive as resistant bacteria dominate\n• Avg Survival Chance — drops sharply when antibiotics hit, then recovers as the population adapts\n• Population Size — may dip after antibiotics (a population bottleneck) then recover\n\nThe "dip and recover" pattern in the survival chart is the signature of natural selection at work.',
          diagramId: 'charts-reading',
        },
      ],
    },

    // ── Lesson 4: Why This Matters ──
    {
      id: 'why-this-matters',
      title: 'The Superbug Crisis',
      description:
        'Why antibiotic resistance is one of the biggest threats to modern medicine.',
      icon: '🏥',
      pages: [
        {
          title: 'From Lab to Hospital',
          content:
            'What you just watched in the simulation happens in hospitals every day.\n\nWhen a patient takes antibiotics, the drug kills most of the bacteria causing their infection. But if even a few resistant bacteria survive, they multiply and the infection comes back — now resistant to that antibiotic.\n\nThe doctor prescribes a stronger antibiotic. The cycle repeats. This is exactly the evolutionary arms race you saw in the simulation.',
          illustration: '🏥',
        },
        {
          title: 'Superbugs',
          content:
            'A "superbug" is a bacterium that has evolved resistance to multiple antibiotics. Some superbugs, like MRSA (methicillin-resistant Staphylococcus aureus), are resistant to most common antibiotics.\n\nThe World Health Organization calls antibiotic resistance "one of the biggest threats to global health." Without effective antibiotics, routine surgeries become dangerous, minor infections can become deadly, and modern medicine loses one of its most important tools.',
          keyTerm: {
            term: 'Superbug',
            definition:
              'A bacterium that has evolved resistance to multiple antibiotics, making infections extremely difficult to treat.',
          },
          illustration: '⚠️',
        },
        {
          title: 'Why Overuse Is the Problem',
          content:
            'Every time antibiotics are used, they create selection pressure for resistance. The more often they\'re used, the faster resistance evolves.\n\nProblems include:\n• Patients not finishing their full course (kills weak bacteria, leaves the strongest alive)\n• Antibiotics prescribed for viral infections (they don\'t help, but still select for resistance)\n• Antibiotics in animal farming (creates resistant bacteria that can spread to humans)\n\nRemember: in the simulation, it was the antibiotics themselves that drove the evolution of resistance. Without antibiotics, Tiny\'s family would have been fine.',
          illustration: '🔁',
        },
        {
          title: 'What Can Be Done?',
          content:
            'Understanding evolution is the key to fighting back:\n\n• Use antibiotics only when necessary (reduce selection pressure)\n• Always finish the full prescribed course (don\'t leave partially-resistant survivors)\n• Develop new antibiotics and alternative treatments\n• Use combination therapies (harder for bacteria to evolve resistance to multiple drugs simultaneously)\n\nThe same evolutionary principles that create the problem also point toward solutions. This is why understanding evolution isn\'t just academic — it\'s a matter of life and death.',
          illustration: '💡',
        },
      ],
    },
  ],
};
