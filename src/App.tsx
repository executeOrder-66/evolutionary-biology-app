import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSimulationStore } from './store/simulationStore';
import { scenarios } from './data/scenarios';
import { basicEvolutionChapter } from './data/chapters/basicEvolution';
import { antibioticResistanceChapter } from './data/chapters/antibioticResistance';
import { pepperedMothsChapter } from './data/chapters/pepperedMoths';
import { peacockTailsChapter } from './data/chapters/peacockTails';
import { dogDomesticationChapter } from './data/chapters/dogDomestication';
import { darwinsFinchesChapter } from './data/chapters/darwinsFinches';
import { predatorPreyChapter } from './data/chapters/predatorPrey';
import { mimicryChapter } from './data/chapters/mimicry';
import { antibioticCyclingChapter } from './data/chapters/antibioticCycling';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import SimulationCanvas from './components/simulation/SimulationCanvas';
import ControlPanel from './components/simulation/ControlPanel';
import PopulationChart from './components/simulation/PopulationChart';
import SimulationSummary from './components/simulation/SimulationSummary';
import ExplanationPanel from './components/education/ExplanationPanel';
import WhatIfPanel from './components/simulation/WhatIfPanel';
import WelcomeScreen from './components/scenarios/WelcomeScreen';
import TutorialViewer from './components/tutorial/TutorialViewer';
import GlossaryPage from './components/education/GlossaryPage';
import ClassroomPage from './components/education/ClassroomMode';
import ComparisonMode from './components/simulation/ComparisonMode';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { usePageTitle } from './hooks/usePageTitle';
import type { Chapter } from './types/tutorial';

// ─── Lazy-loaded components ───

const SimplifiedTree = lazy(() => import('./components/simulation/SimplifiedTree'));
const NarrativeSimulation = lazy(() => import('./components/simulation/NarrativeSimulation'));
const NarrativeMothSimulation = lazy(() => import('./components/simulation/NarrativeMothSimulation'));
const NarrativePeacockSimulation = lazy(() => import('./components/simulation/NarrativePeacockSimulation'));
const NarrativeDogSimulation = lazy(() => import('./components/simulation/NarrativeDogSimulation'));
const NarrativeFinchSimulation = lazy(() => import('./components/simulation/NarrativeFinchSimulation'));

// ─── Loading fallback ───

function LoadingSpinner() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-500" />
        <p className="text-xs text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// ─── Chapter registry ───

const chapters: Record<string, Chapter> = {
  'basic-evolution': basicEvolutionChapter,
  'antibiotic-resistance': antibioticResistanceChapter,
  'peppered-moths': pepperedMothsChapter,
  'peacock-tails': peacockTailsChapter,
  'dog-domestication': dogDomesticationChapter,
  'darwins-finches': darwinsFinchesChapter,
  'predator-prey': predatorPreyChapter,
  'mimicry': mimicryChapter,
  'antibiotic-cycling': antibioticCyclingChapter,
};

// ─── Narrative story page wrapper ───

function StoryPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  usePageTitle(title);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden">
        <div className="border-b border-gray-100 bg-white px-6 py-3 dark:border-[var(--color-border)] dark:bg-[var(--color-surface)]">
          <div className="mx-auto flex max-w-4xl items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">{title}</h2>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto px-4 py-6 lg:px-8">
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Home page ───

function HomePage() {
  usePageTitle();
  return <WelcomeScreen />;
}

// ─── Tutorial page ───

function TutorialPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = chapters[chapterId ?? ''];
  usePageTitle(chapter?.title ?? 'Tutorial');
  if (!chapter) {
    navigate('/');
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <TutorialViewer chapter={chapter} onClose={() => navigate('/')} />
    </motion.div>
  );
}

// ─── Simulation page ───

function SimulationPage() {
  const { t } = useTranslation();
  useKeyboardShortcuts();
  const { scenarioId } = useParams();
  const loadScenario = useSimulationStore((s) => s.loadScenario);
  const currentScenario = useSimulationStore((s) => s.scenario);
  const navigate = useNavigate();
  usePageTitle(currentScenario?.name ?? 'Simulation');

  useEffect(() => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario || !scenario.enabled) {
      navigate('/');
      return;
    }
    if (currentScenario?.id !== scenarioId) {
      loadScenario(scenario);
    }
  }, [scenarioId, currentScenario?.id, loadScenario, navigate]);

  const generation = useSimulationStore((s) => s.generation);
  const status = useSimulationStore((s) => s.status);
  const history = useSimulationStore((s) => s.history);
  const [showComparison, setShowComparison] = useState(false);

  if (!currentScenario) return null;

  const hasStarted = generation > 0 || status === 'running';

  return (
    <motion.div
      key={currentScenario.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-4 lg:p-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 lg:grid-cols-[1fr_320px] lg:gap-5">
          <div className="space-y-3">
            <SimulationCanvas />
            <ControlPanel />
            {hasStarted && <SimulationSummary />}
            {hasStarted ? (
              <PopulationChart />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card flex items-center gap-4 p-5"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
                  <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('common.readyToSimulate')}</p>
                  <p className="text-[12px] text-gray-400 dark:text-gray-500">
                    {t('common.readyToSimulateHint')}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
          <div className="space-y-3">
            <ExplanationPanel />
            {generation > 0 && <WhatIfPanel />}
            {/* Comparison mode (#29) */}
            {hasStarted && (
              showComparison ? (
                <ComparisonMode
                  currentHistory={history}
                  scenarioName={currentScenario.id}
                  traitName={currentScenario.traits[0]?.name ?? ''}
                  traitDisplayName={currentScenario.traits[0]?.displayName ?? 'Trait'}
                  onClose={() => setShowComparison(false)}
                />
              ) : (
                <button
                  onClick={() => setShowComparison(true)}
                  className="card group flex w-full items-center gap-3 p-4 text-left transition-all hover:shadow-md hover:border-emerald-200"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-xl transition-transform group-hover:scale-110">
                    📊
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-gray-800 dark:text-gray-200">Compare Runs</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Save &amp; compare different simulation outcomes</p>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── 404 page ───

function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  usePageTitle('Page Not Found');
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5">
        <span className="text-4xl">🧬</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('notFound.title')}</h2>
      <p className="max-w-sm text-center text-sm text-gray-400">
        {t('notFound.description')}
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
      >
        {t('common.backToHome')}
      </button>
    </div>
  );
}

// ─── App ───

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={
              <StoryPage title="How Natural Selection Works" subtitle="Simplified interactive demo">
                <SimplifiedTree />
              </StoryPage>
            } />
            <Route path="/story/bacteria" element={
              <StoryPage title="From One Bacterium to Superbug" subtitle="Guided narrative simulation">
                <NarrativeSimulation />
              </StoryPage>
            } />
            <Route path="/story/moths" element={
              <StoryPage title="The Peppered Moth Story" subtitle="Guided narrative simulation">
                <NarrativeMothSimulation />
              </StoryPage>
            } />
            <Route path="/story/peacock" element={
              <StoryPage title="The Peacock's Dilemma" subtitle="Guided narrative simulation">
                <NarrativePeacockSimulation />
              </StoryPage>
            } />
            <Route path="/story/dogs" element={
              <StoryPage title="From Wolf to Dog" subtitle="Guided narrative simulation">
                <NarrativeDogSimulation />
              </StoryPage>
            } />
            <Route path="/story/finches" element={
              <StoryPage title="Darwin's Finches" subtitle="Guided narrative simulation">
                <NarrativeFinchSimulation />
              </StoryPage>
            } />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/classroom" element={<ClassroomPage />} />
            <Route path="/tutorial/:chapterId" element={<TutorialPage />} />
            <Route path="/sim/:scenarioId" element={<SimulationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
