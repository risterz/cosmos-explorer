export interface PlanetAtmosphere {
  composition: string[];
  pressure: string;
  color: string;
}

export interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  type: 'star' | 'terrestrial' | 'gas_giant' | 'ice_giant' | 'dwarf_planet' | 'moon';
  radiusKm: number;
  relativeRadius: number; // Visual scale for 3D educational view
  massKg: string;
  relativeMass: number; // Relative to Earth = 1 (or Sun = 333000)
  gravityMs2: number;
  distanceFromSunKm: number;
  distanceAU: number;
  orbitalRadiusEdu: number; // Educational distance units
  orbitalRadiusReal: number; // Logarithmic astronomical scale
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  axialTiltDeg: number;
  meanTempC: number;
  moonsCount: number;
  moonsList?: string[];
  ringSystem: boolean;
  atmosphere?: PlanetAtmosphere;
  colorHex: string;
  emissive?: string;
  overview: string;
  geology: string;
  funFacts: string[];
  explorationHighlights: string[];
}
