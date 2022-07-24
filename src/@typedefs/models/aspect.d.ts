/**
 * Defines the orbs used for aspects.
 */
declare interface AspectOrbsModel {
  conjunction: number;
  opposition: number;
  square: number;
  trine: number;
  sextile: number;
  quintile: number;
  septile: number;
  biSeptile: number;
  triSeptile: number;
  octile: number;
  sesquiquadrate: number;
  novile: number;
  biNovile: number;
  quadriNovile: number;
  semiSextile: number;
  quincunx: number;
  parallel: number;
  contraparallel: number;
  sunUnderBeamsOrb: number;
  sunCombustOrb: number;
  sunCazimiOrb: number;
}

/**
 * Represents a close aspect between points.
 */
declare interface AspectModel extends JsonObject {
  /**
   * The type of aspect between the two points.
   */
  type: string | null;
  /**
   * Whether this aspect is corrected for precession between events.
   */
  isPrecessionCorrected: boolean;
  /**
   * The exact degrees of the angle between points.
   */
  angle: number | null;
  /**
   * The current orb in degrees of the aspect.
   */
  orb: number | null;
  /**
   * The relative velocity between the two points, if they are in aspect.
   */
  relativeVelocity: number | null;
  /**
   * Whether the aspect is applying or separating.
   */
  movement: string | null;
}
