import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../../types/planet';
import { ScaleMode } from '../../types/scene';
import { calculateOrbitPosition } from '../../utils/astronomy';
import {
  getEarthTexture,
  getEarthCloudsTexture,
  getJupiterTexture,
  getSaturnTexture,
  getMarsTexture,
  getMoonTexture,
  getGenericPlanetTexture
} from '../../utils/proceduralTextures';
import { PlanetRing } from './PlanetRing';

interface PlanetProps {
  data: PlanetData;
  scaleMode: ScaleMode;
  simDays: number;
  isSelected: boolean;
  showLabels: boolean;
  onSelect: (planet: PlanetData) => void;
  onPositionUpdate?: (planetId: string, position: THREE.Vector3) => void;
}

export function Planet({
  data,
  scaleMode,
  simDays,
  isSelected,
  showLabels,
  onSelect,
  onPositionUpdate
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const moonGroupRef = useRef<THREE.Group>(null);

  const orbitalRadius = scaleMode === 'educational' ? data.orbitalRadiusEdu : data.orbitalRadiusReal;

  // Retrieve or generate appropriate texture
  const planetTexture = useMemo(() => {
    switch (data.id) {
      case 'earth':
        return getEarthTexture();
      case 'jupiter':
        return getJupiterTexture();
      case 'saturn':
        return getSaturnTexture();
      case 'mars':
        return getMarsTexture();
      case 'moon':
        return getMoonTexture();
      default:
        return getGenericPlanetTexture(data.colorHex);
    }
  }, [data.id, data.colorHex]);

  const cloudsTexture = useMemo(() => {
    return data.id === 'earth' ? getEarthCloudsTexture() : null;
  }, [data.id]);

  // Initial phase offset to stagger planets around the Sun
  const initialPhase = useMemo(() => {
    const phases: Record<string, number> = {
      mercury: 0.8,
      venus: 2.1,
      earth: 3.6,
      moon: 3.6,
      mars: 5.2,
      jupiter: 1.4,
      saturn: 4.3,
      uranus: 0.5,
      neptune: 2.9,
      pluto: 4.9
    };
    return phases[data.id] || 0;
  }, [data.id]);

  useFrame((_, delta) => {
    // 1. Update orbital position
    if (groupRef.current && orbitalRadius > 0) {
      const pos = calculateOrbitPosition(
        orbitalRadius,
        data.orbitalPeriodDays,
        simDays,
        initialPhase
      );
      groupRef.current.position.copy(pos);
      if (onPositionUpdate) {
        onPositionUpdate(data.id, pos);
      }
    }

    // 2. Update axial rotation
    if (meshRef.current) {
      // Rotation speed in rad/sec
      const rotationSpeed = (24 / (data.rotationPeriodHours || 24)) * 0.4;
      meshRef.current.rotation.y += delta * rotationSpeed;
    }

    // 3. Counter-rotate clouds for Earth
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.18;
    }

    // 4. Orbit Moon around Earth
    if (moonGroupRef.current && data.id === 'earth') {
      const moonAngle = (simDays / 27.3) * Math.PI * 2;
      const moonDist = data.relativeRadius * 2.8;
      moonGroupRef.current.position.set(
        Math.cos(moonAngle) * moonDist,
        0,
        Math.sin(moonAngle) * moonDist
      );
    }
  });

  const tiltRad = THREE.MathUtils.degToRad(data.axialTiltDeg);

  return (
    <group ref={groupRef}>
      {/* Tilted planet axis group */}
      <group rotation={[tiltRad, 0, 0]}>
        {/* Main planet sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(data);
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[data.relativeRadius, 36, 36]} />
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* Earth Clouds Layer */}
        {cloudsTexture && (
          <mesh ref={cloudsRef} scale={[1.025, 1.025, 1.025]}>
            <sphereGeometry args={[data.relativeRadius, 36, 36]} />
            <meshStandardMaterial
              map={cloudsTexture}
              transparent
              opacity={0.8}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Atmospheric Fresnel Rim Glow */}
        {data.atmosphere && (
          <mesh scale={[1.12, 1.12, 1.12]}>
            <sphereGeometry args={[data.relativeRadius, 24, 24]} />
            <meshBasicMaterial
              color={data.id === 'earth' ? '#38bdf8' : data.id === 'venus' ? '#fde047' : '#93c5fd'}
              transparent
              opacity={0.18}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Saturn's Rings */}
        {data.ringSystem && data.id === 'saturn' && (
          <PlanetRing
            innerRadius={data.relativeRadius * 1.3}
            outerRadius={data.relativeRadius * 2.4}
            tiltDeg={data.axialTiltDeg}
          />
        )}

        {/* Uranus Faint Rings */}
        {data.ringSystem && data.id === 'uranus' && (
          <PlanetRing
            innerRadius={data.relativeRadius * 1.25}
            outerRadius={data.relativeRadius * 1.7}
            tiltDeg={data.axialTiltDeg}
          />
        )}
      </group>

      {/* Earth's Moon */}
      {data.id === 'earth' && (
        <group ref={moonGroupRef}>
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              // When clicking Moon directly
              onSelect(data);
            }}
          >
            <sphereGeometry args={[0.42, 20, 20]} />
            <meshStandardMaterial
              map={getMoonTexture()}
              roughness={0.85}
              metalness={0.0}
            />
          </mesh>
          {showLabels && (
            <Html distanceFactor={40} position={[0, 0.7, 0]} center pointerEvents="none">
              <span className="text-[10px] text-slate-300 font-mono tracking-wider opacity-75">
                Moon
              </span>
            </Html>
          )}
        </group>
      )}

      {/* Selection Highlight Ring */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.relativeRadius * 1.45, data.relativeRadius * 1.55, 48]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Floating HUD Label */}
      {showLabels && (
        <Html
          distanceFactor={55}
          position={[0, data.relativeRadius + 1.2, 0]}
          center
          pointerEvents="none"
        >
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/70 border border-slate-700/50 backdrop-blur-sm shadow-lg whitespace-nowrap">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: data.colorHex }}
            />
            <span className="text-xs font-medium text-slate-200 tracking-wide">
              {data.name}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
