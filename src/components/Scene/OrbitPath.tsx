import { useMemo } from 'react';
import * as THREE from 'three';
import { generateOrbitPoints } from '../../utils/astronomy';

interface OrbitPathProps {
  radius: number;
  color?: string;
  visible?: boolean;
}

export function OrbitPath({ radius, color = '#38bdf8', visible = true }: OrbitPathProps) {
  const points = useMemo(() => {
    if (radius <= 0) return [];
    return generateOrbitPoints(radius, 0.015, 128);
  }, [radius]);

  const geometry = useMemo(() => {
    if (points.length === 0) return null;
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  if (!visible || !geometry || radius <= 0) return null;

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.18}
        depthWrite={false}
      />
    </lineLoop>
  );
}
