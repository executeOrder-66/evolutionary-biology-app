import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';
import type { LineageTree } from '../../types';

/** Hook to detect if user is on a small screen */
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

const ROW_HEIGHT = 48;
const NODE_RADIUS_MIN = 4;
const NODE_RADIUS_MAX = 9;
const MAX_VISIBLE_NODES_PER_GEN = 4;

interface LayoutNode {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  opacity: number;
  alive: boolean;
  isAncestor: boolean;
  fitness: number;
  traitValue: number;
  generation: number;
  childCount: number;
  treeName: string;
}

interface LayoutEdge {
  parentX: number;
  parentY: number;
  childX: number;
  childY: number;
  color: string;
  opacity: number;
}

export default function LineageTreeView() {
  const lineageData = useSimulationStore((s) => s.lineageData);
  const generation = useSimulationStore((s) => s.generation);
  const scenario = useSimulationStore((s) => s.scenario);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredTree, setHoveredTree] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<LayoutNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<LayoutNode | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const isMobile = useIsMobile();

  const traitName = scenario?.traits[0]?.name ?? '';

  // Detect horizontal overflow for scroll hint
  const checkOverflow = useCallback(() => {
    if (scrollRef.current) {
      setHasOverflow(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [checkOverflow, generation]);

  // Compute layout for all trees
  const { nodes, edges, svgWidth, svgHeight, laneWidth } = useMemo(() => {
    if (!lineageData || lineageData.trees.length === 0) {
      return { nodes: [], edges: [], svgWidth: 600, svgHeight: 200, laneWidth: 120 };
    }

    const allNodes: LayoutNode[] = [];
    const allEdges: LayoutEdge[] = [];
    const treeCount = lineageData.trees.length;
    const laneWidth = Math.max(140, 800 / treeCount);
    const totalWidth = laneWidth * treeCount;
    const totalHeight = (lineageData.maxGeneration + 1) * ROW_HEIGHT + 50;

    for (let treeIdx = 0; treeIdx < treeCount; treeIdx++) {
      const tree = lineageData.trees[treeIdx];
      const laneCenter = laneWidth * treeIdx + laneWidth / 2;
      const isDimmed =
        hoveredTree !== null && hoveredTree !== tree.ancestorId;

      layoutTree(
        tree,
        laneCenter,
        laneWidth * 0.85,
        lineageData.maxGeneration,
        traitName,
        isDimmed,
        allNodes,
        allEdges
      );
    }

    return {
      nodes: allNodes,
      edges: allEdges,
      svgWidth: totalWidth,
      svgHeight: totalHeight,
      laneWidth,
    };
  }, [lineageData, hoveredTree, traitName]);

  // Auto-scroll to bottom (current generation)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [generation]);

  if (!lineageData || lineageData.trees.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-300">
        Press Play to watch the family trees grow
      </div>
    );
  }

  // Mobile: simplified family summary view
  if (isMobile && lineageData) {
    return (
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Family Trees — Generation {generation}
        </h4>
        {lineageData.trees.map((tree) => {
          const bucket = tree.generationBuckets.get(lineageData.maxGeneration);
          const count = bucket?.length ?? 0;
          const isExtinct = tree.extinctAtGeneration !== null;
          let avgTrait = tree.initialTrait;
          if (bucket && bucket.length > 0) {
            let sum = 0;
            for (const id of bucket) {
              const node = tree.nodes.get(id);
              if (node) sum += node.traits[traitName] ?? 0;
            }
            avgTrait = sum / bucket.length;
          }
          return (
            <div
              key={tree.ancestorId}
              className={`rounded-xl border p-3 transition-opacity ${isExtinct ? 'opacity-50' : ''}`}
              style={{ borderColor: tree.color + '40', backgroundColor: tree.color + '08' }}
              onClick={() => setSelectedNode(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: tree.color }} />
                  <span className="text-sm font-bold" style={{ color: tree.color }}>{tree.label}</span>
                </div>
                {isExtinct ? (
                  <span className="rounded bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-[11px] font-bold text-red-500">
                    EXTINCT gen {tree.extinctAtGeneration}
                  </span>
                ) : (
                  <span className="text-sm font-bold" style={{ color: tree.color }}>{count} alive</span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {tree.description} · {Math.round(avgTrait * 100)}% resistant
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Family legend */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        {lineageData.trees.map((tree) => (
          <button
            key={tree.ancestorId}
            onMouseEnter={() => setHoveredTree(tree.ancestorId)}
            onMouseLeave={() => setHoveredTree(null)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all ${
              hoveredTree === tree.ancestorId
                ? 'shadow-md'
                : hoveredTree !== null
                  ? 'opacity-25'
                  : ''
            }`}
            style={{
              backgroundColor: tree.color + '15',
              borderColor: tree.color + '30',
              color: tree.color,
            }}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: tree.color }}
            />
            {tree.label}
            <span className="text-[11px] opacity-60">
              — {tree.description}
            </span>
            {tree.extinctAtGeneration !== null && (
              <span className="ml-1 rounded bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 text-[11px] font-bold text-gray-600 dark:text-gray-300">
                EXTINCT
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-2 px-1">
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Zoom out"
        >
          −
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums w-10 text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Zoom in"
        >
          +
        </button>
        {zoomLevel !== 1 && (
          <button
            onClick={() => setZoomLevel(1)}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* SVG tree area */}
      <div
        ref={scrollRef}
        className={`overflow-auto rounded-xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 scroll-hint-right ${hasOverflow ? 'has-overflow' : ''}`}
        style={{ maxHeight: 380 }}
        onWheel={(e) => {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setZoomLevel((z) => Math.min(3, Math.max(0.5, z - e.deltaY * 0.002)));
          }
        }}
        onScroll={() => {
          if (scrollRef.current) {
            const el = scrollRef.current;
            setHasOverflow(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
          }
        }}
      >
        <svg
          width={svgWidth * zoomLevel}
          height={svgHeight * zoomLevel}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ minHeight: Math.min(svgHeight * zoomLevel, 380) }}
        >
          {/* Generation labels */}
          {Array.from({ length: (lineageData.maxGeneration ?? 0) + 1 }, (_, g) => (
            <text
              key={g}
              x={8}
              y={g * ROW_HEIGHT + 28}
              className="fill-gray-500 dark:fill-gray-400"
              fontSize={11}
              fontWeight={500}
            >
              {g}
            </text>
          ))}

          {/* Lane dividers between family trees */}
          {lineageData.trees.length > 1 &&
            Array.from({ length: lineageData.trees.length - 1 }, (_, i) => (
              <line
                key={`div-${i}`}
                x1={(i + 1) * laneWidth}
                y1={0}
                x2={(i + 1) * laneWidth}
                y2={svgHeight}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            ))}

          {/* Antibiotic line at gen 10 */}
          {lineageData.maxGeneration >= 10 && (
            <>
              <line
                x1={0}
                y1={10 * ROW_HEIGHT + 20}
                x2={svgWidth}
                y2={10 * ROW_HEIGHT + 20}
                stroke="#ef4444"
                strokeWidth={1.5}
                strokeDasharray="6 3"
                strokeOpacity={0.5}
              />
              <text
                x={svgWidth - 6}
                y={10 * ROW_HEIGHT + 14}
                textAnchor="end"
                fontSize={11}
                fontWeight={600}
                fill="#ef4444"
                fillOpacity={0.6}
              >
                💊 Antibiotics
              </text>
            </>
          )}

          {/* Edges (behind nodes) */}
          {edges.map((e, i) => (
            <path
              key={`e-${i}`}
              d={`M ${e.parentX} ${e.parentY} C ${e.parentX} ${(e.parentY + e.childY) / 2}, ${e.childX} ${(e.parentY + e.childY) / 2}, ${e.childX} ${e.childY}`}
              fill="none"
              stroke={e.color}
              strokeWidth={1.2}
              strokeOpacity={e.opacity}
            />
          ))}

          {/* Nodes */}
          {nodes.map((n) => (
            <motion.circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.alive ? n.color : '#d1d5db'}
              fillOpacity={n.opacity}
              stroke={n.isAncestor ? n.color : 'none'}
              strokeWidth={n.isAncestor ? 2.5 : 0}
              initial={{ r: 0, fillOpacity: 0 }}
              animate={{ r: n.r, fillOpacity: n.opacity }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredNode(n)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(selectedNode?.id === n.id ? null : n)}
              style={{ cursor: 'pointer' }}
            />
          ))}

          {/* Dead-end markers removed — pruning artifacts created false
              dead-ends for thriving families. The survival bars show
              accurate descendant counts instead. */}

          {/* Ancestor labels */}
          {nodes
            .filter((n) => n.isAncestor)
            .map((n) => (
              <text
                key={`label-${n.id}`}
                x={n.x}
                y={n.y - NODE_RADIUS_MAX - 5}
                textAnchor="middle"
                fontSize={10}
                fontWeight={700}
                fill={n.color}
              >
                {n.treeName}
              </text>
            ))}
        </svg>

        {/* Tooltip overlay (hover on desktop, tap on mobile) */}
        {(hoveredNode || selectedNode) && (
          <div
            className="chart-tooltip z-50"
            style={{
              left: '50%',
              bottom: 8,
              transform: 'translateX(-50%)',
              position: 'absolute',
            }}
          >
            {(() => { const n = hoveredNode || selectedNode; if (!n) return null; return (<>
            <strong>{n.treeName}</strong> family &middot; Gen{' '}
            {n.generation}
            <br />
            Resistance: {Math.round(n.traitValue * 100)}% &middot;
            Survival chance: {Math.round(n.fitness * 100)}%
            {n.isAncestor && ' (Original ancestor)'}
            {!n.alive && n.childCount === 0
              ? ' · Died without children'
              : ` · ${n.childCount} children`}
            </>); })()}
          </div>
        )}
      </div>
    </div>
  );
}

/** Compute positions for nodes and edges in a single tree */
function layoutTree(
  tree: LineageTree,
  centerX: number,
  maxWidth: number,
  maxGeneration: number,
  traitName: string,
  isDimmed: boolean,
  outNodes: LayoutNode[],
  outEdges: LayoutEdge[]
): void {
  const baseOpacity = isDimmed ? 0.08 : 1;

  // Track which node IDs are visible so children can connect to them
  const visibleSet = new Set<string>();

  // Process each generation
  for (let gen = 0; gen <= maxGeneration; gen++) {
    const bucket = tree.generationBuckets.get(gen);
    if (!bucket || bucket.length === 0) continue;

    // Determine if the family is still alive in the NEXT generation.
    // We check the family's generation bucket, not individual childIds,
    // because data-level pruning can strip childIds from parents even
    // when the family actually has living descendants.
    const isCurrentGen = gen === maxGeneration;
    const nextBucket = tree.generationBuckets.get(gen + 1);
    const familyAliveNextGen = !!nextBucket && nextBucket.length > 0;

    // If the family has descendants next gen (or this is the latest gen),
    // show all nodes as alive/colored. Otherwise fall back to childIds check.
    const aliveIds = bucket.filter((id) => {
      const node = tree.nodes.get(id);
      if (!node) return false;
      if (isCurrentGen || node.isTrackedAncestor) return true;
      // Family has members next gen → this node is part of a living lineage
      if (familyAliveNextGen) return true;
      // Family might be dying this gen — only show nodes with actual children
      return node.childIds.length > 0;
    });

    // If no alive nodes, skip this generation entirely
    if (aliveIds.length === 0) continue;
    let visibleIds = aliveIds;

    // Limit visible count. Prioritize connected nodes (parent visible).
    if (visibleIds.length > MAX_VISIBLE_NODES_PER_GEN) {
      const scored = visibleIds.map((id) => {
        const node = tree.nodes.get(id);
        if (!node) return { id, score: -1 };
        const hasVisibleParent = node.parentIds.some((pid) => visibleSet.has(pid));
        return {
          id,
          score: (hasVisibleParent ? 10000 : 0) + node.fitness,
        };
      });
      scored.sort((a, b) => b.score - a.score);
      visibleIds = scored.slice(0, MAX_VISIBLE_NODES_PER_GEN).map((s) => s.id);
    }

    // Register visible nodes so children in future generations can connect
    for (const id of visibleIds) {
      visibleSet.add(id);
    }

    const count = visibleIds.length;
    const spacing = Math.min(maxWidth / Math.max(count, 1), 34);
    const startX = centerX - (count - 1) * spacing * 0.5;
    const y = gen * ROW_HEIGHT + 24;

    for (let i = 0; i < count; i++) {
      const nodeId = visibleIds[i];
      const node = tree.nodes.get(nodeId);
      if (!node) continue;

      const x = startX + i * spacing;
      const traitValue = node.traits[traitName] ?? 0;
      const r =
        NODE_RADIUS_MIN +
        (NODE_RADIUS_MAX - NODE_RADIUS_MIN) * node.fitness;
      // Use family-level liveness, not pruned childIds
      const alive = isCurrentGen || familyAliveNextGen || node.childIds.length > 0;

      const layoutNode: LayoutNode = {
        id: nodeId,
        x,
        y,
        r,
        color: tree.color,
        opacity: alive ? baseOpacity : baseOpacity * 0.3,
        alive,
        isAncestor: node.isTrackedAncestor,
        fitness: node.fitness,
        traitValue,
        generation: gen,
        childCount: node.childIds.length,
        treeName: tree.label,
      };
      outNodes.push(layoutNode);

      // Edges from parent to this node
      if (!node.isTrackedAncestor) {
        for (const parentId of node.parentIds) {
          const parentLayout = outNodes.find((n) => n.id === parentId);
          if (parentLayout) {
            outEdges.push({
              parentX: parentLayout.x,
              parentY: parentLayout.y,
              childX: x,
              childY: y,
              color: tree.color,
              opacity: alive ? baseOpacity * 0.4 : baseOpacity * 0.08,
            });
          }
        }
      }
    }
  }
}
