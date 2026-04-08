import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

const POLLUTION_START_GENERATION = 15;

export class PepperedMothSimulation extends BaseSimulation {
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
        pollutionLevel: 0,
        barkDarkness: 0,
      },
      selectionPressures: [
        {
          type: 'natural',
          strength: 0,
          targetTraits: ['coloration'],
          description: 'Clean forests — light bark favors light moths',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    if (generation >= POLLUTION_START_GENERATION) {
      // Gradual darkening: reaches full darkness over ~10 generations
      const gensSince = generation - POLLUTION_START_GENERATION;
      const darkness = Math.min(0.85, gensSince * 0.1);

      this.environment.factors.pollutionLevel = 1;
      this.environment.factors.barkDarkness = darkness;
      this.environment.selectionPressures = [
        {
          type: 'natural',
          strength: darkness,
          targetTraits: ['coloration'],
          description: `Polluted forests — dark bark (${(darkness * 100).toFixed(0)}% darkened)`,
        },
      ];
    }
  }

  /**
   * Bird predation: moths that don't match the bark color are eaten.
   */
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
    const coloration = individual.traits.coloration ?? 0;
    const barkDarkness = environment.factors.barkDarkness;

    // Camouflage = how well the moth matches the bark.
    // On clean bark (darkness≈0), light moths (coloration≈0) match best.
    // On dark bark (darkness≈0.85), dark moths (coloration≈1) match best.
    const mismatch = Math.abs(coloration - barkDarkness);

    if (mismatch <= 0.15) {
      // Well camouflaged — high survival
      return 0.85 + 0.15 * (1 - mismatch / 0.15);
    } else {
      // Poorly camouflaged — steep predation curve
      return Math.max(0.01, 0.85 * Math.pow(1 - mismatch, 3));
    }
  }
}
