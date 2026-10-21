import { useState, useRef, useEffect, useCallback } from 'react';
import { getSimulationDate } from '../utils/astronomy';

export interface SimulationTimeState {
  simDays: number;
  speedMultiplier: number;
  isPaused: boolean;
  dateString: string;
  setSpeedMultiplier: (speed: number) => void;
  togglePause: () => void;
  resetTime: () => void;
  stepForward: (days?: number) => void;
  stepBackward: (days?: number) => void;
}

export function useSimulationTime(): SimulationTimeState {
  const [speedMultiplier, setSpeedMultiplierState] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [simDays, setSimDays] = useState<number>(0);
  
  // Baseline date: March 21, 2026 (Vernal Equinox)
  const baseDateMs = useRef<number>(new Date('2026-03-21T00:00:00Z').getTime()).current;
  const lastTimeRef = useRef<number>(performance.now());
  const simDaysRef = useRef<number>(0);

  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const deltaSec = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!isPaused && deltaSec > 0 && deltaSec < 1) {
        // 1 second real-time = 1 Earth day at 1x speed
        const deltaDays = deltaSec * speedMultiplier;
        simDaysRef.current += deltaDays;
        setSimDays(simDaysRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isPaused, speedMultiplier]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const setSpeedMultiplier = useCallback((speed: number) => {
    setSpeedMultiplierState(speed);
    if (isPaused) setIsPaused(false);
  }, [isPaused]);

  const resetTime = useCallback(() => {
    simDaysRef.current = 0;
    setSimDays(0);
  }, []);

  const stepForward = useCallback((days: number = 10) => {
    simDaysRef.current += days;
    setSimDays(simDaysRef.current);
  }, []);

  const stepBackward = useCallback((days: number = 10) => {
    simDaysRef.current = Math.max(0, simDaysRef.current - days);
    setSimDays(simDaysRef.current);
  }, []);

  const dateString = getSimulationDate(baseDateMs, simDays);

  return {
    simDays,
    speedMultiplier,
    isPaused,
    dateString,
    setSpeedMultiplier,
    togglePause,
    resetTime,
    stepForward,
    stepBackward
  };
}
