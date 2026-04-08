import type { Chapter } from '../../types/tutorial';

export const pepperedMothsChapter: Chapter = {
  id: 'peppered-moths',
  title: 'Peppered Moths',
  description:
    'Learn about industrial melanism — how pollution changed which moths survived, and what it teaches about natural selection.',
  icon: '🦋',
  lessons: [
    {
      id: 'moth-basics',
      title: 'Meet the Peppered Moth',
      description: 'What peppered moths are and why scientists care about them.',
      icon: '🦋',
      pages: [
        {
          title: 'A Tiny Moth, A Big Story',
          content:
            'The peppered moth (Biston betularia) is a small, unremarkable moth found across Britain and Europe. It rests on tree trunks during the day, wings spread flat against the bark.\n\nThis humble insect became one of the most famous examples of evolution in action — a living demonstration of natural selection that scientists could observe in real time.',
          illustration: '🦋',
        },
        {
          title: 'Two Forms, One Species',
          content:
            'Peppered moths come in two main forms:\n\n• The typical form — light-colored with dark speckles (like ground pepper, hence the name)\n• The melanic form — almost entirely dark or black\n\nBefore the 1800s, nearly all peppered moths were the light form. The dark form was extremely rare — so rare that when one was first captured in 1848, it was considered a curiosity.',
          illustration: '🔬',
        },
        {
          title: 'Camouflage Is Everything',
          content:
            'During the day, peppered moths rest on tree trunks. Their main defense against birds is camouflage — blending in with the bark.\n\nLight moths on light, lichen-covered bark are nearly invisible. Dark moths on the same bark stand out like a beacon. Birds eat what they can see.\n\nThis simple fact — visibility = death — is the foundation of the entire story.',
          keyTerm: {
            term: 'Camouflage',
            definition:
              'A survival strategy where an organism\'s appearance matches its background, making it harder for predators to detect.',
          },
        },
      ],
    },
    {
      id: 'industrial-revolution',
      title: 'The Industrial Revolution',
      description: 'How factories changed the environment and flipped who survived.',
      icon: '🏭',
      pages: [
        {
          title: 'Soot Changes Everything',
          content:
            'Starting in the mid-1800s, Britain\'s Industrial Revolution filled the air with coal smoke and soot. The soot settled on trees, killing the pale lichen and blackening the bark.\n\nAlmost overnight (in evolutionary terms), the environment flipped. Light bark became dark bark. And the moths\' camouflage equations reversed.',
          illustration: '🏭',
        },
        {
          title: 'Dark Moths Rise',
          content:
            'On darkened bark:\n\n• Light moths now stood out — birds ate them easily\n• Dark moths were now camouflaged — birds missed them\n\nBy 1895, in the industrial city of Manchester, 98% of peppered moths were the dark form. In rural areas with clean air, the light form still dominated.\n\nThe same species, in two different environments, evolved in opposite directions.',
          illustration: '📊',
        },
        {
          title: 'The Selection Event',
          content:
            'This is natural selection in its clearest form:\n\n1. Variation existed — both light and dark moths were present\n2. The environment changed — pollution darkened the trees\n3. Selection acted — birds ate the visible moths\n4. The population shifted — dark moths became dominant\n\nNo moth "decided" to become darker. The environment simply made it more likely that dark moths survived and reproduced.',
          keyTerm: {
            term: 'Industrial Melanism',
            definition:
              'The increase in dark-colored organisms in polluted industrial areas. The peppered moth is the textbook example.',
          },
        },
        {
          title: 'In the Simulation',
          content:
            'In our simulation, this plays out step by step:\n\n• Initially, all moths are light-colored and well-camouflaged\n• Pollution darkens the bark at a specific generation\n• Light moths are suddenly visible and get eaten by birds\n• Darker moths survive and reproduce\n• Over generations, the population shifts from light to dark\n\nWatch the family survival bars — you\'ll see light families shrink and dark families grow, exactly as happened in industrial England.',
          illustration: '💻',
        },
      ],
    },
    {
      id: 'clean-air-reversal',
      title: 'The Clean Air Reversal',
      description: 'How cleaning up pollution reversed evolution — proving the mechanism.',
      icon: '🌿',
      pages: [
        {
          title: 'Clean Air Acts',
          content:
            'In the 1950s, Britain passed Clean Air Acts that reduced coal burning and air pollution. Trees gradually recovered their lichen. Bark became lighter again.\n\nIf industrial melanism was truly caused by natural selection via camouflage, scientists predicted that the moth populations should reverse — dark moths should decline and light moths should increase.',
          illustration: '🌿',
        },
        {
          title: 'The Prediction Came True',
          content:
            'That\'s exactly what happened. As the air cleaned up:\n\n• Dark moths became visible on lightening bark — birds ate more of them\n• Light moths regained their camouflage advantage\n• By the year 2000, light moths once again made up the majority in former industrial areas\n\nThis reversal was powerful evidence. It showed that the shift wasn\'t a one-way street — it was a direct response to environmental conditions.',
          illustration: '📈',
        },
        {
          title: 'Why This Matters',
          content:
            'The peppered moth story is special because it demonstrates evolution in both directions:\n\n• Pollution → dark moths favored → population darkens\n• Clean air → light moths favored → population lightens\n\nThis back-and-forth proves that natural selection is the mechanism. The trait that helps survival depends entirely on the current environment. There is no permanent "better" — only "better suited to conditions right now."',
          keyTerm: {
            term: 'Directional Selection',
            definition:
              'Selection that favors one extreme of a trait over the other. The direction can change when the environment changes.',
          },
        },
        {
          title: 'Beyond Moths',
          content:
            'The peppered moth principle applies everywhere:\n\n• Bacteria evolving antibiotic resistance (then losing it when antibiotics are removed)\n• Insects evolving pesticide resistance on farms\n• Lizards changing body size on different islands\n\nAny time an environmental change makes one trait more or less advantageous, the population will shift. The peppered moth just happens to be the clearest, most visual example we have.',
          illustration: '🌍',
        },
      ],
    },
  ],
};
