// Core data structures for evolutionary biology simulations

export interface Individual {
  id: string;
  generation: number;
  parents: string[];
  traits: Record<string, number>;
  fitness: number;
  status: 'alive' | 'dead' | 'extinct';
  age: number;
  position?: { x: number; y: number };
  metadata?: Record<string, unknown>;
}

export interface PopulationStatistics {
  meanFitness: number;
  fitnessVariance: number;
  traitMeans: Record<string, number>;
  traitVariances: Record<string, number>;
  size: number;
}

export interface Population {
  individuals: Individual[];
  generation: number;
  size: number;
  statistics: PopulationStatistics;
}

export interface EnvironmentState {
  factors: Record<string, number>;
  selectionPressures: SelectionPressure[];
  time: number;
}

export interface SelectionPressure {
  type: 'natural' | 'sexual' | 'artificial';
  strength: number;
  targetTraits: string[];
  description: string;
}

export interface TraitDefinition {
  name: string;
  displayName: string;
  description: string;
  min: number;
  max: number;
  units?: string;
  mutationRate: number;
  mutationMagnitude: number;
}

export interface GeneticsConfig {
  mutationRate: number;
  recombinationRate: number;
  offspringPerReproduction: number;
}

export interface SimulationParameters {
  maxGenerations: number;
  minPopulationSize: number;
  maxPopulationSize: number;
  updateInterval: number;
  randomSeed?: number;
}

export interface EducationalContent {
  objectives: string[];
  background: string;
  steps: ContentStep[];
  keyConcepts: KeyConcept[];
}

export interface ContentStep {
  triggerGeneration: number;
  title: string;
  content: string;
}

export interface KeyConcept {
  term: string;
  definition: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: 'natural' | 'sexual' | 'artificial' | 'speciation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  enabled: boolean;
  parameters: SimulationParameters;
  genetics: GeneticsConfig;
  traits: TraitDefinition[];
  educationalContent: EducationalContent;
}

export interface GenerationSnapshot {
  generation: number;
  populationSize: number;
  traitMeans: Record<string, number>;
  traitVariances: Record<string, number>;
  meanFitness: number;
}

export type SimulationStatus = 'idle' | 'running' | 'paused' | 'completed';

// ─── Lineage Tracking ───

export interface LineageNode {
  id: string;
  generation: number;
  parentIds: string[];
  ancestorId: string;
  traits: Record<string, number>;
  fitness: number;
  childIds: string[];
  alive: boolean; // had at least one offspring
  isTrackedAncestor: boolean;
}

export interface LineageTree {
  ancestorId: string;
  color: string;
  label: string; // e.g. "Tank"
  description: string; // e.g. "Heavily armored"
  initialTrait: number; // 0–1, the ancestor's starting trait value
  nodes: Map<string, LineageNode>;
  generationBuckets: Map<number, string[]>;
  extinctAtGeneration: number | null;
}

export interface LineageData {
  trees: LineageTree[];
  trackedAncestorIds: string[];
  maxGeneration: number;
}
