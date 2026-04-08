import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A heavily simplified, deterministic visualization of natural selection.
 * 3 families, perfect binary splitting, antibiotics at gen 3.
 * Every node and edge is hand-computed — no simulation engine involved.
 */

// ─── Types ───

interface TreeNode {
  id: string;
  gen: number;
  x: number;
  y: number;
  alive: boolean;
  family: 'resistant' | 'partial' | 'vulnerable';
}

interface TreeEdge {
  parentX: number;
  parentY: number;
  childX: number;
  childY: number;
  alive: boolean;
  family: string;
}

// ─── Config ───

const FAMILIES = [
  {
    id: 'vulnerable' as const,
    label: 'No Protection',
    color: '#ef4444',
    dimColor: '#fca5a5',
    survivalAfterAB: 0, // 0% survive each gen after antibiotics
  },
  {
    id: 'partial' as const,
    label: 'Some Protection',
    color: '#f59e0b',
    dimColor: '#fcd34d',
    survivalAfterAB: 0.5, // 50% survive (1 of 2 children dies)
  },
  {
    id: 'resistant' as const,
    label: 'Strong Protection',
    color: '#22c55e',
    dimColor: '#86efac',
    survivalAfterAB: 1, // 100% survive
  },
];

const TOTAL_GENS = 6; // 0-based: gen 0 through gen 5
const AB_GEN = 3; // antibiotics introduced at gen 3
const ROW_H = 72;
const NODE_R = 12;
const LANE_GAP = 40; // gap between family lanes
const LANE_W = 280;
const SVG_W = LANE_W * 3 + LANE_GAP * 2 + 80; // lanes + gaps + label margin
const SVG_H = TOTAL_GENS * ROW_H + 40;

// ─── Build the deterministic tree ───

function buildTree(): { nodes: TreeNode[]; edges: TreeEdge[] } {
  const nodes: TreeNode[] = [];
  const edges: TreeEdge[] = [];

  for (let fi = 0; fi < FAMILIES.length; fi++) {
    const family = FAMILIES[fi];
    const laneCenter = 30 + fi * (LANE_W + LANE_GAP) + LANE_W / 2;

    // Track nodes per generation for this family
    // Each gen: array of { x, alive }
    let currentGen: { id: string; x: number; alive: boolean }[] = [];

    for (let gen = 0; gen < TOTAL_GENS; gen++) {
      const y = gen * ROW_H + 30;

      if (gen === 0) {
        // Single ancestor
        const node: TreeNode = {
          id: `${family.id}-0-0`,
          gen,
          x: laneCenter,
          y,
          alive: true,
          family: family.id,
        };
        nodes.push(node);
        currentGen = [{ id: node.id, x: laneCenter, alive: true }];
        continue;
      }

      // Each alive parent produces 2 children
      const nextGen: { id: string; x: number; alive: boolean }[] = [];
      const aliveParents = currentGen.filter((n) => n.alive);

      if (aliveParents.length === 0) {
        currentGen = [];
        continue;
      }

      // Calculate positions for children
      const totalChildren = aliveParents.length * 2;
      const spacing = Math.min(
        (LANE_W * 0.85) / Math.max(totalChildren, 1),
        32
      );
      const startX = laneCenter - ((totalChildren - 1) * spacing) / 2;

      let childIdx = 0;
      for (const parent of aliveParents) {
        for (let c = 0; c < 2; c++) {
          const cx = startX + childIdx * spacing;

          // Determine if this child survives
          let alive = true;
          if (gen >= AB_GEN) {
            if (family.survivalAfterAB === 0) {
              alive = false; // all die
            } else if (family.survivalAfterAB === 0.5) {
              alive = c === 0; // first child lives, second dies (deterministic 50%)
            }
            // survivalAfterAB === 1 → all live
          }

          const nodeId = `${family.id}-${gen}-${childIdx}`;
          nodes.push({
            id: nodeId,
            gen,
            x: cx,
            y,
            alive,
            family: family.id,
          });

          edges.push({
            parentX: parent.x,
            parentY: y - ROW_H,
            childX: cx,
            childY: y,
            alive,
            family: family.id,
          });

          nextGen.push({ id: nodeId, x: cx, alive });
          childIdx++;
        }
      }

      currentGen = nextGen;
    }
  }

  return { nodes, edges };
}

// ─── Component ───

export default function SimplifiedTree() {
  const [currentGen, setCurrentGen] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { nodes, edges } = useMemo(() => buildTree(), []);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = () => {
    setCurrentGen((g) => Math.min(g + 1, TOTAL_GENS - 1));
  };

  const playAll = () => {
    setCurrentGen(0);
    setPlaying(true);
  };

  // Auto-step when playing
  useEffect(() => {
    if (!playing || currentGen >= TOTAL_GENS - 1) return;
    timerRef.current = setTimeout(() => {
      advance();
    }, 1200);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, currentGen]);

  // Filter to visible generations
  const visibleNodes = nodes.filter((n) => n.gen <= currentGen);
  const visibleEdges = edges.filter(
    (e) => e.childY <= currentGen * ROW_H + 30
  );

  // Count alive per family at current gen
  const counts = FAMILIES.map((f) => ({
    ...f,
    alive: visibleNodes.filter(
      (n) => n.family === f.id && n.gen === currentGen && n.alive
    ).length,
    dead: visibleNodes.filter(
      (n) => n.family === f.id && n.gen === currentGen && !n.alive
    ).length,
  }));

  const antibioticsActive = currentGen >= AB_GEN;

  // Narrative text per generation
  const narratives = [
    'Each family starts with one bacterium. They look the same on the outside, but they have different levels of antibiotic resistance hidden in their genes.',
    'Each bacterium splits into two. All three families are growing equally — without antibiotics, resistance doesn\'t matter.',
    'The population doubles again. All families have 4 members now. Everything seems equal... but antibiotics are about to arrive.',
    '💊 Antibiotics are introduced! Non-resistant bacteria are killed immediately. The partially-resistant family loses half its members. The resistant family is completely unaffected.',
    'The pattern continues. Non-resistant bacteria can\'t reproduce (they\'re all dead). Partially-resistant ones keep losing half. Resistant ones keep doubling.',
    'Final generation. The non-resistant family is completely gone. The partially-resistant family is barely hanging on. The resistant family is thriving — this IS natural selection.',
  ];

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-gray-50 bg-gray-50/50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              How Natural Selection Works
            </h3>
            <p className="text-[11px] text-gray-400">
              Simplified view — 3 families, perfect splitting
            </p>
          </div>
          <div className="flex items-center gap-2">
            {antibioticsActive && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                Antibiotics Active
              </motion.span>
            )}
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              Gen {currentGen}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Family legend */}
        <div className="mb-4 flex flex-wrap gap-3">
          {counts.map((f) => (
            <div
              key={f.id}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-opacity ${
                f.alive === 0 && currentGen > 0 ? 'opacity-40' : ''
              }`}
              style={{
                borderColor: f.color + '40',
                backgroundColor: f.color + '10',
                color: f.color,
              }}
            >
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: f.color }}
              />
              {f.label}
              {currentGen > 0 && (
                <span className="text-[10px] opacity-60">
                  {f.alive > 0 ? `${f.alive} alive` : 'EXTINCT'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* SVG Tree */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-gray-50/50">
          <svg
            width={SVG_W}
            height={Math.min((currentGen + 1) * ROW_H + 20, SVG_H)}
            viewBox={`0 0 ${SVG_W} ${Math.min(
              (currentGen + 1) * ROW_H + 20,
              SVG_H
            )}`}
            className="w-full"
          >
            {/* Lane dividers */}
            {[1, 2].map((i) => {
              const divX = 30 + i * (LANE_W + LANE_GAP) - LANE_GAP / 2;
              return (
                <line
                  key={`div-${i}`}
                  x1={divX}
                  y1={0}
                  x2={divX}
                  y2={SVG_H}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Antibiotic line */}
            {antibioticsActive && (
              <>
                <line
                  x1={0}
                  y1={AB_GEN * ROW_H + 30}
                  x2={SVG_W}
                  y2={AB_GEN * ROW_H + 30}
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                  strokeOpacity={0.5}
                />
                <text
                  x={SVG_W + 12}
                  y={AB_GEN * ROW_H + 30 + 8 + 13}
                  textAnchor="end"
                  fontSize={13}
                  fontWeight={700}
                  fill="#ef4444"
                  fillOpacity={0.85}
                >
                  💊 Antibiotics
                </text>
              </>
            )}

            {/* Lane headers */}
            {FAMILIES.map((f, i) => (
              <text
                key={f.id}
                x={30 + i * (LANE_W + LANE_GAP) + LANE_W / 2}
                y={16}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill={f.color}
              >
                {f.label}
              </text>
            ))}

            {/* Edges */}
            {visibleEdges.map((e, i) => {
              const family = FAMILIES.find((f) => f.id === e.family)!;
              return (
                <motion.path
                  key={`e-${i}`}
                  d={`M ${e.parentX} ${e.parentY + NODE_R} C ${e.parentX} ${
                    (e.parentY + NODE_R + e.childY - NODE_R) / 2
                  }, ${e.childX} ${
                    (e.parentY + NODE_R + e.childY - NODE_R) / 2
                  }, ${e.childX} ${e.childY - NODE_R}`}
                  fill="none"
                  stroke={e.alive ? family.color : '#b0b0b0'}
                  strokeWidth={e.alive ? 1.5 : 1}
                  strokeOpacity={e.alive ? 0.5 : 0.35}
                  strokeDasharray={e.alive ? undefined : '4 3'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}

            {/* Nodes */}
            {visibleNodes.map((n) => {
              const family = FAMILIES.find((f) => f.id === n.family)!;
              return (
                <motion.g key={n.id}>
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={NODE_R}
                    fill={n.alive ? family.color : '#e5e7eb'}
                    stroke={n.alive ? family.color : '#d1d5db'}
                    strokeWidth={n.alive ? 0 : 1.5}
                    initial={{ r: 0, opacity: 0 }}
                    animate={{ r: NODE_R, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                  {/* Dead X marker */}
                  {!n.alive && (
                    <motion.text
                      x={n.x}
                      y={n.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={12}
                      fontWeight={700}
                      fill="#9ca3af"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      ✕
                    </motion.text>
                  )}
                  {/* Alive check */}
                  {n.alive && n.gen >= AB_GEN && (
                    <motion.text
                      x={n.x}
                      y={n.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={10}
                      fill="white"
                      fontWeight={700}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      ✓
                    </motion.text>
                  )}
                </motion.g>
              );
            })}

            {/* Gen labels */}
            {Array.from({ length: currentGen + 1 }, (_, g) => (
              <text
                key={`gen-${g}`}
                x={8}
                y={g * ROW_H + 34}
                fontSize={9}
                fill="#d1d5db"
                fontWeight={500}
              >
                {g}
              </text>
            ))}
          </svg>
        </div>

        {/* Narrative */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3"
          >
            <p className="text-[13px] leading-relaxed text-emerald-800">
              <span className="font-bold text-emerald-700">
                Generation {currentGen}:
              </span>{' '}
              {narratives[currentGen]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setPlaying(false);
              setCurrentGen(0);
            }}
            className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              setCurrentGen((g) => Math.max(0, g - 1));
            }}
            disabled={currentGen === 0}
            className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-25"
          >
            ← Prev
          </button>
          <button
            onClick={playing ? () => setPlaying(false) : playAll}
            className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
          >
            {playing ? 'Pause' : currentGen >= TOTAL_GENS - 1 ? 'Replay' : 'Play'}
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              advance();
            }}
            disabled={currentGen >= TOTAL_GENS - 1}
            className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-25"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
