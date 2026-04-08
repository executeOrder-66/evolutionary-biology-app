import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useSimulationStore } from '../simulationStore';
import { scenarios } from '../../data/scenarios';
import { resetIdCounter } from '../../engine/BaseSimulation';

const testScenario = scenarios[0]; // antibiotic-resistance

describe('simulationStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetIdCounter();
    // Reset store to initial state
    useSimulationStore.setState({
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
    });
  });

  afterEach(() => {
    // Clean up any running intervals
    const { intervalId } = useSimulationStore.getState();
    if (intervalId !== null) clearInterval(intervalId);
    vi.useRealTimers();
  });

  it('loadScenario sets state correctly', () => {
    useSimulationStore.getState().loadScenario(testScenario);
    const state = useSimulationStore.getState();

    expect(state.scenario).toBe(testScenario);
    expect(state.status).toBe('idle');
    expect(state.generation).toBe(0);
    expect(state.simulation).not.toBeNull();
    expect(state.population).not.toBeNull();
    expect(state.environment).not.toBeNull();
    expect(state.history.length).toBeGreaterThan(0);
    expect(state.intervalId).toBeNull();
  });

  it('stepForward increments generation', () => {
    useSimulationStore.getState().loadScenario(testScenario);
    useSimulationStore.getState().stepForward();
    expect(useSimulationStore.getState().generation).toBe(1);

    useSimulationStore.getState().stepForward();
    expect(useSimulationStore.getState().generation).toBe(2);
  });

  it('play sets status to running', () => {
    useSimulationStore.getState().loadScenario(testScenario);
    useSimulationStore.getState().play();
    expect(useSimulationStore.getState().status).toBe('running');
    expect(useSimulationStore.getState().intervalId).not.toBeNull();
  });

  it('pause sets status to paused', () => {
    useSimulationStore.getState().loadScenario(testScenario);
    useSimulationStore.getState().play();
    useSimulationStore.getState().pause();
    expect(useSimulationStore.getState().status).toBe('paused');
    expect(useSimulationStore.getState().intervalId).toBeNull();
  });

  it('reset returns to generation 0', () => {
    useSimulationStore.getState().loadScenario(testScenario);
    useSimulationStore.getState().stepForward();
    useSimulationStore.getState().stepForward();
    expect(useSimulationStore.getState().generation).toBe(2);

    useSimulationStore.getState().reset();
    const state = useSimulationStore.getState();
    expect(state.generation).toBe(0);
    expect(state.status).toBe('idle');
    expect(state.intervalId).toBeNull();
    expect(state.history.length).toBe(1); // just the initial snapshot
  });

  it('setSpeed updates speed', () => {
    useSimulationStore.getState().loadScenario(testScenario);
    useSimulationStore.getState().setSpeed(5);
    expect(useSimulationStore.getState().speed).toBe(5);
  });

  it('completes after maxGenerations', () => {
    useSimulationStore.getState().loadScenario(testScenario);
    const maxGen = testScenario.parameters.maxGenerations;

    for (let i = 0; i < maxGen; i++) {
      useSimulationStore.getState().stepForward();
    }

    expect(useSimulationStore.getState().generation).toBe(maxGen);
    expect(useSimulationStore.getState().status).toBe('completed');
  });
});
