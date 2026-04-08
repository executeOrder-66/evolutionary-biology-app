import { describe, it, expect } from 'vitest';
import { scenarios } from '../scenarios';

describe('scenarios data integrity', () => {
  it('has 5 scenarios', () => {
    expect(scenarios).toHaveLength(5);
  });

  it('all scenarios have required fields', () => {
    for (const s of scenarios) {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.traits.length).toBeGreaterThan(0);
      expect(s.genetics).toBeDefined();
      expect(s.genetics.mutationRate).toBeGreaterThan(0);
      expect(s.genetics.recombinationRate).toBeGreaterThanOrEqual(0);
      expect(s.genetics.offspringPerReproduction).toBeGreaterThan(0);
      expect(s.parameters).toBeDefined();
      expect(s.parameters.maxGenerations).toBeGreaterThan(0);
    }
  });

  it('all scenarios are enabled', () => {
    for (const s of scenarios) {
      expect(s.enabled).toBe(true);
    }
  });

  it('no duplicate IDs', () => {
    const ids = scenarios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all scenarios have educational content with steps', () => {
    for (const s of scenarios) {
      expect(s.educationalContent).toBeDefined();
      expect(s.educationalContent.steps.length).toBeGreaterThan(0);
      expect(s.educationalContent.objectives.length).toBeGreaterThan(0);
      expect(s.educationalContent.background).toBeTruthy();

      for (const step of s.educationalContent.steps) {
        expect(step.triggerGeneration).toBeGreaterThanOrEqual(0);
        expect(step.title).toBeTruthy();
        expect(step.content).toBeTruthy();
      }
    }
  });

  it('parameters have valid ranges', () => {
    for (const s of scenarios) {
      const p = s.parameters;
      expect(p.minPopulationSize).toBeGreaterThan(0);
      expect(p.maxPopulationSize).toBeGreaterThanOrEqual(p.minPopulationSize);
      expect(p.maxGenerations).toBeGreaterThan(0);
      expect(p.updateInterval).toBeGreaterThan(0);
    }
  });
});
