import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

function createNoise(ctx: CanvasRenderingContext2D, width: number, height: number, opacity: number = 0.08) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 255 * opacity;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);
}

export function getEarthTexture(): THREE.CanvasTexture {
  if (textureCache.has('earth')) return textureCache.get('earth')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean background
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0c2340');
  oceanGrad.addColorStop(0.5, '#0b3c6d');
  oceanGrad.addColorStop(1, '#0c2340');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Continents (procedural stylized blobs)
  ctx.fillStyle = '#2d6a4f';
  // North America & South America
  drawLandmass(ctx, 220, 160, 90, 80);
  drawLandmass(ctx, 290, 320, 70, 110);
  // Eurasia & Africa
  drawLandmass(ctx, 580, 150, 160, 90);
  drawLandmass(ctx, 530, 280, 100, 120);
  // Australia
  drawLandmass(ctx, 820, 360, 65, 50);

  // Varied vegetation & desert hues
  ctx.fillStyle = '#d4a373';
  drawLandmass(ctx, 520, 230, 90, 45); // Sahara

  // Polar ice caps
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, width, 25);
  ctx.fillRect(0, height - 35, width, 35);

  createNoise(ctx, width, height, 0.05);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('earth', texture);
  return texture;
}

export function getEarthCloudsTexture(): THREE.CanvasTexture {
  if (textureCache.has('earth_clouds')) return textureCache.get('earth_clouds')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

  // Swirling cloud belts
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * width;
    const cy = 60 + Math.random() * (height - 120);
    const rx = 40 + Math.random() * 120;
    const ry = 15 + Math.random() * 35;
    const rot = (Math.random() - 0.5) * 0.4;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('earth_clouds', texture);
  return texture;
}

export function getJupiterTexture(): THREE.CanvasTexture {
  if (textureCache.has('jupiter')) return textureCache.get('jupiter')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Alternating atmospheric belts and zones
  const colors = [
    '#5c3d2e', '#9b6b43', '#d8a47f', '#f4ecd8', '#c98a58',
    '#a25c34', '#dfb892', '#eedbc5', '#8c4e2d', '#b0774c',
    '#d6a782', '#69402f'
  ];

  const bandHeight = height / colors.length;
  for (let i = 0; i < colors.length; i++) {
    const grad = ctx.createLinearGradient(0, i * bandHeight, 0, (i + 1) * bandHeight);
    grad.addColorStop(0, colors[i]);
    grad.addColorStop(0.5, lightenColor(colors[i], 15));
    grad.addColorStop(1, colors[i]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, i * bandHeight, width, bandHeight);
  }

  // Wavy perturbation turbulence
  for (let y = 0; y < height; y += 4) {
    const wave = Math.sin(y * 0.08) * 12 + Math.cos(y * 0.04) * 8;
    ctx.drawImage(canvas, 0, y, width, 4, wave, y, width, 4);
  }

  // The Great Red Spot
  const grsX = 650;
  const grsY = 320;
  const grsGrad = ctx.createRadialGradient(grsX, grsY, 5, grsX, grsY, 45);
  grsGrad.addColorStop(0, '#c2410c');
  grsGrad.addColorStop(0.6, '#b45309');
  grsGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = grsGrad;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, 48, 28, 0.1, 0, Math.PI * 2);
  ctx.fill();

  createNoise(ctx, width, height, 0.06);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('jupiter', texture);
  return texture;
}

export function getSaturnTexture(): THREE.CanvasTexture {
  if (textureCache.has('saturn')) return textureCache.get('saturn')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const colors = [
    '#d4a373', '#e9c46a', '#f4a261', '#faedcd', '#e7c169',
    '#d4a373', '#fefae0', '#e9c46a', '#d4a373'
  ];

  const bandH = height / colors.length;
  for (let i = 0; i < colors.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(0, i * bandH, width, bandH);
  }

  createNoise(ctx, width, height, 0.03);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('saturn', texture);
  return texture;
}

export function getSaturnRingTexture(): THREE.CanvasTexture {
  if (textureCache.has('saturn_ring')) return textureCache.get('saturn_ring')!;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = 1;
  const ctx = canvas.getContext('2d')!;

  // 1D radial ring texture (Inner C ring -> Cassini Division -> Outer A ring)
  const grad = ctx.createLinearGradient(0, 0, size, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.15, 'rgba(180, 160, 120, 0.3)'); // C Ring
  grad.addColorStop(0.35, 'rgba(230, 210, 160, 0.85)'); // B Ring (brightest)
  grad.addColorStop(0.68, 'rgba(240, 225, 175, 0.95)');
  grad.addColorStop(0.70, 'rgba(0, 0, 0, 0.05)'); // Cassini Division gap
  grad.addColorStop(0.74, 'rgba(0, 0, 0, 0.05)');
  grad.addColorStop(0.76, 'rgba(210, 195, 150, 0.7)'); // A Ring
  grad.addColorStop(0.96, 'rgba(170, 155, 120, 0.4)');
  grad.addColorStop(1.0, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, 1);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('saturn_ring', texture);
  return texture;
}

export function getMarsTexture(): THREE.CanvasTexture {
  if (textureCache.has('mars')) return textureCache.get('mars')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Rust base
  ctx.fillStyle = '#b44422';
  ctx.fillRect(0, 0, width, height);

  // Dark volcanic basalt regions (Syrtis Major, Acidalia Planitia)
  ctx.fillStyle = '#612316';
  drawLandmass(ctx, 450, 240, 140, 90);
  drawLandmass(ctx, 220, 180, 100, 60);
  drawLandmass(ctx, 750, 320, 120, 70);

  // Canyon rift (Valles Marineris)
  ctx.strokeStyle = '#431407';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(350, 260);
  ctx.bezierCurveTo(420, 280, 500, 250, 580, 270);
  ctx.stroke();

  // White polar caps
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, width, 18);
  ctx.fillRect(0, height - 24, width, 24);

  createNoise(ctx, width, height, 0.08);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('mars', texture);
  return texture;
}

export function getMoonTexture(): THREE.CanvasTexture {
  if (textureCache.has('moon')) return textureCache.get('moon')!;

  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Highland grey
  ctx.fillStyle = '#9ca3af';
  ctx.fillRect(0, 0, width, height);

  // Dark basalt maria
  ctx.fillStyle = '#4b5563';
  drawLandmass(ctx, 160, 110, 60, 45); // Oceanus Procellarum
  drawLandmass(ctx, 240, 85, 35, 30);  // Mare Imbrium
  drawLandmass(ctx, 310, 105, 30, 25); // Mare Serenitatis
  drawLandmass(ctx, 330, 135, 32, 28); // Mare Tranquillitatis (Apollo 11 site)

  createNoise(ctx, width, height, 0.12);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('moon', texture);
  return texture;
}

export function getSunSurfaceTexture(): THREE.CanvasTexture {
  if (textureCache.has('sun')) return textureCache.get('sun')!;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Fiery plasma base
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#ff4d00');
  grad.addColorStop(0.5, '#ffaa00');
  grad.addColorStop(1, '#ff6600');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Convective solar cells & flares
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 15 + Math.random() * 45;
    const cellGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    cellGrad.addColorStop(0, '#ffffff');
    cellGrad.addColorStop(0.3, '#ffea75');
    cellGrad.addColorStop(0.8, '#ff5500');
    cellGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = cellGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sunspots
  ctx.fillStyle = '#450a0a';
  for (let s = 0; s < 12; s++) {
    const sx = Math.random() * width;
    const sy = 120 + Math.random() * (height - 240);
    ctx.beginPath();
    ctx.arc(sx, sy, 3 + Math.random() * 6, 0, Math.PI * 2);
    ctx.fill();
  }

  createNoise(ctx, width, height, 0.08);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('sun', texture);
  return texture;
}

export function getGenericPlanetTexture(colorHex: string): THREE.CanvasTexture {
  if (textureCache.has(colorHex)) return textureCache.get(colorHex)!;

  const width = 256;
  const height = 128;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, width, height);
  createNoise(ctx, width, height, 0.07);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set(colorHex, texture);
  return texture;
}

function drawLandmass(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number
) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
  ctx.fill();
}

function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1)}`;
}
