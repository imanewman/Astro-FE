/**
 * Represents a stored chart.
 */
declare interface Chart extends JsonObject {
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
  type: "Natal" | "Transit" | "Event" | "Horary" | "Election";
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
   * TODO: The the timezone this event is in.
   */
  timezone: string;
  /**
   * TODO: The UCT offset for this timezone.
   */
  utcOffset: string;

  /**
   * TODO: The name of the location.
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
