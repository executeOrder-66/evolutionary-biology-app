import { LineageTracker } from '../LineageTracker';
import type { Individual } from '../../types';

function makeIndividual(
  id: string,
  traitValue: number,
  generation = 0,
  parents: string[] = [],
): Individual {
  return {
    id,
    generation,
    parents,
    traits: { resistance: traitValue },
    fitness: traitValue,
    status: 'alive',
    age: 0,
  };
}

describe('LineageTracker', () => {
  it('initializeFromPopulation creates trees from a population', () => {
    const pop = Array.from({ length: 25 }, (_, i) =>
      makeIndividual(`ind-${i}`, i / 24),
    );

    const tracker = new LineageTracker();
    tracker.initializeFromPopulation(pop, 'resistance');

    const data = tracker.getLineageData();
    expect(data.trees.length).toBe(5);
    expect(data.trackedAncestorIds.length).toBe(5);
    expect(data.maxGeneration).toBe(0);
  });

  it('recordGeneration tracks offspring correctly', () => {
    const pop = Array.from({ length: 10 }, (_, i) =>
      makeIndividual(`ind-${i}`, i / 9),
    );

    const tracker = new LineageTracker();
    tracker.initializeFromPopulation(pop, 'resistance');

    const offspring = [
      makeIndividual('child-0', 0.05, 1, ['ind-0']),
      makeIndividual('child-1', 0.1, 1, ['ind-1']),
    ];

    tracker.recordGeneration(pop, offspring);

    const data = tracker.getLineageData();
    expect(data.maxGeneration).toBe(1);

    // Offspring should appear in a tree
    let found = 0;
    for (const tree of data.trees) {
      if (tree.nodes.has('child-0')) found++;
      if (tree.nodes.has('child-1')) found++;
    }
    expect(found).toBe(2);
  });

  it('getLineageData returns correct structure', () => {
    const tracker = new LineageTracker();
    const pop = Array.from({ length: 10 }, (_, i) =>
      makeIndividual(`ind-${i}`, i / 9),
    );
    tracker.initializeFromPopulation(pop, 'resistance');

    const data = tracker.getLineageData();

    expect(data).toHaveProperty('trees');
    expect(data).toHaveProperty('trackedAncestorIds');
    expect(data).toHaveProperty('maxGeneration');
    expect(Array.isArray(data.trees)).toBe(true);
    expect(Array.isArray(data.trackedAncestorIds)).toBe(true);
  });

  it('tracks ancestry through multiple generations', () => {
    const pop = Array.from({ length: 10 }, (_, i) =>
      makeIndividual(`ind-${i}`, i / 9),
    );
    const tracker = new LineageTracker();
    tracker.initializeFromPopulation(pop, 'resistance');

    const gen1 = [
      makeIndividual('g1-0', 0.05, 1, ['ind-0']),
      makeIndividual('g1-1', 0.9, 1, ['ind-9']),
    ];
    tracker.recordGeneration(pop, gen1);

    const gen2 = [
      makeIndividual('g2-0', 0.06, 2, ['g1-0']),
      makeIndividual('g2-1', 0.91, 2, ['g1-1']),
    ];
    tracker.recordGeneration(gen1, gen2);

    const data = tracker.getLineageData();
    expect(data.maxGeneration).toBe(2);

    // g2-0 should be in the same tree as ind-0
    let g2Tree: string | null = null;
    let ind0Tree: string | null = null;
    for (const tree of data.trees) {
      if (tree.nodes.has('g2-0')) g2Tree = tree.ancestorId;
      if (tree.nodes.has('ind-0')) ind0Tree = tree.ancestorId;
    }
    expect(g2Tree).not.toBeNull();
    expect(g2Tree).toBe(ind0Tree);
  });

  it('resistance trait gives Tiny/Scout/Patches/Rusty/Tank names', () => {
    const pop = Array.from({ length: 25 }, (_, i) =>
      makeIndividual(`ind-${i}`, i / 24),
    );
    const tracker = new LineageTracker();
    tracker.initializeFromPopulation(pop, 'resistance');

    const labels = tracker.getLineageData().trees.map((t) => t.label);
    expect(labels).toEqual(expect.arrayContaining(['Tiny', 'Scout', 'Patches', 'Rusty', 'Tank']));
  });

  it('coloration trait gives Ghost/Pepper/Dusk/Shadow/Soot names', () => {
    const pop = Array.from({ length: 25 }, (_, i) =>
      makeIndividual(`ind-${i}`, i / 24),
    );
    // Override traits to use coloration
    for (const ind of pop) {
      ind.traits = { coloration: ind.traits.resistance };
    }
    const tracker = new LineageTracker();
    tracker.initializeFromPopulation(pop, 'coloration');

    const labels = tracker.getLineageData().trees.map((t) => t.label);
    expect(labels).toEqual(expect.arrayContaining(['Ghost', 'Pepper', 'Dusk', 'Shadow', 'Soot']));
  });
});
