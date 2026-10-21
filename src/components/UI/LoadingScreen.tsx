import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('Initializing celestial coordinate system...');

  useEffect(() => {
    const stages = [
      { p: 25, text: 'Synthesizing procedural planetary surface maps...' },
      { p: 55, text: 'Compiling GLSL solar noise & plasma shaders...' },
      { p: 80, text: 'Calibrating Keplerian orbital mechanics...' },
      { p: 100, text: 'Entering the Cosmos...' }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < stages.length) {
        setProgress(stages[currentIdx].p);
        setStatusText(stages[currentIdx].text);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        {/* Animated Globe Badge */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-amber-500 flex items-center justify-center shadow-2xl shadow-cyan-500/20 mb-6 animate-pulse">
          <Globe className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-2xl font-bold font-mono tracking-widest text-white uppercase mb-1">
          COSMOS
        </h1>
        <p className="text-xs text-slate-400 font-mono tracking-wider mb-8">
          Solar System & Space Mission Explorer
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-3">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Readout */}
        <div className="flex items-center justify-between w-full text-[11px] font-mono text-slate-500 mb-2">
          <span>{statusText}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
