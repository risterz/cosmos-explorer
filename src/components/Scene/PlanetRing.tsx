import { useRef } from 'react';
import * as THREE from 'three';
import { getSaturnRingTexture } from '../../utils/proceduralTextures';

interface PlanetRingProps {
  innerRadius: number;
  outerRadius: number;
  tiltDeg: number;
}

export function PlanetRing({ innerRadius, outerRadius, tiltDeg }: PlanetRingProps) {
  const texture = useRef<THREE.CanvasTexture>(getSaturnRingTexture()).current;

  return (
    <mesh rotation={[THREE.MathUtils.degToRad(tiltDeg + 90), 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}
