/**
 * Represents a relationship between two points.
 */
declare interface Point2PointModel extends JsonObject {
  /**
   * The point this relationship is from.
   */
  fromPoint: string;
  /**
   * The sign the from point is in.
   */
  fromSign: string;
  /**
   * The type of event this aspect is from.
   */
  fromType: string;
  /**
   * The point this relationship is to.
   */
  toPoint: string;
  /**
   * The sign the to point is in.
   */
  toSign: string;
  /**
   * The type of event this aspect is to.
   */
  toType: string;
}

/**
 * Represents information about the relationship between two points.
 */
declare interface RelationshipModel extends Point2PointModel {
  /**
   * The degrees between the two points relative to their longitude along the ecliptic.
   * This value will always be the arc from the first to the second point.
   */
  arcOrdered: number | null;
  /**
   * The arc between the two points relative to their longitude along the ecliptic.
   * This value will always be the smaller arc between the two points.
   */
  arcMinimal: number | null;
  /**
   * The degrees between the two points relative to their declination from the equator.
   */
  declinationArc: number | null;
  /**
   * The phase of separation between these two points.
   */
  phase: PhaseType | null;
  /**
   * The point being used as the base for the phase between points.
   */
  phaseBasePoint: PhaseType | null;
  /**
   * The precession correction in degrees from the first to the second event.
   */
  precessionCorrection: number;
  /**
   * The type of aspect by sign between the points.
   */
  signAspect: AspectType;
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
   * The type of the chart that these aspects are calculated going from.
   */
  fromChartType: string;
  /**
   * The index of the chart that these aspects are calculated going to.
   */
  toChartIndex: number;
  /**
   * The type of the chart that these aspects are calculated going to.
   */
  toChartType: string;
  /**
   * The name of these relationships.
   */
  name: string;
  /**
   * A list of relationships between every set of points in the first to the second chart.
   */
  relationships: RelationshipModel[];
}
