export const sunVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const sunFragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Simple 3D pseudo-noise
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}

void main() {
  vec3 p = vPosition * 0.4 + vec3(0.0, 0.0, uTime * 0.2);
  float n1 = noise(p);
  float n2 = noise(p * 2.0 - vec3(uTime * 0.3, 0.0, 0.0));
  float turbulence = n1 * 0.6 + n2 * 0.4;

  // Solar gradient colors
  vec3 coreColor = vec3(1.0, 0.95, 0.7);    // Blazing white-yellow core
  vec3 midColor = vec3(1.0, 0.45, 0.0);     // Radiant solar orange
  vec3 edgeColor = vec3(0.8, 0.08, 0.0);    // Deep red flare

  vec3 col = mix(midColor, coreColor, turbulence);
  
  // Limb darkening (Fresnel term)
  float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
  fresnel = clamp(1.0 - abs(fresnel), 0.0, 1.0);
  col = mix(col, edgeColor, pow(fresnel, 1.8));

  gl_FragColor = vec4(col, 1.0);
}
`;

export const atmosphereVertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const atmosphereFragmentShader = `
uniform vec3 uColor;
varying vec3 vNormal;

void main() {
  float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
  gl_FragColor = vec4(uColor, 1.0) * intensity;
}
`;
