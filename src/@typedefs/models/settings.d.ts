/**
 * Represents an event and its enabled points.
 */
declare interface EventSettingsModel extends JsonObject {
  /**
   * The time and place of the event.
   */
  event: EventModel;
  /**
   * Defines what points should be enabled for calculations.
   * When calculating aspect between points in different enabled objects,
   * orbs and aspect types will be taken from the latter of the two points.
   */
  enabled?: EnabledPointsModel[];
  /**
   * Defines what points should be enabled for transit calculations.
   * When calculating aspect between points in different enabled objects,
   * orbs and aspect types will be taken from the latter of the two points.
   */
  transits?: TransitSettingsModel;
}

/**
 * Represents a collection of events and input settings.
 */
declare interface SettingsModel extends JsonObject {
  /**
   * The events to calculated charts for.
   */
  events: EventSettingsModel[];
  /**
   * The house system to calculate the cusps of.
   */
  secondaryHouseSystem?: HouseSystem;
  /**
   * The way to sort the aspects.
   */
  aspectSort?: AspectSort;
  /**
   * The percent of the average speed of a planet that it must be under to be considered stationary.
   */
  stationaryPctOfAvgSpeed?: number;
  /**
   * The list of rulership systems to use in sign rulership calculations.
   */
  rulershipSystem?: RulershipType[];
  /**
   * This flag enables the calculation of the condition of points.
   */
  calculateCondition?: boolean;
  /**
   * his flag enables the calculation of the condition of sign divisions.
   */
  calculateDivisions?: boolean;
  /**
   * This flag enables the calculation of relationships between points.
   */
  calculateRelationships?: boolean;
  /**
   * This flag enables the calculation the phase between points.
   */
  calculateRelationshipPhase?: boolean;
  /**
   * This flag enables the calculation the application/separation between points.
   */
  calculateRelationshipMovement?: boolean;
  /*
   * This flag will remove any point relationships with no ecliptic or declination aspects.
   */
  removeEmptyRelationships?: boolean;
}
