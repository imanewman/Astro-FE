declare type EventType = "Natal" | "Transit" | "Event" | "Horary" | "Election";

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
   * TODO: The general type of event this represents.
   */
  type: EventType;
  /**
   * TODO: Any tags this event is grouped by.
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
   * TODO: The UCT offset name for this timezone.
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
  event: EventModel;
}

/**
 * Represents a collection of events and input settings.
 */
declare interface SettingsModel extends JsonObject {
  events: EventSettingsModel[];
}
