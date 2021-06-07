/**
 * Represents a stored chart location in space-time.
 */
declare interface ChartLocation extends JsonObject {
  /**
   * The time and date of the location in local time.
   */
  localDate: string;
  /**
   * The time and date of the location in utc time.
   */
  utcDate: string;
  /**
   * The name of the location.
   */
  name: string;
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
 * Represents a stored chart.
 */
declare interface Chart extends JsonObject {
  /**
   * A unique chart id.
   */
  id: string;
  /**
   * The name of the chart.
   */
  name: string;
  /**
   * The location of the chart.
   */
  location: ChartLocation;
}
