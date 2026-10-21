import { useRef } from 'react';
import * as THREE from 'three';
import { PlanetData } from '../../types/planet';
import { MissionData } from '../../types/mission';
import { ScaleMode } from '../../types/scene';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { OrbitPath } from './OrbitPath';
import { AsteroidBelt } from './AsteroidBelt';
import { StarField } from './StarField';
import { MissionTrajectory } from './MissionTrajectory';

interface SolarSystemProps {
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
  onSelectPlanet: (planet: PlanetData) => void;
  onPositionUpdate: (id: string, pos: THREE.Vector3) => void;
}

export function SolarSystem({
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
  onSelectPlanet,
  onPositionUpdate
}: SolarSystemProps) {
  const sunData = useRef(planets.find(p => p.id === 'sun') || planets[0]).current;
  const nonSunPlanets = useRef(planets.filter(p => p.id !== 'sun')).current;

  return (
    <group>
      {/* Background Starfield */}
      <StarField count={2800} />

      {/* The Sun */}
      <Sun
        radius={sunData.relativeRadius}
        isSelected={selectedPlanet?.id === 'sun'}
        onSelect={() => onSelectPlanet(sunData)}
      />

      {/* Orbit Lines for each planet */}
      {showOrbits &&
        nonSunPlanets.map((planet) => {
          const r = scaleMode === 'educational' ? planet.orbitalRadiusEdu : planet.orbitalRadiusReal;
          return (
            <OrbitPath
              key={`orbit-${planet.id}`}
              radius={r}
              color={planet.colorHex}
              visible={showOrbits}
            />
          );
        })}

      {/* Asteroid Belt */}
      {showAsteroids && <AsteroidBelt count={1100} />}

      {/* Planets */}
      {nonSunPlanets.map((planet) => (
        <Planet
          key={planet.id}
          data={planet}
          scaleMode={scaleMode}
          simDays={simDays}
          isSelected={selectedPlanet?.id === planet.id}
          showLabels={showLabels}
          onSelect={onSelectPlanet}
          onPositionUpdate={onPositionUpdate}
        />
      ))}

      {/* Active Space Mission Trajectory */}
      {showTrajectories && activeMission && activeMission.trajectoryKey && (
        <MissionTrajectory
          type={activeMission.trajectoryKey}
          progress={activeMilestoneProgress}
          colorHex={activeMission.colorHex}
        />
      )}
    </group>
  );
}
