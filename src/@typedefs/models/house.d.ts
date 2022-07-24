/**
 * Defines a house within a chart.
 */
declare interface HouseModel extends JsonObject {
  /**
   * The number of this house.
   */
  number: number;
  /**
   * The zodiac sign on the cusp of this house.
   */
  sign: ZodiacSign;
  /**
   * Any planets that rule this house.
   */
  rulers: Point[];
  /**
   * Any planets and points within this house.
   */
  points: Point[];
  /**
   * The longitude of the beginning of the house.
   */
  fromLongitude: number | null;
  /**
   * The longitude of the end of the house.
   */
  toLongitude: number | null;
}
