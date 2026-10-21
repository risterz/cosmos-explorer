export interface LearnTopic {
  id: string;
  title: string;
  category: 'Astrophysics' | 'Mechanics' | 'Exploration' | 'Planetary Science';
  summary: string;
  content: string[];
  relatedPlanetOrMission?: string;
}

export const LEARN_TOPICS: LearnTopic[] = [
  {
    id: 'what-is-an-orbit',
    title: 'What is an Orbit?',
    category: 'Mechanics',
    summary: 'An orbit is not a state of zero gravity, but a continuous perpetual free-fall around a massive body.',
    content: [
      'As Sir Isaac Newton famously imagined with his thought-experiment cannon on a mountaintop: if you shoot a cannonball fast enough horizontally (about 7.8 km/s or 28,000 km/h in Low Earth Orbit), the Earth curves away underneath it at the exact same rate that gravity pulls it downward.',
      'The spacecraft is perpetually falling toward the center of mass, but because of its forward tangential velocity, it never hits the ground.',
      'Planetary orbits follow Johannes Kepler\'s three laws: they are elliptical (not perfect circles), sweep out equal areas in equal times, and their orbital period squared is proportional to the cube of their semi-major axis.'
    ],
    relatedPlanetOrMission: 'earth'
  },
  {
    id: 'why-is-jupiter-so-large',
    title: 'Why is Jupiter so Enormous?',
    category: 'Planetary Science',
    summary: 'Jupiter formed just beyond the Solar System\'s "frost line", rapidly accumulating massive amounts of water ice and gas.',
    content: [
      'During the early proto-planetary disk 4.6 billion years ago, there was a boundary known as the "frost line" or "snow line" (~2.7 AU from the Sun). Inside this line, solar heat prevented water, ammonia, and methane from condensing into ice, leaving only rock and metals.',
      'Beyond the frost line, water ice was vastly more abundant. Jupiter\'s rocky-icy core rapidly grew to roughly 10 Earth masses in just a few million years.',
      'Once it reached this critical threshold, its runaway gravitational attraction rapidly vacuumed up enormous envelopes of primordial hydrogen and helium directly from the solar nebula before the young Sun\'s solar wind could blow the gas away.'
    ],
    relatedPlanetOrMission: 'jupiter'
  },
  {
    id: 'lagrange-points-explained',
    title: 'What are Lagrange Points (and why L2 for JWST)?',
    category: 'Astrophysics',
    summary: 'Gravitational parking spots in space where orbital forces balance perfectly.',
    content: [
      'In a system of two large bodies in orbit (such as the Sun and Earth), there are five mathematical points of equilibrium discovered by Italian-French mathematician Joseph-Louis Lagrange in 1772.',
      'At these points, the combined gravitational pull of the Sun and Earth provides precisely the centripetal force required to orbit with them at the same speed.',
      'The James Webb Space Telescope was placed in a halo orbit around Sun-Earth L2 (1.5 million km behind Earth, away from the Sun). Here, Earth blocks solar glare, and JWST can keep its tennis-court-sized sunshield pointed in one direction towards the Sun, Earth, and Moon simultaneously, allowing its infrared sensors to stay cryogenically chilled at -233°C (-388°F).'
    ],
    relatedPlanetOrMission: 'jwst'
  },
  {
    id: 'gravity-assists-grand-tour',
    title: 'How Do Gravity Assists Work?',
    category: 'Exploration',
    summary: 'Stealing orbital momentum from giant planets to accelerate spacecraft across the Solar System.',
    content: [
      'A gravitational slingshot (gravity assist) involves a spacecraft flying behind a moving planet in its orbit.',
      'Relative to the planet, the spacecraft enters and leaves at the exact same speed (hyperbolic trajectory). But relative to the Sun, the spacecraft hitches a ride on the planet’s orbital momentum, stealing an imperceptible fraction of the planet\'s orbital energy.',
      'Voyager 2 used repeated gravity assists at Jupiter, Saturn, and Uranus to reach Neptune in just 12 years instead of the 30+ years a direct rocket burn would have required.'
    ],
    relatedPlanetOrMission: 'voyager-2'
  },
  {
    id: 'why-are-sunsets-blue-on-mars',
    title: 'Why Are Sunsets Blue on Mars?',
    category: 'Planetary Science',
    summary: 'Atmospheric Mie scattering turns the Martian sky butterscotch by day and cyan-blue at twilight.',
    content: [
      'On Earth, Rayleigh scattering by tiny nitrogen and oxygen molecules scatters short-wavelength blue light in all directions, making the daytime sky blue and setting suns appear deep red.',
      'On Mars, the thin atmosphere is filled with fine ferric oxide (rust) dust particles that are comparable in size to the wavelength of visible light.',
      'Through a phenomenon called Mie scattering, the dust particles absorb blue light while scattering red wavelengths throughout the daytime sky. However, when the Sun sets, the light path is longest, and forward-scattering allows the blue wavelengths to pass directly through the dust, creating an azure halo around the setting Martian Sun.'
    ],
    relatedPlanetOrMission: 'mars'
  },
  {
    id: 'why-saturn-has-rings',
    title: 'Why Does Saturn Have Rings?',
    category: 'Planetary Science',
    summary: 'Tidal forces rip icy moons apart inside the Roche limit.',
    content: [
      'Every massive celestial body has a perimeter called the Roche limit. Inside this boundary, the tidal gravitational pull of the planet is stronger than the internal gravity holding a small moon together.',
      'Scientists hypothesize that Saturn\'s bright rings are the remains of an icy comet or an ancient 400-km-wide icy moon (nicknamed Chrysalis) that strayed inside Saturn\'s Roche limit roughly 100 to 200 million years ago and was shredded by tidal forces.',
      'The rings are 99% pure water ice and are surprisingly dynamic. Cassini discovered that the rings are actively "raining" tens of thousands of kilograms of water ice into Saturn\'s upper atmosphere every second, meaning the iconic rings may vanish in 100 to 300 million years.'
    ],
    relatedPlanetOrMission: 'saturn'
  }
];
