import * as THREE from 'three';

interface SpacecraftProps {
  type: 'apollo11' | 'voyager' | 'jwst';
  scale?: number;
}

export function Spacecraft({ type, scale = 1 }: SpacecraftProps) {
  if (type === 'apollo11') {
    return (
      <group scale={[scale * 0.4, scale * 0.4, scale * 0.4]}>
        {/* Octagonal Descent Stage (gold foil) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.8, 8]} />
          <meshStandardMaterial
            color="#d97706"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        {/* Ascent Stage Cabin (silver/grey) */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[1.2, 0.9, 1.1]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        {/* Docking tunnel on top */}
        <mesh position={[0, 1.35, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.3, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
        {/* 4 Landing gear struts */}
        {[0, 90, 180, 270].map((angle, i) => (
          <group key={i} rotation={[0, THREE.MathUtils.degToRad(angle), 0]}>
            <mesh position={[1.4, -0.6, 0]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.06, 0.06, 1.4]} />
              <meshStandardMaterial color="#64748b" metalness={0.7} />
            </mesh>
            <mesh position={[1.8, -1.1, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.06, 12]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  if (type === 'voyager') {
    return (
      <group scale={[scale * 0.35, scale * 0.35, scale * 0.35]}>
        {/* 3.7m High-Gain Antenna Dish */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.8, 0.2, 0.4, 32, 1, true]} />
          <meshStandardMaterial
            color="#f8fafc"
            metalness={0.3}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Antenna Feed Horn */}
        <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 0.6, 16]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.8} />
        </mesh>
        {/* Main 10-sided Bus */}
        <mesh position={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.8, 0.8, 0.6, 10]} />
          <meshStandardMaterial color="#b45309" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* RTG Power Boom */}
        <mesh position={[-1.8, 0, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 2.2]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        {/* RTG canister */}
        <mesh position={[-2.8, 0, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.8, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        {/* Magnetometer Boom */}
        <mesh position={[2.5, 0, -0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 3.5]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
      </group>
    );
  }

  // JWST
  return (
    <group scale={[scale * 0.4, scale * 0.4, scale * 0.4]}>
      {/* 5-Layer Diamond Kite Sunshield */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 2.4]} />
        <meshStandardMaterial
          color="#fda4af" // Kapton pink/silver sheen
          metalness={0.9}
          roughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Spacecraft Bus underside */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1.0, 0.5, 0.8]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      {/* Primary Mirror (18 Gold Beryllium Hexagons) */}
      <mesh position={[0, 0.6, 0.3]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.1, 6]} />
        <meshStandardMaterial
          color="#facc15" // Radiant Gold
          metalness={0.98}
          roughness={0.05}
        />
      </mesh>
      {/* Secondary Mirror Tripod */}
      <group position={[0, 0.9, 1.4]} rotation={[0.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
