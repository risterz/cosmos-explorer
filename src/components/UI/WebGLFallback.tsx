import { useState } from 'react';
import { AlertCircle, Globe, Rocket } from 'lucide-react';
import { PLANETS_DATA } from '../../data/planets';
import { MISSIONS_DATA } from '../../data/missions';
import { formatNumber, formatDistanceKm } from '../../utils/formatting';

export function WebGLFallback() {
  const [tab, setTab] = useState<'planets' | 'missions'>('planets');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Fallback Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 mb-8">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold font-mono text-amber-300 uppercase">
              3D Experience Unavailable
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Your browser or graphics hardware does not currently support WebGL hardware acceleration. You can still explore the complete educational encyclopedia of planets, physical parameters, and historical space missions below.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-mono tracking-wider uppercase mb-2">
            COSMOS Explorer
          </h1>
          <p className="text-sm text-slate-400">
            Educational Encyclopedia of the Solar System & Space History
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setTab('planets')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                tab === 'planets'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Planetary Bodies ({PLANETS_DATA.length})</span>
            </button>

            <button
              onClick={() => setTab('missions')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                tab === 'missions'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>Space Missions ({MISSIONS_DATA.length})</span>
            </button>
          </div>
        </div>

        {/* Content Tab */}
        {tab === 'planets' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLANETS_DATA.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: p.colorHex }}
                    />
                    <span className="text-[10px] font-mono uppercase text-cyan-400">
                      {p.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-mono text-white mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">{p.tagline}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {p.overview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono border-t border-slate-800/80 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block">DIAMETER</span>
                    <span className="text-slate-200">{formatNumber(p.radiusKm * 2)} km</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">DISTANCE</span>
                    <span className="text-slate-200">{p.distanceAU} AU ({formatDistanceKm(p.distanceFromSunKm)})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISSIONS_DATA.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                      {m.launchYear}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {m.agency}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-mono text-white mb-1">
                    {m.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">{m.tagline}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {m.overview}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3 text-xs font-mono">
                  <span className="text-[10px] text-slate-500 block mb-1">DESTINATION</span>
                  <span className="text-amber-300 font-bold">{m.destination}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
