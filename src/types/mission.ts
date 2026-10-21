export interface MissionMilestone {
  id: string;
  title: string;
  date: string;
  description: string;
  cameraFocusBody?: string;
  normalizedProgress: number; // 0 to 1 along trajectory
}

export type MissionType = 'crewed_lunar' | 'flyby' | 'orbiter' | 'rover' | 'space_telescope' | 'satellite';

export interface MissionData {
  id: string;
  name: string;
  agency: string;
  launchYear: number;
  launchDate: string;
  status: 'Completed' | 'Operational' | 'En Route' | 'Extended';
  destination: string;
  type: MissionType;
  primaryTargetId: string; // matches planet.id or 'moon' or 'sun' or 'interstellar'
  tagline: string;
  overview: string;
  achievements: string[];
  scientificImpact: string;
  colorHex: string;
  milestones: MissionMilestone[];
  trajectoryKey?: 'apollo11' | 'voyager1' | 'voyager2' | 'jwst' | 'perseverance';
}
