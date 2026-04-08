import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

const ANTIBIOTIC_INTRODUCTION_GENERATION = 10;

export class AntibioticResistanceSimulation extends BaseSimulation {
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
        antibioticPresent: 0,
        antibioticStrength: 0,
      },
      selectionPressures: [
        {
          type: 'natural',
          strength: 0,
          targetTraits: ['resistance'],
          description: 'No antibiotics present — bacteria grow freely',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    if (generation >= ANTIBIOTIC_INTRODUCTION_GENERATION) {
      // Gradual ramp: reaches full strength over ~6 generations.
      // Max strength 0.55 means families with resistance above ~55% can
      // survive long-term, creating a nuanced outcome (2-3 survivors).
      const generationsSinceIntro =
        generation - ANTIBIOTIC_INTRODUCTION_GENERATION;
      const strength = Math.min(0.55, generationsSinceIntro * 0.1);

      this.environment.factors.antibioticPresent = 1;
      this.environment.factors.antibioticStrength = strength;
      this.environment.selectionPressures = [
        {
          type: 'natural',
          strength,
          targetTraits: ['resistance'],
          description: `Antibiotics active (${(strength * 100).toFixed(0)}% strength)`,
        },
      ];
    }
  }

  /**
   * Antibiotics kill bacteria. Each individual survives with probability = fitness.
   * Low-resistance bacteria are eliminated before they can reproduce.
   */
  protected applySurvival(): void {
    if (!this.environment.factors.antibioticPresent) return;

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
    const resistance = individual.traits.resistance ?? 0;
    const antibioticPresent = environment.factors.antibioticPresent;
    const antibioticStrength = environment.factors.antibioticStrength;

    if (!antibioticPresent) {
      // Without antibiotics, slight cost to high resistance (energy overhead)
      return 1.0 - resistance * 0.05;
    }

    // With antibiotics: sharp survival threshold.
    // Bacteria need resistance > antibioticStrength to survive well.
    // Below threshold → steep death curve (antibiotics kill them).
    const gap = resistance - antibioticStrength;

    if (gap >= 0) {
      // Resistant enough — high survival
      return 0.7 + 0.3 * Math.min(gap / 0.3, 1);
    } else {
      // Not resistant enough — antibiotics are lethal
      const deficit = -gap;
      return Math.max(0.002, 0.1 * Math.pow(1 - deficit, 4));
    }
  }
}
