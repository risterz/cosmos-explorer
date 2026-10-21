import { useRef } from 'react';
import { ArrowRight, Compass, Sparkles, Orbit } from 'lucide-react';
import gsap from 'gsap';
import { audioEngine } from '../../utils/audioEngine';

interface IntroSequenceProps {
  onEnter: () => void;
}

export function IntroSequence({ onEnter }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnterClick = () => {
    audioEngine.playClickPing();
    audioEngine.setMuted(false); // Enable ambient space drone

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: onEnter
      });
    } else {
      onEnter();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-radial-at-c from-transparent via-slate-950/60 to-slate-950/90 pointer-events-auto select-none"
    >
      <div className="max-w-2xl text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-6 shadow-lg shadow-cyan-500/10">
          <Orbit className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Interactive 3D WebGL Exhibition</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 font-mono uppercase mb-3">
          COSMOS
        </h1>

        <h2 className="text-sm sm:text-base font-mono tracking-widest uppercase text-cyan-400 mb-6">
          Solar System & Space Mission Explorer
        </h2>

        {/* Cinematic Description */}
        <p className="text-sm sm:text-base text-slate-300 font-sans max-w-lg leading-relaxed mb-10">
          Travel through our celestial neighborhood. Discover the planets, Keplerian orbital mechanics, and humanity’s greatest missions that unlocked deep space.
        </p>

        {/* Call to Action Button */}
        <button
          onClick={handleEnterClick}
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 text-white font-mono font-bold text-sm tracking-wider uppercase shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3"
        >
          <Compass className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-300" />
          <span>Enter the Cosmos</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real-time Orbits</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Apollo, Voyager & JWST</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Scale Comparison</span>
          </div>
        </div>
      </div>
    </div>
  );
}
