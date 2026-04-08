import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

export class PeacockTailSimulation extends BaseSimulation {
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
        predationPressure: 0.3,
        femalePrefStrength: 0.5,
      },
      selectionPressures: [
        {
          type: 'sexual',
          strength: 0.5,
          targetTraits: ['tailSize'],
          description: 'Females prefer larger tails — balanced by predation cost',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    // Female preference strengthens gradually (Fisherian runaway),
    // while predation remains constant.
    const prefStrength = Math.min(0.8, 0.5 + generation * 0.005);
    this.environment.factors.femalePrefStrength = prefStrength;
    this.environment.selectionPressures = [
      {
        type: 'sexual',
        strength: prefStrength,
        targetTraits: ['tailSize'],
        description: `Female preference: ${(prefStrength * 100).toFixed(0)}% strength`,
      },
    ];
  }

  /**
   * Predation culling: larger tails attract predators.
   */
  protected applySurvival(): void {
    const predation = this.environment.factors.predationPressure;
    for (const ind of this.population.individuals) {
      const tailSize = ind.traits.tailSize ?? 0;
      // Predation risk increases with tail size
      const deathProb = predation * tailSize * 0.6;
      if (Math.random() < deathProb) {
        ind.status = 'dead';
      }
    }
  }

  protected calculateFitness(
    individual: Individual,
    environment: EnvironmentState
  ): number {
    const tailSize = individual.traits.tailSize ?? 0;
    const prefStrength = environment.factors.femalePrefStrength;
    const predation = environment.factors.predationPressure;

    // Mating advantage: bigger tails attract more mates
    const matingBonus = tailSize * prefStrength;

    // Survival cost: bigger tails are more visible to predators
    const survivalCost = tailSize * tailSize * predation;

    // Net fitness combines both
    return Math.max(0.05, 0.5 + matingBonus - survivalCost);
  }
}
