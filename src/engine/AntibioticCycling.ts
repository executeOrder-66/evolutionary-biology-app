import type {
  Individual,
  EnvironmentState,
  TraitDefinition,
  GeneticsConfig,
  SimulationParameters,
} from '../types';
import { BaseSimulation } from './BaseSimulation';

export class AntibioticCyclingSimulation extends BaseSimulation {
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
        antibioticA: 0,
        antibioticB: 0,
      },
      selectionPressures: [
        {
          type: 'natural',
          strength: 0,
          targetTraits: ['resistanceA', 'resistanceB'],
          description: 'No antibiotics active — bacteria grow freely',
        },
      ],
      time: 0,
    };
  }

  protected updateEnvironment(generation: number): void {
    this.environment.time = generation;

    let antibioticA = 0;
    let antibioticB = 0;

    // Antibiotic A: gens 5-15, then again 35-45
    if ((generation >= 5 && generation <= 15) || (generation >= 35 && generation <= 45)) {
      const gensSinceStart = generation >= 35 ? generation - 35 : generation - 5;
      antibioticA = Math.min(0.55, gensSinceStart * 0.1);
    }

    // Antibiotic B: gens 20-30
    if (generation >= 20 && generation <= 30) {
      const gensSinceStart = generation - 20;
      antibioticB = Math.min(0.55, gensSinceStart * 0.1);
    }

    this.environment.factors.antibioticA = antibioticA;
    this.environment.factors.antibioticB = antibioticB;

    let description: string;
    if (antibioticA > 0 && antibioticB === 0) {
      description = `Antibiotic A active (${(antibioticA * 100).toFixed(0)}% strength)`;
    } else if (antibioticB > 0 && antibioticA === 0) {
      description = `Antibiotic B active (${(antibioticB * 100).toFixed(0)}% strength)`;
    } else if (antibioticA > 0 && antibioticB > 0) {
      description = `Both antibiotics active`;
    } else {
      description = 'No antibiotics — recovery window';
    }

    this.environment.selectionPressures = [
      {
        type: 'natural',
        strength: Math.max(antibioticA, antibioticB),
        targetTraits: ['resistanceA', 'resistanceB'],
        description,
      },
    ];
  }

  protected applySurvival(): void {
    const aActive = this.environment.factors.antibioticA > 0;
    const bActive = this.environment.factors.antibioticB > 0;
    if (!aActive && !bActive) return;

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
    const resistanceA = individual.traits.resistanceA ?? 0;
    const resistanceB = individual.traits.resistanceB ?? 0;
    const antibioticA = environment.factors.antibioticA;
    const antibioticB = environment.factors.antibioticB;

    // Cost of maintaining dual resistance
    const dualResistanceCost = resistanceA * resistanceB * 0.15;

    if (antibioticA === 0 && antibioticB === 0) {
      // No antibiotics: slight cost to high resistance
      return Math.max(0.1, 1.0 - (resistanceA * 0.05 + resistanceB * 0.05) - dualResistanceCost);
    }

    // Calculate survival against active antibiotics
    let fitness = 1.0;

    if (antibioticA > 0) {
      const gapA = resistanceA - antibioticA;
      if (gapA >= 0) {
        fitness *= 0.7 + 0.3 * Math.min(gapA / 0.3, 1);
      } else {
        const deficit = -gapA;
        fitness *= Math.max(0.002, 0.1 * Math.pow(1 - deficit, 4));
      }
    }

    if (antibioticB > 0) {
      const gapB = resistanceB - antibioticB;
      if (gapB >= 0) {
        fitness *= 0.7 + 0.3 * Math.min(gapB / 0.3, 1);
      } else {
        const deficit = -gapB;
        fitness *= Math.max(0.002, 0.1 * Math.pow(1 - deficit, 4));
      }
    }

    // Apply dual resistance cost
    fitness -= dualResistanceCost;

    return Math.max(0.002, fitness);
  }
}
