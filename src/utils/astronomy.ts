import * as THREE from 'three';

// Convert simulation timestamp to astronomical calendar date
export function getSimulationDate(baseDateMs: number, simDaysElapsed: number): string {
  const targetDate = new Date(baseDateMs + simDaysElapsed * 86400 * 1000);
  return targetDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Compute planet position at a given time
export function calculateOrbitPosition(
  orbitalRadius: number,
  orbitalPeriodDays: number,
  simDays: number,
  initialPhase: number = 0,
  eccentricity: number = 0.02
): THREE.Vector3 {
  if (orbitalPeriodDays === 0 || orbitalRadius === 0) {
    return new THREE.Vector3(0, 0, 0);
  }

  // Mean anomaly M = 2 * PI * (t / T) + phase
  const meanAnomaly = (2 * Math.PI * (simDays / orbitalPeriodDays)) + initialPhase;
  
  // Approximate eccentric anomaly E = M + e * sin(M)
  const E = meanAnomaly + eccentricity * Math.sin(meanAnomaly);
  
  // Elliptical coordinate computation
  const a = orbitalRadius;
  const b = orbitalRadius * Math.sqrt(1 - eccentricity * eccentricity);
  
  const x = a * Math.cos(E);
  const z = b * Math.sin(E);
  
  return new THREE.Vector3(x, 0, z);
}

// Generate points for orbital path line
export function generateOrbitPoints(
  orbitalRadius: number,
  eccentricity: number = 0.02,
  segments: number = 128
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const a = orbitalRadius;
  const b = orbitalRadius * Math.sqrt(1 - eccentricity * eccentricity);

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = a * Math.cos(theta);
    const z = b * Math.sin(theta);
    points.push(new THREE.Vector3(x, 0, z));
  }
  return points;
}
