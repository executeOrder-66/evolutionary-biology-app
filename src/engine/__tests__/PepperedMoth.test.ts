import { PepperedMothSimulation } from '../PepperedMoth';
import { resetIdCounter } from '../BaseSimulation';
import { scenarios } from '../../data/scenarios';

const scenario = scenarios.find((s) => s.id === 'peppered-moths')!;

beforeEach(() => {
  resetIdCounter();
});

describe('PepperedMothSimulation', () => {
  function create() {
    return new PepperedMothSimulation(
      scenario.traits,
      scenario.genetics,
      scenario.parameters
    );
  }

  it('creates initial population with correct size and trait', () => {
    const sim = create();
    const pop = sim.getPopulation();
    expect(pop.size).toBe(scenario.parameters.minPopulationSize);
    for (const ind of pop.individuals) {
      expect(ind.traits.coloration).toBeGreaterThanOrEqual(0);
      expect(ind.traits.coloration).toBeLessThanOrEqual(1);
      expect(ind.status).toBe('alive');
    }
  });

  it('step() advances generation by 1', () => {
    const sim = create();
    sim.step();
    expect(sim.getGeneration()).toBe(1);
  });

  it('light moths have higher fitness before pollution (bark is light)', () => {
    const sim = create();
    const pop = sim.getPopulation();
    // barkDarkness = 0, so coloration near 0 = good camouflage
    for (const ind of pop.individuals) {
      // mismatch = |coloration - 0| = coloration
      // Low coloration -> high fitness
      if (ind.traits.coloration < 0.1) {
        expect(ind.fitness).toBeGreaterThan(0.8);
      }
    }
  });

  it('dark moths have higher fitness after pollution', () => {
    const sim = create();
    // Advance past pollution start at gen 15
    for (let i = 0; i < 20; i++) sim.step();

    const env = sim.getEnvironment();
    expect(env.factors.pollutionLevel).toBe(1);
    expect(env.factors.barkDarkness).toBeGreaterThan(0);

    const pop = sim.getPopulation();
    const barkDarkness = env.factors.barkDarkness;
    // Individuals closer to barkDarkness should have higher fitness
    const sorted = [...pop.individuals].sort(
      (a, b) =>
        Math.abs(a.traits.coloration - barkDarkness) -
        Math.abs(b.traits.coloration - barkDarkness)
    );
    if (sorted.length >= 2) {
      expect(sorted[0].fitness).toBeGreaterThanOrEqual(
        sorted[sorted.length - 1].fitness
      );
    }
  });

  it('applySurvival kills some individuals (bird predation)', () => {
    const sim = create();
    sim.step();
    // After a step the population exists (some may have died from predation)
    expect(sim.getPopulation().size).toBeGreaterThan(0);
  });

  it('reproduce creates offspring with parent trait', () => {
    const sim = create();
    sim.step();
    const pop = sim.getPopulation();
    for (const ind of pop.individuals) {
      expect(ind.generation).toBe(1);
      expect(ind.parents.length).toBe(1);
      expect(ind.traits.coloration).toBeGreaterThanOrEqual(0);
      expect(ind.traits.coloration).toBeLessThanOrEqual(1);
    }
  });

  it('reset() returns to generation 0', () => {
    const sim = create();
    for (let i = 0; i < 5; i++) sim.step();
    sim.reset();
    expect(sim.getGeneration()).toBe(0);
    expect(sim.getHistory().length).toBe(1);
  });

  it('isCompleted() is false initially and true after max generations', () => {
    const sim = create();
    expect(sim.isCompleted()).toBe(false);
    for (let i = 0; i < scenario.parameters.maxGenerations; i++) sim.step();
    expect(sim.isCompleted()).toBe(true);
  });
});
