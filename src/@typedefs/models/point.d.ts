/**
 * Defines the condition of a planet.
 * For points that aren't planets, all values are false.
 */
declare interface PointConditionModel extends JsonObject {
  /**
   * Whether a planet is in its joy.
   */
  inJoy: boolean;
  /**
   * Whether a planet is in its domicile.
   */
  inDomicile: boolean;
  /**
   * Whether a planet is in its exaltation.
   */
  inExaltation: boolean;
  /**
   * Whether a planet is in its detriment.
   */
  inDetriment: boolean;
  /**
   * "Whether a planet is in its fall.
   */
  inFall: boolean;
  /**
   * If it is in its triplicity, the order of triplicity importance between 1 and 3.
   */
  inTriplicity: number | null;
  /**
   * Whether a planet is in its own bound.
   */
  inBound: boolean;
  /**
   * Whether a planet is in its own decan.
   */
  inDecan: boolean;
  /**
   * Properties of this planet determined by sect.
   */
  sectPlacement: SectPlacement | null;
  /**
   * Whether the planet is under the beams of, combust, or cazimi sun.
   */
  sunProximity: SunCondition | null;
}

/**
 * Defines the segments of the chart that this point falls in.
 */
declare interface DivisionsModel extends JsonObject {
  /**
   * The traditional planet that rules this sign.
   */
  signRuler: Point | null;
  /**
   * The traditional planet that rules this decan.
   */
  decanRuler: Point | null;
  /**
   * The traditional planet that rules this bound.
   */
  boundRuler: Point | null;
  /**
   * The traditional planets that rule this element in the order of importance.
   */
  triplicityRuler: Point[];
  /**
   * The 12th part sign that this point is in.
   */
  twelfthPartSign: ZodiacSign | null;
  /**
   * The sign corresponding to the degree of this point.
   */
  degreeSign: ZodiacSign | null;
}

/**
 * Defines the house and ruled houses of a point for a given house system.
 */
declare interface PointHousesModel extends JsonObject {
  /**
   * The house system used.
   */
  house_system: HouseSystem;
  /**
   * The house that this planet is in.
   */
  house: number | null;
  /**
   * The houses that this planet rules.
   */
  ruled_houses: number[];
}

/**
 * Minimally defines any planetary body's position relative to Earth.
 */
declare interface MinimalPointModel extends JsonObject {
  /**
   * The name of the planet or point.
   */
  name: Point | string;
  /**
   * The points composited to create this point.
   */
  points: Point[];
  /**
   * The zodiac sign this point is located within.
   */
  sign: ZodiacSign | null;
  /**
   * The modality of this point's zodiac sign.
   */
  modality: Modality | null;
  /**
   * The element of this point's zodiac sign.
   */
  element: Element | null;
}

/**
 * Defines any planetary body's position relative to Earth.
 */
declare interface PointModel extends MinimalPointModel {
  /**
   * The degrees of longitude of this point along the ecliptic.
   */
  longitude: number;
  /**
   * The degrees along the ecliptic that this point is moving per day.
   */
  longitude_velocity: number | null;
  /**
   * The equatorial declination of the point.
   */
  declination: number | null;
  /**
   * The degrees from the equatorial that this point is moving per day.
   */
  declination_velocity: number | null;
  /**
   * Whether this point is stationary on the ecliptic.
   */
  is_stationary: boolean | null;
  /**
   * Whether this point is retrograde on the ecliptic.
   */
  is_retrograde: boolean | null;
  /**
   * The degrees, out of 30, that this point is located at within a sign.
   */
  degrees_in_sign: number | null;
  /**
   * he minutes, out of 60, within a degree that this point is located at.
   */
  minutes_in_degree: number | null;
  /**
   * The whole sign house and ruled houses of this point.
   */
  houses_whole_sign: PointHousesModel;
  /**
   * A secondary house system's house and ruled houses of this point.
   */
  houses_secondary: PointHousesModel;
  /**
   * The segments of the chart that this point falls in.
   */
  divisions: DivisionsModel;
  /**
   * The condition of this is a planet.
   */
  condition: PointConditionModel;
}
