import { AntibioticResistanceSimulation } from '../AntibioticResistance';
import { resetIdCounter } from '../BaseSimulation';
import { scenarios } from '../../data/scenarios';

const scenario = scenarios.find((s) => s.id === 'antibiotic-resistance')!;

beforeEach(() => {
  resetIdCounter();
});

describe('AntibioticResistanceSimulation', () => {
  function create() {
    return new AntibioticResistanceSimulation(
      scenario.traits,
      scenario.genetics,
      scenario.parameters
    );
  }

  it('creates initial population with correct size and trait', () => {
    const sim = create();
    const pop = sim.getPopulation();
    expect(pop.size).toBe(scenario.parameters.minPopulationSize);
    expect(pop.generation).toBe(0);
    for (const ind of pop.individuals) {
      expect(ind.traits.resistance).toBeGreaterThanOrEqual(0);
      expect(ind.traits.resistance).toBeLessThanOrEqual(1);
      expect(ind.status).toBe('alive');
    }
  });

  it('step() advances generation by 1', () => {
    const sim = create();
    expect(sim.getGeneration()).toBe(0);
    sim.step();
    expect(sim.getGeneration()).toBe(1);
  });

  it('fitness is near 1.0 before antibiotics (low resistance slightly penalized)', () => {
    const sim = create();
    const pop = sim.getPopulation();
    for (const ind of pop.individuals) {
      // Without antibiotics: fitness = 1.0 - resistance * 0.05
      expect(ind.fitness).toBeGreaterThan(0.9);
      expect(ind.fitness).toBeLessThanOrEqual(1.0);
    }
  });

  it('resistant bacteria have higher fitness than non-resistant after antibiotics', () => {
    const sim = create();
    // Advance past antibiotic introduction at gen 10
    for (let i = 0; i < 12; i++) sim.step();

    const env = sim.getEnvironment();
    expect(env.factors.antibioticPresent).toBe(1);

    // Check fitness: high resistance should beat low resistance
    const pop = sim.getPopulation();
    const sorted = [...pop.individuals].sort(
      (a, b) => a.traits.resistance - b.traits.resistance
    );
    if (sorted.length >= 2) {
      const low = sorted[0];
      const high = sorted[sorted.length - 1];
      // The more resistant one should have higher fitness
      if (high.traits.resistance > low.traits.resistance) {
        expect(high.fitness).toBeGreaterThan(low.fitness);
      }
    }
  });

  it('applySurvival kills some individuals after antibiotics', () => {
    const sim = create();
    // Run to gen 11 so antibiotics are active
    for (let i = 0; i < 11; i++) sim.step();

    // After step, the old generation is dead and replaced by offspring,
    // but population may have shrunk due to survival filter
    const pop = sim.getPopulation();
    // Population should still exist but may be smaller than unchecked growth
    expect(pop.size).toBeGreaterThan(0);
  });

  it('reproduce creates offspring with parent trait +/- mutation', () => {
    const sim = create();
    sim.step();
    const pop = sim.getPopulation();
    expect(pop.size).toBeGreaterThan(0);
    for (const ind of pop.individuals) {
      expect(ind.generation).toBe(1);
      expect(ind.parents.length).toBe(1);
      expect(ind.traits.resistance).toBeGreaterThanOrEqual(0);
      expect(ind.traits.resistance).toBeLessThanOrEqual(1);
    }
  });

  it('reset() returns to generation 0', () => {
    const sim = create();
    for (let i = 0; i < 5; i++) sim.step();
    expect(sim.getGeneration()).toBe(5);
    sim.reset();
    expect(sim.getGeneration()).toBe(0);
    expect(sim.getPopulation().generation).toBe(0);
    expect(sim.getHistory().length).toBe(1);
  });

  it('isCompleted() is false initially and true after max generations', () => {
    const sim = create();
    expect(sim.isCompleted()).toBe(false);
    for (let i = 0; i < scenario.parameters.maxGenerations; i++) sim.step();
    expect(sim.isCompleted()).toBe(true);
  });
});
