import { useMemo } from 'react';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
}

export function StarField({ count = 2800 }: StarFieldProps) {
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'), // Pure white
      new THREE.Color('#93c5fd'), // Pale blue (O/B type)
      new THREE.Color('#fef08a'), // Warm yellow (G type)
      new THREE.Color('#fdba74'), // Orange (K type)
      new THREE.Color('#fca5a5')  // Red giant (M type)
    ];

    for (let i = 0; i < count; i++) {
      // Uniform spherical shell distribution at distance 350 - 700 units
      const radius = 350 + Math.random() * 350;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.6}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
