import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Spacecraft } from './Spacecraft';

interface MissionTrajectoryProps {
  type: 'apollo11' | 'voyager1' | 'voyager2' | 'jwst' | 'perseverance';
  progress?: number; // 0 to 1
  colorHex?: string;
}

export function MissionTrajectory({
  type,
  progress = 0.5,
  colorHex = '#00f0ff'
}: MissionTrajectoryProps) {
  const probeMarkerRef = useRef<THREE.Group>(null);

  // Generate 3D trajectory control points based on mission type
  const curve = useMemo(() => {
    let points: THREE.Vector3[] = [];

    if (type === 'apollo11') {
      // Earth to Moon transfer trajectory
      const earthPos = new THREE.Vector3(26, 0, 14);
      const moonPos = new THREE.Vector3(30, 0, 17);
      const midway = new THREE.Vector3(28, 1.2, 15.5);
      const lunarOrbitPoint = new THREE.Vector3(30.6, 0.4, 16.8);

      points = [
        earthPos,
        new THREE.Vector3(26.8, 0.6, 14.5),
        midway,
        lunarOrbitPoint,
        moonPos
      ];
    } else if (type === 'voyager1') {
      // Hyperbolic trajectory escaping the Solar System
      points = [
        new THREE.Vector3(20, 0, 10),    // Launch from Earth
        new THREE.Vector3(38, 2, 22),    // Mars orbit crossing
        new THREE.Vector3(54, 5, 12),    // Jupiter flyby gravity assist
        new THREE.Vector3(72, 12, -18),  // Saturn flyby
        new THREE.Vector3(95, 25, -45),  // Interstellar departure
        new THREE.Vector3(120, 42, -75)  // Heliopause crossing (121 AU)
      ];
    } else if (type === 'voyager2') {
      // Grand tour: Earth -> Jupiter -> Saturn -> Uranus -> Neptune -> Interstellar
      points = [
        new THREE.Vector3(22, 0, 8),
        new THREE.Vector3(50, -2, 18),   // Jupiter
        new THREE.Vector3(68, -4, 40),   // Saturn
        new THREE.Vector3(82, -8, 62),   // Uranus
        new THREE.Vector3(96, -14, 82),  // Neptune
        new THREE.Vector3(115, -28, 105) // Interstellar
      ];
    } else if (type === 'jwst') {
      // Sun-Earth L2 halo orbit (1.5 million km behind Earth)
      const l2Center = new THREE.Vector3(32, 0, 17.5);
      const haloRadius = 1.2;
      points = [];
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        points.push(new THREE.Vector3(
          l2Center.x + Math.cos(angle) * haloRadius,
          Math.sin(angle) * haloRadius * 0.8,
          l2Center.z + Math.sin(angle) * 0.3
        ));
      }
    } else {
      // Mars transit trajectory for Perseverance
      points = [
        new THREE.Vector3(25, 0, 12),
        new THREE.Vector3(32, 1.5, 20),
        new THREE.Vector3(38, 0.5, 30),
        new THREE.Vector3(42, 0, 38)
      ];
    }

    return new THREE.CatmullRomCurve3(points);
  }, [type]);

  const trajectoryLine = useMemo(() => {
    const pts = curve.getPoints(80);
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(colorHex),
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });
    return new THREE.Line(geom, mat);
  }, [curve, colorHex]);

  // Position probe marker along trajectory curve
  useFrame(() => {
    if (probeMarkerRef.current) {
      const clampedProgress = Math.min(Math.max(progress, 0.001), 0.999);
      const pt = curve.getPointAt(clampedProgress);
      const tangent = curve.getTangentAt(clampedProgress);

      probeMarkerRef.current.position.copy(pt);
      probeMarkerRef.current.lookAt(pt.clone().add(tangent));
    }
  });

  const spacecraftType =
    type === 'apollo11' ? 'apollo11' : type === 'jwst' ? 'jwst' : 'voyager';

  return (
    <group>
      {/* 3D Trajectory Ribbon / Line */}
      <primitive object={trajectoryLine} />

      {/* Spacecraft Probe Marker positioned at current milestone */}
      <group ref={probeMarkerRef}>
        <Spacecraft type={spacecraftType} scale={1.2} />
        {/* Pulsing locator ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.35, 24]} />
          <meshBasicMaterial
            color={colorHex}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}
