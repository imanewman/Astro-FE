declare type EventType
  = "Natal"
  | "Transit"
  | "Event"
  | "Horary"
  | "Election";

declare type HouseSystem
  = "Whole Sign"
  | "Placidus"
  | "Equal"
  | "Porphyry"
  | "Regiomontanus"
  | "Campanus";

declare type AspectSort
  = "Point Order"
  | "Smallest Orb"
  | "Closest Exact";

declare type AspectType
  = "Conjunction"
  | "Opposition"
  | "Trine"
  | "Square"
  | "Sextile"
  | "Quintile"
  | "Bi-Quintile"
  | "Septile"
  | "Bi-Septile"
  | "Tri-Septile"
  | "Octile"
  | "Sesquiquadrate"
  | "Novile"
  | "Bi-Novile"
  | "Quadri-Novile"
  | "Semi-Sextile"
  | "Quincunx"
  | "Parallel"
  | "Contraparallel"
  | "Aversion";

declare type Point
  = "Moon"
  | "Mercury"
  | "Venus"
  | "Sun"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"
  | "Pluto"
  | "Ceres"
  | "Pallas"
  | "Juno"
  | "Vesta"
  | "Chiron"
  | "Pholus"
  | "Charklo"
  | "Ascendant"
  | "Midheaven"
  | "Descendant"
  | "Inner Heaven"
  | "Vertex"
  | "True North Node"
  | "True South Node"
  | "Lot of Fortune"
  | "Lot of Spirit"
  | "Lot of Necessity"
  | "Lot of Eros"
  | "Lot of Courage"
  | "Lot of Victory"
  | "Lot of Nemesis";

declare type PhaseType
  = "New"
  | "Crescent"
  | "First Quarter"
  | "Gibbous"
  | "Full"
  | "Disseminating"
  | "Last Quarter"
  | "Balsamic";

declare type RulershipType
  = "Traditional"
  | "Modern"
  | "Asteroids";

declare type TransitType
  = "Aspect"
  | "Ingress"
  | "Retrograde Ingress"
  | "Station Direct"
  | "Station Retrograde";

declare type TransitCalculationType
  = "Transit To Chart"
  | "Transit To Transit";

declare type TransitGroupType
  = "All"
  | "By Relationship"
  | "By Natal Point"
  | "By Transit Point"
  | "By Day";
