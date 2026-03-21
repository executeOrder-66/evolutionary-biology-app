# Data Models and Schemas

## Core Data Structures

### Individual Entity
Represents a single organism in the simulation.

```typescript
interface Individual {
  // Unique identifier
  id: string;

  // Generation when this individual was born
  generation: number;

  // Parent identifiers (for pedigree tracking)
  parents: string[];

  // Genetic traits as key-value pairs
  // Keys are trait names, values are numeric expressions
  traits: Record<string, number>;

  // Fitness score (calculated based on environment and traits)
  fitness: number;

  // Current status
  status: 'alive' | 'dead' | 'extinct';

  // Age in generations
  age: number;

  // Optional: spatial position for agent-based simulations
  position?: {
    x: number;
    y: number;
  };

  // Optional: additional metadata
  metadata?: Record<string, any>;
}
```

### Population Entity
Represents a collection of individuals at a specific generation.

```typescript
interface Population {
  // All individuals in current population
  individuals: Individual[];

  // Generation number
  generation: number;

  // Total population size
  size: number;

  // Statistical summary
  statistics: PopulationStatistics;

  // Environmental conditions
  environment: EnvironmentState;
}
```

### Environment State
Represents the current environmental conditions affecting selection.

```typescript
interface EnvironmentState {
  // Environmental factors (temperature, resources, predators, etc.)
  factors: Record<string, number>;

  // Selection pressures currently active
  selectionPressures: SelectionPressure[];

  // Temporal information
  time: number; // Could be generation number or actual time

  // Spatial information (for complex environments)
  regions?: EnvironmentRegion[];
}
```

### Selection Pressure
Defines how natural/artificial/sexual selection operates.

```typescript
interface SelectionPressure {
  // Type of selection
  type: 'natural' | 'sexual' | 'artificial';

  // Strength of selection (0-1)
  strength: number;

  // Which traits are under selection
  targetTraits: string[];

  // How selection affects fitness
  fitnessFunction: (individual: Individual, environment: EnvironmentState) => number;

  // Optional: human preferences for artificial selection
  humanPreferences?: Record<string, number>;

  // Optional: mate choice criteria for sexual selection
  mateChoiceCriteria?: MateChoiceCriteria;
}
```

## Simulation Configuration

### Scenario Definition
Complete definition of a simulation scenario.

```typescript
interface Scenario {
  // Unique identifier
  id: string;

  // Display name
  name: string;

  // Description
  description: string;

  // Category
  category: 'natural' | 'sexual' | 'artificial';

  // Difficulty level
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  // Initial population setup
  initialPopulation: PopulationConfig;

  // Environmental setup
  initialEnvironment: EnvironmentConfig;

  // Selection pressures
  selectionPressures: SelectionPressure[];

  // Simulation parameters
  parameters: SimulationParameters;

  // Educational content
  content: EducationalContent;

  // Visualization preferences
  visualization: VisualizationConfig;
}
```

### Population Configuration
How to initialize the starting population.

```typescript
interface PopulationConfig {
  // Number of individuals
  size: number;

  // Trait definitions
  traits: TraitDefinition[];

  // Initial trait distributions
  initialDistributions: Record<string, Distribution>;

  // Genetic parameters
  genetics: GeneticsConfig;
}
```

### Trait Definition
Defines a heritable characteristic.

```typescript
interface TraitDefinition {
  // Trait name
  name: string;

  // Display name
  displayName: string;

  // Description
  description: string;

  // Value range
  min: number;
  max: number;

  // Units (optional)
  units?: string;

  // How trait affects fitness
  fitnessImpact?: (value: number, environment: EnvironmentState) => number;

  // Mutation parameters
  mutation: MutationConfig;

  // Inheritance pattern
  inheritance: InheritancePattern;
}
```

### Genetics Configuration
Parameters for genetic processes.

```typescript
interface GeneticsConfig {
  // Mutation rate per trait per generation
  mutationRate: number;

  // Recombination rate during reproduction
  recombinationRate: number;

  // Number of offspring per reproduction event
  offspringPerReproduction: number | Distribution;

  // Sex determination (if applicable)
  sexDetermination?: 'none' | 'XY' | 'ZW' | 'environmental';

  // Ploidy level
  ploidy: number;
}
```

## Visualization Data Structures

### Tree Node Data
For phylogenetic tree visualizations.

```typescript
interface TreeNode {
  // Individual ID
  id: string;

  // Parent node ID (null for root)
  parentId: string | null;

  // Child node IDs
  children: string[];

  // Position in tree layout
  x: number;
  y: number;

  // Visual properties
  color: string;
  size: number;

  // Individual data
  individual: Individual;

  // Branch length (evolutionary distance)
  branchLength: number;
}
```

### Chart Data
For population statistics and trends.

```typescript
interface ChartData {
  // Chart type
  type: 'line' | 'bar' | 'scatter' | 'histogram';

  // Data series
  series: DataSeries[];

  // Axis labels
  xAxis: AxisConfig;
  yAxis: AxisConfig;

  // Chart title
  title: string;

  // Additional configuration
  config: Record<string, any>;
}

interface DataSeries {
  // Series name
  name: string;

  // Data points
  data: DataPoint[];

  // Visual styling
  color: string;
  style: 'solid' | 'dashed' | 'dotted';
}

interface DataPoint {
  // X value (usually generation)
  x: number;

  // Y value (statistic)
  y: number;

  // Optional: error bars
  error?: {
    lower: number;
    upper: number;
  };
}
```

## Educational Content Structures

### Educational Content
Content associated with a scenario.

```typescript
interface EducationalContent {
  // Learning objectives
  objectives: string[];

  // Background information
  background: string;

  // Step-by-step explanation
  steps: ContentStep[];

  // Key concepts to highlight
  keyConcepts: KeyConcept[];

  // Quiz questions
  quiz: QuizQuestion[];

  // Additional resources
  resources: Resource[];
}
```

### Content Step
Explanation tied to simulation progress.

```typescript
interface ContentStep {
  // When to show this step (generation range or event)
  trigger: StepTrigger;

  // Step title
  title: string;

  // Main content
  content: string;

  // Visual highlights (elements to emphasize)
  highlights: Highlight[];

  // Optional: quiz question for this step
  quizQuestion?: QuizQuestion;
}
```

### Quiz Question
Interactive assessment.

```typescript
interface QuizQuestion {
  // Question text
  question: string;

  // Answer options
  options: string[];

  // Correct answer index
  correctAnswer: number;

  // Explanation for correct answer
  explanation: string;

  // Difficulty level
  difficulty: 'easy' | 'medium' | 'hard';
}
```

## Configuration and Settings

### User Preferences
User-customizable settings.

```typescript
interface UserPreferences {
  // UI preferences
  theme: 'light' | 'dark' | 'auto';
  language: string;
  fontSize: 'small' | 'medium' | 'large';

  // Simulation preferences
  defaultSpeed: number;
  autoAdvance: boolean;
  showStatistics: boolean;

  // Accessibility
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;

  // Privacy
  analyticsEnabled: boolean;
  dataExportEnabled: boolean;
}
```

### Simulation Parameters
Runtime parameters for simulations.

```typescript
interface SimulationParameters {
  // Maximum generations to run
  maxGenerations: number;

  // Population size limits
  minPopulationSize: number;
  maxPopulationSize: number;

  // Performance settings
  updateInterval: number; // milliseconds between updates
  maxConcurrentCalculations: number;

  // Random seed for reproducibility
  randomSeed?: number;
}
```

## API Response Schemas

### Simulation State Response
Current state of a running simulation.

```typescript
interface SimulationStateResponse {
  // Simulation metadata
  scenarioId: string;
  sessionId: string;
  startTime: Date;

  // Current state
  currentGeneration: number;
  isRunning: boolean;
  isPaused: boolean;

  // Population data
  population: Population;

  // Statistics
  statistics: SimulationStats;

  // Visualization data
  visualizationData: VisualizationData;

  // Next content step
  nextContentStep?: ContentStep;
}
```

### Simulation Statistics
Aggregated data about the simulation.

```typescript
interface SimulationStats {
  // Population metrics
  populationSize: number;
  averageFitness: number;
  fitnessVariance: number;

  // Trait statistics
  traitStats: Record<string, TraitStats>;

  // Selection metrics
  selectionDifferential: number;
  heritability: number;

  // Diversity metrics
  geneticDiversity: number;
  phenotypicDiversity: number;

  // Extinction/speciation events
  extinctionEvents: ExtinctionEvent[];
  speciationEvents: SpeciationEvent[];
}
```

### Trait Statistics
Statistics for individual traits.

```typescript
interface TraitStats {
  // Basic statistics
  mean: number;
  median: number;
  variance: number;
  min: number;
  max: number;

  // Distribution data
  histogram: HistogramBin[];

  // Change over time
  trend: 'increasing' | 'decreasing' | 'stable';

  // Selection information
  selectionCoefficient: number;
}
```

### Extinction Event
Records when a lineage or population goes extinct.

```typescript
interface ExtinctionEvent {
  // Generation when extinction occurred
  generation: number;

  // Type of extinction
  type: 'lineage' | 'population' | 'species';

  // Cause of extinction
  cause: 'environmental' | 'competition' | 'predation' | 'starvation' | 'genetic';

  // Population size at extinction
  finalPopulationSize: number;

  // Unique identifier of extinct entity
  entityId: string;

  // Description of the event
  description: string;
}
```

### Speciation Event
Records when new species emerge through divergence.

```typescript
interface SpeciationEvent {
  // Generation when speciation occurred
  generation: number;

  // Type of speciation
  type: 'allopatric' | 'sympatric' | 'parapatric' | 'peripatric';

  // Parent population(s)
  parentPopulations: string[];

  // New species identifiers
  daughterSpecies: string[];

  // Primary isolating mechanism
  isolatingMechanism: 'geographic' | 'ecological' | 'behavioral' | 'genetic' | 'temporal';

  // Key traits that diverged
  divergentTraits: string[];

  // Description of the speciation event
  description: string;
}
```

## Database Schemas (if needed)

### User Session
For tracking user progress and preferences.

```sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY,
  user_id UUID,
  scenario_id VARCHAR(255),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  completion_status VARCHAR(50),
  user_preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Simulation Snapshot
For saving simulation states.

```sql
CREATE TABLE simulation_snapshots (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES user_sessions(id),
  generation INTEGER,
  population_data JSONB,
  environment_data JSONB,
  statistics JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

These data models provide a comprehensive foundation for implementing the evolutionary biology simulation application, ensuring type safety, clear interfaces, and scalable architecture.