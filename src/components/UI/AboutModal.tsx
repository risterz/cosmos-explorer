import { X, ShieldCheck, Database, Keyboard, Globe } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl glass-panel border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono text-white">
                About COSMOS
              </h2>
              <p className="text-xs text-slate-400">
                Interactive Solar System & Space Mission Explorer
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

        {/* Vision & Concept */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed mb-6">
          <p>
            <strong className="text-white">COSMOS</strong> is designed as a museum-grade interactive educational experience bridging real-time 3D planetary mechanics with humanity’s greatest milestones in space exploration.
          </p>

          {/* Data Sources */}
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex items-start gap-3">
            <Database className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-cyan-300 font-bold block mb-1">
                Verified Scientific Astronomical Data
              </span>
              <span>
                Planetary physical parameters, orbital eccentricities, semi-major axes, rotation periods, and mission trajectory milestones are derived from peer-reviewed NASA Planetary Fact Sheets, JPL Solar System Dynamics, and ESA mission archives.
              </span>
            </div>
          </div>

          {/* Privacy & Offline */}
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-emerald-300 font-bold block mb-1">
                Local Execution & 100% Privacy
              </span>
              <span>
                All orbital calculations, 3D WebGL rendering, and audio frequency synthesizers run directly in your local browser client. No personal data or tracking cookies are collected or stored.
              </span>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex items-start gap-3">
            <Keyboard className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="w-full">
              <span className="font-mono text-purple-300 font-bold block mb-2">
                Keyboard Controls
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Spacebar</span>
                  <span className="text-white">Pause / Resume Time</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">R</span>
                  <span className="text-white">Reset Camera</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">M</span>
                  <span className="text-white">Toggle Ambient Audio</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">Esc</span>
                  <span className="text-white">Close Active Panel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>© 2026 COSMOS Interactive</span>
          <span>Optimized for Cloudflare Pages</span>
        </div>
      </div>
    </div>
  );
}
