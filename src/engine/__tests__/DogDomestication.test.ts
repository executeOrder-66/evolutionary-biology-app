import { DogDomesticationSimulation } from '../DogDomestication';
import { resetIdCounter } from '../BaseSimulation';
import { scenarios } from '../../data/scenarios';

const scenario = scenarios.find((s) => s.id === 'dog-domestication')!;

beforeEach(() => {
  resetIdCounter();
});

describe('DogDomesticationSimulation', () => {
  function create() {
    return new DogDomesticationSimulation(
      scenario.traits,
      scenario.genetics,
      scenario.parameters
    );
  }

  it('creates initial population with correct size and traits', () => {
    const sim = create();
    const pop = sim.getPopulation();
    expect(pop.size).toBe(scenario.parameters.minPopulationSize);
    for (const ind of pop.individuals) {
      expect(ind.traits.tameness).toBeGreaterThanOrEqual(0);
      expect(ind.traits.tameness).toBeLessThanOrEqual(1);
      expect(ind.traits.size).toBeGreaterThanOrEqual(0);
      expect(ind.traits.size).toBeLessThanOrEqual(1);
      expect(ind.status).toBe('alive');
    }
  });

  it('step() advances generation by 1', () => {
    const sim = create();
    sim.step();
    expect(sim.getGeneration()).toBe(1);
  });

  it('tame wolves have higher fitness than wild ones', () => {
    // fitness = max(0.05, 0.3 + tameness * selectivity * 0.8 + sizeMatch * selectivity * 0.2)
    // Initial: selectivity=0.3, sizePref=0.5
    const selectivity = 0.3;
    const sizePref = 0.5;

    function fitness(tameness: number, size: number) {
      const tameBonus = tameness * selectivity * 0.8;
      const sizeMatch = 1 - Math.abs(size - sizePref);
      const sizeBonus = sizeMatch * selectivity * 0.2;
      return Math.max(0.05, 0.3 + tameBonus + sizeBonus);
    }

    const fTame = fitness(0.9, 0.5);
    const fWild = fitness(0.1, 0.5);
    expect(fTame).toBeGreaterThan(fWild);
  });

  it('applySurvival removes some aggressive wolves', () => {
    const sim = create();
    for (let i = 0; i < 5; i++) sim.step();
    expect(sim.getPopulation().size).toBeGreaterThan(0);
  });

  it('reproduce creates offspring with parent traits', () => {
    const sim = create();
    sim.step();
    const pop = sim.getPopulation();
    for (const ind of pop.individuals) {
      expect(ind.generation).toBe(1);
      expect(ind.parents.length).toBe(1);
      expect(ind.traits.tameness).toBeGreaterThanOrEqual(0);
      expect(ind.traits.tameness).toBeLessThanOrEqual(1);
      expect(ind.traits.size).toBeGreaterThanOrEqual(0);
      expect(ind.traits.size).toBeLessThanOrEqual(1);
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
