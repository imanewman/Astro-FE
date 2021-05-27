/**
 * Props for rendering a location input field.
 */
declare interface LocationInputProps {
  /**
   * The name of the current location.
   */
  locationName: string;

  /**
   * A callback to set the geo location of the selected location once loaded.
   *
   * @param location - The location to update to.
   */
  setLocation: (location: ChartLocation) => void;
}
