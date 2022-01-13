/**
 * The format to use by default for date strings.
 */
export const dateFormat = "M/d/yyyy h:mm a";

export const geoCodeApiKey = "AIzaSyDEwo4G5B-nYnfoMgvz5pqTUmE0s23sXAc";

export const storableEventTypes: EventType[] = [
  "Natal",
  "Event",
  "Horary",
  "Election",
];

export const allPoints: Point[] = [
  "Moon",
  "Mercury",
  "Venus",
  "Sun",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "True North Node",
  "True South Node",
  "Ceres",
  "Pallas",
  "Juno",
  "Vesta",
  "Chiron",
  "Pholus",
  "Charklo",
  "Ascendant",
  "Midheaven",
  "Descendant",
  "Inner Heaven",
  "Vertex",
  "Lot of Fortune",
  "Lot of Spirit",
  "Lot of Necessity",
  "Lot of Eros",
  "Lot of Courage",
  "Lot of Victory",
  "Lot of Nemesis",
];

export const allAspects: AspectType[] = [
  "Conjunction",
  "Opposition",
  "Trine",
  "Square",
  "Sextile",
  "Parallel",
  "Contraparallel",
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
];

export default {
  dateFormat, storableEventTypes, points: allPoints, aspects: allAspects,
};
