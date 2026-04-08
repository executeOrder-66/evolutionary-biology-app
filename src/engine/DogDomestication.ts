import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

export class DogDomesticationSimulation extends BaseSimulation {
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
        humanSelectivity: 0.3,
        sizePreference: 0.5, // 0 = prefer small, 1 = prefer large, 0.5 = no pref
      },
      selectionPressures: [
        {
          type: 'artificial',
          strength: 0.3,
          targetTraits: ['tameness', 'size'],
          description: 'Early humans favor the tamest wolves',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    // Human selectivity increases over time (more deliberate breeding)
    const selectivity = Math.min(0.9, 0.3 + generation * 0.01);
    this.environment.factors.humanSelectivity = selectivity;

    // After generation 40, humans also start selecting for smaller size
    const sizePreference = generation > 40 ? Math.max(0.2, 0.5 - (generation - 40) * 0.01) : 0.5;
    this.environment.factors.sizePreference = sizePreference;

    this.environment.selectionPressures = [
      {
        type: 'artificial',
        strength: selectivity,
        targetTraits: ['tameness', 'size'],
        description: `Human selection (${(selectivity * 100).toFixed(0)}% selectivity)`,
      },
    ];
  }

  /**
   * Aggressive wolves are driven away / not fed by humans.
   */
  protected applySurvival(): void {
    const selectivity = this.environment.factors.humanSelectivity;
    for (const ind of this.population.individuals) {
      const tameness = ind.traits.tameness ?? 0;
      // Low tameness = more likely to be driven away
      const deathProb = (1 - tameness) * selectivity * 0.4;
      if (Math.random() < deathProb) {
        ind.status = 'dead';
      }
    }
  }

  protected calculateFitness(
    individual: Individual,
    environment: EnvironmentState
  ): number {
    const tameness = individual.traits.tameness ?? 0;
    const size = individual.traits.size ?? 0.5;
    const selectivity = environment.factors.humanSelectivity;
    const sizePref = environment.factors.sizePreference;

    // Tameness is the primary trait humans select for
    const tameBonus = tameness * selectivity * 0.8;

    // Size preference (only kicks in later)
    const sizeMatch = 1 - Math.abs(size - sizePref);
    const sizeBonus = sizeMatch * selectivity * 0.2;

    // Base survival
    return Math.max(0.05, 0.3 + tameBonus + sizeBonus);
  }
}
