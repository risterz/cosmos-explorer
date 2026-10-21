import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import gsap from 'gsap';
import { PlanetData } from '../../types/planet';
import { MissionData } from '../../types/mission';
import { QualityLevel, ScaleMode } from '../../types/scene';
import { SolarSystem } from './SolarSystem';
import { audioEngine } from '../../utils/audioEngine';

interface CameraControllerProps {
  selectedPlanet: PlanetData | null;
  activeMission: MissionData | null;
  resetViewTrigger: number;
  planetPositionsRef: React.MutableRefObject<Map<string, THREE.Vector3>>;
}

function CameraController({
  selectedPlanet,
  activeMission,
  resetViewTrigger,
  planetPositionsRef
}: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const currentTweenRef = useRef<gsap.core.Tween | null>(null);

  // Animate camera to overview / reset
  const animateTo = (
    targetPos: THREE.Vector3,
    lookAtPos: THREE.Vector3,
    duration: number = 2.2
  ) => {
    if (currentTweenRef.current) {
      currentTweenRef.current.kill();
    }

    audioEngine.playTransitionWhoosh();

    const controls = controlsRef.current;
    if (!controls) return;

    // Temporary object to interpolate
    const animObj = {
      camX: camera.position.x,
      camY: camera.position.y,
      camZ: camera.position.z,
      tarX: controls.target.x,
      tarY: controls.target.y,
      tarZ: controls.target.z
    };

    currentTweenRef.current = gsap.to(animObj, {
      camX: targetPos.x,
      camY: targetPos.y,
      camZ: targetPos.z,
      tarX: lookAtPos.x,
      tarY: lookAtPos.y,
      tarZ: lookAtPos.z,
      duration,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.position.set(animObj.camX, animObj.camY, animObj.camZ);
        controls.target.set(animObj.tarX, animObj.tarY, animObj.tarZ);
        controls.update();
      }
    });
  };

  // React to selected planet changes
  useEffect(() => {
    if (!selectedPlanet) return;

    if (selectedPlanet.id === 'sun') {
      animateTo(new THREE.Vector3(0, 15, 26), new THREE.Vector3(0, 0, 0), 2.0);
      return;
    }

    const livePos = planetPositionsRef.current.get(selectedPlanet.id);
    const targetLookAt = livePos ? livePos.clone() : new THREE.Vector3(0, 0, 0);

    // Camera offset based on planet size
    const distanceOffset = Math.max(selectedPlanet.relativeRadius * 3.4, 4.5);
    const targetCamPos = targetLookAt.clone().add(new THREE.Vector3(0, distanceOffset * 0.6, distanceOffset));

    animateTo(targetCamPos, targetLookAt, 2.2);
  }, [selectedPlanet]);

  // React to active mission changes
  useEffect(() => {
    if (!activeMission) return;

    if (activeMission.trajectoryKey === 'apollo11') {
      // Focus on Earth-Moon system
      const earthPos = planetPositionsRef.current.get('earth') || new THREE.Vector3(26, 0, 14);
      const targetCam = earthPos.clone().add(new THREE.Vector3(6, 4, 10));
      animateTo(targetCam, earthPos, 2.4);
    } else if (activeMission.trajectoryKey === 'voyager1') {
      // Wide perspective looking outward to interstellar boundary
      animateTo(new THREE.Vector3(75, 45, 110), new THREE.Vector3(60, 15, -20), 2.8);
    } else if (activeMission.trajectoryKey === 'voyager2') {
      animateTo(new THREE.Vector3(80, 50, 120), new THREE.Vector3(65, 0, 45), 2.8);
    } else if (activeMission.trajectoryKey === 'jwst') {
      // Focus on L2 region near Earth
      const earthPos = planetPositionsRef.current.get('earth') || new THREE.Vector3(26, 0, 14);
      const l2Pos = earthPos.clone().add(new THREE.Vector3(5, 0, 3));
      animateTo(l2Pos.clone().add(new THREE.Vector3(3, 2, 4)), l2Pos, 2.2);
    } else {
      // Focus on target planet
      const planetPos = planetPositionsRef.current.get(activeMission.primaryTargetId);
      if (planetPos) {
        animateTo(planetPos.clone().add(new THREE.Vector3(0, 8, 12)), planetPos, 2.2);
      }
    }
  }, [activeMission]);

  // React to Reset View trigger
  useEffect(() => {
    if (resetViewTrigger > 0) {
      animateTo(new THREE.Vector3(0, 65, 115), new THREE.Vector3(0, 0, 0), 2.2);
    }
  }, [resetViewTrigger]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={3.5}
      maxDistance={450}
      maxPolarAngle={Math.PI / 2 + 0.15}
    />
  );
}

interface SolarSystemCanvasProps {
  planets: PlanetData[];
  selectedPlanet: PlanetData | null;
  activeMission: MissionData | null;
  activeMilestoneProgress: number;
  scaleMode: ScaleMode;
  simDays: number;
  showOrbits: boolean;
  showLabels: boolean;
  showAsteroids: boolean;
  showTrajectories: boolean;
  quality: QualityLevel;
  resetViewTrigger: number;
  onSelectPlanet: (planet: PlanetData) => void;
}

export function SolarSystemCanvas({
  planets,
  selectedPlanet,
  activeMission,
  activeMilestoneProgress,
  scaleMode,
  simDays,
  showOrbits,
  showLabels,
  showAsteroids,
  showTrajectories,
  quality,
  resetViewTrigger,
  onSelectPlanet
}: SolarSystemCanvasProps) {
  const planetPositionsRef = useRef<Map<string, THREE.Vector3>>(new Map());

  const handlePositionUpdate = (id: string, pos: THREE.Vector3) => {
    planetPositionsRef.current.set(id, pos.clone());
  };

  const dpr = quality === 'high' ? Math.min(window.devicePixelRatio, 2) : quality === 'medium' ? 1.5 : 1;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 65, 115], fov: 45, near: 0.1, far: 2000 }}
        dpr={dpr}
        gl={{
          antialias: quality !== 'low',
          powerPreference: 'high-performance',
          alpha: false
        }}
      >
        <CameraController
          selectedPlanet={selectedPlanet}
          activeMission={activeMission}
          resetViewTrigger={resetViewTrigger}
          planetPositionsRef={planetPositionsRef}
        />
        <SolarSystem
          planets={planets}
          selectedPlanet={selectedPlanet}
          activeMission={activeMission}
          activeMilestoneProgress={activeMilestoneProgress}
          scaleMode={scaleMode}
          simDays={simDays}
          showOrbits={showOrbits}
          showLabels={showLabels}
          showAsteroids={showAsteroids}
          showTrajectories={showTrajectories}
          onSelectPlanet={onSelectPlanet}
          onPositionUpdate={handlePositionUpdate}
        />
      </Canvas>
    </div>
  );
}
