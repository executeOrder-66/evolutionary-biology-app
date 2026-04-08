import type {
  Individual,
  Population,
  PopulationStatistics,
  EnvironmentState,
  GenerationSnapshot,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';

let nextId = 0;
function generateId(): string {
  return `ind-${nextId++}`;
}

export function resetIdCounter(): void {
  nextId = 0;
}

export abstract class BaseSimulation {
  protected population: Population;
  protected environment: EnvironmentState;
  protected generation = 0;
  protected history: GenerationSnapshot[] = [];
  protected traits: TraitDefinition[];
  protected genetics: GeneticsConfig;
  protected parameters: SimulationParameters;

  constructor(
    traits: TraitDefinition[],
    genetics: GeneticsConfig,
    parameters: SimulationParameters
  ) {
    this.traits = traits;
    this.genetics = genetics;
    this.parameters = parameters;
    this.environment = this.createInitialEnvironment();
    this.population = this.createInitialPopulation();
    this.recordSnapshot();
  }

  protected abstract createInitialEnvironment(): EnvironmentState;
  protected abstract calculateFitness(
    individual: Individual,
    environment: EnvironmentState
  ): number;
  protected abstract updateEnvironment(generation: number): void;

  /**
   * Survival phase: called after fitness is calculated but before reproduction.
   * Subclasses can override to kill unfit individuals (e.g., antibiotics killing bacteria).
   * Default: no survival filter.
   */
  protected applySurvival(): void {
    // No-op by default — all individuals survive to reproduce
  }

  protected createInitialPopulation(): Population {
    const individuals: Individual[] = [];
    const size = this.parameters.minPopulationSize;

    for (let i = 0; i < size; i++) {
      const traits: Record<string, number> = {};
      for (const def of this.traits) {
        traits[def.name] = def.min + Math.random() * (def.max - def.min);
      }

      const individual: Individual = {
        id: generateId(),
        generation: 0,
        parents: [],
        traits,
        fitness: 0,
        status: 'alive',
        age: 0,
      };
      individual.fitness = this.calculateFitness(individual, this.environment);
      individuals.push(individual);
    }

    return {
      individuals,
      generation: 0,
      size: individuals.length,
      statistics: this.computeStatistics(individuals),
    };
  }

  step(): void {
    this.generation++;
    this.updateEnvironment(this.generation);

    // Selection: calculate fitness
    for (const ind of this.population.individuals) {
      ind.fitness = this.calculateFitness(ind, this.environment);
    }

    // Survival phase: environment may kill unfit individuals before they reproduce
    this.applySurvival();

    // Reproduction with fitness-proportionate selection
    const offspring = this.reproduce();

    // Update population
    for (const ind of this.population.individuals) {
      ind.status = 'dead';
    }

    this.population = {
      individuals: offspring,
      generation: this.generation,
      size: offspring.length,
      statistics: this.computeStatistics(offspring),
    };

    this.recordSnapshot();
  }

  /**
   * Asexual reproduction (binary fission).
   * Each surviving parent splits into `offspringPerReproduction` near-clones.
   * Traits are inherited directly from the single parent, with a small
   * chance of mutation. This mirrors how bacteria actually reproduce and
   * keeps lineage tracking unambiguous — every child has exactly one parent.
   */
  protected reproduce(): Individual[] {
    const survivors = this.population.individuals.filter(
      (i) => i.status === 'alive'
    );
    if (survivors.length === 0) return [];

    const offspring: Individual[] = [];
    const cap = this.parameters.maxPopulationSize;

    // Each survivor produces clones. If that would exceed the population
    // cap, we randomly sample which survivors get to reproduce.
    let parents: Individual[];
    const wouldProduce = survivors.length * this.genetics.offspringPerReproduction;

    if (wouldProduce <= cap) {
      parents = survivors;
    } else {
      // Fitness-proportionate sampling to decide who reproduces
      const needed = Math.floor(cap / this.genetics.offspringPerReproduction);
      parents = [];
      const totalFitness = survivors.reduce((s, i) => s + Math.max(i.fitness, 0.01), 0);
      for (let i = 0; i < needed; i++) {
        parents.push(this.selectParent(survivors, totalFitness));
      }
    }

    for (const parent of parents) {
      for (let c = 0; c < this.genetics.offspringPerReproduction; c++) {
        const childTraits: Record<string, number> = {};
        for (const def of this.traits) {
          // Clone parent's trait with possible mutation
          let value = parent.traits[def.name];
          if (Math.random() < def.mutationRate) {
            value += (Math.random() - 0.5) * 2 * def.mutationMagnitude;
          }
          childTraits[def.name] = Math.max(def.min, Math.min(def.max, value));
        }

        const child: Individual = {
          id: generateId(),
          generation: this.generation,
          parents: [parent.id],
          traits: childTraits,
          fitness: 0,
          status: 'alive',
          age: 0,
        };
        child.fitness = this.calculateFitness(child, this.environment);
        offspring.push(child);
      }
    }

    return offspring;
  }

  protected selectParent(
    parents: Individual[],
    totalFitness: number
  ): Individual {
    let threshold = Math.random() * totalFitness;
    for (const parent of parents) {
      threshold -= Math.max(parent.fitness, 0.01);
      if (threshold <= 0) return parent;
    }
    return parents[parents.length - 1];
  }

  protected computeStatistics(individuals: Individual[]): PopulationStatistics {
    const size = individuals.length;
    if (size === 0) {
      return {
        meanFitness: 0,
        fitnessVariance: 0,
        traitMeans: {},
        traitVariances: {},
        size: 0,
      };
    }

    const meanFitness =
      individuals.reduce((s, i) => s + i.fitness, 0) / size;
    const fitnessVariance =
      individuals.reduce((s, i) => s + (i.fitness - meanFitness) ** 2, 0) /
      size;

    const traitMeans: Record<string, number> = {};
    const traitVariances: Record<string, number> = {};

    for (const def of this.traits) {
      const values = individuals.map((i) => i.traits[def.name]);
      const mean = values.reduce((s, v) => s + v, 0) / size;
      const variance =
        values.reduce((s, v) => s + (v - mean) ** 2, 0) / size;
      traitMeans[def.name] = mean;
      traitVariances[def.name] = variance;
    }

    return { meanFitness, fitnessVariance, traitMeans, traitVariances, size };
  }

  protected recordSnapshot(): void {
    const stats = this.population.statistics;
    this.history.push({
      generation: this.generation,
      populationSize: this.population.size,
      traitMeans: { ...stats.traitMeans },
      traitVariances: { ...stats.traitVariances },
      meanFitness: stats.meanFitness,
    });
  }

  getPopulation(): Population {
    return this.population;
  }

  getGeneration(): number {
    return this.generation;
  }

  getHistory(): GenerationSnapshot[] {
    return this.history;
  }

  getEnvironment(): EnvironmentState {
    return this.environment;
  }

  isCompleted(): boolean {
    return (
      this.generation >= this.parameters.maxGenerations ||
      this.population.size === 0
    );
  }

  reset(): void {
    resetIdCounter();
    this.generation = 0;
    this.history = [];
    this.environment = this.createInitialEnvironment();
    this.population = this.createInitialPopulation();
    this.recordSnapshot();
  }
}
