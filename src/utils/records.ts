export const pointsByType: Record<string, Point[]> = {
  Inner: [
    "Moon",
    "Mercury",
    "Venus",
    "Sun",
    "Mars",
    "Jupiter",
    "Saturn",
  ],
  Outer: [
    "Uranus",
    "Neptune",
    "Pluto",
  ],
  Nodes: [
    "True North Node",
    "True South Node",
  ],
  Asteroids: [
    "Ceres",
    "Pallas",
    "Juno",
    "Vesta",
  ],
  Centaurs: [
    "Chiron",
    "Pholus",
    "Charklo",
  ],
  Points: [
    "Ascendant",
    "Midheaven",
    "Descendant",
    "Inner Heaven",
    "Vertex",
  ],
  Lots: [
    "Lot of Fortune",
    "Lot of Spirit",
    "Lot of Necessity",
    "Lot of Eros",
    "Lot of Courage",
    "Lot of Victory",
    "Lot of Nemesis",
  ],
};

export const aspectsByType: Record<string, AspectType[]> = {
  Major: [
    "Conjunction",
    "Opposition",
    "Trine",
    "Square",
    "Sextile",
  ],
  Declination: [
    "Parallel",
    "Contraparallel",
  ],
  Minor: [
    "Quintile",
    "Bi-Quintile",
    "Septile",
    "Bi-Septile",
    "Tri-Septile",
    "Octile",
    "Sesquiquadrate",
    "Novile",
    "Bi-Novile",
    "Quadri-Novile",
    "Semi-Sextile",
    "Quincunx",
  ],
};

export default { pointsByType, aspectsByType };
