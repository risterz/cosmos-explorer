import { PlanetData } from '../types/planet';

export const PLANETS_DATA: PlanetData[] = [
  {
    id: 'sun',
    name: 'The Sun',
    tagline: 'Yellow Dwarf G-type Main-Sequence Star (G2V)',
    type: 'star',
    radiusKm: 696340,
    relativeRadius: 7.5,
    massKg: '1.989 × 10³⁰ kg',
    relativeMass: 333000,
    gravityMs2: 274.0,
    distanceFromSunKm: 0,
    distanceAU: 0,
    orbitalRadiusEdu: 0,
    orbitalRadiusReal: 0,
    orbitalPeriodDays: 0,
    rotationPeriodHours: 609.12, // ~25.4 days at equator
    axialTiltDeg: 7.25,
    meanTempC: 5500, // Photosphere surface temp
    moonsCount: 0,
    ringSystem: false,
    colorHex: '#ff9e00',
    emissive: '#ff7700',
    overview: 'The Sun accounts for 99.86% of the mass in the entire Solar System. Driven by nuclear fusion converting 600 million tons of hydrogen into helium every second, its light and heat sustain all planetary weather and life on Earth.',
    geology: 'A dynamic plasma sphere organized into core, radiative zone, convective zone, photosphere, chromosphere, and the millions-of-degrees outer corona.',
    funFacts: [
      'Over 1.3 million Earths could fit inside the volume of the Sun.',
      'Photons created in the core take over 100,000 years to reach the surface due to radiative scattering, but just 8 minutes 20 seconds to travel to Earth.',
      'The solar wind creates geomagnetic auroras on Earth and carved the heliosphere bubble extending past Pluto.'
    ],
    explorationHighlights: [
      'Parker Solar Probe (2018–present) — First human spacecraft to "touch the Sun" within 6 million km.',
      'SOHO & SDO (1995–present) — Continuous uninterrupted solar flare and coronal mass ejection imaging.'
    ]
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tagline: 'Swift Innermost Rocky World',
    type: 'terrestrial',
    radiusKm: 2439.7,
    relativeRadius: 0.9,
    massKg: '3.301 × 10²³ kg',
    relativeMass: 0.055,
    gravityMs2: 3.7,
    distanceFromSunKm: 57909050,
    distanceAU: 0.387,
    orbitalRadiusEdu: 14,
    orbitalRadiusReal: 10,
    orbitalPeriodDays: 87.97,
    rotationPeriodHours: 1407.6, // 58.6 Earth days (3:2 spin-orbit resonance)
    axialTiltDeg: 0.034,
    meanTempC: 167,
    moonsCount: 0,
    ringSystem: false,
    atmosphere: {
      composition: ['Oxygen (42%)', 'Sodium (29%)', 'Hydrogen (22%)', 'Helium (6%)'],
      pressure: '10⁻¹⁴ bar (trace exosphere)',
      color: 'rgba(160, 160, 160, 0.1)'
    },
    colorHex: '#9ca3af',
    overview: 'Mercury is the smallest planet and closest to the Sun. Locked in a 3:2 spin-orbit resonance, it rotates three times for every two orbits around the Sun, resulting in dramatic day-to-night temperature swings from 430°C to -180°C.',
    geology: 'Heavily cratered silicate crust overlying a gigantic iron core occupying ~85% of its planetary radius. Features towering thrust fault scarps (rupes) where the planet shrank as its core cooled.',
    funFacts: [
      'Despite proximity to the Sun, water ice permanently persists inside deep, permanently shadowed polar craters.',
      'A solar day on Mercury (sunrise to sunrise) lasts 176 Earth days — twice as long as its 88-day year!',
      'Has the highest orbital eccentricity (0.205) of any major planet.'
    ],
    explorationHighlights: [
      'Mariner 10 (1974) — First flyby with gravity assist.',
      'MESSENGER (2011–2015) — First orbiter, mapped composition and discovered polar ice.',
      'BepiColombo (ESA/JAXA, arriving 2026) — Dual-orbiter mission.'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    tagline: 'Earth’s Scorched Greenhouse Twin',
    type: 'terrestrial',
    radiusKm: 6051.8,
    relativeRadius: 1.6,
    massKg: '4.867 × 10²⁴ kg',
    relativeMass: 0.815,
    gravityMs2: 8.87,
    distanceFromSunKm: 108208000,
    distanceAU: 0.723,
    orbitalRadiusEdu: 22,
    orbitalRadiusReal: 18,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5, // Retrograde rotation: 243 Earth days
    axialTiltDeg: 177.3,
    meanTempC: 464,
    moonsCount: 0,
    ringSystem: false,
    atmosphere: {
      composition: ['Carbon Dioxide (96.5%)', 'Nitrogen (3.5%)', 'Sulfur Dioxide (0.015%)'],
      pressure: '92 bar (equivalent to 900m ocean depth)',
      color: 'rgba(234, 179, 8, 0.3)'
    },
    colorHex: '#eab308',
    overview: 'Venus is the hottest planet in the Solar System due to a runaway greenhouse effect beneath opaque sulfuric acid clouds. It spins in retrograde (backwards), meaning the Sun rises in the west and sets in the east.',
    geology: 'Volcanic plains dominated by basaltic lava flows, shield volcanoes (e.g. Maat Mons), and bizarre fracture networks called coronae formed by mantle plumes.',
    funFacts: [
      'Atmospheric pressure is so extreme that supercritical CO₂ coats the surface with liquid-gas hybrid dynamics.',
      'One Venusian day (243 Earth days) is longer than its entire orbital year (224.7 Earth days).',
      'The brightest natural object in the night sky after the Moon, often called the "Morning Star" or "Evening Star".'
    ],
    explorationHighlights: [
      'Venera 7 (USSR, 1970) — First successful landing and data transmission from another planet.',
      'Magellan (NASA, 1990–1994) — Radar mapped 98% of the surface through cloud cover.'
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'The Blue Marble & Haven of Life',
    type: 'terrestrial',
    radiusKm: 6371.0,
    relativeRadius: 1.7,
    massKg: '5.972 × 10²⁴ kg',
    relativeMass: 1.0,
    gravityMs2: 9.807,
    distanceFromSunKm: 149597870,
    distanceAU: 1.0,
    orbitalRadiusEdu: 31,
    orbitalRadiusReal: 27,
    orbitalPeriodDays: 365.256,
    rotationPeriodHours: 23.934,
    axialTiltDeg: 23.44,
    meanTempC: 15,
    moonsCount: 1,
    moonsList: ['Moon (Luna)'],
    ringSystem: false,
    atmosphere: {
      composition: ['Nitrogen (78.08%)', 'Oxygen (20.95%)', 'Argon (0.93%)', 'Carbon Dioxide (0.04%)'],
      pressure: '1.013 bar',
      color: 'rgba(59, 130, 246, 0.25)'
    },
    colorHex: '#3b82f6',
    overview: 'The third planet from the Sun and the only known harbor of life in the cosmos. Liquid water oceans cover 71% of its dynamic crust, protected by an active geomagnetic dipole field generated by its molten iron-nickel outer core.',
    geology: 'Active plate tectonics driving continental drift, subduction zones, oceanic ridges, and a balanced carbon-silicate geochemical cycle.',
    funFacts: [
      'Earth travels around the Sun at an astonishing speed of 29.78 km/s (over 107,000 km/h).',
      'The Moon stabilizes Earth’s axial tilt, preventing catastrophic climatic shifts over millions of years.',
      'Earth is the densest major body in the Solar System at 5.515 g/cm³.'
    ],
    explorationHighlights: [
      'Apollo 8 (1968) — Earthrise photo captured human perspective.',
      'International Space Station (1998–present) — Continuous human habitat in low Earth orbit for 25+ years.'
    ]
  },
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    tagline: 'Earth’s Ancient Gravitational Companion',
    type: 'moon',
    radiusKm: 1737.4,
    relativeRadius: 0.6,
    massKg: '7.342 × 10²² kg',
    relativeMass: 0.0123,
    gravityMs2: 1.62,
    distanceFromSunKm: 149597870,
    distanceAU: 1.0,
    orbitalRadiusEdu: 34.5,
    orbitalRadiusReal: 29.5,
    orbitalPeriodDays: 27.32,
    rotationPeriodHours: 655.7, // Tidally locked
    axialTiltDeg: 1.54,
    meanTempC: -20,
    moonsCount: 0,
    ringSystem: false,
    colorHex: '#d1d5db',
    overview: 'Formed ~4.5 billion years ago from the debris of a Mars-sized protoplanet (Theia) colliding with proto-Earth. The Moon is tidally locked to Earth, always showing the same cratered face to human eyes.',
    geology: 'Composed of ancient anorthosite highlands and dark volcanic basaltic maria formed by ancient asteroid bombardments and lava floods.',
    funFacts: [
      'Because the Moon has no atmosphere or weather, astronaut footprints from Apollo 11 will remain intact for millions of years.',
      'The Moon recedes from Earth at approximately 3.8 cm per year due to tidal friction transfer.',
      'Surface temperatures swing wildly from 120°C in full sunlight to -130°C in lunar night.'
    ],
    explorationHighlights: [
      'Apollo 11 (1969) — Neil Armstrong & Buzz Aldrin become first humans on lunar surface.',
      'Artemis Program (NASA/International) — Modern quest to establish permanent human presence at lunar South Pole.'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Red Planet & Next Frontier',
    type: 'terrestrial',
    radiusKm: 3389.5,
    relativeRadius: 1.15,
    massKg: '6.417 × 10²³ kg',
    relativeMass: 0.107,
    gravityMs2: 3.72,
    distanceFromSunKm: 227939200,
    distanceAU: 1.524,
    orbitalRadiusEdu: 42,
    orbitalRadiusReal: 38,
    orbitalPeriodDays: 686.98,
    rotationPeriodHours: 24.623, // 1 sol = 24h 37m
    axialTiltDeg: 25.19,
    meanTempC: -63,
    moonsCount: 2,
    moonsList: ['Phobos', 'Deimos'],
    ringSystem: false,
    atmosphere: {
      composition: ['Carbon Dioxide (95.3%)', 'Nitrogen (2.6%)', 'Argon (1.9%)', 'Oxygen (0.13%)'],
      pressure: '0.006 bar (0.6% of Earth)',
      color: 'rgba(239, 68, 68, 0.15)'
    },
    colorHex: '#ef4444',
    overview: 'Mars is a cold, desert world colored red by pervasive ferric oxide (rust) dust. Possessing ancient river valleys, lakebeds, and polar ice caps of water and CO₂, it remains humanity’s primary target for searching for past microbial life.',
    geology: 'Home to Olympus Mons (21.9 km high, the largest volcano in the Solar System) and Valles Marineris (a canyon system 4,000 km long and 7 km deep).',
    funFacts: [
      'Sunsets on Mars appear eerie blue due to the way atmospheric dust grains scatter reddish wavelengths.',
      'Its moon Phobos orbits Mars faster than Mars rotates, rising in the west and setting in the east twice every Martian sol.',
      'Gravity on Mars is only 38% of Earth’s — you could jump nearly 3 times higher!'
    ],
    explorationHighlights: [
      'Viking 1 & 2 (1976) — First successful long-duration Martian landers.',
      'Curiosity (2012–present) — Proved Gale Crater was once a habitable freshwater lake.',
      'Perseverance & Ingenuity (2021–present) — Drilling biosignature core samples and first powered flight on another planet.'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'King of Planets & Cosmic Shield',
    type: 'gas_giant',
    radiusKm: 69911,
    relativeRadius: 4.8,
    massKg: '1.898 × 10²⁷ kg',
    relativeMass: 317.8,
    gravityMs2: 24.79,
    distanceFromSunKm: 778570000,
    distanceAU: 5.204,
    orbitalRadiusEdu: 56,
    orbitalRadiusReal: 54,
    orbitalPeriodDays: 4332.59, // 11.86 Earth years
    rotationPeriodHours: 9.925, // Fastest rotator in Solar System
    axialTiltDeg: 3.13,
    meanTempC: -110,
    moonsCount: 95,
    moonsList: ['Io', 'Europa', 'Ganymede', 'Callisto', 'Amalthea'],
    ringSystem: true,
    atmosphere: {
      composition: ['Hydrogen (89.8%)', 'Helium (10.2%)', 'Methane (0.3%)', 'Ammonia (0.026%)'],
      pressure: 'Supercritical gas envelope',
      color: 'rgba(217, 119, 6, 0.25)'
    },
    colorHex: '#d97706',
    overview: 'Jupiter is more than twice as massive as all other Solar System planets combined. Its immense gravitational field acts as a cosmic shield, sweeping up or deflecting catastrophic comets away from the inner planets.',
    geology: 'Has no true solid surface; hydrogen gas smoothly transitions under immense pressure into an ocean of metallic liquid hydrogen surrounding a diffuse heavy-element core.',
    funFacts: [
      'The Great Red Spot is an anticyclonic storm larger than Earth that has raged continuously for at least 350 years.',
      'Jupiter rotates so rapidly that its equator visibly bulges, making it an oblate spheroid (flattened at the poles).',
      'Ganymede, Jupiter’s largest moon, is larger than the planet Mercury and has its own self-generated magnetic field.'
    ],
    explorationHighlights: [
      'Voyager 1 & 2 (1979) — Discovered active volcanism on Io and Jupiter’s faint ring system.',
      'Galileo (1995–2003) — Dropped an atmospheric probe and discovered evidence of an ocean inside Europa.',
      'Juno (2016–present) — Polar orbit mapping gravitational anomalies and deep atmospheric depth.'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The Ringed Jewel of the Solar System',
    type: 'gas_giant',
    radiusKm: 58232,
    relativeRadius: 4.1,
    massKg: '5.683 × 10²⁶ kg',
    relativeMass: 95.2,
    gravityMs2: 10.44,
    distanceFromSunKm: 1433530000,
    distanceAU: 9.582,
    orbitalRadiusEdu: 71,
    orbitalRadiusReal: 70,
    orbitalPeriodDays: 10759.22, // 29.45 Earth years
    rotationPeriodHours: 10.57,
    axialTiltDeg: 26.73,
    meanTempC: -140,
    moonsCount: 146,
    moonsList: ['Titan', 'Enceladus', 'Mimas', 'Rhea', 'Iapetus', 'Dione', 'Tethys'],
    ringSystem: true,
    atmosphere: {
      composition: ['Hydrogen (96.3%)', 'Helium (3.25%)', 'Methane (0.45%)'],
      pressure: 'Gas envelope',
      color: 'rgba(234, 179, 8, 0.2)'
    },
    colorHex: '#facc15',
    overview: 'Saturn is renowned for its magnificent, intricate ring system made of billions of chunks of pure water ice and rock ranging in size from tiny dust specks to house-sized boulders, all spanning 282,000 km across yet averaging only 10 meters in thickness.',
    geology: 'Composed primarily of hydrogen and helium with a core of rock and ice. Possesses a mysterious persistent hexagonal storm jet stream at its north pole.',
    funFacts: [
      'Saturn is the only planet in the Solar System that is less dense than liquid water (0.687 g/cm³) — it would float in a gigantic cosmic bathtub!',
      'Moon Titan has a dense nitrogen atmosphere and liquid methane-ethane lakes and rain cycles.',
      'Moon Enceladus ejects plumes of water vapor and organic compounds from a subsurface hydrothermal ocean.'
    ],
    explorationHighlights: [
      'Cassini-Huygens (2004–2017) — 13-year landmark orbiter mission; landed the Huygens probe on Titan in 2005.',
      'Voyager 1 & 2 (1980–1981) — Revealed complex braided ring structures and moonlet shepherd dynamics.'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    tagline: 'The Tilted Cyan Ice Giant',
    type: 'ice_giant',
    radiusKm: 25362,
    relativeRadius: 2.7,
    massKg: '8.681 × 10²⁵ kg',
    relativeMass: 14.54,
    gravityMs2: 8.69,
    distanceFromSunKm: 2872460000,
    distanceAU: 19.22,
    orbitalRadiusEdu: 85,
    orbitalRadiusReal: 86,
    orbitalPeriodDays: 30685.4, // 84.0 Earth years
    rotationPeriodHours: -17.24, // Retrograde
    axialTiltDeg: 97.77, // Rotates on its side!
    meanTempC: -195,
    moonsCount: 28,
    moonsList: ['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda'],
    ringSystem: true,
    atmosphere: {
      composition: ['Hydrogen (82.5%)', 'Helium (15.2%)', 'Methane (2.3%)'],
      pressure: 'Supercritical envelope',
      color: 'rgba(6, 182, 212, 0.25)'
    },
    colorHex: '#06b6d4',
    overview: 'Uranus is an ice giant with a striking feature: an axial tilt of 97.8 degrees, meaning it orbits the Sun essentially rolling on its side. Methane in its upper atmosphere absorbs red light, giving it a calm, pale aquamarine color.',
    geology: 'A deep mantle of dense, hot "icy" fluids (water, ammonia, and methane) surrounding a small rocky core. Unlike other giant planets, it radiates remarkably little internal heat.',
    funFacts: [
      'Due to its extreme 98° tilt, each pole gets 42 years of continuous sunlight followed by 42 years of pitch darkness.',
      'Holds the record for the coldest recorded planetary temperature in the Solar System at -224°C (49 Kelvin).',
      'Miranda, its smallest major moon, features the highest known cliff in the Solar System, Verona Rupes (20 km sheer vertical drop).'
    ],
    explorationHighlights: [
      'Voyager 2 (January 1986) — The only spacecraft in human history to have visited Uranus so far, discovering 10 new moons and 2 new rings.'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tagline: 'The Tempestuous Azure Ice Giant',
    type: 'ice_giant',
    radiusKm: 24622,
    relativeRadius: 2.6,
    massKg: '1.024 × 10²⁶ kg',
    relativeMass: 17.15,
    gravityMs2: 11.15,
    distanceFromSunKm: 4495060000,
    distanceAU: 30.05,
    orbitalRadiusEdu: 98,
    orbitalRadiusReal: 100,
    orbitalPeriodDays: 60189.0, // 164.8 Earth years
    rotationPeriodHours: 16.11,
    axialTiltDeg: 28.32,
    meanTempC: -201,
    moonsCount: 16,
    moonsList: ['Triton', 'Proteus', 'Nereid', 'Larissa'],
    ringSystem: true,
    atmosphere: {
      composition: ['Hydrogen (80.0%)', 'Helium (19.0%)', 'Methane (1.5%)'],
      pressure: 'Supercritical envelope',
      color: 'rgba(37, 99, 235, 0.3)'
    },
    colorHex: '#2563eb',
    overview: 'Neptune is the outermost major planet. First predicted mathematically by Urbain Le Verrier before ever being seen through a telescope in 1846. It is swept by supersonic winds that reach speeds of over 2,100 km/h — the fastest recorded anywhere in the Solar System.',
    geology: 'Similar to Uranus, its mass is concentrated in a slushy mantle of water, methane, and ammonia ice above a silicate-iron core ~1.2 times the mass of Earth.',
    funFacts: [
      'Neptune completed its first full 165-year orbit since its discovery in 1846 only in 2011.',
      'Its largest moon Triton orbits backward (retrograde), indicating it was a Kuiper Belt dwarf planet captured by Neptune’s gravity.',
      'Triton has active cryogenic geysers erupting liquid nitrogen 8 km high into space.'
    ],
    explorationHighlights: [
      'Voyager 2 (August 1989) — Conducted historic flyby passing 4,950 km above Neptune’s north pole, discovering the Great Dark Spot and Triton’s cryovolcanism.'
    ]
  },
  {
    id: 'pluto',
    name: 'Pluto',
    tagline: 'King of the Kuiper Belt (Dwarf Planet)',
    type: 'dwarf_planet',
    radiusKm: 1188.3,
    relativeRadius: 0.5,
    massKg: '1.303 × 10²² kg',
    relativeMass: 0.0022,
    gravityMs2: 0.62,
    distanceFromSunKm: 5906380000,
    distanceAU: 39.48,
    orbitalRadiusEdu: 112,
    orbitalRadiusReal: 115,
    orbitalPeriodDays: 90560.0, // 248 Earth years
    rotationPeriodHours: -153.3, // 6.39 days (tidally locked with Charon)
    axialTiltDeg: 122.53,
    meanTempC: -230,
    moonsCount: 5,
    moonsList: ['Charon', 'Nix', 'Hydra', 'Kerberos', 'Styx'],
    ringSystem: false,
    colorHex: '#b45309',
    overview: 'Discovered by Clyde Tombaugh in 1930 and reclassified as a dwarf planet in 2006. Pluto is the archetype of trans-Neptunian Kuiper Belt objects, boasting surprisingly active nitrogen-glacier geology and a nitrogen atmosphere that freezes into frost during its aphelion.',
    geology: 'Features Tombaugh Regio (the famous heart-shaped nitrogen and carbon monoxide ice plain, Sputnik Planitia) with convective glacier cells and towering water-ice mountain ranges.',
    funFacts: [
      'Pluto and its largest moon Charon form a binary system; their center of mass (barycenter) lies in open space above Pluto’s surface.',
      'For 20 years of its 248-year orbit (most recently from 1979 to 1999), Pluto was actually closer to the Sun than Neptune.',
      'The heart of Pluto (Sputnik Planitia) is an impact crater filled with nitrogen ice that slowly churns via internal thermal convection.'
    ],
    explorationHighlights: [
      'New Horizons (July 14, 2015) — Revolutionary flyby capturing the iconic high-resolution heart-shaped imagery.'
    ]
  }
];
