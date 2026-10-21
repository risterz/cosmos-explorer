import { X, Sparkles, Rocket, Thermometer, Orbit, Scale, Compass, ArrowRight } from 'lucide-react';
import { PlanetData } from '../../types/planet';
import { formatNumber, formatDistanceKm, formatPeriod, formatRotation } from '../../utils/formatting';
import { audioEngine } from '../../utils/audioEngine';

interface PlanetPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
  onOpenComparison: (planet: PlanetData) => void;
}

export function PlanetPanel({ planet, onClose, onOpenComparison }: PlanetPanelProps) {
  if (!planet) return null;

  return (
    <aside className="fixed top-20 right-4 bottom-20 z-30 w-full sm:w-[420px] max-h-[calc(100vh-10rem)] glass-panel rounded-3xl p-5 overflow-y-auto pointer-events-auto border border-slate-700/60 shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: planet.colorHex }}
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
              {planet.type.replace('_', ' ')}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-mono">
            {planet.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{planet.tagline}</p>
        </div>

        <button
          onClick={() => {
            audioEngine.playClickPing();
            onClose();
          }}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 my-4">
        <div className="p-3 rounded-2xl glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mb-1">
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIAMETER</span>
          </div>
          <div className="text-sm font-bold text-slate-100 font-mono">
            {formatNumber(planet.radiusKm * 2)} km
          </div>
          <div className="text-[10px] text-slate-500">
            {( (planet.radiusKm * 2) / 12742 ).toFixed(2)}x Earth
          </div>
        </div>

        <div className="p-3 rounded-2xl glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>DISTANCE</span>
          </div>
          <div className="text-sm font-bold text-slate-100 font-mono">
            {planet.distanceAU > 0 ? `${planet.distanceAU.toFixed(2)} AU` : '0 AU'}
          </div>
          <div className="text-[10px] text-slate-500">
            {planet.distanceFromSunKm > 0 ? formatDistanceKm(planet.distanceFromSunKm) : 'Solar Center'}
          </div>
        </div>

        <div className="p-3 rounded-2xl glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mb-1">
            <Orbit className="w-3.5 h-3.5 text-purple-400" />
            <span>ORBIT PERIOD</span>
          </div>
          <div className="text-xs font-bold text-slate-100 font-mono">
            {formatPeriod(planet.orbitalPeriodDays)}
          </div>
        </div>

        <div className="p-3 rounded-2xl glass-panel-subtle">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mb-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>MEAN TEMP</span>
          </div>
          <div className="text-sm font-bold text-slate-100 font-mono">
            {planet.meanTempC > 0 ? `+${planet.meanTempC}°C` : `${planet.meanTempC}°C`}
          </div>
          <div className="text-[10px] text-slate-500">
            Gravity: {planet.gravityMs2} m/s²
          </div>
        </div>
      </div>

      {/* Rotation & Moons Bar */}
      <div className="p-3 rounded-2xl glass-panel-subtle mb-4 flex items-center justify-between text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-400 block">ROTATION (SOLAR DAY)</span>
          <span className="text-slate-200">{formatRotation(planet.rotationPeriodHours)}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">KNOWN MOONS</span>
          <span className="text-cyan-300 font-bold">{planet.moonsCount}</span>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
          Planetary Overview
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">{planet.overview}</p>
      </div>

      {/* Geology & Composition */}
      <div className="mb-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
          Geology & Structure
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">{planet.geology}</p>
      </div>

      {/* Atmosphere breakdown if present */}
      {planet.atmosphere && (
        <div className="mb-4 p-3 rounded-2xl bg-slate-900/40 border border-slate-800">
          <h3 className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
            Atmospheric Composition
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {planet.atmosphere.composition.map((gas, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono"
              >
                {gas}
              </span>
            ))}
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-2">
            Surface Pressure: {planet.atmosphere.pressure}
          </div>
        </div>
      )}

      {/* Scientific Trivia & Fun Facts */}
      <div className="mb-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Scientific Highlights</span>
        </h3>
        <ul className="space-y-2">
          {planet.funFacts.map((fact, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 p-2.5 rounded-xl border border-slate-800/60"
            >
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* Exploration Highlights */}
      {planet.explorationHighlights.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-2">
            <Rocket className="w-3.5 h-3.5" />
            <span>Exploration History</span>
          </h3>
          <ul className="space-y-1.5">
            {planet.explorationHighlights.map((highlight, idx) => (
              <li
                key={idx}
                className="text-[11px] text-slate-300 leading-relaxed border-l-2 border-blue-500/50 pl-2.5"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comparison Mode Shortcut CTA */}
      <button
        onClick={() => {
          audioEngine.playClickPing();
          onOpenComparison(planet);
        }}
        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono flex items-center justify-center gap-2 transition-all"
      >
        <span>Compare {planet.name} with Other Planets</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
