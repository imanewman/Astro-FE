/**
 * Represents a close aspect between points.
 */
declare interface AspectModel extends JsonObject {
  /**
   * The type of aspect between the two points.
   */
  type: string | null;
  /**
   * Whether the aspect is applying or separating.
   */
  movement: string | null;
  /**
   * The approximate amount of days until this aspect goes exact, if less than a week.
   */
  daysUntilExact: number | null;
  /**
   * The approximate UTC date aspect goes exact, if in less than a week.
   */
  utcDateOfExact: string | null;
  /**
   * The approximate local date aspect goes exact, if in less than a week.
   */
  localDateOfExact: string | null;
}

/**
 * Represents the relationships between two points.
 */
declare interface RelationshipModel extends JsonObject {
  /**
   * The point this relationship is from.
   */
  fromPoint: string;
  /**
   * The point this relationship is to.
   */
  toPoint: string;
  /**
   * The aspect between the two points based on ecliptic longitude.
   */
  eclipticAspect: AspectModel;
  /**
   * The aspect between the two points based on ecliptic longitude,
   * corrected for precession of the earth.
   */
  precessionCorrectedAspect: AspectModel;
  /**
   * The aspect between the two points based on declination.
   */
  declinationAspect: AspectModel;
}

/**
 * Represents the relationships between all points.
 */
declare interface RelationshipCollectionModel extends JsonObject {
  /**
   * The index of the chart that these aspects are calculated going from.
   */
  fromChartIndex: number;
  /**
   * The index of the chart that these aspects are calculated going to.
   * The value is null if aspects are within a single chart.
   */
  toChartIndex: number | null;
  /**
   * A list of relationships between every set of points in the first to the second chart.
   */
  relationships: RelationshipModel[];
}
