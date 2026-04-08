import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

const NEW_PREDATOR_GENERATION = 25;

export class MimicrySimulation extends BaseSimulation {
  constructor(
    traits: TraitDefinition[],
    genetics: GeneticsConfig,
    parameters: SimulationParameters
  ) {
    super(traits, genetics, parameters);
  }

  protected createInitialEnvironment(): EnvironmentState {
    return {
      factors: {
        predatorLearning: 0.2,
      },
      selectionPressures: [
        {
          type: 'natural',
          strength: 0.2,
          targetTraits: ['mimicryAccuracy'],
          description: 'Predators avoid butterflies that look toxic',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    // Ramps from 0.2 to 0.6 over 40 generations
    let predatorLearning = 0.2 + (0.4 * generation) / 40;

    // New predator species at gen 25
    if (generation >= NEW_PREDATOR_GENERATION) {
      predatorLearning += 0.1;
    }

    predatorLearning = Math.min(1, predatorLearning);

    this.environment.factors.predatorLearning = predatorLearning;
    this.environment.selectionPressures = [
      {
        type: 'natural',
        strength: predatorLearning,
        targetTraits: ['mimicryAccuracy'],
        description:
          generation >= NEW_PREDATOR_GENERATION
            ? `New predator species! Detection ability: ${(predatorLearning * 100).toFixed(0)}%`
            : `Predator detection ability: ${(predatorLearning * 100).toFixed(0)}%`,
      },
    ];
  }

  protected applySurvival(): void {
    for (const ind of this.population.individuals) {
      if (Math.random() >= ind.fitness) {
        ind.status = 'dead';
      }
    }
  }

  protected calculateFitness(
    individual: Individual,
    environment: EnvironmentState
  ): number {
    const mimicryAccuracy = individual.traits.mimicryAccuracy ?? 0;
    const predatorLearning = environment.factors.predatorLearning;

    const gap = mimicryAccuracy - predatorLearning;

    if (gap >= 0) {
      // Good mimic — fools predators
      return 0.7 + 0.3 * Math.min(gap / 0.3, 1);
    } else {
      // Poor mimic — detected and eaten
      const deficit = -gap;
      return Math.max(0.002, 0.1 * Math.pow(1 - deficit, 4));
    }
  }
}
