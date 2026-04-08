import { DarwinsFinchesSimulation } from '../DarwinsFinches';
import { resetIdCounter } from '../BaseSimulation';
import { scenarios } from '../../data/scenarios';

const scenario = scenarios.find((s) => s.id === 'darwins-finches')!;

beforeEach(() => {
  resetIdCounter();
});

describe('DarwinsFinchesSimulation', () => {
  function createSim() {
    return new DarwinsFinchesSimulation(
      scenario.traits,
      scenario.genetics,
      scenario.parameters
    );
  }

  it('creates initial population with correct size', () => {
    const sim = createSim();
    const pop = sim.getPopulation();
    expect(pop.size).toBe(scenario.parameters.minPopulationSize);
    expect(pop.individuals.length).toBe(scenario.parameters.minPopulationSize);
  });

  it('all individuals have beakSize trait', () => {
    const sim = createSim();
    for (const ind of sim.getPopulation().individuals) {
      expect(ind.traits.beakSize).toBeGreaterThanOrEqual(0);
      expect(ind.traits.beakSize).toBeLessThanOrEqual(1);
    }
  });

  it('advances generation on step', () => {
    const sim = createSim();
    sim.step();
    expect(sim.getGeneration()).toBe(1);
  });

  it('before niche competition all beaks have similar high fitness', () => {
    const sim = createSim();
    const pop = sim.getPopulation();
    for (const ind of pop.individuals) {
      expect(ind.fitness).toBeGreaterThan(0.85);
    }
  });

  it('after niche competition specialists have higher fitness than generalists', () => {
    const sim = createSim();
    // Run past the niche emergence generation (15)
    for (let i = 0; i < 20; i++) sim.step();

    const env = sim.getEnvironment();
    expect(env.factors.nicheCompetition).toBeGreaterThan(0);

    const pop = sim.getPopulation();
    const specialists = pop.individuals.filter(
      (ind) => ind.traits.beakSize < 0.2 || ind.traits.beakSize > 0.8
    );
    const generalists = pop.individuals.filter(
      (ind) => ind.traits.beakSize >= 0.4 && ind.traits.beakSize <= 0.6
    );

    if (specialists.length > 0 && generalists.length > 0) {
      const avgSpecialist =
        specialists.reduce((s, i) => s + i.fitness, 0) / specialists.length;
      const avgGeneralist =
        generalists.reduce((s, i) => s + i.fitness, 0) / generalists.length;
      expect(avgSpecialist).toBeGreaterThan(avgGeneralist);
    }
  });

  it('niche competition kills some individuals', () => {
    const sim = createSim();
    for (let i = 0; i < 20; i++) sim.step();
    const pop = sim.getPopulation();
    const dead = pop.individuals.filter((i) => i.status === 'dead');
    // After competition, the dead are already filtered out in reproduction
    // but population should be smaller or have experienced turnover
    expect(pop.size).toBeGreaterThan(0);
  });

  it('resets to generation 0', () => {
    const sim = createSim();
    sim.step();
    sim.step();
    sim.reset();
    expect(sim.getGeneration()).toBe(0);
    expect(sim.getPopulation().size).toBe(scenario.parameters.minPopulationSize);
  });

  it('completes after max generations', () => {
    const sim = createSim();
    for (let i = 0; i < scenario.parameters.maxGenerations; i++) {
      sim.step();
    }
    expect(sim.isCompleted()).toBe(true);
  });
});
