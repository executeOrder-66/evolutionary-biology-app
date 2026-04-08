import type { Chapter } from '../../types/tutorial';

export const dogDomesticationChapter: Chapter = {
  id: 'dog-domestication',
  title: 'Dog Domestication',
  description:
    'Learn how wolves became dogs through artificial selection — humans choosing who breeds, shaping an entire species over thousands of years.',
  icon: '🐕',
  lessons: [
    {
      id: 'wolves-to-dogs',
      title: 'From Wolves to Dogs',
      description: 'How the domestication story began — and why wolves were first.',
      icon: '🐺',
      pages: [
        {
          title: 'Dogs Are Wolves',
          content:
            'Every dog — from Chihuahua to Great Dane — is a descendant of gray wolves. Dogs were the first domesticated animal, long before cats, cows, or horses.\n\nGenetic evidence shows that domestication began somewhere between 15,000 and 40,000 years ago, probably in multiple locations. Wolves that hung around human camps eventually became a separate population — the ancestors of all modern dogs.',
          illustration: '🐺',
        },
        {
          title: 'Why Wolves?',
          content:
            'Wolves are social, intelligent, and live in cooperative groups. These traits made them pre-adapted for domestication.\n\nThe most likely scenario: wolves that were less fearful of humans scavenged food scraps near camps. Humans tolerated (and eventually encouraged) the tamest wolves, who served as alarm systems, hunting partners, and camp cleaners.\n\nThis wasn\'t a deliberate plan — it was a gradual, mutual process.',
          illustration: '🏕️',
        },
        {
          title: 'Self-Domestication',
          content:
            'Some scientists think the first phase was self-domestication: the wolves domesticated themselves.\n\nWolves that tolerated humans got more food. More food → more offspring. More offspring that tolerated humans → more human-friendly wolves in each generation.\n\nHumans didn\'t need to consciously select — the environment (living near humans) did the selecting. Artificial selection came later, when humans started deliberately breeding the tamest animals.',
          keyTerm: {
            term: 'Self-Domestication',
            definition:
              'When animals naturally evolve tameness by adapting to live near humans, before any deliberate human breeding occurs.',
          },
        },
      ],
    },
    {
      id: 'artificial-selection',
      title: 'Artificial Selection',
      description: 'How humans became the selection pressure.',
      icon: '👤',
      pages: [
        {
          title: 'Humans Choose Who Breeds',
          content:
            'Artificial selection is just natural selection with humans as the "environment."\n\nInstead of predators, climate, or disease determining who survives, humans decide which animals get to reproduce. Breed the friendliest. Reject the aggressive ones. Over generations, the population shifts toward the traits humans prefer.\n\nThe mechanism is identical to natural selection — only the selection pressure has changed.',
          keyTerm: {
            term: 'Artificial Selection',
            definition:
              'Selective breeding by humans — choosing which organisms reproduce based on desired traits. Same mechanism as natural selection, different selection pressure.',
          },
          illustration: '👤',
        },
        {
          title: 'Tameness Was the Key Trait',
          content:
            'Early humans didn\'t breed wolves for appearance or specific skills. They selected primarily for tameness — tolerance of human presence, reduced aggression, and willingness to cooperate.\n\nThis single selection criterion had profound effects. Within a few hundred generations, the tamest wolves were noticeably different from their wild relatives — not just in behavior, but in physical appearance too.',
          illustration: '🤝',
        },
        {
          title: 'In the Simulation',
          content:
            'In our simulation, you\'ll see this process unfold:\n\n• Wild wolves start with low tameness (0–1 scale)\n• Humans select the tamest individuals for breeding\n• Untame wolves are driven away or not fed\n• Over generations, average tameness climbs steadily\n• Later, humans also start selecting for size\n\nWatch the trait mean chart — you\'ll see tameness rise from low to high as human selection does its work.',
          illustration: '💻',
        },
      ],
    },
    {
      id: 'domestication-syndrome',
      title: 'The Domestication Syndrome',
      description: 'Why selecting for tameness changes everything else too.',
      icon: '🧬',
      pages: [
        {
          title: 'More Than Just Behavior',
          content:
            'Something remarkable happens when you select for tameness: other traits change too. Domesticated animals tend to develop:\n\n• Floppy ears (wolves have erect ears, many dogs have floppy)\n• Curly tails\n• Spotted or varied coat colors\n• Shorter snouts\n• Smaller brains\n• Retained juvenile behavior (playfulness in adulthood)\n\nThis constellation of changes is called the domestication syndrome.',
          keyTerm: {
            term: 'Domestication Syndrome',
            definition:
              'A set of physical and behavioral traits that commonly appear together in domesticated animals, including floppy ears, coat color variation, and juvenile behavior retention.',
          },
          illustration: '🧬',
        },
        {
          title: 'The Fox Experiment',
          content:
            'The most dramatic proof comes from Dmitri Belyaev\'s fox experiment in Russia, started in 1959.\n\nBelyaev selected silver foxes solely for tameness — nothing else. Within just 10 generations, the tamest foxes began developing floppy ears, curly tails, spotted coats, and shorter snouts.\n\nThey hadn\'t selected for any of these traits. Selecting for tameness alone produced the entire domestication syndrome. The traits are genetically linked.',
          illustration: '🦊',
        },
        {
          title: 'Neural Crest Cells',
          content:
            'Scientists now think the domestication syndrome is linked to neural crest cells — embryonic cells that influence both behavior AND many physical features.\n\nSelecting for tameness may reduce neural crest cell activity, which simultaneously:\n• Reduces fear and aggression (behavior)\n• Alters ear cartilage development (floppy ears)\n• Changes pigment distribution (coat patterns)\n• Modifies skull shape (shorter snout)\n\nOne genetic change, many visible effects. This is why selecting for behavior alone transforms the whole animal.',
          keyTerm: {
            term: 'Neural Crest Cells',
            definition:
              'Embryonic cells that influence both behavior and physical development. Changes in these cells may explain why selecting for tameness alters so many other traits.',
          },
        },
        {
          title: 'From Wolves to 400 Breeds',
          content:
            'Once early dogs diverged from wolves, thousands of years of continued artificial selection produced the incredible diversity of modern dogs — over 400 recognized breeds.\n\nFrom tiny Chihuahuas to massive Great Danes, from sprinting Greyhounds to swimming Labrador Retrievers — all descended from the same wolf ancestors, all shaped by human preferences.\n\nDog domestication is evolution at its most visible: a single ancestral species transformed into hundreds of dramatically different forms, all by the power of selection.',
          illustration: '🐕',
        },
      ],
    },
  ],
};
