# Antigravity Prompt — Interactive 3D Solar System & Space Mission Explorer

## ROLE

Act as a senior creative developer, 3D web engineer, interaction designer, UI/UX designer, and frontend performance engineer.

Build a production-quality interactive educational website called:

# "COSMOS — Solar System & Space Mission Explorer"

The website should feel like a premium interactive science experience similar to a modern museum installation, NASA-inspired educational platform, or high-end WebGL experience.

Do NOT create a generic landing page with a simple Three.js solar system.

The core experience must be an immersive, cinematic, interactive 3D exploration of the Solar System combined with an interactive historical timeline of major human and robotic space missions.

---

# 1. CORE CONCEPT

Create an interactive 3D Solar System where users can:

- Explore the Sun and planets
- Zoom and orbit around planets
- Fly between planets using cinematic camera transitions
- Compare planetary sizes
- Compare distances and orbital scales
- Inspect planetary information
- Toggle orbital paths
- Toggle labels
- Control simulation speed
- Explore major historical space missions
- Navigate a chronological mission timeline
- Select Apollo missions
- Explore Voyager missions
- Explore James Webb Space Telescope
- See mission trajectories where appropriate
- Experience cinematic camera movements
- Learn scientific information through interactive UI

The website should combine:

3D EXPLORATION
+
EDUCATIONAL CONTENT
+
SPACE HISTORY
+
CINEMATIC STORYTELLING

---

# 2. TECHNOLOGY STACK

Use modern frontend technologies.

Preferred stack:

- React
- TypeScript
- Vite
- Three.js
- React Three Fiber where appropriate
- @react-three/drei
- GSAP
- Tailwind CSS
- Lucide React icons

Use Three.js directly where it provides better control.

Use WebGL/WebGL2-compatible techniques.

Do NOT use unnecessary frameworks.

Do NOT use heavy dependencies unless they provide clear value.

---

# 3. PROJECT STRUCTURE

Create a clean architecture similar to:

src/
├── components/
│   ├── Scene/
│   │   ├── SolarSystem.tsx
│   │   ├── Sun.tsx
│   │   ├── Planet.tsx
│   │   ├── PlanetRing.tsx
│   │   ├── OrbitPath.tsx
│   │   ├── AsteroidBelt.tsx
│   │   ├── StarField.tsx
│   │   ├── Spacecraft.tsx
│   │   └── MissionTrajectory.tsx
│   │
│   ├── UI/
│   │   ├── Navigation.tsx
│   │   ├── PlanetPanel.tsx
│   │   ├── MissionPanel.tsx
│   │   ├── Timeline.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── ComparisonPanel.tsx
│   │   └── LoadingScreen.tsx
│   │
│   └── Experience/
│       ├── IntroSequence.tsx
│       └── MissionExperience.tsx
│
├── data/
│   ├── planets.ts
│   ├── missions.ts
│   └── comparisons.ts
│
├── hooks/
│   ├── useSolarSystem.ts
│   ├── useCameraFlight.ts
│   └── useSimulationTime.ts
│
├── shaders/
│   ├── sunVertex.glsl
│   ├── sunFragment.glsl
│   ├── planetVertex.glsl
│   └── planetFragment.glsl
│
├── utils/
│   ├── astronomy.ts
│   ├── camera.ts
│   └── formatting.ts
│
├── App.tsx
├── main.tsx
└── index.css

Keep data separate from rendering logic.

---

# 4. VISUAL DESIGN

Design language:

## Overall aesthetic

Think:

- Deep space
- Scientific
- Cinematic
- Minimal
- Premium
- Futuristic
- Museum-quality
- NASA-inspired but NOT a direct NASA clone

Use a predominantly dark interface.

Suggested visual palette:

- Near-black space background
- Deep navy
- White typography
- Soft blue
- Cyan highlights
- Warm solar orange
- Subtle violet accents

Avoid excessive neon.

Avoid generic "AI futuristic" gradients.

The interface should feel scientific rather than gaming-oriented.

---

# 5. HERO / INTRO EXPERIENCE

Create an immersive opening sequence.

Initial viewport:

COSMOS

SOLAR SYSTEM EXPLORER

Explore our neighborhood in space

[ ENTER THE COSMOS ]

Behind the UI:

- Slowly moving star field
- Sun visible in the distance
- Subtle planetary silhouettes
- Very slow camera movement
- Atmospheric particles

When the user clicks:

"ENTER THE COSMOS"

use GSAP to transition the camera into the Solar System.

The transition should feel cinematic.

Do not instantly teleport.

Use:

- camera position interpolation
- easing
- subtle rotation
- depth
- motion blur-like visual feeling where possible

---

# 6. 3D SOLAR SYSTEM

Create the major Solar System bodies:

- Sun
- Mercury
- Venus
- Earth
- Mars
- Jupiter
- Saturn
- Uranus
- Neptune

Optionally include:

- Moon
- Pluto as a dwarf planet section
- asteroid belt

Each planet should have:

- realistic relative color
- approximate relative size
- orbital movement
- rotation
- atmosphere where appropriate
- unique material properties

Important:

The actual Solar System cannot be represented accurately in one visual scale because planetary distances are enormous compared with planet sizes.

Therefore implement two viewing modes:

## Mode A — Educational Scale

Compress distances while preserving relative planetary sizes as much as practical.

## Mode B — Distance Visualization

Use a logarithmic/compressed distance scale to communicate actual astronomical separation.

Clearly label the mode.

Do NOT misleadingly imply that the displayed distances are physically to scale.

---

# 7. SUN

Create a visually impressive procedural Sun.

Use custom shaders if practical.

The Sun should include:

- animated surface
- subtle solar noise
- emissive appearance
- corona
- glow
- animated plasma-like movement

Use ShaderMaterial where appropriate.

Do not make it look like a flat orange sphere.

Create a convincing glowing star.

---

# 8. PLANET SHADERS & PROCEDURAL TEXTURES

Use realistic materials and procedural texture generation to ensure instant loading with zero missing external asset dependencies:

- **Procedural Canvas Texture Engine**: Generate high-fidelity planetary albedo and normal/bump maps on-the-fly using 2D canvas procedural noise (Perlin/Simplex approximations, harmonic turbulence, crater stamps, banding gradients).
- **Earth**: Procedural continents (deep blue oceans, emerald/ochre landmasses, polar ice caps), an independent slowly counter-rotating alpha-blended cloud sphere layer, and an outer atmospheric Fresnel glow shader.
- **Sun**: Dynamic GLSL vertex & fragment shader with 3D simplex noise animating turbulent solar convection cells, dark sunspots, and a multi-layered additive corona mesh.
- **Mercury**: Heavily cratered, desaturated basaltic grey surface with high roughness.
- **Venus**: Thick sulfurous atmosphere with swirling pale golden-yellow convective streaks.
- **Mars**: Rust-colored iron oxide desert terrain with deep canyons, darker basalt basins, and bright white polar ice caps.
- **Jupiter**: Multi-layered alternating dark belts and light zones, subtle turbulent eddies, and the distinctive Great Red Spot.
- **Saturn**: Creamy butterscotch banding with semi-transparent concentric rings (`RingGeometry` with Cassini division and radial opacity gradients).
- **Uranus**: Featureless pale cyan-aquamarine atmosphere with tilted ring system.
- **Neptune**: Intense azure blue atmosphere with dark storm spots and faint white cirrus clouds.
- **Moon**: Realistic mare (dark volcanic basalt plains) and cratered highlands.

Where procedural shaders are used, ensure they are optimized with shared geometries and memoized textures.

Do not sacrifice performance for unnecessary shader complexity.

---

# 9. STAR FIELD

Create a large procedural star field.

Requirements:

- thousands of stars
- varying brightness
- subtle size variation
- subtle depth
- no obvious repeated pattern

Use BufferGeometry rather than thousands of individual mesh objects.

Consider:

THREE.Points
+
BufferGeometry
+
PointsMaterial

or a custom shader.

Add occasional distant nebula-like background elements if performance allows.

---

# 10. ORBITAL PATHS

Each planet should optionally display its orbital path.

Create clean, thin orbital lines.

Controls:

☑ Show Orbits
☑ Show Planet Labels
☑ Show Mission Paths

Orbit visibility should animate smoothly.

Do not use excessively bright lines.

---

# 11. PLANET INTERACTION

Users should be able to click a planet.

When selected:

1. Planet becomes highlighted.
2. Camera smoothly flies toward it.
3. Planet information panel appears.
4. UI displays key facts.

Example:

EARTH

The third planet from the Sun.

DISTANCE FROM SUN
149.6 million km

DIAMETER
12,742 km

DAY
23h 56m

YEAR
365.25 days

MOONS
1

Include:

- Planet name
- Description
- Diameter
- Mass
- Distance from Sun
- Orbital period
- Rotation period
- Number of moons
- Interesting fact

Use realistic scientific data.

Do not invent scientific facts.

---

# 12. CINEMATIC CAMERA SYSTEM

This is one of the most important parts.

Use GSAP for camera choreography.

Create reusable camera flight functions.

Example conceptual API:

flyToPlanet("earth")
flyToPlanet("mars")
flyToPlanet("jupiter")
flyToSun()
flyToMission("voyager")

Camera transitions should include:

- position animation
- target animation
- easing
- dynamic duration based on distance

Example:

Solar System
      ↓
Earth
      ↓
Mars
      ↓
Jupiter
      ↓
Voyager trajectory

Make the camera movement feel cinematic.

Use:

gsap.to()
Custom easing
Smooth target interpolation

Do not abruptly change camera coordinates.

---

# 13. FREE CAMERA MODE

Provide a normal exploration mode.

Users can:

- orbit
- pan
- zoom

Use OrbitControls or Drei controls.

Set sensible limits.

Prevent the user from:

- zooming infinitely
- flipping the camera into unusable positions
- losing the entire Solar System easily

---

# 14. TIME SIMULATION

Create a simulation control.

UI:

TIME SPEED

❚◀  1x  10x  100x  1000x  ▶❚

Allow users to accelerate planetary motion.

Include:

- Pause
- Play
- Slow
- Fast

Display:

SIMULATION TIME
March 21, 2026

If implementing actual astronomical positions is too complex, use a clearly labeled educational orbital simulation rather than pretending it is a precise ephemeris.

---

# 15. PLANET COMPARISON MODE

Create a dedicated educational comparison feature.

When activated:

COMPARE PLANETS

Users can select:

- Earth
- Mars
- Jupiter
- Saturn
- etc.

Display planets side-by-side in correct relative diameter.

Example:

EARTH          JUPITER

  ●              ◉

12,742 km      139,820 km

Add a smooth GSAP transition from the Solar System into comparison mode.

Include:

- diameter
- mass
- gravity
- day length
- year length

Make the comparison visually intuitive.

---

# 16. SPACE MISSION TIMELINE

Create an interactive horizontal timeline.

Major events should include:

1957
Sputnik 1

1961
Yuri Gagarin

1969
Apollo 11

1977
Voyager 1 & 2

1990
Hubble

1997
Mars Pathfinder

2012
Curiosity

2015
New Horizons at Pluto

2021
James Webb launch

2022
JWST first images

Use historically accurate dates.

The timeline should be horizontally scrollable.

On desktop:

1957 ─── 1961 ─── 1969 ─── 1977 ─── 1990 ─── 2021
                 ●
              Apollo 11

On mobile, transform it into a vertical timeline.

---

# 17. MISSION EXPLORER

Include a mission database.

Initial missions:

## Apollo

Include major Apollo missions, especially:

- Apollo 8
- Apollo 11
- Apollo 12
- Apollo 13
- Apollo 15
- Apollo 17

## Voyager

- Voyager 1
- Voyager 2

## James Webb Space Telescope

- Launch
- Deployment
- L2 arrival
- First images

Also include:

- Hubble
- Mars Pathfinder
- Spirit
- Opportunity
- Curiosity
- Perseverance
- New Horizons

Structure mission data cleanly.

Example:

{
  id: "apollo-11",
  name: "Apollo 11",
  year: 1969,
  type: "crewed-lunar",
  destination: "Moon",
  description: "...",
  milestones: [...]
}

---

# 18. MISSION TIMELINE INTERACTION

When the user drags the timeline:

The 3D experience should react.

Example:

Timeline = 1969
       ↓
Apollo 11 selected
       ↓
Camera flies toward Moon
       ↓
Apollo mission panel appears
       ↓
Mission trajectory appears

Timeline interaction should therefore control the 3D scene.

This is a major feature.

---

# 19. APOLLO EXPERIENCE

Create a dedicated Apollo exploration.

When Apollo 11 is selected:

Camera moves toward the Moon.

Display:

APOLLO 11

JULY 16 — JULY 24, 1969

FIRST CREWED MOON LANDING

Show:

- Earth
- Moon
- approximate mission trajectory
- spacecraft marker
- major milestones

Milestones:

Launch
Trans-Lunar Injection
Lunar Orbit
Landing
Moonwalk
Lunar Ascent
Return to Earth
Splashdown

Allow the user to click each milestone.

Animate the spacecraft marker along the trajectory.

---

# 20. VOYAGER EXPERIENCE

Create a Voyager section.

When selected:

Camera moves outward from the Solar System.

Show:

- Voyager 1
- Voyager 2
- approximate trajectories
- outer planets
- direction of travel

Add an educational panel:

VOYAGER 1

Launched:
September 5, 1977

Mission:
Outer Solar System & Interstellar Space

Do not claim that the visual trajectory is an exact real-time spacecraft position unless using verified ephemeris data.

Label simplified educational trajectories appropriately.

---

# 21. JAMES WEBB EXPERIENCE

Create a dedicated James Webb section.

When selected:

Camera transitions away from the planetary system toward the Sun-Earth L2 region conceptually.

Explain:

James Webb Space Telescope

Launch:
December 25, 2021

Orbit:
Sun-Earth L2 region

Purpose:
Study the early universe,
galaxies, stars, planets and atmospheres.

Show a simplified Sun-Earth-L2 visualization.

Make the L2 explanation interactive.

---

# 22. MISSION CARDS

Mission cards should contain:

- mission name
- year
- agency
- destination
- mission type
- short description

Example:

┌───────────────────────────┐
│ APOLLO 11                 │
│ 1969                      │
│ Moon                      │
│                           │
│ First crewed Moon landing │
│                           │
│ [ EXPLORE ]               │
└───────────────────────────┘

Use subtle hover effects.

---

# 23. UI NAVIGATION

Create a minimal floating navigation.

Example:

COSMOS

EXPLORE
PLANETS
MISSIONS
COMPARE
ABOUT

Navigation should not cover the 3D scene.

Use translucent glass panels.

Do not overuse glassmorphism.

---

# 24. INFORMATION PANEL

Create a reusable right-side information panel.

Desktop:

┌────────────────────────────┐
│ EARTH                  ×    │
│                            │
│ [planet visual]            │
│                            │
│ The third planet...        │
│                            │
│ DIAMETER                   │
│ 12,742 km                  │
│                            │
│ DISTANCE                   │
│ 149.6 million km           │
│                            │
│ [ EXPLORE EARTH ]          │
└────────────────────────────┘

Mobile:

Use a bottom sheet.

---

# 25. LOADING EXPERIENCE

Three.js assets and shaders may take time to load.

Create an elegant loading screen.

Example:

COSMOS

INITIALIZING EXPERIENCE

██████████████░░░░░░

Loading planetary systems...

Show meaningful loading states:

Loading stars
Loading planetary materials
Loading shaders
Preparing missions
Initializing navigation

Do not show fake progress if possible.

---

# 26. PERFORMANCE

This is extremely important.

The website must remain usable on normal laptops and modern phones.

Implement:

- lazy loading
- asset compression
- efficient geometries
- instanced stars
- reasonable texture resolutions
- device pixel ratio limits
- object frustum culling
- efficient animation loops
- avoid unnecessary React re-renders
- dispose unused Three.js resources
- pause expensive effects when tab is hidden

Use adaptive quality.

For example:

High
Medium
Low

Automatically select quality based on device capability where practical.

Allow users to manually change it.

---

# 27. MOBILE EXPERIENCE

Do NOT simply shrink the desktop UI.

Design a proper mobile experience.

Mobile:

- bottom-sheet information panels
- touch gestures
- simplified controls
- smaller UI
- vertical timeline
- optimized rendering
- reduced particle count
- reduced shader quality where needed

Make sure the 3D scene remains usable with touch.

---

# 28. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible buttons
- ARIA labels
- sufficient contrast
- reduced-motion support

Respect:

prefers-reduced-motion

If reduced motion is enabled:

- minimize camera animations
- disable unnecessary transitions
- reduce particle animation

---

# 29. SOUND & PROCEDURAL AUDIO SYNTHESIS

Do NOT automatically play sound (adhere to browser autoplay policies).

Provide an explicit audio toggle in the UI:
🔊 / 🔇 Ambient Sound

Implementation details:
- Use the **Web Audio API** (`AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode`) to procedurally synthesize cosmic soundscapes directly in code.
- This eliminates heavy external MP3/WAV assets, prevents 404s/CORS issues, and allows zero network overhead.
- Features:
  - Deep binaural sub-bass space drone (40-60 Hz sine/pink noise filtered)
  - Resonant shimmer sweep on cinematic camera transitions
  - Crisp micro-feedback chimes (sine ping with exponential decay) on button clicks and timeline interactions
- Never make audio necessary for understanding the experience. Provide smooth gain ramps to avoid audio pops.

---

# 30. EDUCATIONAL MODE

Create an optional:

LEARN MODE

When enabled, show explanatory labels and scientific information.

Examples:

WHY IS JUPITER SO LARGE?

Jupiter is the largest planet in the Solar System...

WHAT IS AN ORBIT?

An orbit is the gravitationally curved path...

Use concise explanations suitable for students.

---

# 31. TOOLTIP SYSTEM

Interactive elements should have tooltips.

Examples:

- Show orbital paths
- Show mission trajectories
- Reset camera
- Pause simulation
- Comparison mode
- Timeline

Tooltips should not obstruct the main scene.

---

# 32. CAMERA RESET

Provide:

⌂ RESET VIEW

This returns the camera to a beautiful overview of the Solar System.

Animate the transition with GSAP.

---

# 33. VISUAL TRANSITIONS

Every major state change should feel intentional.

Examples:

Planet selected:

overview
   ↓
camera flight
   ↓
planet close-up
   ↓
information panel

Mission selected:

timeline
   ↓
mission highlight
   ↓
camera flight
   ↓
trajectory visualization
   ↓
mission information

Avoid abrupt UI changes.

---

# 34. MICROINTERACTIONS

Implement subtle effects:

- button hover
- panel entrance
- timeline marker hover
- planet selection glow
- card hover
- loading transitions
- tooltip transitions
- camera transitions

Use GSAP where appropriate.

Do not animate everything.

Motion should have purpose.

---

# 35. DATA ACCURACY

Use scientifically credible data.

Do not invent:

- planetary measurements
- mission dates
- mission objectives
- spacecraft locations
- orbital distances

Where a visualization is simplified, explicitly indicate:

Illustrative visualization — not to scale.

This is particularly important for:

- Solar System distances
- spacecraft trajectories
- Voyager position
- Apollo trajectories
- L2 visualization

---

# 36. SEO

Implement:

- title
- description
- Open Graph metadata
- Twitter/X metadata
- favicon
- semantic headings
- robots.txt
- sitemap where appropriate

Suggested title:

COSMOS — Interactive Solar System & Space Mission Explorer

Suggested description:

Explore the Solar System in interactive 3D and discover the missions that transformed our understanding of space.

---

# 37. ERROR HANDLING

Handle:

- WebGL unavailable
- browser incompatibility
- asset loading failures
- shader failures
- low-memory devices
- unsupported features

If WebGL is unavailable, show a useful fallback:

3D EXPERIENCE UNAVAILABLE

Your browser/device cannot run the interactive
3D experience.

You can still explore the planets and missions
using the educational interface below.

Do not show a blank screen.

---

# 38. RESPONSIVE BREAKPOINTS

Support:

- 320px+
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px+
- ultrawide displays

Make the experience work on both landscape and portrait.

---

# 39. FPS TARGET

Target:

Desktop:
60 FPS where hardware allows

Mobile:
30–60 FPS depending on device

Do not sacrifice usability to maintain 60 FPS.

---

# 40. DEBUG / DEVELOPMENT MODE

Create a development-only debug panel.

Include:

FPS
Draw Calls
Triangles
Active Objects
Current Camera
Quality Level
Simulation Speed

Do not display this in production.

---

# 41. CODE QUALITY

Use:

- TypeScript strict mode
- reusable components
- reusable hooks
- clean naming
- comments only where necessary
- no duplicated logic
- no giant components
- no hardcoded UI values scattered throughout the code

Separate:

Data
Scene
State
Animation
UI
Utilities

Use a clean state-management approach.

Do not introduce Redux unless genuinely necessary.

---

# 42. IMPORTANT THREE.JS REQUIREMENTS

Avoid creating unnecessary objects every animation frame.

Do not allocate vectors and other Three.js objects repeatedly inside high-frequency loops when they can be reused.

Use:

- refs
- memoization
- BufferGeometry
- InstancedMesh
- shader uniforms
- efficient animation loops

Be careful with:

useFrame()

Avoid triggering React state updates every frame.

Keep high-frequency animation inside Three.js.

---

# 43. GSAP REQUIREMENTS

Use GSAP primarily for:

- camera transitions
- UI transitions
- timeline interactions
- mission sequence choreography
- panel animations
- intro sequence

Create a reusable animation manager where appropriate.

Ensure animations are properly cleaned up.

Do not create uncontrolled GSAP timelines repeatedly.

---

# 44. INTERACTION STATES

Define clear states:

INTRO
OVERVIEW
PLANET_SELECTED
MISSION_SELECTED
COMPARISON
LEARN_MODE

Avoid conflicting interactions.

For example:

If a planet is selected and the user selects a mission:

planet selection
      ↓
clear planet focus
      ↓
mission focus
      ↓
camera transition

---

# 45. MAIN EXPERIENCE FLOW

The ideal user journey:

OPEN WEBSITE
      ↓
CINEMATIC INTRO
      ↓
ENTER THE COSMOS
      ↓
SOLAR SYSTEM OVERVIEW
      ↓
EXPLORE PLANETS
      ↓
SELECT EARTH
      ↓
CAMERA FLIGHT
      ↓
LEARN ABOUT EARTH
      ↓
OPEN MISSIONS
      ↓
TIMELINE
      ↓
SELECT APOLLO 11
      ↓
CAMERA FLIGHT TO MOON
      ↓
EXPLORE MISSION
      ↓
SELECT VOYAGER
      ↓
FLY OUT OF SOLAR SYSTEM
      ↓
EXPLORE JWST
      ↓
COMPARE PLANETS
      ↓
RETURN TO OVERVIEW

---

# 46. HOME SCREEN UI

The home screen should contain only enough UI to establish the experience.

Use:

COSMOS

INTERACTIVE SOLAR SYSTEM
& SPACE MISSION EXPLORER

Travel through our Solar System.
Discover the worlds, missions and
technology that changed our understanding
of space.

[ ENTER THE COSMOS ]

SCROLL TO EXPLORE

Do not overcrowd the hero.

---

# 47. SECTION STRUCTURE

The application should conceptually contain:

## INTRO

Cinematic opening.

## SOLAR SYSTEM

Interactive 3D exploration.

## PLANETS

Planet information.

## COMPARISON

Planet scale comparison.

## MISSIONS

Historical mission timeline.

## MISSION EXPERIENCES

Apollo / Voyager / JWST interactive sequences.

## LEARN

Educational explanations.

## ABOUT

Credits and scientific-data methodology.

---

# 48. FOOTER

Minimal footer:

COSMOS

Interactive Solar System & Space Mission Explorer

Explore responsibly.
Learn endlessly.

© 2026 COSMOS

Include links:

- About
- Data Sources
- Accessibility
- Privacy

---

# 49. PRIVACY

Because this is primarily a client-side experience:

Clearly communicate:

Your interaction with the Solar System
happens locally in your browser.

Do not implement unnecessary tracking.

If analytics are added later, make them optional and privacy-conscious.

---

# 50. DEPLOYMENT & CLOUDFLARE CONFIGURATION

Prepare the project for deployment on:

## Cloudflare Pages

The project should work with standard scripts:
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npx wrangler pages deploy dist --project-name=cosmos-explorer`

Include production Cloudflare configuration:
1. `wrangler.toml` configured with project name `cosmos-explorer`, `pages_build_output_dir = "dist"`, and compatibility date.
2. `public/_headers` specifying HTTP/2 Server Push, strict MIME types, caching policies (immutable 1-year cache for `/assets/*`, zero-cache for `index.html`), and modern security headers (CSP, X-Content-Type-Options, Referrer-Policy).
3. `public/_routes.json` configured for SPA routing fallback.
4. Clean client-side static build with zero server dependencies.

---

# 51. README

Create a complete README containing:

- Project overview
- Features
- Tech stack
- Installation
- Development
- Production build
- Deployment
- Architecture
- Performance notes
- Browser requirements
- Data sources
- Known limitations

---

# 52. FINAL QUALITY BAR

Before considering the project complete, perform a full audit.

## Visual

- Is the design premium?
- Does it feel like a real science experience?
- Does the 3D scene look convincing?
- Are animations smooth?
- Is typography polished?

## Interaction

- Can users easily understand what to do?
- Are camera transitions cinematic?
- Does the timeline control the 3D scene?
- Do planets respond correctly?
- Do mission experiences work?

## Performance

- Is FPS acceptable?
- Are memory allocations controlled?
- Are textures optimized?
- Is mobile performance reasonable?

## Accessibility

- Keyboard navigation
- Focus states
- Reduced motion
- Screen-reader labels
- Contrast

## Technical

- TypeScript errors: 0
- Build errors: 0
- Console errors: 0
- Broken imports: 0
- Missing assets: 0

---

# 53. IMPORTANT DEVELOPMENT RULE

Do NOT stop after creating a basic prototype.

Build the project in stages:

### Stage 1
Set up React + TypeScript + Three.js.

### Stage 2
Build the Solar System scene.

### Stage 3
Add planetary interaction.

### Stage 4
Implement cinematic GSAP camera movement.

### Stage 5
Build UI panels.

### Stage 6
Build mission timeline.

### Stage 7
Connect timeline → 3D mission experiences.

### Stage 8
Build comparison mode.

### Stage 9
Add shaders and visual polish.

### Stage 10
Optimize performance.

### Stage 11
Implement responsive/mobile experience.

### Stage 12
Accessibility and error handling.

### Stage 13
SEO and metadata.

### Stage 14
Production build and Cloudflare Pages preparation.

---

# 54. FINAL INSTRUCTION TO ANTIGRAVITY

Start by inspecting the existing project.

If this is an empty directory, initialize the project.

Do not ask unnecessary questions.

Make reasonable engineering decisions yourself.

Build the application incrementally and verify each stage.

After implementing each major feature:

1. Run the development/build checks.
2. Fix errors.
3. Inspect the UI.
4. Test interactions.
5. Optimize obvious performance problems.
6. Continue to the next stage.

The final result should be a fully functional interactive 3D Solar System and Space Mission Explorer, not merely a visual mockup.

Prioritize:

1. Functionality
2. Scientific credibility
3. Interaction quality
4. Cinematic motion
5. Performance
6. Accessibility
7. Visual polish

The finished website should feel like an interactive digital science museum.

Do not use placeholder buttons that do nothing.

Every major visible control should have a working interaction.

Every major section should contain real educational content.

Every animation should serve a purpose.

Make the experience memorable.
