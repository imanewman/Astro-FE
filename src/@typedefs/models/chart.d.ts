/**
 * Represents a stored chart location.
 */
declare interface ChartLocation {
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
declare interface Chart {
  /**
   * A unique chart id.
   */
  id: string;
  /**
   * The name of the chart.
   */
  name: string;
  /**
   * The time and date of the chart.
   */
  date: string;
  /**
   * The location of the chart.
   */
  location: ChartLocation;
}
