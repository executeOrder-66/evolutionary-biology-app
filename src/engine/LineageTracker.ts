import type { Individual, LineageNode, LineageTree, LineageData } from '../types';

const ANCESTOR_COLORS = [
  '#e74c3c', // red
  '#f39c12', // orange
  '#8e44ad', // purple
  '#3498db', // blue
  '#2ecc71', // green
];

/** Names assigned by trait value rank (lowest → highest), per trait */
const ANCESTOR_PROFILES: Record<string, { name: string; description: string }[]> = {
  resistance: [
    { name: 'Tiny', description: 'Almost no protection' },
    { name: 'Scout', description: 'Weak protection' },
    { name: 'Patches', description: 'Some protection' },
    { name: 'Rusty', description: 'Good protection' },
    { name: 'Tank', description: 'Heavily armored' },
  ],
  coloration: [
    { name: 'Ghost', description: 'Very light wings' },
    { name: 'Pepper', description: 'Light speckled wings' },
    { name: 'Dusk', description: 'Medium-dark wings' },
    { name: 'Shadow', description: 'Dark wings' },
    { name: 'Soot', description: 'Nearly black wings' },
  ],
  tailSize: [
    { name: 'Stub', description: 'Tiny tail' },
    { name: 'Tuft', description: 'Small tail' },
    { name: 'Plume', description: 'Medium display' },
    { name: 'Fan', description: 'Large display' },
    { name: 'Crown', description: 'Extravagant display' },
  ],
  tameness: [
    { name: 'Fang', description: 'Wild and aggressive' },
    { name: 'Prowl', description: 'Wary of humans' },
    { name: 'Gray', description: 'Cautiously curious' },
    { name: 'Scout', description: 'Friendly approach' },
    { name: 'Buddy', description: 'Fully tame' },
  ],
  beakSize: [
    { name: 'Needle', description: 'Tiny insect beak' },
    { name: 'Finch', description: 'Small seed beak' },
    { name: 'Robin', description: 'Medium generalist' },
    { name: 'Grosbeak', description: 'Large seed cracker' },
    { name: 'Crusher', description: 'Massive nut cracker' },
  ],
};

const DEFAULT_PROFILES = [
  { name: 'Alpha', description: 'Very low trait' },
  { name: 'Beta', description: 'Low trait' },
  { name: 'Gamma', description: 'Medium trait' },
  { name: 'Delta', description: 'High trait' },
  { name: 'Omega', description: 'Very high trait' },
];

const NUM_ANCESTORS = 5;
const MAX_NODES_PER_GEN_PER_TREE = 40;

export class LineageTracker {
  private trees: Map<string, LineageTree> = new Map();
  private maxGeneration = 0;

  /**
   * Lightweight ancestry map: individualId → treeAncestorId.
   * This is NEVER pruned — it's the source of truth for which tree
   * an individual belongs to. Pruning only removes heavy display data
   * from tree.nodes, not this map.
   */
  private ancestry: Map<string, string> = new Map();

  initializeFromPopulation(
    individuals: Individual[],
    traitName: string
  ): void {
    this.trees.clear();
    this.ancestry.clear();
    this.maxGeneration = 0;

    const count = Math.min(NUM_ANCESTORS, individuals.length);
    const bandWidth = 1 / count;

    // Divide into resistance bands
    const bands: Individual[][] = Array.from({ length: count }, () => []);
    for (const ind of individuals) {
      const val = ind.traits[traitName] ?? 0;
      const bandIdx = Math.min(Math.floor(val / bandWidth), count - 1);
      bands[bandIdx].push(ind);
    }

    for (let i = 0; i < count; i++) {
      const band = bands[i];
      if (band.length === 0) continue;

      band.sort((a, b) => (a.traits[traitName] ?? 0) - (b.traits[traitName] ?? 0));
      const representative = band[Math.floor(band.length / 2)];
      const ancestorId = representative.id;
      const profiles = ANCESTOR_PROFILES[traitName] ?? DEFAULT_PROFILES;
      const profile = profiles[i % profiles.length];

      const nodes = new Map<string, LineageNode>();
      const genBucket: string[] = [];

      for (const ind of band) {
        const node: LineageNode = {
          id: ind.id,
          generation: ind.generation,
          parentIds: [],
          ancestorId,
          traits: { ...ind.traits },
          fitness: ind.fitness,
          childIds: [],
          alive: true,
          isTrackedAncestor: ind.id === ancestorId,
        };
        nodes.set(ind.id, node);
        genBucket.push(ind.id);
        this.ancestry.set(ind.id, ancestorId);
      }

      const genBuckets = new Map<number, string[]>();
      genBuckets.set(0, genBucket);

      const tree: LineageTree = {
        ancestorId,
        color: ANCESTOR_COLORS[i % ANCESTOR_COLORS.length],
        label: profile.name,
        description: profile.description,
        initialTrait: representative.traits[traitName] ?? 0,
        nodes,
        generationBuckets: genBuckets,
        extinctAtGeneration: null,
      };

      this.trees.set(ancestorId, tree);
    }
  }

  recordGeneration(
    _prevIndividuals: Individual[],
    newIndividuals: Individual[]
  ): void {
    const generation =
      newIndividuals.length > 0 ? newIndividuals[0].generation : this.maxGeneration + 1;
    this.maxGeneration = generation;

    // Count descendants per tree this generation (including those we won't
    // store as full nodes due to pruning). This gives accurate survival bars.
    const genCounts = new Map<string, number>();
    for (const tree of this.trees.values()) {
      genCounts.set(tree.ancestorId, 0);
    }

    for (const offspring of newIndividuals) {
      const parentId = offspring.parents[0];
      if (!parentId) continue;

      // Use the lightweight ancestry map — never pruned
      const ancestorId = this.ancestry.get(parentId);
      if (!ancestorId) continue;

      // Register this offspring in the ancestry map
      this.ancestry.set(offspring.id, ancestorId);
      genCounts.set(ancestorId, (genCounts.get(ancestorId) ?? 0) + 1);

      // Add full node data to the tree (may be pruned later for display)
      const tree = this.trees.get(ancestorId)!;
      const node: LineageNode = {
        id: offspring.id,
        generation,
        parentIds: [parentId],
        ancestorId,
        traits: { ...offspring.traits },
        fitness: offspring.fitness,
        childIds: [],
        alive: true,
        isTrackedAncestor: false,
      };

      tree.nodes.set(offspring.id, node);

      // Update parent's childIds (only if parent still exists in display nodes)
      const parentNode = tree.nodes.get(parentId);
      if (parentNode) {
        parentNode.childIds.push(offspring.id);
      }

      // Add to generation bucket
      const bucket = tree.generationBuckets.get(generation) ?? [];
      bucket.push(offspring.id);
      tree.generationBuckets.set(generation, bucket);
    }

    // Mark dead-ends from previous generation
    const prevGen = generation - 1;
    for (const tree of this.trees.values()) {
      const prevBucket = tree.generationBuckets.get(prevGen);
      if (!prevBucket) continue;

      for (const nodeId of prevBucket) {
        const node = tree.nodes.get(nodeId);
        if (node && node.childIds.length === 0) {
          node.alive = false;
        }
      }

      // Check extinction using accurate counts (not pruned bucket sizes)
      const currentCount = genCounts.get(tree.ancestorId) ?? 0;
      const prevCount = prevBucket.length;
      if (
        tree.extinctAtGeneration === null &&
        prevCount > 0 &&
        currentCount === 0
      ) {
        tree.extinctAtGeneration = generation;
      }
    }

    // Prune heavy display data (does NOT affect ancestry tracking)
    this.pruneDisplay(generation);

    // Clean up old ancestry entries to prevent unbounded memory growth.
    // We only need ancestry for the current generation's parents (i.e.,
    // the previous generation). Older entries can be safely removed.
    if (generation > 2) {
      this.cleanOldAncestry(generation - 2);
    }
  }

  /**
   * Remove display nodes that exceed per-generation-per-tree limits.
   * Only affects tree.nodes and generationBuckets — NEVER touches ancestry map.
   */
  private pruneDisplay(generation: number): void {
    for (const tree of this.trees.values()) {
      const bucket = tree.generationBuckets.get(generation);
      if (!bucket || bucket.length <= MAX_NODES_PER_GEN_PER_TREE) continue;

      const scored = bucket.map((id) => {
        const node = tree.nodes.get(id)!;
        return {
          id,
          score: (node.childIds.length > 0 ? 1000 : 0) + node.fitness,
        };
      });
      scored.sort((a, b) => b.score - a.score);

      const keep = new Set(
        scored.slice(0, MAX_NODES_PER_GEN_PER_TREE).map((s) => s.id)
      );

      // Remove excess nodes from display only
      const pruned = scored
        .slice(MAX_NODES_PER_GEN_PER_TREE)
        .map((s) => s.id);
      for (const id of pruned) {
        const node = tree.nodes.get(id);
        if (node) {
          for (const pid of node.parentIds) {
            const parent = tree.nodes.get(pid);
            if (parent) {
              parent.childIds = parent.childIds.filter((c) => c !== id);
            }
          }
          tree.nodes.delete(id);
          // DO NOT delete from this.ancestry — that's the tracking source of truth
        }
      }

      tree.generationBuckets.set(generation, [...keep]);
    }
  }

  /**
   * Remove ancestry entries for generations we no longer need.
   * We keep entries for the last 2 generations to ensure parent lookups work.
   */
  private cleanOldAncestry(beforeGeneration: number): void {
    // We can't easily tell which ancestry entries are from which generation
    // without storing that info. Instead, we keep all ancestry entries and
    // accept the memory cost (one Map entry per individual ever born).
    // For 50 generations × 500 individuals = 25,000 entries — trivial.
    // This method is a no-op placeholder for future optimization.
    void beforeGeneration;
  }

  getLineageData(): LineageData {
    return {
      trees: [...this.trees.values()],
      trackedAncestorIds: [...this.trees.keys()],
      maxGeneration: this.maxGeneration,
    };
  }

  getDescendantCounts(): Map<string, number> {
    const counts = new Map<string, number>();
    for (const tree of this.trees.values()) {
      const bucket = tree.generationBuckets.get(this.maxGeneration);
      counts.set(tree.ancestorId, bucket?.length ?? 0);
    }
    return counts;
  }

  reset(): void {
    this.trees.clear();
    this.ancestry.clear();
    this.maxGeneration = 0;
  }
}
