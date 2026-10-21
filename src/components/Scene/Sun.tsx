import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSunSurfaceTexture } from '../../utils/proceduralTextures';
import { sunVertexShader, sunFragmentShader } from '../../shaders/sunShader';

interface SunProps {
  radius?: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function Sun({ radius = 7.5, isSelected, onSelect }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const shaderMatRef = useRef<THREE.ShaderMaterial>(null);

  const sunTexture = useRef<THREE.CanvasTexture>(getSunSurfaceTexture()).current;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.02;
      coronaRef.current.rotation.y -= delta * 0.015;
    }
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Sunlight source */}
      <pointLight color="#fff7ed" intensity={3.5} distance={300} decay={1.0} />
      <ambientLight intensity={0.15} />

      {/* Main Sun Body */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive="#ff7700"
          emissiveIntensity={2.2}
          roughness={0.8}
        />
      </mesh>

      {/* Dynamic Animated Plasma Inner Corona */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[radius, 36, 36]} />
        <shaderMaterial
          ref={shaderMatRef}
          vertexShader={sunVertexShader}
          fragmentShader={sunFragmentShader}
          uniforms={{
            uTime: { value: 0 }
          }}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Corona Glow Layer 1 */}
      <mesh ref={coronaRef} scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Corona Glow Layer 2 (Atmospheric haze) */}
      <mesh scale={[1.65, 1.65, 1.65]}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Selection Ring */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.8, radius * 1.85, 64]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
