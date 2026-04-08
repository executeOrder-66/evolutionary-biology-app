import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizCheckpoint from './QuizCheckpoint';
import type { QuizQuestion } from './QuizCheckpoint';
import { useStoryKeyboard } from '../../hooks/useStoryKeyboard';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useVoiceover } from '../../hooks/useVoiceover';

// ─── Generic node interface ───

export interface StoryNode {
  id: string;
  gen: number;
  parentId: string | null;
  /** The trait value key (e.g. 'medium', 'spotted', 'large', 'friendly') */
  trait: string;
  alive: boolean;
  mutationEvent?: boolean;
  deathCause?: string;
}

export interface LegendItem {
  key: string;
  label: string;
}

export interface SummaryItem {
  label: string;
  count: number;
  color: string;
  max: number;
  extinct?: boolean;
}

export interface HighlightConfig {
  /** Step index at which this highlight appears */
  atStep: number;
  /** Node IDs to compute bounding box from. Uses phase 1 layout if atStep <= 4, else phase 2 */
  nodeIds: string[];
}

export interface EventLineConfig {
  /** Generation within phase 2 when the event line appears */
  p2Gen: number;
  /** Label text shown on the event line */
  label: string;
  /** Stroke/text color for the line */
  color: string;
}

export interface ThemeConfig {
  /** Play button bg class, e.g. 'bg-emerald-500' */
  playBtnBg: string;
  /** Play button hover class */
  playBtnHover: string;
  /** Narrative box border class */
  narrativeBorder: string;
  /** Narrative box bg class */
  narrativeBg: string;
  /** Narrative text color class */
  narrativeText: string;
  /** Narrative bold color class */
  narrativeBold: string;
  /** SVG container background color */
  svgBg: string;
  /** Highlight stroke color */
  highlightColor: string;
  /** Mute/voice button bg class */
  toolBtnBg: string;
  /** Mute/voice button hover class */
  toolBtnHover: string;
  /** Mute/voice button text class */
  toolBtnText: string;
  /** Step counter bg/text classes */
  stepBg: string;
  stepText: string;
  /** Quiz theme color name */
  quizTheme: string;
}

export interface StoryConfig {
  /** Title shown in the card header */
  title: string;
  /** Phase subtitles: [phase1, phase2, phase3] */
  phaseLabels: [string, string, string];
  /** SVG aria-label prefix (e.g. "Bacteria family tree") */
  ariaPrefix: string;
  /** Summary chart title */
  summaryTitle: string;

  /** Map from trait key → display color */
  traitColors: Record<string, string>;
  /** Map from trait key → in-node label (e.g. 'M', 'S', '') */
  traitLabels: Record<string, string>;
  /** Legend items (ordered) */
  legend: LegendItem[];

  /** Phase tree builders */
  buildPhase1: () => StoryNode[];
  buildPhase2: () => StoryNode[];
  buildPhase3: () => StoryNode[];

  /** Highlight configs for transition steps */
  highlights: HighlightConfig[];

  /** Event line (antibiotics / pollution / mating / humans) */
  eventLine: EventLineConfig;
  /** Optional: event badge shown in header when event is active */
  eventBadge?: { label: string; className: string; dotClassName: string };

  /** Whether the SVG bg changes when the event is active */
  svgBgWhenActive?: string;

  /** Narratives for all 17 steps */
  narratives: { title: string; text: string }[];
  /** Quiz checkpoints */
  quizzes: QuizQuestion[];
  /** Summary bar chart data */
  summary: SummaryItem[];

  /** Sound effect mapping: step → sound name. Unmatched steps get 'tick' */
  soundMap: Record<number, 'mutation' | 'alert' | 'complete'>;

  /** Per-node rendering overrides */
  nodeColor: (node: StoryNode) => string;
  nodeStroke: (node: StoryNode) => string;
  nodeLabelColor: (node: StoryNode) => string;
  nodeStrokeWidth: (node: StoryNode) => number;
  edgeColor: (node: StoryNode) => string;
  deadTextColor: (node: StoryNode) => string;
  nodeAriaLabel: (node: StoryNode) => string;

  /** Theme colors */
  theme: ThemeConfig;
}

// ─── Constants ───

const SVG_W = 720;
const ROW_H = 72;
const NODE_R = 11;
const TOTAL_STEPS = 17;
const AUTO_MS = 2500;
const FIXED_SVG_H = 7 * ROW_H + 20;

// ─── Tree layout ───

function computeTreeLayout(nodes: StoryNode[], svgWidth: number): Map<string, number> {
  const positions = new Map<string, number>();
  if (nodes.length === 0) return positions;

  const margin = 35;
  const usable = svgWidth - 2 * margin;

  const childMap = new Map<string, string[]>();
  for (const node of nodes) {
    if (node.parentId) {
      const list = childMap.get(node.parentId) ?? [];
      list.push(node.id);
      childMap.set(node.parentId, list);
    }
  }

  function countLeaves(id: string): number {
    const ch = childMap.get(id);
    if (!ch || ch.length === 0) return 1;
    return ch.reduce((s, c) => s + countLeaves(c), 0);
  }

  const root = nodes.find((n) => n.parentId === null)!;
  const totalLeaves = countLeaves(root.id);
  const leafW = usable / totalLeaves;

  function layout(id: string, leftLeafIdx: number) {
    const ch = childMap.get(id);
    if (!ch || ch.length === 0) {
      positions.set(id, margin + (leftLeafIdx + 0.5) * leafW);
      return;
    }
    let cursor = leftLeafIdx;
    for (const cid of ch) {
      layout(cid, cursor);
      cursor += countLeaves(cid);
    }
    const childXs = ch.map((c) => positions.get(c)!);
    positions.set(id, (Math.min(...childXs) + Math.max(...childXs)) / 2);
  }

  layout(root.id, 0);
  return positions;
}

// ─── Component ───

export default function NarrativeStoryShell({ config }: { config: StoryConfig }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeHandlers = useStoryKeyboard(step, setStep, TOTAL_STEPS, playing, setPlaying);
  const { play: playSound, toggleMute } = useSoundEffects();
  const { speak, toggleVoice } = useVoiceover();

  const prevStep = useRef(0);
  useEffect(() => {
    if (step === prevStep.current) return;
    prevStep.current = step;
    const sound = config.soundMap[step] ?? 'tick';
    playSound(sound);
    speak(`${config.narratives[step].title}. ${config.narratives[step].text}`);
  }, [step, playSound, speak, config]);

  // Build data
  const p1Nodes = useMemo(() => config.buildPhase1(), [config]);
  const p2Nodes = useMemo(() => config.buildPhase2(), [config]);
  const p3Nodes = useMemo(() => config.buildPhase3(), [config]);
  const p1Layout = useMemo(() => computeTreeLayout(p1Nodes, SVG_W), [p1Nodes]);
  const p2Layout = useMemo(() => computeTreeLayout(p2Nodes, SVG_W), [p2Nodes]);
  const p3Layout = useMemo(() => computeTreeLayout(p3Nodes, SVG_W), [p3Nodes]);

  // Derived state
  const phase: 1 | 2 | 3 = step <= 4 ? 1 : step <= 11 ? 2 : 3;
  const maxGen =
    phase === 1 ? Math.min(step, 3) :
    phase === 2 ? Math.min(step - 4, 6) :
    Math.min(step - 10, 5);
  const eventActive = (phase === 2 && maxGen >= config.eventLine.p2Gen) || phase === 3;

  const currentNodes = phase === 1 ? p1Nodes : phase === 2 ? p2Nodes : p3Nodes;
  const currentLayout = phase === 1 ? p1Layout : phase === 2 ? p2Layout : p3Layout;

  const visibleNodes = useMemo(
    () => currentNodes.filter((n) => n.gen <= maxGen),
    [currentNodes, maxGen],
  );

  const visibleEdges = useMemo(() => {
    const ids = new Set(visibleNodes.map((n) => n.id));
    return visibleNodes.filter((n) => n.parentId && ids.has(n.parentId));
  }, [visibleNodes]);

  const activeLevels = useMemo(() => {
    const set = new Set(visibleNodes.map((n) => n.trait));
    return config.legend.filter((l) => set.has(l.key));
  }, [visibleNodes, config.legend]);

  // Auto-play
  useEffect(() => {
    if (!playing || step >= TOTAL_STEPS - 1) {
      if (playing && step >= TOTAL_STEPS - 1) setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setStep((s) => s + 1), AUTO_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step]);

  // Highlight
  const highlight = useMemo(() => {
    for (const h of config.highlights) {
      if (step !== h.atStep) continue;
      const layoutMap = h.atStep <= 4 ? p1Layout : p2Layout;
      const nodeList = h.atStep <= 4 ? p1Nodes : p2Nodes;
      const pts = h.nodeIds.map((id) => ({
        x: layoutMap.get(id)!,
        y: nodeList.find((n) => n.id === id)!.gen * ROW_H + 30,
      }));
      return {
        x: Math.min(...pts.map((p) => p.x)) - 24,
        y: Math.min(...pts.map((p) => p.y)) - 20,
        w: Math.max(...pts.map((p) => p.x)) - Math.min(...pts.map((p) => p.x)) + 48,
        h: Math.max(...pts.map((p) => p.y)) - Math.min(...pts.map((p) => p.y)) + 40,
      };
    }
    return null;
  }, [step, config.highlights, p1Layout, p1Nodes, p2Layout, p2Nodes]);

  const { theme } = config;
  const svgBg = eventActive && config.svgBgWhenActive ? config.svgBgWhenActive : theme.svgBg;

  return (
    <div className="card overflow-hidden" {...swipeHandlers}>
      {/* ── Header ── */}
      <div className="border-b border-gray-50 bg-gray-50/50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">{config.title}</h3>
            <p className="text-[11px] text-gray-400">
              Guided walkthrough &middot; {config.phaseLabels[phase - 1]}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {eventActive && config.eventBadge && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={config.eventBadge.className}
              >
                <span className={config.eventBadge.dotClassName} />
                {config.eventBadge.label}
              </motion.span>
            )}
            <button
              onClick={() => setSoundOn(toggleMute())}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors ${theme.toolBtnBg} ${theme.toolBtnText} hover:${theme.toolBtnHover}`}
              title={soundOn ? 'Mute sounds' : 'Unmute sounds'}
              aria-label={soundOn ? 'Mute sounds' : 'Unmute sounds'}
            >
              {soundOn ? '🔊' : '🔇'}
            </button>
            <button
              onClick={() => setVoiceOn(toggleVoice())}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors ${theme.toolBtnBg} ${theme.toolBtnText} hover:${theme.toolBtnHover}`}
              title={voiceOn ? 'Turn off narration' : 'Turn on narration'}
              aria-label={voiceOn ? 'Turn off narration' : 'Turn on narration'}
            >
              {voiceOn ? '🎙️' : '🎙'}
            </button>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.stepBg} ${theme.stepText}`}>
              Step {step + 1}/{TOTAL_STEPS}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* ── Legend ── */}
        <div className="mb-4 flex flex-wrap gap-2">
          {activeLevels.map((l) => (
            <div
              key={l.key}
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
              style={{
                borderColor: (config.traitColors[l.key] ?? '#999') + '40',
                backgroundColor: (config.traitColors[l.key] ?? '#999') + '15',
                color: config.traitColors[l.key] ?? '#999',
              }}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: config.traitColors[l.key] ?? '#999' }}
              />
              {l.label}
            </div>
          ))}
          {visibleNodes.some((n) => !n.alive) && (
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-400">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-200" />
              Dead
            </div>
          )}
        </div>

        {/* ── SVG Tree ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`phase${phase}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-x-auto rounded-xl border border-gray-100"
            style={{ backgroundColor: svgBg, transition: 'background-color 0.8s ease' }}
          >
            <svg
              width={SVG_W}
              height={FIXED_SVG_H}
              viewBox={`0 0 ${SVG_W} ${FIXED_SVG_H}`}
              className="w-full"
              role="img"
              aria-label={`${config.ariaPrefix} — step ${step + 1} of ${TOTAL_STEPS}. ${config.narratives[step].title}`}
            >
              {/* Event line (Phase 2) */}
              {phase === 2 && maxGen >= config.eventLine.p2Gen && (
                <>
                  <line
                    x1={0}
                    y1={(config.eventLine.p2Gen - 0.5) * ROW_H + 30}
                    x2={SVG_W}
                    y2={(config.eventLine.p2Gen - 0.5) * ROW_H + 30}
                    stroke={config.eventLine.color}
                    strokeWidth={1.5}
                    strokeDasharray="6 3"
                    strokeOpacity={0.5}
                  />
                  <text
                    x={SVG_W - 8}
                    y={(config.eventLine.p2Gen - 0.5) * ROW_H + 30 - 6}
                    textAnchor="end"
                    fontSize={11}
                    fontWeight={700}
                    fill={config.eventLine.color}
                    fillOpacity={0.8}
                  >
                    {config.eventLine.label}
                  </text>
                </>
              )}

              {/* Gen row labels */}
              {Array.from({ length: maxGen + 1 }, (_, g) => (
                <text
                  key={`g-${g}`}
                  x={12}
                  y={g * ROW_H + 34}
                  fontSize={9}
                  fill="#d1d5db"
                  fontWeight={500}
                >
                  {g}
                </text>
              ))}

              {/* Edges */}
              {visibleEdges.map((node) => {
                const px = currentLayout.get(node.parentId!)!;
                const py = currentNodes.find((nn) => nn.id === node.parentId)!.gen * ROW_H + 30;
                const cx = currentLayout.get(node.id)!;
                const cy = node.gen * ROW_H + 30;
                const midY = (py + cy) / 2;
                return (
                  <motion.path
                    key={`e-${node.id}`}
                    d={`M ${px} ${py + NODE_R} C ${px} ${midY}, ${cx} ${midY}, ${cx} ${cy - NODE_R}`}
                    fill="none"
                    stroke={config.edgeColor(node)}
                    strokeWidth={node.alive ? 1.5 : 1}
                    strokeOpacity={node.alive ? 0.5 : 0.3}
                    strokeDasharray={node.alive ? undefined : '4 3'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}

              {/* Transition highlight */}
              {highlight && (
                <motion.rect
                  x={highlight.x}
                  y={highlight.y}
                  width={highlight.w}
                  height={highlight.h}
                  rx={14}
                  fill={theme.highlightColor}
                  fillOpacity={0.08}
                  stroke={theme.highlightColor}
                  strokeWidth={2.5}
                  strokeDasharray="8 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Nodes */}
              {visibleNodes.map((node) => {
                const x = currentLayout.get(node.id)!;
                const y = node.gen * ROW_H + 30;
                const label = node.alive ? (config.traitLabels[node.trait] ?? '') : '✕';
                return (
                  <motion.g key={node.id} role="img" aria-label={config.nodeAriaLabel(node)}>
                    {node.mutationEvent && node.alive && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        fill="none"
                        stroke="#eab308"
                        strokeWidth={2}
                        initial={{ r: NODE_R }}
                        animate={{
                          r: [NODE_R, NODE_R + 7, NODE_R],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={NODE_R}
                      fill={config.nodeColor(node)}
                      stroke={config.nodeStroke(node)}
                      strokeWidth={config.nodeStrokeWidth(node)}
                      initial={{ r: 0, opacity: 0 }}
                      animate={{ r: NODE_R, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />
                    {label && (
                      <motion.text
                        x={x}
                        y={y + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={node.alive ? 10 : 12}
                        fontWeight={700}
                        fill={node.alive ? config.nodeLabelColor(node) : config.deadTextColor(node)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {label}
                      </motion.text>
                    )}
                  </motion.g>
                );
              })}
            </svg>
          </motion.div>
        </AnimatePresence>

        {/* ── Narrative ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 rounded-xl border px-4 py-3 ${theme.narrativeBorder} ${theme.narrativeBg}`}
            aria-live="polite"
          >
            <p className={`text-[13px] leading-relaxed ${theme.narrativeText}`}>
              <span className={`font-bold ${theme.narrativeBold}`}>
                {config.narratives[step].title}
              </span>{' '}
              &mdash; {config.narratives[step].text}
            </p>
            {config.quizzes.filter((q) => q.atStep === step).map((q, i) => (
              <QuizCheckpoint key={`quiz-${step}-${i}`} quiz={q} themeColor={theme.quizTheme} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Summary chart (final step) ── */}
        {step === TOTAL_STEPS - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 space-y-2 rounded-xl border border-gray-100 bg-white p-4"
          >
            <h4 className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
              {config.summaryTitle}
            </h4>
            {config.summary.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-24 text-[12px] font-medium text-gray-600">
                  {item.label}
                </span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count / item.max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
                <span className="w-6 text-right text-[12px] font-bold" style={{ color: item.color }}>
                  {item.count}
                </span>
                {item.extinct && (
                  <span className="text-[10px] font-bold text-red-400">EXTINCT</span>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Controls ── */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => { setPlaying(false); setStep(0); }}
            className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-100"
          >
            Restart
          </button>
          <button
            onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }}
            disabled={step === 0}
            className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-25"
          >
            ← Prev
          </button>
          <button
            onClick={() => {
              if (step >= TOTAL_STEPS - 1) { setStep(0); setPlaying(true); }
              else setPlaying((p) => !p);
            }}
            className={`rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors ${theme.playBtnBg} hover:${theme.playBtnHover}`}
          >
            {playing ? 'Pause' : step >= TOTAL_STEPS - 1 ? 'Replay' : 'Play'}
          </button>
          <button
            onClick={() => { setPlaying(false); setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1)); }}
            disabled={step >= TOTAL_STEPS - 1}
            className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-25"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
