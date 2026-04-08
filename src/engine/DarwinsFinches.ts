import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

const NICHE_EMERGENCE_GENERATION = 15;

export class DarwinsFinchesSimulation extends BaseSimulation {
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
        nicheCompetition: 0,
        smallSeedAbundance: 0.5,
        largeSeedAbundance: 0.5,
      },
      selectionPressures: [
        {
          type: 'natural',
          strength: 0,
          targetTraits: ['beakSize'],
          description: 'Abundant food — all beak sizes thrive equally',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    if (generation >= NICHE_EMERGENCE_GENERATION) {
      // Competition ramps up → disruptive selection strengthens
      const gensSince = generation - NICHE_EMERGENCE_GENERATION;
      const competition = Math.min(0.9, gensSince * 0.06);

      this.environment.factors.nicheCompetition = competition;
      this.environment.selectionPressures = [
        {
          type: 'natural',
          strength: competition,
          targetTraits: ['beakSize'],
          description: `Food niche competition (${(competition * 100).toFixed(0)}% intensity)`,
        },
      ];
    }
  }

  /**
   * Competition-based survival: medium beaks face the most competition
   * from specialists on both sides.
   */
  protected applySurvival(): void {
    const competition = this.environment.factors.nicheCompetition;
    if (competition <= 0) return;

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
    const beakSize = individual.traits.beakSize ?? 0.5;
    const competition = environment.factors.nicheCompetition;

    if (competition <= 0) {
      // No competition — slight random variation, all do well
      return 0.9 + beakSize * 0.05;
    }

    // Disruptive selection: specialists (extreme beak sizes) do better
    // than generalists (medium beak sizes).
    // Distance from the middle (0.5) determines advantage.
    const distFromMiddle = Math.abs(beakSize - 0.5) * 2; // 0 at center, 1 at extremes

    // Specialists thrive, generalists struggle
    const specialistBonus = distFromMiddle * competition * 0.6;
    const generalistPenalty = (1 - distFromMiddle) * competition * 0.4;

    return Math.max(0.05, 0.6 + specialistBonus - generalistPenalty);
  }
}
