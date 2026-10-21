import { X, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { MissionData } from '../../types/mission';
import { audioEngine } from '../../utils/audioEngine';

interface MissionPanelProps {
  mission: MissionData | null;
  activeMilestoneIdx: number;
  onSelectMilestone: (idx: number) => void;
  onClose: () => void;
}

export function MissionPanel({
  mission,
  activeMilestoneIdx,
  onSelectMilestone,
  onClose
}: MissionPanelProps) {
  if (!mission) return null;

  return (
    <aside className="fixed top-20 right-4 bottom-24 z-30 w-full sm:w-[440px] max-h-[calc(100vh-11rem)] glass-panel rounded-3xl p-5 overflow-y-auto pointer-events-auto border border-amber-500/30 shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: mission.colorHex }}
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
              {mission.agency} • {mission.launchYear}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-mono">
            {mission.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{mission.tagline}</p>
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

      {/* Status & Destination */}
      <div className="grid grid-cols-2 gap-2 my-4 text-xs font-mono">
        <div className="p-2.5 rounded-xl glass-panel-subtle">
          <span className="text-[10px] text-slate-400 block">DESTINATION</span>
          <span className="text-slate-100 font-bold">{mission.destination}</span>
        </div>
        <div className="p-2.5 rounded-xl glass-panel-subtle">
          <span className="text-[10px] text-slate-400 block">STATUS</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {mission.status}
          </span>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
          Mission Overview
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">{mission.overview}</p>
      </div>

      {/* Interactive Milestones Sequence */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Mission Timeline Stages
          </h3>
          <span className="text-[10px] font-mono text-slate-500">
            Click stage to animate 3D trajectory
          </span>
        </div>

        <div className="space-y-2">
          {mission.milestones.map((milestone, idx) => {
            const isActive = activeMilestoneIdx === idx;
            return (
              <div
                key={milestone.id}
                onClick={() => {
                  audioEngine.playClickPing();
                  onSelectMilestone(idx);
                }}
                className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                  isActive
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isActive ? 'text-cyan-300' : 'text-slate-200'
                      }`}
                    >
                      {milestone.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                    {milestone.date}
                  </span>
                </div>
                {isActive && (
                  <p className="text-xs text-slate-300 mt-2 pl-7 leading-relaxed border-t border-cyan-900/40 pt-2 animate-in fade-in">
                    {milestone.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Achievements */}
      <div className="mb-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Major Achievements</span>
        </h3>
        <ul className="space-y-1.5">
          {mission.achievements.map((ach, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-300 leading-relaxed flex items-start gap-2 bg-slate-900/20 p-2 rounded-xl"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{ach}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scientific Impact */}
      <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs">
        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
          Enduring Scientific Impact
        </span>
        <p className="text-slate-300 leading-relaxed">{mission.scientificImpact}</p>
      </div>
    </aside>
  );
}
