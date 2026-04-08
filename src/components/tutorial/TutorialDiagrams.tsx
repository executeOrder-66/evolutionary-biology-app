/**
 * SVG diagrams for tutorial pages.
 * Each diagram is a self-contained SVG keyed by a string ID.
 */
import type { ReactNode, JSX } from 'react';

const W = 520;

function Diagram({ children, h = 220 }: { children: ReactNode; h?: number }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${h}`}
      className="w-full rounded-xl bg-gray-50/80 border border-gray-100"
      style={{ maxHeight: h > 260 ? 340 : 260 }}
    >
      {children}
    </svg>
  );
}

// ─── Helpers ───

function Label({ x, y, text, size = 11, color = '#6b7280', bold = false, anchor = 'middle' as const }: {
  x: number; y: number; text: string; size?: number; color?: string; bold?: boolean; anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color}
      fontWeight={bold ? 700 : 500} fontFamily="system-ui, sans-serif">
      {text}
    </text>
  );
}

function Arrow({ x1, y1, x2, y2, color = '#9ca3af' }: {
  x1: number; y1: number; x2: number; y2: number; color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 7;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} />
      <polygon
        points={`${x2},${y2} ${x2 - headLen * Math.cos(angle - 0.4)},${y2 - headLen * Math.sin(angle - 0.4)} ${x2 - headLen * Math.cos(angle + 0.4)},${y2 - headLen * Math.sin(angle + 0.4)}`}
        fill={color}
      />
    </g>
  );
}

function Bacterium({ x, y, r = 10, color = '#10b981', opacity = 1 }: {
  x: number; y: number; r?: number; color?: string; opacity?: number;
}) {
  return <ellipse cx={x} cy={y} rx={r} ry={r * 0.7} fill={color} opacity={opacity} />;
}

// ─── Evolution Diagrams ───

function ThreeIngredients() {
  return (
    <Diagram h={210}>
      <rect x={30} y={25} width={125} height={55} rx={12} fill="#dbeafe" stroke="#93c5fd" strokeWidth={1.5} />
      <Label x={92} y={48} text="Variation" size={12} color="#1e40af" bold />
      <Label x={92} y={64} text="Individuals differ" size={9} color="#3b82f6" />

      <rect x={198} y={25} width={125} height={55} rx={12} fill="#fce7f3" stroke="#f9a8d4" strokeWidth={1.5} />
      <Label x={260} y={48} text="Inheritance" size={12} color="#9d174d" bold />
      <Label x={260} y={64} text="Traits pass down" size={9} color="#ec4899" />

      <rect x={366} y={25} width={125} height={55} rx={12} fill="#fef3c7" stroke="#fcd34d" strokeWidth={1.5} />
      <Label x={428} y={48} text="Selection" size={12} color="#92400e" bold />
      <Label x={428} y={64} text="Some survive better" size={9} color="#f59e0b" />

      <Arrow x1={92} y1={86} x2={230} y2={126} color="#93c5fd" />
      <Arrow x1={260} y1={86} x2={260} y2={126} color="#f9a8d4" />
      <Arrow x1={428} y1={86} x2={290} y2={126} color="#fcd34d" />

      <rect x={180} y={130} width={160} height={52} rx={14} fill="#d1fae5" stroke="#34d399" strokeWidth={2} />
      <Label x={260} y={153} text="EVOLUTION" size={15} color="#065f46" bold />
      <Label x={260} y={170} text="Population changes over time" size={9} color="#059669" />
    </Diagram>
  );
}

function DnaToTrait() {
  return (
    <Diagram h={190}>
      <rect x={30} y={55} width={110} height={60} rx={12} fill="#ede9fe" stroke="#a78bfa" strokeWidth={1.5} />
      <Label x={85} y={80} text="🧬 DNA" size={13} color="#5b21b6" bold />
      <Label x={85} y={97} text="Full instruction set" size={9} color="#7c3aed" />

      <Arrow x1={145} y1={85} x2={190} y2={85} color="#a78bfa" />

      <rect x={195} y={55} width={110} height={60} rx={12} fill="#dbeafe" stroke="#93c5fd" strokeWidth={1.5} />
      <Label x={250} y={80} text="Gene" size={13} color="#1e40af" bold />
      <Label x={250} y={97} text="One instruction" size={9} color="#3b82f6" />

      <Arrow x1={310} y1={85} x2={355} y2={85} color="#93c5fd" />

      <rect x={360} y={55} width={120} height={60} rx={12} fill="#d1fae5" stroke="#34d399" strokeWidth={1.5} />
      <Label x={420} y={80} text="Trait" size={13} color="#065f46" bold />
      <Label x={420} y={97} text="Observable feature" size={9} color="#059669" />

      <Label x={260} y={150} text="Example: gene for cell wall thickness → thicker wall → antibiotic resistance" size={9} color="#9ca3af" />
    </Diagram>
  );
}

function MutationDiagram() {
  return (
    <Diagram h={210}>
      <Label x={130} y={20} text="Parent DNA" size={11} color="#6b7280" bold />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={`p${i}`} x={50 + i * 22} y={28} width={18} height={22} rx={3}
          fill="#dbeafe" stroke="#93c5fd" strokeWidth={1} />
      ))}

      <Arrow x1={130} y1={58} x2={130} y2={78} color="#9ca3af" />
      <Label x={195} y={72} text="Copy (with rare error)" size={9} color="#9ca3af" />

      <Label x={130} y={98} text="Offspring DNA" size={11} color="#6b7280" bold />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={`c${i}`} x={50 + i * 22} y={106} width={18} height={22} rx={3}
          fill={i === 4 ? '#fecaca' : '#dbeafe'} stroke={i === 4 ? '#f87171' : '#93c5fd'} strokeWidth={i === 4 ? 2 : 1} />
      ))}
      <Label x={50 + 4 * 22 + 9} y={146} text="↑ Mutation!" size={10} color="#ef4444" bold />

      <rect x={300} y={18} width={190} height={40} rx={10} fill="#f3f4f6" />
      <Label x={395} y={34} text="Most: No effect" size={10} color="#6b7280" bold />
      <Label x={395} y={48} text="(silent change)" size={9} color="#9ca3af" />

      <rect x={300} y={68} width={190} height={40} rx={10} fill="#fef2f2" />
      <Label x={395} y={84} text="Some: Harmful" size={10} color="#991b1b" bold />
      <Label x={395} y={98} text="(breaks something)" size={9} color="#dc2626" />

      <rect x={300} y={118} width={190} height={40} rx={10} fill="#f0fdf4" />
      <Label x={395} y={134} text="Rare: Helpful!" size={10} color="#166534" bold />
      <Label x={395} y={148} text="(accidentally useful)" size={9} color="#16a34a" />

      <Label x={260} y={190} text="Mutations are random — not directed by need" size={9} color="#9ca3af" />
    </Diagram>
  );
}

function NaturalSelectionBeforeAfter() {
  return (
    <Diagram h={260}>
      <Label x={260} y={18} text="Natural Selection: Before and After" size={12} color="#374151" bold />

      {/* Before */}
      <Label x={130} y={42} text="BEFORE" size={11} color="#6b7280" bold />
      <rect x={30} y={50} width={200} height={80} rx={12} fill="#f0fdf4" stroke="#bbf7d0" strokeWidth={1} />
      {[0,1,2,3,4,5,6,7,8,9].map(i => {
        const colors = ['#fca5a5','#fca5a5','#fcd34d','#fcd34d','#fcd34d','#86efac','#86efac','#86efac','#34d399','#22c55e'];
        return <Bacterium key={`b${i}`} x={55 + (i % 5) * 38} y={75 + Math.floor(i / 5) * 30} r={10} color={colors[i]} />;
      })}
      <Label x={130} y={148} text="Mixed — varied resistance" size={9} color="#6b7280" />

      {/* Arrow */}
      <Arrow x1={238} y1={90} x2={282} y2={90} color="#ef4444" />
      <Label x={260} y={76} text="💊" size={14} color="#ef4444" />

      {/* After */}
      <Label x={390} y={42} text="AFTER" size={11} color="#6b7280" bold />
      <rect x={290} y={50} width={200} height={80} rx={12} fill="#f0fdf4" stroke="#bbf7d0" strokeWidth={1} />
      {[0,1,2,3,4,5].map(i => {
        const colors = ['#34d399','#22c55e','#34d399','#22c55e','#34d399','#22c55e'];
        return <Bacterium key={`a${i}`} x={325 + (i % 3) * 50} y={75 + Math.floor(i / 3) * 30} r={10} color={colors[i]} />;
      })}
      <Label x={390} y={148} text="Only resistant survive" size={9} color="#6b7280" />

      {/* Legend */}
      <Bacterium x={90} y={180} r={6} color="#fca5a5" />
      <Label x={135} y={183} text="Low resistance" size={9} color="#6b7280" />
      <Bacterium x={230} y={180} r={6} color="#fcd34d" />
      <Label x={268} y={183} text="Medium" size={9} color="#6b7280" />
      <Bacterium x={340} y={180} r={6} color="#22c55e" />
      <Label x={390} y={183} text="High resistance" size={9} color="#6b7280" />

      <Label x={260} y={210} text="Antibiotics removed the non-resistant — the population didn't 'choose' to adapt" size={9} color="#9ca3af" />
    </Diagram>
  );
}

function SelectionPressureDiagram() {
  return (
    <Diagram h={220}>
      <Label x={260} y={18} text="Selection Pressure Filters a Population" size={12} color="#374151" bold />

      <polygon points="90,50 430,50 360,170 160,170" fill="#fef2f2" stroke="#fca5a5" strokeWidth={1.5} opacity={0.4} />
      <Label x={260} y={78} text="Selection Pressure" size={11} color="#dc2626" bold />
      <Label x={260} y={94} text="(antibiotics, predators, cold...)" size={9} color="#ef4444" />

      {[0,1,2,3,4,5,6].map(i => {
        const colors = ['#fca5a5','#fcd34d','#86efac','#fca5a5','#fcd34d','#22c55e','#fca5a5'];
        return <circle key={`in${i}`} cx={130 + i * 42} cy={56} r={7} fill={colors[i]} />;
      })}

      {[0,1,2].map(i => {
        const colors = ['#86efac','#22c55e','#fcd34d'];
        return <circle key={`out${i}`} cx={220 + i * 40} cy={182} r={8} fill={colors[i]} />;
      })}

      {[0,1,2,3].map(i => (
        <text key={`d${i}`} x={170 + i * 48} y={140} fontSize={12} fill="#d1d5db" textAnchor="middle">✕</text>
      ))}

      <Label x={260} y={208} text="Only individuals suited to the pressure survive" size={10} color="#6b7280" />
    </Diagram>
  );
}

function SpeciationDiagram() {
  return (
    <Diagram h={240}>
      <Label x={260} y={18} text="How New Species Form" size={12} color="#374151" bold />

      <rect x={190} y={32} width={140} height={32} rx={10} fill="#dbeafe" stroke="#93c5fd" strokeWidth={1.5} />
      <Label x={260} y={53} text="One population" size={10} color="#1e40af" bold />

      <Arrow x1={260} y1={70} x2={260} y2={88} color="#9ca3af" />

      <rect x={240} y={92} width={40} height={36} rx={4} fill="#e5e7eb" />
      <Label x={260} y={115} text="🏔️" size={14} color="#374151" />
      <Label x={320} y={112} text="Barrier" size={9} color="#9ca3af" anchor="start" />

      <line x1={240} y1={110} x2={145} y2={145} stroke="#f9a8d4" strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={280} y1={110} x2={375} y2={145} stroke="#34d399" strokeWidth={1.5} strokeDasharray="4 3" />

      <rect x={70} y={148} width={150} height={32} rx={10} fill="#fce7f3" stroke="#f9a8d4" strokeWidth={1.5} />
      <Label x={145} y={169} text="Group A (dry habitat)" size={9} color="#9d174d" bold />

      <rect x={300} y={148} width={150} height={32} rx={10} fill="#d1fae5" stroke="#34d399" strokeWidth={1.5} />
      <Label x={375} y={169} text="Group B (wet habitat)" size={9} color="#065f46" bold />

      <Label x={145} y={200} text="Evolves trait X" size={9} color="#ec4899" />
      <Label x={375} y={200} text="Evolves trait Y" size={9} color="#059669" />

      <Label x={260} y={228} text="After many generations → two distinct species" size={10} color="#6b7280" bold />
    </Diagram>
  );
}

function AdaptiveRadiationDiagram() {
  return (
    <Diagram h={230}>
      <Label x={260} y={16} text="Adaptive Radiation" size={12} color="#374151" bold />

      <circle cx={260} cy={46} r={14} fill="#3b82f6" />
      <Label x={260} y={50} text="🐦" size={11} color="white" />
      <Label x={260} y={74} text="Ancestor species" size={9} color="#6b7280" />

      {[
        { x: 75, label: 'Seed eater', beak: 'Thick beak', color: '#f59e0b' },
        { x: 195, label: 'Insect eater', beak: 'Thin beak', color: '#22c55e' },
        { x: 325, label: 'Fruit eater', beak: 'Wide beak', color: '#ef4444' },
        { x: 445, label: 'Cactus eater', beak: 'Sharp beak', color: '#8b5cf6' },
      ].map((b, i) => (
        <g key={i}>
          <line x1={260} y1={58} x2={b.x} y2={120} stroke={b.color} strokeWidth={2} strokeDasharray="4 3" />
          <circle cx={b.x} cy={135} r={14} fill={b.color} />
          <Label x={b.x} y={163} text={b.label} size={9} color="#6b7280" bold />
          <rect x={b.x - 32} y={170} width={64} height={18} rx={6} fill={b.color} opacity={0.15} />
          <Label x={b.x} y={183} text={b.beak} size={8} color={b.color} />
        </g>
      ))}

      <Label x={260} y={218} text="One ancestor → many species, each in a different niche" size={9} color="#9ca3af" />
    </Diagram>
  );
}

function TreeOfLife() {
  return (
    <Diagram h={250}>
      <Label x={260} y={16} text="The Tree of Life (Simplified)" size={12} color="#374151" bold />

      <line x1={260} y1={210} x2={260} y2={170} stroke="#6b7280" strokeWidth={3} />
      <Label x={260} y={230} text="Common ancestor" size={9} color="#9ca3af" />

      <line x1={260} y1={170} x2={120} y2={130} stroke="#6b7280" strokeWidth={2.5} />
      <line x1={260} y1={170} x2={400} y2={130} stroke="#6b7280" strokeWidth={2.5} />

      {/* Bacteria */}
      <line x1={120} y1={130} x2={65} y2={75} stroke="#22c55e" strokeWidth={2} />
      <circle cx={65} cy={60} r={16} fill="#d1fae5" stroke="#22c55e" strokeWidth={1.5} />
      <Label x={65} y={64} text="🦠" size={13} color="#22c55e" />
      <Label x={65} y={42} text="Bacteria" size={9} color="#059669" bold />

      {/* Plants */}
      <line x1={120} y1={130} x2={175} y2={75} stroke="#16a34a" strokeWidth={2} />
      <circle cx={175} cy={60} r={16} fill="#f0fdf4" stroke="#16a34a" strokeWidth={1.5} />
      <Label x={175} y={64} text="🌿" size={13} color="#16a34a" />
      <Label x={175} y={42} text="Plants" size={9} color="#16a34a" bold />

      {/* Fungi */}
      <line x1={400} y1={130} x2={320} y2={75} stroke="#a855f7" strokeWidth={2} />
      <circle cx={320} cy={60} r={16} fill="#faf5ff" stroke="#a855f7" strokeWidth={1.5} />
      <Label x={320} y={64} text="🍄" size={13} color="#a855f7" />
      <Label x={320} y={42} text="Fungi" size={9} color="#7c3aed" bold />

      {/* Animals */}
      <line x1={400} y1={130} x2={400} y2={100} stroke="#6b7280" strokeWidth={2} />
      <line x1={400} y1={100} x2={420} y2={75} stroke="#ef4444" strokeWidth={2} />
      <line x1={400} y1={100} x2={475} y2={55} stroke="#f59e0b" strokeWidth={2} />

      <circle cx={420} cy={60} r={16} fill="#fef2f2" stroke="#ef4444" strokeWidth={1.5} />
      <Label x={420} y={64} text="🐟" size={13} color="#ef4444" />
      <Label x={420} y={42} text="Fish" size={9} color="#dc2626" bold />

      <circle cx={475} cy={40} r={16} fill="#fffbeb" stroke="#f59e0b" strokeWidth={1.5} />
      <Label x={475} y={44} text="🐕" size={13} color="#f59e0b" />
      <Label x={475} y={26} text="Mammals" size={9} color="#d97706" bold />
    </Diagram>
  );
}

// ─── Antibiotic Resistance Diagrams ───

function BinaryFissionDiagram() {
  return (
    <Diagram h={210}>
      <Label x={260} y={18} text="Binary Fission: One Becomes Two" size={12} color="#374151" bold />

      <Bacterium x={100} y={75} r={22} color="#3b82f6" />
      <Label x={100} y={79} text="Parent" size={10} color="white" bold />

      <Arrow x1={132} y1={75} x2={200} y2={58} color="#93c5fd" />
      <Arrow x1={132} y1={75} x2={200} y2={95} color="#93c5fd" />
      <Label x={168} y={68} text="splits" size={9} color="#93c5fd" />

      <Bacterium x={240} y={52} r={16} color="#3b82f6" />
      <Label x={240} y={56} text="Copy" size={8} color="white" bold />
      <Bacterium x={240} y={100} r={16} color="#3b82f6" />
      <Label x={240} y={104} text="Copy" size={8} color="white" bold />

      <Arrow x1={264} y1={52} x2={310} y2={40} color="#93c5fd" />
      <Arrow x1={264} y1={52} x2={310} y2={65} color="#93c5fd" />
      <Arrow x1={264} y1={100} x2={310} y2={88} color="#93c5fd" />
      <Arrow x1={264} y1={100} x2={310} y2={113} color="#93c5fd" />

      {[0,1,2,3].map(i => (
        <Bacterium key={`g${i}`} x={335} y={36 + i * 26} r={11} color="#60a5fa" />
      ))}
      <Label x={335} y={140} text="4 bacteria" size={9} color="#6b7280" />

      <Label x={260} y={170} text="1 → 2 → 4 → 8 → 16 ... bacteria double every ~20 minutes!" size={10} color="#9ca3af" />
      <Label x={260} y={190} text="In the simulation, each bacterium splits into 3 per generation" size={9} color="#d1d5db" />
    </Diagram>
  );
}

function VariationDiagram() {
  return (
    <Diagram h={200}>
      <Label x={260} y={18} text="Variation: Not All Bacteria Are the Same" size={12} color="#374151" bold />

      {[
        { x: 65, shield: 0, color: '#fca5a5', label: 'No shield' },
        { x: 170, shield: 10, color: '#fcd34d', label: 'Small shield' },
        { x: 275, shield: 16, color: '#86efac', label: 'Medium shield' },
        { x: 380, shield: 22, color: '#34d399', label: 'Large shield' },
        { x: 470, shield: 28, color: '#059669', label: 'Full armor' },
      ].map((b, i) => (
        <g key={i}>
          {b.shield > 0 && (
            <circle cx={b.x} cy={85} r={b.shield} fill="none" stroke={b.color} strokeWidth={2.5} strokeDasharray="3 2" opacity={0.5} />
          )}
          <Bacterium x={b.x} y={85} r={11} color={b.color} />
          <Label x={b.x} y={128} text={b.label} size={9} color="#6b7280" bold />
        </g>
      ))}

      <Label x={260} y={160} text="Same species, different levels of natural resistance" size={10} color="#6b7280" />
      <Label x={260} y={178} text="This variation comes from random mutations during DNA copying" size={9} color="#9ca3af" />
    </Diagram>
  );
}

function SelectionEventDiagram() {
  return (
    <Diagram h={280}>
      <Label x={260} y={16} text="The Selection Event" size={12} color="#374151" bold />

      <Label x={120} y={40} text="Before antibiotics" size={10} color="#6b7280" bold />
      <rect x={30} y={48} width={180} height={70} rx={10} fill="#f0fdf4" stroke="#bbf7d0" strokeWidth={1} />
      {[
        { x: 60, y: 68, color: '#fca5a5' }, { x: 95, y: 68, color: '#fca5a5' },
        { x: 130, y: 68, color: '#fcd34d' }, { x: 165, y: 68, color: '#fcd34d' },
        { x: 60, y: 98, color: '#86efac' }, { x: 95, y: 98, color: '#86efac' },
        { x: 130, y: 98, color: '#34d399' }, { x: 165, y: 98, color: '#059669' },
      ].map((b, i) => <Bacterium key={`b${i}`} x={b.x} y={b.y} r={9} color={b.color} />)}

      <Label x={260} y={84} text="💊" size={20} color="#ef4444" />
      <Arrow x1={220} y1={84} x2={288} y2={84} color="#ef4444" />

      <Label x={400} y={40} text="After antibiotics" size={10} color="#6b7280" bold />
      <rect x={295} y={48} width={180} height={70} rx={10} fill="#fef2f2" stroke="#fecaca" strokeWidth={1} />
      {[0,1,2,3].map(i => (
        <text key={`x${i}`} x={325 + (i % 2) * 55} y={73 + Math.floor(i / 2) * 30}
          fontSize={11} fill="#d1d5db" textAnchor="middle">✕</text>
      ))}
      <Bacterium x={345} y={100} r={9} color="#34d399" />
      <Bacterium x={385} y={100} r={9} color="#059669" />
      <Bacterium x={425} y={100} r={9} color="#86efac" />

      <Arrow x1={385} y1={124} x2={385} y2={150} color="#34d399" />
      <Label x={385} y={166} text="Survivors reproduce" size={10} color="#059669" bold />

      <rect x={295} y={175} width={180} height={55} rx={10} fill="#f0fdf4" stroke="#bbf7d0" strokeWidth={1} />
      {[0,1,2,3,4,5,6,7].map(i => (
        <Bacterium key={`n${i}`} x={315 + (i % 4) * 40} y={192 + Math.floor(i / 4) * 22} r={7}
          color={['#34d399','#22c55e','#059669','#86efac','#34d399','#22c55e','#059669','#86efac'][i]} />
      ))}
      <Label x={260} y={255} text="Next generation: almost entirely resistant" size={10} color="#6b7280" />
    </Diagram>
  );
}

function AntibioticRampDiagram() {
  return (
    <Diagram h={220}>
      <Label x={260} y={16} text="Antibiotic Strength Over Time" size={12} color="#374151" bold />

      <line x1={60} y1={180} x2={490} y2={180} stroke="#d1d5db" strokeWidth={1.5} />
      <line x1={60} y1={180} x2={60} y2={35} stroke="#d1d5db" strokeWidth={1.5} />
      <Label x={275} y={200} text="Generation" size={9} color="#9ca3af" />
      <Label x={30} y={108} text="Strength" size={8} color="#9ca3af" />

      {[0, 10, 20, 30, 40, 50].map(g => (
        <Label key={g} x={60 + (g / 50) * 420} y={195} text={`${g}`} size={8} color="#d1d5db" />
      ))}

      <polyline
        points="60,180 144,180 186,145 228,115 270,90 312,72 480,72"
        fill="none" stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
      <polygon
        points="144,180 186,145 228,115 270,90 312,72 480,72 480,180"
        fill="#fca5a5" opacity={0.12} />

      <line x1={144} y1={35} x2={144} y2={180} stroke="#ef4444" strokeWidth={1} strokeDasharray="4 3" />
      <Label x={144} y={30} text="💊 Antibiotics start" size={9} color="#ef4444" bold />

      <line x1={60} y1={145} x2={140} y2={145} stroke="#fcd34d" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
      <Label x={46} y={145} text="—" size={8} color="#f59e0b" />

      <line x1={60} y1={90} x2={140} y2={90} stroke="#34d399" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
      <Label x={46} y={90} text="—" size={8} color="#059669" />

      {/* Annotations on right side */}
      <rect x={370} y={40} width={120} height={22} rx={6} fill="#fef2f2" />
      <Label x={430} y={55} text="Tiny, Scout die here" size={8} color="#ef4444" />

      <rect x={370} y={68} width={120} height={22} rx={6} fill="#f0fdf4" />
      <Label x={430} y={83} text="Tank survives above" size={8} color="#059669" />
    </Diagram>
  );
}

// ─── Simulation UI Diagrams ───

function SurvivalBarsDiagram() {
  return (
    <Diagram h={200}>
      <Label x={260} y={16} text="Reading the Survival Bars" size={12} color="#374151" bold />

      {/* Mock bar for Tank */}
      <circle cx={40} cy={50} r={6} fill="#2ecc71" />
      <Label x={72} y={54} text="Tank" size={10} color="#374151" bold anchor="start" />
      <rect x={120} y={40} width={300} height={18} rx={9} fill="#e5e7eb" />
      <rect x={120} y={40} width={240} height={18} rx={9} fill="#2ecc71" />
      <Label x={370} y={53} text="38 descendants" size={8} color="#2ecc71" anchor="start" />

      {/* Mock bar for Tiny — extinct */}
      <circle cx={40} cy={90} r={6} fill="#e74c3c" />
      <Label x={72} y={94} text="Tiny" size={10} color="#374151" bold anchor="start" />
      <rect x={120} y={80} width={300} height={18} rx={9} fill="#e5e7eb" />
      <rect x={430} y={78} width={60} height={22} rx={6} fill="#fef2f2" stroke="#fecaca" strokeWidth={1} />
      <Label x={460} y={93} text="EXTINCT" size={8} color="#ef4444" bold />

      {/* Annotations */}
      <Arrow x1={250} y1={66} x2={250} y2={60} color="#059669" />
      <rect x={185} y={110} width={150} height={24} rx={8} fill="#d1fae5" />
      <Label x={260} y={126} text="Bar length = family size" size={9} color="#065f46" bold />

      <Arrow x1={460} y1={105} x2={460} y2={110} color="#ef4444" />
      <rect x={395} y={114} width={130} height={24} rx={8} fill="#fef2f2" />
      <Label x={460} y={130} text="Badge = family died" size={9} color="#dc2626" bold />

      <Label x={260} y={170} text="Watch bars shrink after antibiotics — that's natural selection!" size={9} color="#9ca3af" />
      <Label x={260} y={186} text="Families with low resistance disappear first" size={9} color="#d1d5db" />
    </Diagram>
  );
}

function FamilyTreeDiagram() {
  return (
    <Diagram h={220}>
      <Label x={260} y={16} text="Reading the Family Tree" size={12} color="#374151" bold />

      {/* Mock tree columns */}
      <line x1={130} y1={30} x2={130} y2={195} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={260} y1={30} x2={260} y2={195} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={390} y1={30} x2={390} y2={195} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="4 4" />

      {/* Lane labels */}
      <Label x={65} y={42} text="Tiny" size={9} color="#e74c3c" bold />
      <Label x={195} y={42} text="Patches" size={9} color="#8e44ad" bold />
      <Label x={325} y={42} text="Tank" size={9} color="#2ecc71" bold />

      {/* Row labels */}
      <Label x={445} y={60} text="Gen 0" size={8} color="#d1d5db" anchor="start" />
      <Label x={445} y={100} text="Gen 10" size={8} color="#d1d5db" anchor="start" />
      <Label x={445} y={140} text="Gen 20" size={8} color="#d1d5db" anchor="start" />
      <Label x={445} y={180} text="Gen 30" size={8} color="#d1d5db" anchor="start" />

      {/* Antibiotic line */}
      <line x1={20} y1={95} x2={435} y2={95} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.5} />
      <Label x={435} y={88} text="💊" size={10} color="#ef4444" anchor="start" />

      {/* Tiny — dies after antibiotics */}
      {[55,75].map((x, i) => <circle key={`t${i}`} cx={x} cy={56} r={5} fill="#e74c3c" />)}
      {[50,70,90].map((x, i) => <circle key={`t1${i}`} cx={x} cy={76} r={5} fill="#e74c3c" />)}
      <circle cx={65} cy={105} r={4} fill="#d1d5db" />
      <text x={65} y={108} fontSize={6} fill="#94a3b8" textAnchor="middle">x</text>

      {/* Patches — dies later */}
      {[185,205].map((x, i) => <circle key={`p${i}`} cx={x} cy={56} r={5} fill="#8e44ad" />)}
      {[180,200,220].map((x, i) => <circle key={`p1${i}`} cx={x} cy={76} r={5} fill="#8e44ad" />)}
      {[190,210].map((x, i) => <circle key={`p2${i}`} cx={x} cy={105} r={5} fill="#8e44ad" />)}
      <circle cx={200} cy={135} r={4} fill="#d1d5db" />
      <text x={200} y={138} fontSize={6} fill="#94a3b8" textAnchor="middle">x</text>

      {/* Tank — thrives */}
      {[315,335].map((x, i) => <circle key={`k${i}`} cx={x} cy={56} r={5} fill="#2ecc71" />)}
      {[305,325,345].map((x, i) => <circle key={`k1${i}`} cx={x} cy={76} r={5} fill="#2ecc71" />)}
      {[305,325,345].map((x, i) => <circle key={`k2${i}`} cx={x} cy={105} r={5} fill="#2ecc71" />)}
      {[305,325,345,360].map((x, i) => <circle key={`k3${i}`} cx={x} cy={135} r={5} fill="#2ecc71" />)}
      {[305,325,345,360].map((x, i) => <circle key={`k4${i}`} cx={x} cy={165} r={5} fill="#2ecc71" />)}

      <Label x={260} y={208} text="Time flows downward · Dashed lines separate families · Red line = antibiotics" size={9} color="#9ca3af" />
    </Diagram>
  );
}

function StatusBarDiagram() {
  return (
    <Diagram h={160}>
      <Label x={260} y={16} text="Reading the Status Bar" size={12} color="#374151" bold />

      {/* Mock status bar */}
      <rect x={20} y={32} width={480} height={36} rx={10} fill="#f9fafb" stroke="#e5e7eb" strokeWidth={1} />

      <Label x={50} y={46} text="Generation" size={8} color="#9ca3af" anchor="start" />
      <Label x={50} y={58} text="25" size={12} color="#111827" bold anchor="start" />

      <Label x={130} y={46} text="Population" size={8} color="#9ca3af" anchor="start" />
      <Label x={130} y={58} text="498" size={12} color="#111827" bold anchor="start" />

      <Label x={220} y={46} text="Avg Resistance" size={8} color="#9ca3af" anchor="start" />
      <Label x={220} y={58} text="High" size={12} color="#059669" bold anchor="start" />

      <Label x={320} y={46} text="Survival Chance" size={8} color="#9ca3af" anchor="start" />
      <Label x={320} y={58} text="74%" size={12} color="#111827" bold anchor="start" />

      <rect x={410} y={38} width={80} height={24} rx={12} fill="#fef2f2" stroke="#fecaca" strokeWidth={1} />
      <circle cx={422} cy={50} r={3} fill="#ef4444" />
      <Label x={458} y={54} text="AB 55%" size={8} color="#ef4444" bold />

      {/* Annotation arrows */}
      <Arrow x1={55} y1={75} x2={55} y2={90} color="#6b7280" />
      <Label x={55} y={104} text="How many" size={8} color="#6b7280" />
      <Label x={55} y={116} text="cycles passed" size={8} color="#6b7280" />

      <Arrow x1={250} y1={75} x2={250} y2={90} color="#059669" />
      <Label x={250} y={104} text="Average resistance" size={8} color="#059669" />
      <Label x={250} y={116} text="of all bacteria" size={8} color="#059669" />

      <Arrow x1={450} y1={75} x2={450} y2={90} color="#ef4444" />
      <Label x={450} y={104} text="Antibiotic" size={8} color="#ef4444" />
      <Label x={450} y={116} text="strength" size={8} color="#ef4444" />
    </Diagram>
  );
}

function ChartsDiagram() {
  return (
    <Diagram h={190}>
      <Label x={260} y={16} text="Reading the Charts" size={12} color="#374151" bold />

      {/* Chart 1: Avg Resistance */}
      <rect x={15} y={32} width={155} height={95} rx={8} fill="white" stroke="#e5e7eb" strokeWidth={1} />
      <Label x={92} y={48} text="Avg Resistance" size={8} color="#9ca3af" />
      <polyline points="25,110 50,108 75,106 100,80 125,55 150,50 160,48" fill="none" stroke="#10b981" strokeWidth={2} />
      <Label x={92} y={140} text="↑ Climbs after" size={8} color="#10b981" bold />
      <Label x={92} y={152} text="antibiotics arrive" size={8} color="#10b981" />

      {/* Chart 2: Survival Chance */}
      <rect x={183} y={32} width={155} height={95} rx={8} fill="white" stroke="#e5e7eb" strokeWidth={1} />
      <Label x={260} y={48} text="Survival Chance" size={8} color="#9ca3af" />
      <polyline points="193,60 218,62 243,64 255,100 268,90 293,65 318,55 328,52" fill="none" stroke="#3b82f6" strokeWidth={2} />
      <Label x={260} y={140} text="↓ Drops when antibiotics hit" size={8} color="#3b82f6" bold />
      <Label x={260} y={152} text="then recovers as pop adapts" size={8} color="#3b82f6" />

      {/* Chart 3: Population */}
      <rect x={350} y={32} width={155} height={95} rx={8} fill="white" stroke="#e5e7eb" strokeWidth={1} />
      <Label x={428} y={48} text="Population Size" size={8} color="#9ca3af" />
      <polyline points="360,58 385,56 410,55 422,90 435,80 460,60 485,55 495,54" fill="none" stroke="#f59e0b" strokeWidth={2} />
      <Label x={428} y={140} text="↓ Dips = bottleneck" size={8} color="#f59e0b" bold />
      <Label x={428} y={152} text="(many bacteria died)" size={8} color="#f59e0b" />

      <Label x={260} y={180} text="The 'dip and recover' pattern is the signature of natural selection" size={9} color="#9ca3af" />
    </Diagram>
  );
}

// ─── Registry ───

const diagrams: Record<string, () => JSX.Element> = {
  'three-ingredients': ThreeIngredients,
  'dna-to-trait': DnaToTrait,
  'mutation': MutationDiagram,
  'natural-selection-before-after': NaturalSelectionBeforeAfter,
  'selection-pressure': SelectionPressureDiagram,
  'speciation': SpeciationDiagram,
  'adaptive-radiation': AdaptiveRadiationDiagram,
  'tree-of-life': TreeOfLife,
  'binary-fission': BinaryFissionDiagram,
  'variation': VariationDiagram,
  'selection-event': SelectionEventDiagram,
  'antibiotic-ramp': AntibioticRampDiagram,
  'survival-bars': SurvivalBarsDiagram,
  'family-tree-reading': FamilyTreeDiagram,
  'status-bar': StatusBarDiagram,
  'charts-reading': ChartsDiagram,
};

export default function TutorialDiagram({ id }: { id: string }) {
  const Component = diagrams[id];
  if (!Component) return null;
  return (
    <div className="my-4">
      <Component />
    </div>
  );
}
