import { MissionData } from '../types/mission';

export const MISSIONS_DATA: MissionData[] = [
  {
    id: 'sputnik-1',
    name: 'Sputnik 1',
    agency: 'Soviet Space Program',
    launchYear: 1957,
    launchDate: 'October 4, 1957',
    status: 'Completed',
    destination: 'Low Earth Orbit',
    type: 'satellite',
    primaryTargetId: 'earth',
    tagline: 'Dawn of the Space Age & First Artificial Satellite',
    overview: 'Launched from Baikonur Cosmodrome aboard an R-7 rocket, Sputnik 1 was a 58 cm polished metal sphere with four external radio antennas that transmitted periodic beeps across the globe, marking humanity’s entry into space exploration.',
    achievements: [
      'First artificial satellite placed into Earth orbit',
      'Provided initial data on upper atmospheric density via orbital decay rate',
      'Triggered the global Space Race and the founding of NASA'
    ],
    scientificImpact: 'Proved the feasibility of orbital mechanics and satellite communications.',
    colorHex: '#94a3b8',
    milestones: [
      { id: 'sp-1', title: 'Liftoff', date: 'Oct 4, 1957', description: 'Launched into elliptical low Earth orbit.', normalizedProgress: 0.1 },
      { id: 'sp-2', title: 'First Beeps', date: 'Oct 4, 1957', description: 'Radio transmitter broadcasting on 20.005 and 40.002 MHz heard worldwide.', normalizedProgress: 0.5 },
      { id: 'sp-3', title: 'Atmospheric Reentry', date: 'Jan 4, 1958', description: 'Burned up harmlessly after completing 1,440 orbits over 3 months.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'vostok-1',
    name: 'Vostok 1 (Yuri Gagarin)',
    agency: 'Soviet Space Program',
    launchYear: 1961,
    launchDate: 'April 12, 1961',
    status: 'Completed',
    destination: 'Low Earth Orbit',
    type: 'satellite',
    primaryTargetId: 'earth',
    tagline: 'First Human in Space',
    overview: 'Cosmonaut Yuri Gagarin became the first human in space, completing one orbit around Earth in 108 minutes aboard Vostok 3KA spacecraft with his famous exultation: "Poyekhali!" ("Let’s go!").',
    achievements: [
      'First crewed spaceflight in human history',
      'Proved human physiology can withstand zero-gravity and high-G reentry forces',
      'Paved the way for human planetary exploration'
    ],
    scientificImpact: 'Pioneered human space physiology, life support engineering, and automated reentry telemetry.',
    colorHex: '#f43f5e',
    milestones: [
      { id: 'v1-1', title: 'Launch', date: 'Apr 12, 1961 (06:07 UTC)', description: 'Launched from Tyuratam into a 327 km apogee orbit.', normalizedProgress: 0.1 },
      { id: 'v1-2', title: 'Earth Orbit', date: 'Apr 12, 1961', description: 'Observed Earth’s blue horizon and ate first food in space.', normalizedProgress: 0.5 },
      { id: 'v1-3', title: 'Parachute Touchdown', date: 'Apr 12, 1961 (08:05 UTC)', description: 'Ejected at 7 km altitude and safely parachuted near Engels, Saratov.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'apollo-8',
    name: 'Apollo 8',
    agency: 'NASA',
    launchYear: 1968,
    launchDate: 'December 21, 1968',
    status: 'Completed',
    destination: 'Lunar Orbit',
    type: 'crewed_lunar',
    primaryTargetId: 'moon',
    tagline: 'First Humans to Orbit the Moon & "Earthrise"',
    overview: 'Crewed by Frank Borman, Jim Lovell, and William Anders, Apollo 8 was the first human flight to leave Earth’s gravitational sphere of influence, achieve lunar orbit, and witness Earth rising over the barren lunar horizon.',
    achievements: [
      'First crewed launch on the massive Saturn V rocket',
      'First humans to witness and photograph Earthrise directly',
      'First humans to view the lunar farside with their own eyes'
    ],
    scientificImpact: 'The Earthrise photograph is credited with galvanizing the modern environmental movement and proving the navigation calculations for the lunar landing.',
    colorHex: '#38bdf8',
    milestones: [
      { id: 'ap8-1', title: 'Trans-Lunar Injection', date: 'Dec 21, 1968', description: 'S-IVB third stage reignited sending astronauts toward the Moon.', normalizedProgress: 0.2 },
      { id: 'ap8-2', title: 'Lunar Orbit Insertion', date: 'Dec 24, 1968', description: 'Entered lunar orbit on Christmas Eve, broadcasting Genesis reading.', normalizedProgress: 0.6 },
      { id: 'ap8-3', title: 'Pacific Splashdown', date: 'Dec 27, 1968', description: 'Safely recovered south of Hawaii after pioneering deep-space return.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'apollo-11',
    name: 'Apollo 11',
    agency: 'NASA',
    launchYear: 1969,
    launchDate: 'July 16, 1969',
    status: 'Completed',
    destination: 'Lunar Surface (Sea of Tranquility)',
    type: 'crewed_lunar',
    primaryTargetId: 'moon',
    tagline: '"One Small Step for Man, One Giant Leap for Mankind"',
    overview: 'On July 20, 1969, Neil Armstrong and Buzz Aldrin landed the Lunar Module Eagle in Mare Tranquillitatis while Michael Collins orbited in the Command Module Columbia, fulfilling President Kennedy’s national goal.',
    achievements: [
      'First humans to walk on an extraterrestrial planetary body',
      'Collected 21.55 kg of lunar rock and soil samples',
      'Deployed Early Apollo Surface Experiments Package (EASEP) including laser retroreflectors still used today'
    ],
    scientificImpact: 'Proved the Moon’s age (4.5 billion years) and volcanic basalt composition, revolutionizing planetary science and solar system chronology.',
    colorHex: '#fbbf24',
    trajectoryKey: 'apollo11',
    milestones: [
      { id: 'ap11-1', title: 'Launch from KSC Pad 39A', date: 'July 16, 1969 13:32 UTC', description: 'Saturn V generates 34.5 million Newtons of thrust.', normalizedProgress: 0.05 },
      { id: 'ap11-2', title: 'Trans-Lunar Injection (TLI)', date: 'July 16, 1969', description: 'Accelerated to 39,000 km/h on a free-return trajectory toward the Moon.', normalizedProgress: 0.25 },
      { id: 'ap11-3', title: 'Lunar Orbit Insertion (LOI)', date: 'July 19, 1969', description: 'SPS engine burned to place Apollo 11 into circular 110 km lunar orbit.', normalizedProgress: 0.5 },
      { id: 'ap11-4', title: 'The Eagle Has Landed', date: 'July 20, 1969 20:17 UTC', description: 'Neil Armstrong pilots manual touchdown at Sea of Tranquility with 25 seconds of fuel left.', normalizedProgress: 0.65 },
      { id: 'ap11-5', title: 'First Moonwalk', date: 'July 21, 1969 02:56 UTC', description: '"That\'s one small step for man, one giant leap for mankind." 2.5 hours on lunar surface.', normalizedProgress: 0.72 },
      { id: 'ap11-6', title: 'Lunar Ascent & Rendezvous', date: 'July 21, 1969', description: 'Eagle ascent stage launches and docks with Columbia in orbit.', normalizedProgress: 0.82 },
      { id: 'ap11-7', title: 'Pacific Splashdown', date: 'July 24, 1969 16:50 UTC', description: 'Safely returned home, recovered by USS Hornet.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agency: 'NASA / JPL',
    launchYear: 1977,
    launchDate: 'September 5, 1977',
    status: 'Operational',
    destination: 'Interstellar Space',
    type: 'flyby',
    primaryTargetId: 'interstellar',
    tagline: 'Most Distant Human-Made Object & Golden Record Bearer',
    overview: 'Launched to explore Jupiter and Saturn, Voyager 1 used gravitational slingshots to accelerate into interstellar space. In August 2012, it officially crossed the heliopause at 121 AU, becoming the first human emissary in interstellar space.',
    achievements: [
      'First spacecraft to enter interstellar space (August 25, 2012)',
      'Captured the legendary "Pale Blue Dot" photo from 6 billion km away in 1990',
      'Discovered volcanoes on Jupiter’s moon Io and detailed Saturn’s ring complexities'
    ],
    scientificImpact: 'Carries the Golden Record containing sounds and images of Earth; currently measures interstellar magnetic fields and cosmic rays beyond the Sun’s influence.',
    colorHex: '#00f0ff',
    trajectoryKey: 'voyager1',
    milestones: [
      { id: 'v1-m1', title: 'Launch', date: 'Sep 5, 1977', description: 'Launched on a Titan IIIE rocket from Cape Canaveral.', normalizedProgress: 0.05 },
      { id: 'v1-m2', title: 'Jupiter Encounter', date: 'Mar 5, 1979', description: 'Closest approach at 349,000 km, discovering Io\'s active volcanoes.', normalizedProgress: 0.28 },
      { id: 'v1-m3', title: 'Saturn Encounter & Titan Flyby', date: 'Nov 12, 1980', description: 'Slingshot over Titan sacrificed planetary alignment to head outward.', normalizedProgress: 0.52 },
      { id: 'v1-m4', title: 'The Pale Blue Dot', date: 'Feb 14, 1990', description: 'Turned camera around to snap the family portrait of the Solar System.', normalizedProgress: 0.72 },
      { id: 'v1-m5', title: 'Interstellar Boundary Crossing', date: 'Aug 25, 2012', description: 'Crossed the heliopause at 121.6 AU into interstellar plasma.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'voyager-2',
    name: 'Voyager 2',
    agency: 'NASA / JPL',
    launchYear: 1977,
    launchDate: 'August 20, 1977',
    status: 'Operational',
    destination: 'Interstellar Space (The Grand Tour)',
    type: 'flyby',
    primaryTargetId: 'interstellar',
    tagline: 'The Legendary Grand Tour of All Four Giant Planets',
    overview: 'Taking advantage of a rare geometric planetary alignment that occurs only once every 175 years, Voyager 2 remains the only spacecraft to have visited all four outer gas and ice giants: Jupiter, Saturn, Uranus, and Neptune.',
    achievements: [
      'Only spacecraft to visit Uranus (1986) and Neptune (1989)',
      'Entered interstellar space on November 5, 2018',
      'Discovered 16 new moons and active nitrogen geysers on Neptune’s moon Triton'
    ],
    scientificImpact: 'Established modern understanding of outer planet atmospheres, ring dynamics, and the shape of the heliosphere bubble.',
    colorHex: '#3b82f6',
    trajectoryKey: 'voyager2',
    milestones: [
      { id: 'v2-m1', title: 'Launch', date: 'Aug 20, 1977', description: 'Launched 16 days before Voyager 1 on a slower, broader trajectory.', normalizedProgress: 0.05 },
      { id: 'v2-m2', title: 'Jupiter Encounter', date: 'July 9, 1979', description: 'Passed within 570,000 km of Jupiter.', normalizedProgress: 0.25 },
      { id: 'v2-m3', title: 'Saturn Encounter', date: 'Aug 26, 1981', description: 'Used Saturn\'s gravity to slingshot toward Uranus.', normalizedProgress: 0.45 },
      { id: 'v2-m4', title: 'Uranus Encounter', date: 'Jan 24, 1986', description: 'First and only visit to Uranus; mapped tilted magnetic dipole.', normalizedProgress: 0.68 },
      { id: 'v2-m5', title: 'Neptune Encounter', date: 'Aug 25, 1989', description: 'Passed 4,950 km over Neptune\'s north pole and detected Triton geysers.', normalizedProgress: 0.85 },
      { id: 'v2-m6', title: 'Interstellar Boundary', date: 'Nov 5, 2018', description: 'Plasma instrument confirmed crossing into interstellar space.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'hubble',
    name: 'Hubble Space Telescope',
    agency: 'NASA / ESA',
    launchYear: 1990,
    launchDate: 'April 24, 1990',
    status: 'Operational',
    destination: 'Low Earth Orbit (540 km)',
    type: 'space_telescope',
    primaryTargetId: 'earth',
    tagline: 'Window into Deep Cosmic Time',
    overview: 'Deployed from Space Shuttle Discovery (STS-31), Hubble was designed to observe the universe free from Earth’s atmospheric distortion. Serviced 5 times by astronaut crews, it has made over 1.6 million astronomical observations.',
    achievements: [
      'Pinpointed the expansion rate and age of the universe to ~13.8 billion years',
      'Captured Hubble Deep Field, revealing thousands of galaxies in an empty patch of sky',
      'Confirmed the presence of supermassive black holes at galaxy centers'
    ],
    scientificImpact: 'One of the most productive scientific instruments in human history, yielding over 20,000 peer-reviewed research papers.',
    colorHex: '#a855f7',
    milestones: [
      { id: 'hb-1', title: 'Launch & Deployment', date: 'Apr 24, 1990', description: 'Deployed into 540 km circular orbit from Space Shuttle Discovery.', normalizedProgress: 0.2 },
      { id: 'hb-2', title: 'First Servicing Mission (COSTAR)', date: 'Dec 1993', description: 'Astronauts installed corrective optics fixing mirror spherical aberration.', normalizedProgress: 0.5 },
      { id: 'hb-3', title: 'Hubble Ultra Deep Field', date: '2004', description: 'Looked back 13 billion years into cosmic dawn.', normalizedProgress: 0.8 },
      { id: 'hb-4', title: '30+ Years of Science', date: '2026', description: 'Still continuously operating alongside JWST.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'curiosity',
    name: 'Curiosity Mars Rover (MSL)',
    agency: 'NASA / JPL',
    launchYear: 2011,
    launchDate: 'November 26, 2011',
    status: 'Operational',
    destination: 'Mars (Gale Crater)',
    type: 'rover',
    primaryTargetId: 'mars',
    tagline: 'Nuclear-Powered Robotic Geologist',
    overview: 'Curiosity landed in Gale Crater using a groundbreaking rocket-powered "sky crane" system. Designed to assess whether Mars ever had an environment capable of supporting microbial life, it confirmed ancient rivers and organic carbon compounds.',
    achievements: [
      'Pioneered Sky Crane landing maneuver for 1-ton rover',
      'Discovered ancient stream gravel beds and confirmed long-lived ancient freshwater lake in Gale Crater',
      'Detected fluctuating atmospheric methane cycles and organic molecules preserved in mudstone'
    ],
    scientificImpact: 'Proved definitively that ancient Mars had all necessary chemical ingredients (C, H, N, O, P, S) for microbial life.',
    colorHex: '#f97316',
    milestones: [
      { id: 'cu-1', title: 'Launch', date: 'Nov 26, 2011', description: 'Atlas V 541 launch from Cape Canaveral.', normalizedProgress: 0.1 },
      { id: 'cu-2', title: 'Seven Minutes of Terror', date: 'Aug 6, 2012', description: 'Autonomous hypersonic entry, parachute, and sky crane touchdown.', normalizedProgress: 0.5 },
      { id: 'cu-3', title: 'Climbing Mount Sharp', date: '2014–2026', description: 'Driving up 5 km high central peak examining stratified geologic layers.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'new-horizons',
    name: 'New Horizons',
    agency: 'NASA / SwRI',
    launchYear: 2006,
    launchDate: 'January 19, 2006',
    status: 'Operational',
    destination: 'Pluto & Kuiper Belt',
    type: 'flyby',
    primaryTargetId: 'pluto',
    tagline: 'First Reconnaissance of the Pluto System & Arrokoth',
    overview: 'Launched at the highest Earth escape velocity of any spacecraft (16.26 km/s), New Horizons flew 5 billion km across the Solar System in 9.5 years to reveal Pluto’s heart-shaped glaciers and later visited primordial Kuiper Belt object Arrokoth.',
    achievements: [
      'Historic Pluto flyby on July 14, 2015 passing within 12,500 km',
      'First flyby of contact binary Kuiper Belt object Arrokoth in 2019',
      'Discovered nitrogen glaciers, ice volcanoes, and blue atmospheric haze on Pluto'
    ],
    scientificImpact: 'Transformed Pluto from a speculative blurry dot into a dynamic, geologically active dwarf planet world.',
    colorHex: '#e11d48',
    milestones: [
      { id: 'nh-1', title: 'Launch', date: 'Jan 19, 2006', description: 'Fastest spacecraft launch in history aboard Atlas V.', normalizedProgress: 0.1 },
      { id: 'nh-2', title: 'Jupiter Gravity Assist', date: 'Feb 28, 2007', description: 'Boosted velocity by 4 km/s and captured eruption of Io’s volcano Tvashtar.', normalizedProgress: 0.35 },
      { id: 'nh-3', title: 'Pluto Closest Approach', date: 'July 14, 2015', description: 'Captured iconic high-resolution imagery of Tombaugh Regio.', normalizedProgress: 0.8 },
      { id: 'nh-4', title: 'Arrokoth Flyby', date: 'Jan 1, 2019', description: 'Explored pristine 4-billion-year-old planetesimal.', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA / ESA / CSA',
    launchYear: 2021,
    launchDate: 'December 25, 2021',
    status: 'Operational',
    destination: 'Sun-Earth L2 Lagrange Point (1.5M km)',
    type: 'space_telescope',
    primaryTargetId: 'earth',
    tagline: 'Unfolding the Golden Universe at L2',
    overview: 'With its 6.5-meter gold-beryllium segmented primary mirror and tennis-court-sized 5-layer sunshield, JWST operates in a halo orbit around the Sun-Earth L2 Lagrange point, observing infrared light from the very first galaxies formed after the Big Bang.',
    achievements: [
      'Flawless autonomous 344 single-point-of-failure deep space deployment sequence',
      'Detected the earliest confirmed galaxies formed just 300 million years after the Big Bang',
      'Detected water, carbon dioxide, and clouds in atmospheres of transiting exoplanets'
    ],
    scientificImpact: 'Rewriting astrophysics theories of early galaxy formation, cosmic reionization, and exoplanet atmospheric habitability.',
    colorHex: '#eab308',
    trajectoryKey: 'jwst',
    milestones: [
      { id: 'jw-1', title: 'Ariane 5 Christmas Launch', date: 'Dec 25, 2021 12:20 UTC', description: 'Precision injection so accurate it doubled scientific mission lifespan to 20+ years.', normalizedProgress: 0.1 },
      { id: 'jw-2', title: 'Sunshield Tensioning', date: 'Jan 4, 2022', description: 'All 5 ultra-thin Kapton layers tensioned, cooling instruments to -233°C.', normalizedProgress: 0.35 },
      { id: 'jw-3', title: 'Golden Mirror Wing Deployment', date: 'Jan 8, 2022', description: 'All 18 hexagonal primary mirror segments locked into place.', normalizedProgress: 0.6 },
      { id: 'jw-4', title: 'L2 Orbit Insertion', date: 'Jan 24, 2022', description: 'Mid-course burn placed JWST into perpetual halo orbit at second Lagrange point.', normalizedProgress: 0.85 },
      { id: 'jw-5', title: 'First Deep Field Released', date: 'July 11, 2022', description: 'Deepest and sharpest infrared image of the distant universe (SMACS 0723).', normalizedProgress: 1.0 }
    ]
  },
  {
    id: 'perseverance',
    name: 'Perseverance & Ingenuity (Mars 2020)',
    agency: 'NASA / JPL',
    launchYear: 2020,
    launchDate: 'July 30, 2020',
    status: 'Operational',
    destination: 'Mars (Jezero Crater)',
    type: 'rover',
    primaryTargetId: 'mars',
    tagline: 'Seeking Signs of Ancient Biosignatures & First Powered Flight',
    overview: 'Landing in Jezero Crater’s ancient river delta, Perseverance is collecting hermetically sealed geological core samples for future Mars Sample Return. It also carried Ingenuity, the first rotorcraft to achieve powered controlled aerodynamic flight on another world.',
    achievements: [
      'Ingenuity completed 72 powered flights covering 17 km over 1,000 Martian sols',
      'Produced breathable oxygen from Martian CO₂ atmosphere using MOXIE',
      'Cored and cached dozens of pristine sedimentary rock samples containing organic molecules'
    ],
    scientificImpact: 'Laying the direct groundwork for human exploration and first sample return from another planetary biosphere.',
    colorHex: '#ef4444',
    milestones: [
      { id: 'pr-1', title: 'Launch', date: 'July 30, 2020', description: 'Atlas V launch from Cape Canaveral during Mars alignment window.', normalizedProgress: 0.1 },
      { id: 'pr-2', title: 'Delta Touchdown', date: 'Feb 18, 2021', description: 'Terrain-Relative Navigation autonomous landing inside Jezero Crater.', normalizedProgress: 0.5 },
      { id: 'pr-3', title: 'Wright Brothers Moment', date: 'Apr 19, 2021', description: 'Ingenuity completes historic first powered flight in Mars\' thin atmosphere.', normalizedProgress: 0.75 },
      { id: 'pr-4', title: 'Sample Depot Sealed', date: '2023–2026', description: 'Depot samples cached on Martian surface for future Earth return.', normalizedProgress: 1.0 }
    ]
  }
];
