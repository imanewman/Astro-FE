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

export const pointsByType: Record<string, Point[]> = {
  Visible: [
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

export default { dateFormat, eventTypes: storableEventTypes };
