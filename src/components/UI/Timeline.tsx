import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Rocket } from 'lucide-react';
import { MissionData } from '../../types/mission';
import { audioEngine } from '../../utils/audioEngine';

interface TimelineProps {
  missions: MissionData[];
  activeMission: MissionData | null;
  onSelectMission: (mission: MissionData) => void;
}

export function Timeline({ missions, activeMission, onSelectMission }: TimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 pointer-events-none">
      <div className="glass-panel p-2.5 sm:p-3 rounded-3xl pointer-events-auto border border-slate-700/60 shadow-2xl relative">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-2">
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Space Exploration Timeline (1957–Present)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Missions Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scroll-smooth"
        >
          {missions.map((m) => {
            const isSelected = activeMission?.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => {
                  audioEngine.playClickPing();
                  onSelectMission(m);
                }}
                className={`flex-shrink-0 p-2.5 rounded-2xl cursor-pointer border transition-all text-left w-48 sm:w-52 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span
                    className="font-bold px-1.5 py-0.2 rounded"
                    style={{
                      backgroundColor: `${m.colorHex}25`,
                      color: m.colorHex
                    }}
                  >
                    {m.launchYear}
                  </span>
                  <span className="text-slate-400 truncate max-w-[100px]">
                    {m.destination}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-100 truncate">
                  {m.name}
                </div>

                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {m.agency}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
