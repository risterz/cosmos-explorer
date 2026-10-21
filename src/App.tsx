import { useState, useEffect, useCallback, useMemo } from 'react';
import { PLANETS_DATA } from './data/planets';
import { MISSIONS_DATA } from './data/missions';
import { PlanetData } from './types/planet';
import { MissionData } from './types/mission';
import { ViewState, ScaleMode, QualityLevel } from './types/scene';
import { useSimulationTime } from './hooks/useSimulationTime';
import { audioEngine } from './utils/audioEngine';

import { SolarSystemCanvas } from './components/Scene/SolarSystemCanvas';
import { Navigation } from './components/UI/Navigation';
import { ControlPanel } from './components/UI/ControlPanel';
import { PlanetPanel } from './components/UI/PlanetPanel';
import { MissionPanel } from './components/UI/MissionPanel';
import { Timeline } from './components/UI/Timeline';
import { ComparisonPanel } from './components/UI/ComparisonPanel';
import { LearnModal } from './components/UI/LearnModal';
import { AboutModal } from './components/UI/AboutModal';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { WebGLFallback } from './components/UI/WebGLFallback';
import { IntroSequence } from './components/Experience/IntroSequence';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean>(true);

  // Core view state
  const [viewState, setViewState] = useState<ViewState>('intro');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [activeMission, setActiveMission] = useState<MissionData | null>(null);
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(0);
  const [comparisonTarget, setComparisonTarget] = useState<PlanetData | undefined>(undefined);

  // Settings
  const [scaleMode, setScaleMode] = useState<ScaleMode>('educational');
  const [quality, setQuality] = useState<QualityLevel>('high');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showAsteroids, setShowAsteroids] = useState<boolean>(true);
  const [showTrajectories, setShowTrajectories] = useState<boolean>(true);
  const [resetViewTrigger, setResetViewTrigger] = useState<number>(0);

  // Time simulation hook
  const {
    simDays,
    speedMultiplier,
    isPaused,
    dateString,
    setSpeedMultiplier,
    togglePause,
    stepForward,
    stepBackward
  } = useSimulationTime();

  // Test WebGL capability on mount
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setIsWebGLAvailable(false);
      }
    } catch {
      setIsWebGLAvailable(false);
    }
  }, []);

  // Sync audio engine state with soundEnabled
  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      audioEngine.setMuted(!next);
      return next;
    });
  }, []);

  // Handle selecting a planet
  const handleSelectPlanet = useCallback((planet: PlanetData) => {
    setSelectedPlanet(planet);
    setActiveMission(null);
    setViewState('planet_selected');
  }, []);

  // Handle selecting a mission
  const handleSelectMission = useCallback((mission: MissionData) => {
    setActiveMission(mission);
    setActiveMilestoneIdx(0);
    setSelectedPlanet(null);
    setViewState('mission_selected');
  }, []);

  // Handle resetting camera
  const handleResetView = useCallback(() => {
    setSelectedPlanet(null);
    setActiveMission(null);
    setViewState('overview');
    setResetViewTrigger((c) => c + 1);
  }, []);

  // Open comparison view
  const handleOpenComparison = useCallback((planet?: PlanetData) => {
    setComparisonTarget(planet);
    setViewState('comparison');
  }, []);

  // Explore body from Learn modal
  const handleExploreTopicBody = useCallback((targetId: string) => {
    const foundPlanet = PLANETS_DATA.find((p) => p.id === targetId);
    if (foundPlanet) {
      handleSelectPlanet(foundPlanet);
      return;
    }
    const foundMission = MISSIONS_DATA.find((m) => m.id === targetId);
    if (foundMission) {
      handleSelectMission(foundMission);
    }
  }, [handleSelectPlanet, handleSelectMission]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetView();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleSound();
      } else if (e.key === 'Escape') {
        if (viewState === 'comparison' || viewState === 'learn_mode') {
          setViewState('overview');
        } else if (selectedPlanet || activeMission) {
          handleResetView();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePause, handleResetView, handleToggleSound, viewState, selectedPlanet, activeMission]);

  // Current normalized progress of the active milestone along trajectory
  const activeMilestoneProgress = useMemo(() => {
    if (!activeMission || activeMission.milestones.length === 0) return 0.5;
    const milestone = activeMission.milestones[activeMilestoneIdx];
    return milestone ? milestone.normalizedProgress : 0.5;
  }, [activeMission, activeMilestoneIdx]);

  if (!isWebGLAvailable) {
    return <WebGLFallback />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* Loading Sequence */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Hero Intro Sequence */}
      {viewState === 'intro' && (
        <IntroSequence
          onEnter={() => {
            setSoundEnabled(true);
            setViewState('overview');
          }}
        />
      )}

      {/* 3D WebGL Canvas (Permanent in background) */}
      <SolarSystemCanvas
        planets={PLANETS_DATA}
        selectedPlanet={selectedPlanet}
        activeMission={activeMission}
        activeMilestoneProgress={activeMilestoneProgress}
        scaleMode={scaleMode}
        simDays={simDays}
        showOrbits={showOrbits}
        showLabels={showLabels}
        showAsteroids={showAsteroids}
        showTrajectories={showTrajectories}
        quality={quality}
        resetViewTrigger={resetViewTrigger}
        onSelectPlanet={handleSelectPlanet}
      />

      {/* Floating Top Navigation */}
      <Navigation
        currentView={viewState}
        onViewChange={(view) => {
          if (view === 'overview') {
            handleResetView();
          } else if (view === 'mission_selected' && !activeMission) {
            handleSelectMission(MISSIONS_DATA.find((m) => m.id === 'apollo-11') || MISSIONS_DATA[0]);
          } else {
            setViewState(view);
          }
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetView={handleResetView}
        quality={quality}
        onQualityChange={setQuality}
      />

      {/* Time & Layer Control Panel */}
      {viewState !== 'intro' && viewState !== 'comparison' && viewState !== 'learn_mode' && (
        <ControlPanel
          isPaused={isPaused}
          speedMultiplier={speedMultiplier}
          simDateString={dateString}
          showOrbits={showOrbits}
          showLabels={showLabels}
          showAsteroids={showAsteroids}
          showTrajectories={showTrajectories}
          scaleMode={scaleMode}
          onTogglePause={togglePause}
          onSetSpeed={setSpeedMultiplier}
          onStepForward={() => stepForward(10)}
          onStepBackward={() => stepBackward(10)}
          onToggleOrbits={() => setShowOrbits((prev) => !prev)}
          onToggleLabels={() => setShowLabels((prev) => !prev)}
          onToggleAsteroids={() => setShowAsteroids((prev) => !prev)}
          onToggleTrajectories={() => setShowTrajectories((prev) => !prev)}
          onToggleScaleMode={() =>
            setScaleMode((prev) => (prev === 'educational' ? 'distance' : 'educational'))
          }
        />
      )}

      {/* Planet Telemetry Drawer Panel */}
      {viewState === 'planet_selected' && selectedPlanet && (
        <PlanetPanel
          planet={selectedPlanet}
          onClose={() => {
            setSelectedPlanet(null);
            setViewState('overview');
          }}
          onOpenComparison={handleOpenComparison}
        />
      )}

      {/* Mission Telemetry Drawer Panel */}
      {viewState === 'mission_selected' && activeMission && (
        <MissionPanel
          mission={activeMission}
          activeMilestoneIdx={activeMilestoneIdx}
          onSelectMilestone={setActiveMilestoneIdx}
          onClose={() => {
            setActiveMission(null);
            setViewState('overview');
          }}
        />
      )}

      {/* Historical Space Mission Timeline */}
      {viewState !== 'intro' && viewState !== 'comparison' && viewState !== 'learn_mode' && (
        <Timeline
          missions={MISSIONS_DATA}
          activeMission={activeMission}
          onSelectMission={handleSelectMission}
        />
      )}

      {/* Comparison Modal View */}
      {viewState === 'comparison' && (
        <ComparisonPanel
          planets={PLANETS_DATA}
          initialPlanetA={comparisonTarget}
          onClose={() => setViewState('overview')}
        />
      )}

      {/* Educational Learn Mode Modal */}
      {viewState === 'learn_mode' && (
        <LearnModal
          onClose={() => setViewState('overview')}
          onExploreTopicBody={handleExploreTopicBody}
        />
      )}

      {/* About Modal */}
      {viewState === 'intro' && (
        <div className="hidden" />
      )}
    </div>
  );
}
