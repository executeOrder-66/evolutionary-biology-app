import { create } from 'zustand';
import type {
  Scenario,
  SimulationStatus,
  GenerationSnapshot,
  Population,
  EnvironmentState,
  ContentStep,
  LineageData,
  BranchPoint,
} from '../types';
import { BaseSimulation } from '../engine/BaseSimulation';
import { AntibioticResistanceSimulation } from '../engine/AntibioticResistance';
import { PepperedMothSimulation } from '../engine/PepperedMoth';
import { PeacockTailSimulation } from '../engine/PeacockTail';
import { DogDomesticationSimulation } from '../engine/DogDomestication';
import { DarwinsFinchesSimulation } from '../engine/DarwinsFinches';
import { PredatorPreySimulation } from '../engine/PredatorPrey';
import { MimicrySimulation } from '../engine/Mimicry';
import { AntibioticCyclingSimulation } from '../engine/AntibioticCycling';
import { LineageTracker } from '../engine/LineageTracker';
import { useProgressStore } from './progressStore';

interface SimulationStore {
  // State
  scenario: Scenario | null;
  status: SimulationStatus;
  simulation: BaseSimulation | null;
  population: Population | null;
  environment: EnvironmentState | null;
  history: GenerationSnapshot[];
  generation: number;
  speed: number;
  intervalId: number | null;
  activeContentStep: ContentStep | null;

  // Lineage tracking
  lineageTracker: LineageTracker | null;
  lineageData: LineageData | null;

  // What-If branching
  branches: BranchPoint[];

  // Settings
  autoPauseAtMilestones: boolean;
  bookmarks: number[];

  // Actions
  setAutoPauseAtMilestones: (value: boolean) => void;
  toggleBookmark: (gen: number) => void;
  loadScenario: (scenario: Scenario) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  setSpeed: (speed: number) => void;
  saveBranch: (label: string, factorKey: string, oldValue: number, newValue: number) => void;
  revertToBranch: () => void;
  setEnvironmentFactor: (key: string, value: number) => void;
}

function createSimulation(scenario: Scenario): BaseSimulation {
  switch (scenario.id) {
    case 'antibiotic-resistance':
      return new AntibioticResistanceSimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    case 'peppered-moths':
      return new PepperedMothSimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    case 'peacock-tails':
      return new PeacockTailSimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    case 'dog-domestication':
      return new DogDomesticationSimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    case 'darwins-finches':
      return new DarwinsFinchesSimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    case 'predator-prey':
      return new PredatorPreySimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    case 'mimicry':
      return new MimicrySimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    case 'antibiotic-cycling':
      return new AntibioticCyclingSimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
    default:
      return new AntibioticResistanceSimulation(
        scenario.traits,
        scenario.genetics,
        scenario.parameters
      );
  }
}

function findActiveContentStep(
  scenario: Scenario,
  generation: number
): ContentStep | null {
  const steps = scenario.educationalContent.steps;
  let active: ContentStep | null = null;
  for (const step of steps) {
    if (generation >= step.triggerGeneration) {
      active = step;
    }
  }
  return active;
}

function initLineageTracker(
  sim: BaseSimulation,
  scenario: Scenario
): LineageTracker {
  const tracker = new LineageTracker();
  const traitName = scenario.traits[0]?.name ?? '';
  tracker.initializeFromPopulation(sim.getPopulation().individuals, traitName);
  return tracker;
}

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  scenario: null,
  status: 'idle',
  simulation: null,
  population: null,
  environment: null,
  history: [],
  generation: 0,
  speed: 1,
  intervalId: null,
  activeContentStep: null,
  lineageTracker: null,
  lineageData: null,
  branches: [],
  autoPauseAtMilestones: true,
  bookmarks: [],

  setAutoPauseAtMilestones: (value) => set({ autoPauseAtMilestones: value }),

  toggleBookmark: (gen) => {
    const { bookmarks } = get();
    if (bookmarks.includes(gen)) {
      set({ bookmarks: bookmarks.filter((b) => b !== gen) });
    } else {
      set({ bookmarks: [...bookmarks, gen].sort((a, b) => a - b) });
    }
  },

  loadScenario: (scenario) => {
    const { intervalId } = get();
    if (intervalId !== null) clearInterval(intervalId);

    const sim = createSimulation(scenario);
    const tracker = initLineageTracker(sim, scenario);

    set({
      scenario,
      simulation: sim,
      status: 'idle',
      population: sim.getPopulation(),
      environment: sim.getEnvironment(),
      history: sim.getHistory(),
      generation: 0,
      intervalId: null,
      activeContentStep: findActiveContentStep(scenario, 0),
      lineageTracker: tracker,
      lineageData: tracker.getLineageData(),
      branches: [],
    });
  },

  stepForward: () => {
    const { simulation, scenario, lineageTracker } = get();
    if (!simulation || !scenario) return;

    // Capture old population BEFORE step replaces it
    const prevIndividuals = simulation.getPopulation().individuals;

    simulation.step();

    // Record lineage from old → new
    if (lineageTracker) {
      lineageTracker.recordGeneration(
        prevIndividuals,
        simulation.getPopulation().individuals
      );
    }

    const gen = simulation.getGeneration();

    // Persist highest generation reached
    useProgressStore.getState().updateSimulationProgress(scenario.id, gen);

    set({
      population: simulation.getPopulation(),
      environment: simulation.getEnvironment(),
      history: [...simulation.getHistory()],
      generation: gen,
      status: simulation.isCompleted() ? 'completed' : get().status,
      activeContentStep: findActiveContentStep(scenario, gen),
      lineageData: lineageTracker?.getLineageData() ?? null,
    });

    if (simulation.isCompleted()) {
      const { intervalId } = get();
      if (intervalId !== null) clearInterval(intervalId);
      set({ intervalId: null, status: 'completed' });
    } else if (get().autoPauseAtMilestones && get().status === 'running') {
      // Auto-pause at educational milestones (#22)
      const isMilestone = scenario.educationalContent.steps.some(
        (s) => s.triggerGeneration === gen
      );
      if (isMilestone) {
        get().pause();
      }
    }
  },

  play: () => {
    const { simulation, intervalId: existingId } = get();
    if (!simulation || simulation.isCompleted()) return;
    if (existingId !== null) clearInterval(existingId);

    const { speed } = get();
    const interval = Math.max(80, 1000 / speed);

    const id = window.setInterval(() => {
      get().stepForward();
    }, interval);

    set({ status: 'running', intervalId: id });
  },

  pause: () => {
    const { intervalId } = get();
    if (intervalId !== null) clearInterval(intervalId);
    set({ status: 'paused', intervalId: null });
  },

  reset: () => {
    const { simulation, scenario, intervalId } = get();
    if (intervalId !== null) clearInterval(intervalId);
    if (!simulation || !scenario) return;

    simulation.reset();
    const tracker = initLineageTracker(simulation, scenario);

    set({
      status: 'idle',
      population: simulation.getPopulation(),
      environment: simulation.getEnvironment(),
      history: [...simulation.getHistory()],
      generation: 0,
      intervalId: null,
      activeContentStep: findActiveContentStep(scenario, 0),
      lineageTracker: tracker,
      lineageData: tracker.getLineageData(),
    });
  },

  setSpeed: (speed) => {
    const { status } = get();
    set({ speed });
    if (status === 'running') {
      get().pause();
      get().play();
    }
  },

  saveBranch: (label, factorKey, oldValue, newValue) => {
    const { generation, branches } = get();
    const branch: BranchPoint = {
      id: `branch-${Date.now()}`,
      generation,
      label,
      oldValue,
      newValue,
      factorKey,
    };
    set({ branches: [...branches, branch] });
  },

  revertToBranch: () => {
    get().reset();
    set({ branches: [] });
  },

  setEnvironmentFactor: (key, value) => {
    const { simulation, environment } = get();
    if (!simulation || !environment) return;
    const env = simulation.getEnvironment();
    env.factors[key] = value;
    set({ environment: { ...env } });
  },
}));
