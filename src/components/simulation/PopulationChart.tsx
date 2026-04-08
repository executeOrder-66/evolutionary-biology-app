import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';

/** Key event generations and their labels */
const EVENT_MARKERS: { gen: number; label: string }[] = [
  { gen: 10, label: 'Antibiotics' },
  { gen: 15, label: 'Pollution' },
  { gen: 20, label: 'Superpredator' },
];

export default function PopulationChart() {
  const history = useSimulationStore((s) => s.history);
  const scenario = useSimulationStore((s) => s.scenario);

  const traitName = scenario?.traits[0]?.name ?? '';

  const chartData = useMemo(() => {
    if (history.length === 0) return null;
    return {
      maxGen: history[history.length - 1].generation,
      means: history.map((h) => h.traitMeans[traitName] ?? 0),
      sizes: history.map((h) => h.populationSize),
      fitnesses: history.map((h) => h.meanFitness),
      generations: history.map((h) => h.generation),
    };
  }, [history, traitName]);

  if (!chartData || history.length < 2) {
    return (
      <div className="card flex h-36 items-center justify-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Charts will appear as the simulation runs
        </p>
      </div>
    );
  }

  // Determine which events have been reached
  const activeEvents = EVENT_MARKERS.filter((e) => e.gen <= chartData.maxGen);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <MiniChart
        title={`Avg Resistance`}
        data={chartData.means}
        maxGen={chartData.maxGen}
        color="#10b981"
        gradientId="trait"
        events={activeEvents}
      />
      <MiniChart
        title="Avg Survival Chance"
        data={chartData.fitnesses}
        maxGen={chartData.maxGen}
        color="#3b82f6"
        gradientId="fitness"
        events={activeEvents}
      />
      <MiniChart
        title="Population Size"
        data={chartData.sizes}
        maxGen={chartData.maxGen}
        color="#f59e0b"
        gradientId="pop"
        isCount
        events={activeEvents}
      />
    </div>
  );
}

function MiniChart({
  title,
  data,
  maxGen,
  color,
  gradientId,
  isCount = false,
  events = [],
}: {
  title: string;
  data: number[];
  maxGen: number;
  color: string;
  gradientId: string;
  isCount?: boolean;
  events?: { gen: number; label: string }[];
}) {
  const w = 200;
  const h = 60;
  const pad = 1;

  const maxVal = isCount ? Math.max(...data, 1) : Math.max(...data, 0.01);
  const minVal = isCount ? 0 : Math.min(...data, 0);
  const range = maxVal - minVal || 1;

  const points = data.map((v, i) => {
    const x = pad + (i / Math.max(data.length - 1, 1)) * (w - 2 * pad);
    const y = h - pad - ((v - minVal) / range) * (h - 2 * pad);
    return [x, y] as const;
  });

  const linePath =
    'M ' + points.map(([x, y]) => `${x},${y}`).join(' L ');
  const areaPath = `${linePath} L ${points[points.length - 1][0]},${h} L ${points[0][0]},${h} Z`;

  const currentValue = data[data.length - 1];
  const prevValue = data.length > 1 ? data[data.length - 2] : currentValue;
  const trend = currentValue - prevValue;

  // X-axis tick positions (every 10 generations)
  const ticks: number[] = [];
  for (let g = 0; g <= maxGen; g += 10) {
    ticks.push(g);
  }
  if (ticks[ticks.length - 1] !== maxGen) ticks.push(maxGen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-center gap-1">
            {trend !== 0 && (
              <svg
                className={`h-3 w-3 ${trend > 0 ? 'text-emerald-500' : 'text-red-400'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{
                  transform: trend < 0 ? 'rotate(180deg)' : undefined,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span
              className="text-sm font-bold tabular-nums"
              style={{ color }}
            >
              {isCount ? Math.round(currentValue) : currentValue.toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: 64 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Event markers (#11) — vertical dashed lines at key generations */}
        {events.map((evt) => {
          const x = pad + (evt.gen / Math.max(maxGen, 1)) * (w - 2 * pad);
          return (
            <g key={evt.gen}>
              <line
                x1={x}
                y1={0}
                x2={x}
                y2={h}
                stroke="#ef4444"
                strokeWidth={0.8}
                strokeDasharray="3 2"
                strokeOpacity={0.5}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={x}
                y={7}
                textAnchor="middle"
                fontSize={6}
                fill="#ef4444"
                fillOpacity={0.7}
                fontWeight={600}
              >
                {evt.label}
              </text>
            </g>
          );
        })}

        {/* X-axis tick marks (#10) */}
        {ticks.map((g) => {
          const x = pad + (g / Math.max(maxGen, 1)) * (w - 2 * pad);
          return (
            <line
              key={`tick-${g}`}
              x1={x}
              y1={h - 1}
              x2={x}
              y2={h + 2}
              stroke="#9ca3af"
              strokeWidth={0.5}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {/* Area */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* End dot */}
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1][0]}
            cy={points[points.length - 1][1]}
            r={2.5}
            fill={color}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* X-axis labels with tick marks (#10) */}
      <div className="flex justify-between px-4 pb-2 text-[11px] text-gray-500 dark:text-gray-400">
        {ticks.filter((_, i, arr) => {
          // On small charts, only show first, middle, last
          if (arr.length <= 3) return true;
          return i === 0 || i === arr.length - 1 || i === Math.floor(arr.length / 2);
        }).map((g) => (
          <span key={g}>{g}</span>
        ))}
      </div>
    </motion.div>
  );
}
