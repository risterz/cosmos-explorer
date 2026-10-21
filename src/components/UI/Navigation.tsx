import { Globe, Compass, BarChart3, BookOpen, Info, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { QualityLevel, ViewState } from '../../types/scene';
import { audioEngine } from '../../utils/audioEngine';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetView: () => void;
  quality: QualityLevel;
  onQualityChange: (q: QualityLevel) => void;
}

export function Navigation({
  currentView,
  onViewChange,
  soundEnabled,
  onToggleSound,
  onResetView,
  quality,
  onQualityChange
}: NavigationProps) {
  const handleNavClick = (view: ViewState) => {
    audioEngine.playClickPing();
    onViewChange(view);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('overview')}
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-2xl glass-panel cursor-pointer hover:border-cyan-500/40 transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-amber-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-widest text-white uppercase font-mono flex items-center gap-1.5">
              COSMOS
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-normal">
                3D
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
              Solar System & Missions
            </div>
          </div>
        </div>

        {/* View Mode Navigation Pills */}
        <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl glass-panel">
          <button
            onClick={() => handleNavClick('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              currentView === 'overview' || currentView === 'planet_selected'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Solar System</span>
          </button>

          <button
            onClick={() => handleNavClick('mission_selected')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              currentView === 'mission_selected'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Missions</span>
          </button>

          <button
            onClick={() => handleNavClick('comparison')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              currentView === 'comparison'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Compare</span>
          </button>

          <button
            onClick={() => handleNavClick('learn_mode')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              currentView === 'learn_mode'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Learn</span>
          </button>
        </nav>

        {/* Global Controls: Reset View, Audio, Quality, About */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Reset Camera View */}
          <button
            onClick={() => {
              audioEngine.playClickPing();
              onResetView();
            }}
            title="Reset to Solar System Overview"
            className="p-2 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Ambient Soundscape' : 'Enable Ambient Soundscape'}
            className={`p-2 rounded-xl glass-panel transition-colors ${
              soundEnabled
                ? 'text-cyan-400 border border-cyan-500/40 bg-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quality Selector */}
          <div className="hidden sm:flex items-center p-1 rounded-xl glass-panel text-xs">
            {(['high', 'medium', 'low'] as QualityLevel[]).map((q) => (
              <button
                key={q}
                onClick={() => {
                  audioEngine.playClickPing();
                  onQualityChange(q);
                }}
                className={`px-2 py-0.5 rounded-lg capitalize text-[11px] font-mono transition-all ${
                  quality === q
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* About / Info */}
          <button
            onClick={() => {
              audioEngine.playClickPing();
              handleNavClick('intro');
            }}
            title="About COSMOS & Documentation"
            className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
