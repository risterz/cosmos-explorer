import { useState } from 'react';
import { X, ArrowLeftRight, Orbit, Scale, Thermometer } from 'lucide-react';
import { PlanetData } from '../../types/planet';
import { formatNumber, formatDistanceKm, formatPeriod, formatRotation } from '../../utils/formatting';
import { audioEngine } from '../../utils/audioEngine';

interface ComparisonPanelProps {
  planets: PlanetData[];
  initialPlanetA?: PlanetData;
  onClose: () => void;
}

export function ComparisonPanel({
  planets,
  initialPlanetA,
  onClose
}: ComparisonPanelProps) {
  // Exclude the Sun from direct planetary scale comparisons
  const compareList = planets.filter((p) => p.id !== 'sun');

  const [planetA, setPlanetA] = useState<PlanetData>(
    initialPlanetA && initialPlanetA.id !== 'sun'
      ? initialPlanetA
      : compareList.find((p) => p.id === 'earth') || compareList[0]
  );

  const [planetB, setPlanetB] = useState<PlanetData>(
    compareList.find((p) => p.id === 'jupiter') || compareList[1]
  );

  // Compute visual relative size circle percentages
  const maxRadius = Math.max(planetA.radiusKm, planetB.radiusKm);
  const sizePercentA = (planetA.radiusKm / maxRadius) * 100;
  const sizePercentB = (planetB.radiusKm / maxRadius) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl glass-panel border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono text-white">
                Planetary Scale & Physics Comparison
              </h2>
              <p className="text-xs text-slate-400">
                True relative physical scale and astronomical metrics
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playClickPing();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Planet Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
              Select Body 1
            </label>
            <select
              value={planetA.id}
              onChange={(e) => {
                audioEngine.playClickPing();
                const found = compareList.find((p) => p.id === e.target.value);
                if (found) setPlanetA(found);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400"
            >
              {compareList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
              Select Body 2
            </label>
            <select
              value={planetB.id}
              onChange={(e) => {
                audioEngine.playClickPing();
                const found = compareList.find((p) => p.id === e.target.value);
                if (found) setPlanetB(found);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400"
            >
              {compareList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Scale Display (Side-by-side circles) */}
        <div className="glass-panel-subtle rounded-3xl p-6 sm:p-8 mb-8 flex items-center justify-around h-64 border border-slate-800 relative overflow-hidden">
          {/* Planet A Circle */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 border border-white/20"
              style={{
                width: `${Math.max(sizePercentA * 2, 28)}px`,
                height: `${Math.max(sizePercentA * 2, 28)}px`,
                maxHeight: '180px',
                maxWidth: '180px',
                backgroundColor: planetA.colorHex,
                boxShadow: `0 0 30px ${planetA.colorHex}40`
              }}
            />
            <span className="text-sm font-bold font-mono text-white mt-3 block">
              {planetA.name}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {formatNumber(planetA.radiusKm * 2)} km
            </span>
          </div>

          <div className="text-slate-600 font-mono text-sm">VS</div>

          {/* Planet B Circle */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 border border-white/20"
              style={{
                width: `${Math.max(sizePercentB * 2, 28)}px`,
                height: `${Math.max(sizePercentB * 2, 28)}px`,
                maxHeight: '180px',
                maxWidth: '180px',
                backgroundColor: planetB.colorHex,
                boxShadow: `0 0 30px ${planetB.colorHex}40`
              }}
            />
            <span className="text-sm font-bold font-mono text-white mt-3 block">
              {planetB.name}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {formatNumber(planetB.radiusKm * 2)} km
            </span>
          </div>
        </div>

        {/* Comparative Metrics Table */}
        <div className="space-y-3 font-mono text-xs">
          {/* Diameter */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {formatNumber(planetA.radiusKm * 2)} km
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px] flex items-center justify-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Diameter</span>
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {formatNumber(planetB.radiusKm * 2)} km
            </div>
          </div>

          {/* Surface Gravity */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {planetA.gravityMs2} m/s² ({(planetA.gravityMs2 / 9.807).toFixed(2)}g)
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px]">
              Surface Gravity
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {planetB.gravityMs2} m/s² ({(planetB.gravityMs2 / 9.807).toFixed(2)}g)
            </div>
          </div>

          {/* Mass Relative to Earth */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {planetA.relativeMass}x Earth
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px]">
              Mass
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {planetB.relativeMass}x Earth
            </div>
          </div>

          {/* Distance from Sun */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {planetA.distanceAU} AU ({formatDistanceKm(planetA.distanceFromSunKm)})
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px]">
              Sun Distance
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {planetB.distanceAU} AU ({formatDistanceKm(planetB.distanceFromSunKm)})
            </div>
          </div>

          {/* Orbital Period */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {formatPeriod(planetA.orbitalPeriodDays)}
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px] flex items-center justify-center gap-1">
              <Orbit className="w-3.5 h-3.5" />
              <span>Orbit Period</span>
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {formatPeriod(planetB.orbitalPeriodDays)}
            </div>
          </div>

          {/* Day Length */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {formatRotation(planetA.rotationPeriodHours)}
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px]">
              Day Length
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {formatRotation(planetB.rotationPeriodHours)}
            </div>
          </div>

          {/* Mean Temperature */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {planetA.meanTempC > 0 ? `+${planetA.meanTempC}°C` : `${planetA.meanTempC}°C`}
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px] flex items-center justify-center gap-1">
              <Thermometer className="w-3.5 h-3.5" />
              <span>Mean Temp</span>
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {planetB.meanTempC > 0 ? `+${planetB.meanTempC}°C` : `${planetB.meanTempC}°C`}
            </div>
          </div>

          {/* Known Moons */}
          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center justify-between">
            <div className="w-1/3 text-cyan-300 font-bold">
              {planetA.moonsCount} moons
            </div>
            <div className="w-1/3 text-center text-slate-400 uppercase text-[11px]">
              Known Moons
            </div>
            <div className="w-1/3 text-right text-amber-300 font-bold">
              {planetB.moonsCount} moons
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
