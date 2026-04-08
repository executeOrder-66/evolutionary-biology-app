import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../../hooks/usePageTitle';

interface GlossaryEntry {
  term: string;
  definition: string;
  category: string;
}

const GLOSSARY: GlossaryEntry[] = [
  { term: 'Natural Selection', definition: 'The process where organisms with traits better suited to their environment tend to survive and reproduce more. Over generations, these beneficial traits become more common in the population.', category: 'Core Concepts' },
  { term: 'Fitness', definition: 'A measure of how well an organism can survive and reproduce in its environment. Higher fitness means a greater chance of passing genes to the next generation.', category: 'Core Concepts' },
  { term: 'Allele', definition: 'A variant form of a gene. Different alleles can produce different traits (e.g., high resistance vs low resistance).', category: 'Genetics' },
  { term: 'Allele Frequency', definition: 'How common a particular allele is in a population, expressed as a proportion from 0 to 1.', category: 'Genetics' },
  { term: 'Mutation', definition: 'A random change in DNA that creates new genetic variation. Most mutations are neutral, some are harmful, and rarely, some are beneficial.', category: 'Genetics' },
  { term: 'Recombination', definition: 'The mixing of genetic material from two parents during reproduction, creating offspring with new combinations of traits.', category: 'Genetics' },
  { term: 'Antibiotic Resistance', definition: 'The ability of bacteria to survive exposure to antibiotics. Resistance often evolves through natural selection when antibiotics kill susceptible bacteria but leave resistant ones to reproduce.', category: 'Applications' },
  { term: 'Superbug', definition: 'A bacterium that has evolved resistance to multiple antibiotics, making infections very difficult to treat.', category: 'Applications' },
  { term: 'Sexual Selection', definition: 'A form of natural selection where traits are favored because they increase mating success, even if they reduce survival (e.g., peacock tails).', category: 'Selection Types' },
  { term: 'Artificial Selection', definition: 'Selective breeding by humans to produce desired traits in plants or animals (e.g., dog breeds).', category: 'Selection Types' },
  { term: 'Speciation', definition: 'The formation of new and distinct species through evolution, often when populations become reproductively isolated.', category: 'Selection Types' },
  { term: 'Adaptation', definition: 'A trait that has evolved because it improves an organism\'s fitness in its specific environment.', category: 'Core Concepts' },
  { term: 'Population', definition: 'A group of organisms of the same species living in the same area and interbreeding.', category: 'Core Concepts' },
  { term: 'Generation', definition: 'One complete cycle of reproduction. In simulations, each generation represents one round of selection, reproduction, and mutation.', category: 'Core Concepts' },
  { term: 'Trait', definition: 'A characteristic of an organism that can be measured or observed, often influenced by genetics (e.g., antibiotic resistance level).', category: 'Genetics' },
  { term: 'Selective Pressure', definition: 'An environmental factor that affects which organisms survive and reproduce (e.g., antibiotics, predators, pollution).', category: 'Core Concepts' },
  { term: 'Genetic Drift', definition: 'Random changes in allele frequency that occur by chance, especially important in small populations.', category: 'Genetics' },
  { term: 'Batesian Mimicry', definition: 'When a harmless species evolves to resemble a dangerous or toxic species to avoid predation.', category: 'Applications' },
  { term: 'Industrial Melanism', definition: 'The darkening of species (like peppered moths) in polluted areas, where dark coloring provides better camouflage on soot-covered surfaces.', category: 'Applications' },
  { term: 'Phylogenetic Tree', definition: 'A diagram showing the evolutionary relationships between organisms, like a family tree of species or populations.', category: 'Core Concepts' },
  { term: 'Extinction', definition: 'When all members of a species or lineage die out, leaving no living descendants.', category: 'Core Concepts' },
];

export default function GlossaryPage() {
  usePageTitle('Glossary');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = GLOSSARY.filter((entry) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return entry.term.toLowerCase().includes(q) || entry.definition.toLowerCase().includes(q);
  });

  const categories = [...new Set(filtered.map((e) => e.category))];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">📖 Glossary</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Key terms in evolutionary biology</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
        />
      </div>

      {/* Terms by category */}
      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {cat}
          </h2>
          <div className="space-y-2">
            {filtered
              .filter((e) => e.category === cat)
              .sort((a, b) => a.term.localeCompare(b.term))
              .map((entry) => (
                <div key={entry.term} className="card p-4">
                  <dt className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {entry.term}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {entry.definition}
                  </dd>
                </div>
              ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
          No terms found matching &ldquo;{search}&rdquo;
        </p>
      )}
    </div>
  );
}
