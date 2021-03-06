/**
 * The format to use by default for date strings.
 */
export const dateFormat = "M/d/yyyy h:mm a";

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

export const defaultNatalPoints: Point[] = [
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
  "Ascendant",
  "Midheaven",
  "Descendant",
  "Inner Heaven",
  "Vertex",
  "Lot of Fortune",
  "Lot of Spirit",
];

export const defaultTransitPoints: Point[] = [
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

export const defaultAspects: AspectType[] = [
  "Conjunction",
  "Opposition",
  "Trine",
  "Square",
  "Sextile",
  "Parallel",
  "Contraparallel",
  "Octile",
  "Sesquiquadrate",
];

export const transitTypes: TransitCalculationType[] = [
  "Transit To Chart",
  "Transit To Transit",
];

export const transitGroupTypes: TransitGroupType[] = [
  "All",
  "By Relationship",
  "By Natal Point",
  "By Transit Point",
  "By Day",
];

export default {
  dateFormat,
  storableEventTypes,
  allPoints,
  defaultNatalPoints,
  defaultTransitPoints,
  allAspects,
};
