import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function AsteroidBelt({
  count = 1200,
  innerRadius = 46,
  outerRadius = 51
}: AsteroidBeltProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate static positions and scales
  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 1.8;

      dummy.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      const scale = 0.08 + Math.random() * 0.18;
      dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.4), scale);

      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, innerRadius, outerRadius, dummy]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.008;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#78716c"
        roughness={0.9}
        metalness={0.1}
      />
    </instancedMesh>
  );
}
