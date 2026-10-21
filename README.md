# COSMOS — Solar System & Space Mission Explorer

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Live_Site-F38020?logo=cloudflare&logoColor=white)](https://cosmos-explorer-prz.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Live Deployment:** [https://cosmos-explorer-prz.pages.dev](https://cosmos-explorer-prz.pages.dev)

A museum-grade, production-quality interactive 3D Solar System & Space Mission Explorer combining real-time WebGL planetary mechanics with humanity's greatest milestones in space exploration.

---

## 🌟 Overview

**COSMOS** is an immersive digital science installation designed to feel like a modern aerospace exhibition. Instead of a static or generic WebGL scene, COSMOS combines:
1. **Interactive 3D Solar System**: Real-time rendering of the Sun, Mercury, Venus, Earth (with Luna and procedural clouds), Mars, Jupiter, Saturn (with rings and Cassini division), Uranus, Neptune, Pluto, and an instanced 1,100-body asteroid belt.
2. **Dual Astronomical Scale Modes**:
   - *Educational Scale*: Optimized for visual clarity, comparative body examination, and clear orbit comprehension.
   - *Astronomical Distance Scale*: Logarithmic scaling illustrating the immense physical separations of interplanetary space.
3. **Space Mission Timeline & 3D Synchronization**:
   - Scrubbable chronological timeline spanning 1957 (Sputnik 1) to the present day (James Webb Space Telescope, Perseverance & Ingenuity).
   - Selecting any mission choreographs the camera across the Solar System and highlights 3D mission trajectories.
4. **Cinematic GSAP Choreography**: Smooth, non-disorienting camera flights between planets, moons, and Lagrange points with dynamic distance-based easing.
5. **Interactive Milestones**: Step through Apollo 11's trajectory from Earth launch through Trans-Lunar Injection (TLI), lunar landing at the Sea of Tranquility, moonwalk, and Pacific splashdown.
6. **Procedural Texture & Audio Engines**:
   - Canvas-based procedural surface synthesis eliminates heavy external image assets, ensuring instant 0ms latency loading and 100% offline capability.
   - Self-contained Web Audio API synthesizer generates atmospheric cosmic sub-bass drones and UI harmonic feedback with zero external audio assets.
7. **Scale & Physics Comparison Mode**: Side-by-side relative planetary diameter comparison with gravitational and atmospheric telemetry tables.
8. **Educational Hub (Learn Mode)**: Interactive scientific guides answering fundamental questions (e.g. *What is an orbit?*, *Why is Jupiter so huge?*, *What are Lagrange Points?*, *How do gravity assists work?*).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Build & Tooling** | Vite 6, TypeScript 5.7 |
| **Framework** | React 18.3 |
| **3D Engine** | Three.js (0.170), React Three Fiber (`@react-three/fiber`), React Three Drei (`@react-three/drei`) |
| **Choreography & Motion** | GSAP 3.12 (GreenSock) |
| **Styling** | Tailwind CSS 3.4, PostCSS, Glassmorphism HUD |
| **Icons** | Lucide React |
| **Audio** | Native Web Audio API (`AudioContext`, `BiquadFilterNode`, `OscillatorNode`) |
| **Deployment Target** | Cloudflare Pages (Static SPA) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher (tested on Node v23)
- npm `v9.0.0` or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/risterz/cosmos-explorer.git
cd cosmos-explorer

# Install dependencies
npm install
```

### Local Development
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Generates an optimized static distribution inside `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## 🛸 Deployment to Cloudflare Pages

COSMOS is configured for automated or CLI deployment on Cloudflare Pages.

### Method 1: Direct CLI Deployment via Wrangler
```bash
# Deploy dist directory directly to Cloudflare Pages
npx wrangler pages deploy dist --project-name=cosmos-explorer
```

### Method 2: Git-Connected Cloudflare Pages Dashboard
1. Connect your GitHub repository (`risterz/cosmos-explorer`) in the Cloudflare Pages dashboard.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Root directory: `/`

Included configuration files:
- `wrangler.toml`: Specifies project name and build output directory.
- `public/_headers`: Security headers (CSP, X-Content-Type-Options) and immutable asset caching.
- `public/_routes.json`: SPA routing rules.

---

## 📁 Architecture

```
cosmos-explorer/
├── public/
│   ├── favicon.svg              # Vector celestial icon
│   ├── _headers                 # Cloudflare Pages HTTP/2 headers & caching rules
│   ├── _routes.json             # Cloudflare Pages routing configuration
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── types/
│   │   ├── planet.ts            # Planet interface & atmospheric properties
│   │   ├── mission.ts           # Mission milestones & trajectory keys
│   │   └── scene.ts             # Camera states, quality levels, view modes
│   ├── data/
│   │   ├── planets.ts           # Verified NASA/JPL astronomical data
│   │   ├── missions.ts          # Historical space mission archives
│   │   └── learnTopics.ts       # Educational science topics & explanations
│   ├── utils/
│   │   ├── astronomy.ts         # Keplerian orbital mechanics & ephemeris date math
│   │   ├── formatting.ts        # Unit formatting (km, AU, periods, angles)
│   │   ├── proceduralTextures.ts# Canvas 2D procedural planetary surface maps
│   │   └── audioEngine.ts       # Web Audio API procedural drone & click sound synthesizer
│   ├── shaders/
│   │   └── sunShader.ts         # GLSL vertex & fragment shaders for plasma noise & corona
│   ├── hooks/
│   │   └── useSimulationTime.ts # Simulation clock multiplier (1x–200x) & epoch calculator
│   ├── components/
│   │   ├── Scene/
│   │   │   ├── SolarSystemCanvas.tsx # Canvas wrapper & GSAP CameraController
│   │   │   ├── SolarSystem.tsx       # Scene orchestrator
│   │   │   ├── Sun.tsx               # Glowing procedural star with additive corona
│   │   │   ├── Planet.tsx            # PBR planet with axial tilt & atmosphere
│   │   │   ├── PlanetRing.tsx        # Saturn rings with Cassini division
│   │   │   ├── OrbitPath.tsx         # Keplerian elliptical orbital line loops
│   │   │   ├── AsteroidBelt.tsx      # InstancedMesh (1,100 asteroids)
│   │   │   ├── StarField.tsx         # 2,800-star BufferGeometry point cloud
│   │   │   ├── Spacecraft.tsx        # 3D models (Apollo LM, Voyager, JWST)
│   │   │   └── MissionTrajectory.tsx # 3D CatmullRom splines with animated probe marker
│   │   ├── UI/
│   │   │   ├── Navigation.tsx        # Top floating glass HUD
│   │   │   ├── ControlPanel.tsx      # Time speed, date readout, and layer toggles
│   │   │   ├── PlanetPanel.tsx       # Scientific telemetry drawer
│   │   │   ├── MissionPanel.tsx      # Mission milestones & achievements
│   │   │   ├── Timeline.tsx          # Chronological scrubbable timeline
│   │   │   ├── ComparisonPanel.tsx   # Side-by-side relative scale comparison
│   │   │   ├── LearnModal.tsx        # Educational science curriculum
│   │   │   ├── AboutModal.tsx        # Documentation & keyboard shortcuts
│   │   │   ├── LoadingScreen.tsx     # Staged museum-grade asset loader
│   │   │   └── WebGLFallback.tsx     # Graceful fallback for non-WebGL devices
│   │   └── Experience/
│   │       └── IntroSequence.tsx     # Cinematic opening & entry sequence
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── wrangler.toml                # Cloudflare Pages configuration
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Pause / Resume Time Simulation |
| `R` | Reset Camera to Solar System Overview |
| `M` | Toggle Ambient Cosmic Audio Synthesizer |
| `Esc` | Close Active Modal or Slide-out Panel |

---

## 📊 Performance & Optimization

- **Zero-Allocation Render Loops**: Vectors and matrices inside `useFrame` are pre-allocated or mutated by reference.
- **Instanced Geometry**: Asteroids in the Main Belt use `THREE.InstancedMesh` with a single draw call.
- **Adaptive Quality**: Dynamic device pixel ratio clamping (Low: 1.0, Medium: 1.5, High: min(window.devicePixelRatio, 2.0)).
- **Procedural Asset Generation**: Textures are synthesized into memoized canvas instances at startup, eliminating tens of megabytes of texture downloads.

---

## 🔭 Data Sources

All planetary physical parameters, distances, orbital periods, rotation periods, and mission trajectory coordinates are derived from:
- [NASA Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [NASA JPL Horizons Ephemeris System](https://ssd.jpl.nasa.gov/horizons/)
- [ESA Science & Technology Archives](https://sci.esa.int/)
- [NASA Mission Historical Archives](https://www.nasa.gov/missions/)

---

## 📄 License

MIT License © 2026 COSMOS Interactive Science.
