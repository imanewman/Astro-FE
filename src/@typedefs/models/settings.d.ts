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
 * Represents a midpoint between points.
 */
declare interface MidpointModel {
  /**
   * Defines the point to calculate a midpoint from.
   */
  fromPoint: Point;
  /**
   * Defines the point to calculate a midpoint to.
   */
  toPoint: Point;
}

/**
 * Represents a midpoint between points.
 */
declare interface EnabledPointsModel {
  /**
   * Defines what points should be enabled for calculations.
   */
  points: Point[];
  /**
   * Defines what midpoints should be enabled for calculations.
   */
  midpoints?: MidpointModel[];
  /**
   * The orbs to use for aspect calculations.
   */
  orbs?: AspectOrbsModel;
  /**
   * Defines what aspects should be enabled for calculations.
   */
  aspects?: AspectType[];
}

/**
 * Represents an event's input settings.
 */
declare interface EventModel extends JsonObject {
  /**
   * A unique chart id.
   */
  id: string;
  /**
   * The name of the person or event represented.
   */
  name: string;
  /**
   * The general type of event this represents.
   */
  type: EventType;
  /**
   * Any tags this event is grouped by.
   */
  tags: string[];

  /**
   * The time and date of the location in local time.
   */
  localDate: string;
  /**
   * The time and date of the location in utc time.
   */
  utcDate: string;
  /**
   * The timezone this event is in.
   */
  timezone: string;
  /**
   * The UCT offset name for this timezone.
   */
  utcOffset: string;
  /**
   * The UTC offset time for this timezone.
   */
  numericOffset: number;

  /**
   * The name of the location.
   */
  location: string;
  /**
   * The latitude of the location.
   */
  latitude: string;
  /**
   * The longitude of the location.
   */
  longitude: string;
}

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
}
