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
   * The house system to calculate the cusps of.
   */
  secondary_house_system?: HouseSystem;
  /**
   * The way to sort the aspects.
   */
  aspectSort?: AspectSort;
}

/**
 * Represents a collection of events and input settings.
 */
declare interface SettingsModel extends JsonObject {
  /**
   * The events to calculated charts for.
   */
  events: EventSettingsModel[];
}
