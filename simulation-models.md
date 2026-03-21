# Simulation Models

## Core Simulation Engine

### Base Simulation Class
All simulations inherit from a base class that provides:
- Population management
- Generation stepping
- Event handling
- State persistence

```typescript
abstract class BaseSimulation {
  protected population: Population;
  protected environment: Environment;
  protected generation: number = 0;
  protected running: boolean = false;

  abstract initialize(): void;
  abstract step(): void;
  abstract getStatistics(): SimulationStats;
  abstract reset(): void;
}
```

## Natural Selection Simulations

### 1. Antibiotic Resistance in Bacteria

#### Model Parameters
- **Population Size**: 100-1000 bacteria
- **Mutation Rate**: 0.001 (1 in 1000 chance per reproduction)
- **Resistance Levels**: 0-5 (ordinal scale)
- **Antibiotic Introduction**: Generation 10
- **Survival Rate**: 0.1 for non-resistant when antibiotics present

#### Simulation Logic
1. **Initialization**: Create initial population with random resistance levels
2. **Reproduction**: Each bacterium produces 2-4 offspring with possible mutations
3. **Selection**: Apply environmental pressure (antibiotics kill non-resistant)
4. **Visualization**: Tree diagram showing lineages, population chart for resistance frequency

#### Key Events
- Generation 10: "Antibiotics introduced to environment"
- Monitor resistance allele frequency over time
- Show extinction of non-resistant lineages

### 2. Lactose Tolerance in Humans

#### Model Parameters
- **Population Size**: 50-200 individuals
- **Mutation Rate**: 0.0001 (rare mutation)
- **Lactose Tolerance**: Boolean trait
- **Milk Introduction**: Generation 15 (agricultural revolution)
- **Fitness Advantage**: 1.2x reproduction for tolerant individuals post-milk

#### Simulation Logic
1. **Initialization**: Small population with lactose intolerant majority
2. **Cultural Change**: Introduction of dairy farming
3. **Selection**: Tolerant individuals have reproductive advantage
4. **Visualization**: Population pyramid showing trait frequency

### 3. Industrial Melanism (Peppered Moths)

#### Model Parameters
- **Population Size**: 200-500 moths
- **Color Morphs**: Light (0), Intermediate (1), Dark (2)
- **Pollution Level**: 0-10 scale
- **Predation Pressure**: Higher for mismatched colors
- **Mutation Rate**: 0.005

## Sexual Selection Simulations

### 1. Peacock Tail Development

#### Model Parameters
- **Population Size**: 50-100 peacocks/peahens
- **Tail Size**: 0-10 scale (fitness cost vs. mating advantage)
- **Mate Choice**: Females prefer larger tails
- **Survival Cost**: Larger tails reduce survival probability
- **Mutation Rate**: 0.01 for tail size

#### Simulation Logic
1. **Mating Season**: Females choose mates based on display traits
2. **Reproduction**: Selected males pass on exaggerated traits
3. **Survival**: Natural selection against extreme traits
4. **Equilibrium**: Balance between sexual and natural selection

#### Visualization
- Fitness landscape showing mate preference
- Agent-based simulation of courtship displays
- Timeline showing trait exaggeration over generations

### 2. Bird of Paradise Courtship

#### Model Parameters
- **Display Complexity**: 0-8 scale
- **Energy Cost**: Quadratic relationship with complexity
- **Female Preference**: Threshold-based selection
- **Population Size**: 30-80 birds

## Artificial Selection Simulations

### 1. Dog Domestication

#### Model Parameters
- **Starting Population**: Wolf-like ancestors
- **Selectable Traits**: Size, coat color, temperament, skull shape
- **Selection Pressure**: Human preferences (food, protection, companionship)
- **Generation Time**: 1-2 years
- **Mutation Rate**: 0.001 per trait

#### Simulation Logic
1. **Initial Population**: Wolf phenotypes
2. **Breeding Decisions**: Humans select for desired traits
3. **Genetic Variation**: Introduce mutations and recombination
4. **Divergence**: Different breeds develop different trait combinations

#### Visualization
- Comparison view: Wolf → Modern dog breeds
- Interactive timeline with historical breeding decisions
- Tree diagram showing breed relationships

### 2. Crop Domestication (Corn)

#### Model Parameters
- **Starting Plant**: Teosinte (wild ancestor)
- **Key Traits**: Ear size, kernel number, husk tightness
- **Selection Criteria**: Larger, easier-to-harvest ears
- **Generation Time**: 1 season
- **Population Size**: 100-500 plants

#### Simulation Logic
1. **Wild Population**: Small, scattered seeds
2. **Human Selection**: Choose largest ears for replanting
3. **Genetic Changes**: Mutations accumulate selected traits
4. **Domestication Syndrome**: Multiple correlated trait changes

## Common Simulation Components

### Genetics Engine
- **Inheritance**: Mendelian genetics with polygenic traits
- **Mutation**: Point mutations, insertions, deletions
- **Recombination**: Crossover during reproduction
- **Pleiotropy**: Single genes affecting multiple traits

### Environment Engine
- **Changing Conditions**: Gradual or sudden environmental shifts
- **Multiple Pressures**: Different selection forces simultaneously
- **Spatial Variation**: Different selection in different areas
- **Temporal Variation**: Seasonal or cyclical changes

### Statistics Tracking
- **Allele Frequencies**: Track genetic variation over time
- **Trait Distributions**: Mean, variance, extremes
- **Fitness Metrics**: Reproductive success, survival rates
- **Diversity Measures**: Genetic diversity, phenotypic variation

## Speciation and Divergence Simulations

### 1. Allopatric Speciation (Geographic Isolation)

#### Model Parameters
- **Initial Population**: Single ancestral population
- **Geographic Barrier**: Introduced at generation 20
- **Migration Rate**: 0.001 (very low after barrier)
- **Selection Pressures**: Different in each subpopulation
- **Genetic Drift**: Increased in small populations
- **Reproductive Isolation**: Develops gradually

#### Simulation Logic
1. **Initial Phase**: Single population with gene flow
2. **Barrier Introduction**: Population splits into two isolated groups
3. **Divergent Selection**: Different environmental pressures in each area
4. **Genetic Drift**: Random changes accumulate in isolation
5. **Reproductive Isolation**: Incompatibility develops over time

#### Visualization
- Split tree diagram showing divergence
- Geographic separation animation
- Trait divergence charts for each population
- Hybrid fitness visualization

### 2. Adaptive Radiation (Darwin's Finches)

#### Model Parameters
- **Starting Population**: Colonizing population on islands
- **Island Environments**: 4-6 different ecological niches
- **Resource Competition**: Different food sources available
- **Beak Morphology**: Heritable trait affecting feeding efficiency
- **Population Size**: Varies by island carrying capacity

#### Simulation Logic
1. **Colonization**: Small founding population arrives
2. **Ecological Release**: Multiple niches available
3. **Natural Selection**: Different beak shapes favored on different islands
4. **Speciation**: Populations diverge into distinct species
5. **Character Displacement**: Further divergence to reduce competition

#### Visualization
- Multi-island layout with separate populations
- Beak morphology distribution charts
- Food resource availability indicators
- Phylogenetic tree showing relationships

### 3. Sympatric Speciation (Host Race Formation)

#### Model Parameters
- **Host Plants**: Two different species with different defenses
- **Insect Population**: Single ancestral population
- **Host Preference**: Heritable trait
- **Performance Trade-offs**: Adaptation to one host reduces performance on other
- **Assortative Mating**: Preference for similar host-adapted mates

#### Simulation Logic
1. **Initial Generalist**: Population uses both host plants
2. **Host Specialization**: Mutations create host preferences
3. **Performance Trade-offs**: Specialists outperform generalists
4. **Reproductive Isolation**: Different host use leads to separate mating
5. **Complete Speciation**: Two distinct species emerge

#### Visualization
- Dual host plant environment
- Insect movement between hosts
- Performance curves for different host adaptations
- Mating preference networks

### 4. Ring Species and Gradual Divergence

#### Model Parameters
- **Geographic Distribution**: Circular arrangement of populations
- **Migration Pattern**: Adjacent populations can interbreed, distant cannot
- **Selection Gradient**: Environmental conditions change gradually around circle
- **Dispersal Distance**: Limited movement between adjacent areas

#### Simulation Logic
1. **Circular Distribution**: Populations arranged in a ring
2. **Gradual Change**: Environmental conditions vary continuously
3. **Local Adaptation**: Each population adapts to local conditions
4. **Accumulated Divergence**: Traits change gradually around the circle
5. **Terminal Incompatibility**: End populations cannot interbreed

#### Visualization
- Circular population arrangement
- Trait variation gradient around the circle
- Migration arrows between adjacent populations
- Reproductive compatibility matrix