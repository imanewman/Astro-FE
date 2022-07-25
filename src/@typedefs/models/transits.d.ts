/**
 * Represents an event that lasts some duration.
 */
declare interface TransitEventModel extends EventModel {
  /**
   * The local time for the end of the date range, defaulting to 7 days from now.
   */
  localEndDate: string;
  /**
   * The UTC time for the end of the date range, defaulting to 7 days from now.
   */
  utcEndDate: string;
}

/**
 * Defines the transits to calculate the timing of for an event.
 */
declare interface TransitSettingsModel extends JsonObject {
  /**
   * Whether to calculate aspects between transiting bodies, or to a static event.
   */
  type: TransitCalculationType;
  /**
   * The time range to calculate transits within.
   */
  event: TransitEventModel;
  /**
   * Defines what points should be enabled for transits.
   */
  enabled?: EnabledPointsModel[];
  /**
   * How many times to poll before approximating transits.
   * @default 1 hour.
   * - 0.5 will poll every 30 minutes. 2 will poll every 2 hours.
   */
  hoursPerPoll?: number;
  /**
   * How to group these transits.
   */
  groupBy?: TransitGroupType[];
  /**
   * Determines whether the timing of transits should be calculated for an event.
   */
  calculateEcliptic?: boolean;
  /**
   * Determines whether the timing of transits, accounting for precession,
   * should be calculated for an event.
   */
  calculateDeclination?: boolean;
  /**
   * Determines whether the timing of transits, accounting for precession,
   * should be calculated for an event.
   */
  calculatePrecessionCorrected?: boolean;
  /**
   * Determines whether to calculate ingresses. Only works for mundane transits.
   */
  calculateIngress?: boolean;
  /**
   * Determines whether to calculate stations. Only works for mundane transits.
   */
  calculateStation?: boolean;
}

/**
 * Represents information about the relationship between two points.
 */
declare interface TransitModel extends AspectModel, Point2PointModel {
  /**
   * The name of this transit.
   */
  name: string;
  /**
   * The type of this transit.
   */
  transitType: TransitType;
  /**
   * The local time when this aspect goes exact.
   */
  localExactDate: string;
  /**
   * The UTC time when this aspect goes exact.
   */
  utcExactDate: string;
}

/**
 * Represents a group of transits with similar traits.
 */
declare interface TransitGroupModel extends JsonObject {
  /**
   * The transits in this group.
   */
  transits: TransitModel[];
  /**
   * How these transits are grouped.
   */
  groupBy: TransitGroupType[];
  /**
   * The value these transits are grouped by, such as the planet.
   */
  groupValue: string;
}
