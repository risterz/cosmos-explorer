export type ScaleMode = 'educational' | 'distance';

export type QualityLevel = 'high' | 'medium' | 'low';

export type ViewState =
  | 'intro'
  | 'overview'
  | 'planet_selected'
  | 'mission_selected'
  | 'comparison'
  | 'learn_mode';

export interface SceneSettings {
  showOrbits: boolean;
  showLabels: boolean;
  showAsteroids: boolean;
  showTrajectories: boolean;
  showAtmospheres: boolean;
  scaleMode: ScaleMode;
  quality: QualityLevel;
  soundEnabled: boolean;
}

export interface CameraTarget {
  x: number;
  y: number;
  z: number;
  lookAtX: number;
  lookAtY: number;
  lookAtZ: number;
  duration?: number;
}
