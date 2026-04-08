import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

const SUPERPREDATOR_GENERATION = 20;

export class PredatorPreySimulation extends BaseSimulation {
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
        predatorSpeed: 0.3,
      },
      selectionPressures: [
        {
          type: 'natural',
          strength: 0.3,
          targetTraits: ['speed'],
          description: 'Predators hunting at moderate speed',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    let predatorSpeed = 0.3 + generation * 0.005;

    // Superpredator event at gen 20
    if (generation >= SUPERPREDATOR_GENERATION) {
      predatorSpeed += 0.15;
    }

    predatorSpeed = Math.min(1, predatorSpeed);

    this.environment.factors.predatorSpeed = predatorSpeed;
    this.environment.selectionPressures = [
      {
        type: 'natural',
        strength: predatorSpeed,
        targetTraits: ['speed'],
        description:
          generation >= SUPERPREDATOR_GENERATION
            ? `Superpredator active! Predator speed: ${(predatorSpeed * 100).toFixed(0)}%`
            : `Predator speed: ${(predatorSpeed * 100).toFixed(0)}%`,
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
    const speed = individual.traits.speed ?? 0;
    const predatorSpeed = environment.factors.predatorSpeed;

    const gap = speed - predatorSpeed;

    if (gap >= 0) {
      // Fast enough to escape — high fitness
      return 0.7 + 0.3 * Math.min(gap / 0.3, 1);
    } else {
      // Too slow — caught by predators
      const deficit = -gap;
      return Math.max(0.002, 0.1 * Math.pow(1 - deficit, 4));
    }
  }
}
