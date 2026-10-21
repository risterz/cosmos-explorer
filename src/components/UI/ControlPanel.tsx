import { Play, Pause, FastForward, Rewind, Layers, Eye, Compass } from 'lucide-react';
import { ScaleMode } from '../../types/scene';
import { audioEngine } from '../../utils/audioEngine';

interface ControlPanelProps {
  isPaused: boolean;
  speedMultiplier: number;
  simDateString: string;
  showOrbits: boolean;
  showLabels: boolean;
  showAsteroids: boolean;
  showTrajectories: boolean;
  scaleMode: ScaleMode;
  onTogglePause: () => void;
  onSetSpeed: (speed: number) => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onToggleOrbits: () => void;
  onToggleLabels: () => void;
  onToggleAsteroids: () => void;
  onToggleTrajectories: () => void;
  onToggleScaleMode: () => void;
}

export function ControlPanel({
  isPaused,
  speedMultiplier,
  simDateString,
  showOrbits,
  showLabels,
  showAsteroids,
  showTrajectories,
  scaleMode,
  onTogglePause,
  onSetSpeed,
  onStepForward,
  onStepBackward,
  onToggleOrbits,
  onToggleLabels,
  onToggleAsteroids,
  onToggleTrajectories,
  onToggleScaleMode
}: ControlPanelProps) {
  const speeds = [1, 10, 50, 200];

  return (
    <div className="fixed bottom-4 left-4 z-30 flex flex-col gap-2 max-w-[calc(100vw-2rem)] sm:max-w-md pointer-events-auto">
      {/* Simulation Time HUD Bar */}
      <div className="glass-panel p-2.5 sm:p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Date Readout */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
              Simulation Epoch
            </div>
            <div className="font-mono font-semibold text-slate-100 text-xs sm:text-sm">
              {simDateString}
            </div>
          </div>
        </div>

        {/* Play/Pause & Speed Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              audioEngine.playClickPing();
              onStepBackward();
            }}
            title="Step Back 10 Days"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <Rewind className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              audioEngine.playClickPing();
              onTogglePause();
            }}
            title={isPaused ? 'Resume Simulation' : 'Pause Simulation'}
            className="p-1.5 px-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors flex items-center gap-1 font-mono text-xs"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            <span>{isPaused ? 'PAUSED' : `${speedMultiplier}x`}</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClickPing();
              onStepForward();
            }}
            title="Step Forward 10 Days"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>

          {/* Speed Presets */}
          <div className="flex items-center ml-1 border-l border-slate-700/60 pl-1 gap-0.5 font-mono text-[11px]">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => {
                  audioEngine.playClickPing();
                  onSetSpeed(s);
                }}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  speedMultiplier === s && !isPaused
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggles Bar: Orbits, Labels, Asteroids, Scale */}
      <div className="glass-panel p-2 rounded-xl flex items-center justify-between gap-1 text-[11px] overflow-x-auto">
        <button
          onClick={() => {
            audioEngine.playClickPing();
            onToggleOrbits();
          }}
          className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
            showOrbits ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>Orbits</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playClickPing();
            onToggleLabels();
          }}
          className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
            showLabels ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Labels</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playClickPing();
            onToggleAsteroids();
          }}
          className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
            showAsteroids ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Asteroids</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playClickPing();
            onToggleTrajectories();
          }}
          className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
            showTrajectories ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Trajectories</span>
        </button>

        {/* Scale Mode Switcher */}
        <button
          onClick={() => {
            audioEngine.playClickPing();
            onToggleScaleMode();
          }}
          title={
            scaleMode === 'educational'
              ? 'Currently in Educational Scale (clear planet visibility)'
              : 'Currently in Logarithmic Distance Scale'
          }
          className="ml-auto px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/40 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 flex items-center gap-1 whitespace-nowrap"
        >
          <Compass className="w-3 h-3 text-cyan-400" />
          <span className="font-mono text-[10px]">
            {scaleMode === 'educational' ? 'EDU SCALE' : 'DIST SCALE'}
          </span>
        </button>
      </div>
    </div>
  );
}
