/**
 * Summarizes the most important details of a generated chart.
 */
declare interface SummaryModel extends JsonObject {
  /**
   * Whether the current time is during the day.
   */
  isDayTime: boolean;
  /**
   * The current zodiac sign of the sun.
   */
  sun: ZodiacSign | null;
  /**
   * The current zodiac sign of the moon.
   */
  moon: ZodiacSign | null;
  /**
   * The current zodiac sign of the ascendant.
   */
  asc: ZodiacSign | null;
}

/**
 * Defines a calculated chart's positions and condition.
 */
declare interface ChartModel extends JsonObject {
  /**
   * The date, time, and location of calculations.
   */
  event: EventModel;
  /**
   * Summarizes the most important information in a chart.
   */
  summary: SummaryModel;
  /**
   * A map of the base planets and points calculated.
   */
  points: PointCollection;
  /**
   * The secondary house system calculated.
   */
  secondaryHouseSystem: HouseSystem;
  /**
   * Each whole sign house, its sign, and the points within it.
   */
  housesWholeSign: HouseModel[];
  /**
   * Each secondary house, its sign, and the points within it.
   */
  housesSecondary: HouseModel[];
  /**
   * A list of transits from this chart to transiting points in the given time range.
   */
  transits: TransitGroupModel[];
}

/**
 * Represents a calculated set of chart points and aspects.
 */
declare interface ChartCollectionModel extends JsonObject {
  /**
   * A list of calculated chart points for given events.
   */
  charts: ChartModel[];
  /**
   * A list of sets of relationships within and between each chart.
   */
  relationships: RelationshipCollectionModel[];
}
