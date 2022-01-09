/**
 * The latitude and longitude of a location.
 */
declare interface GeocodeLocation {
  lat: number;
  lng: number;
}

/**
 * Represents a place object returned from the Google API.
 */
declare interface PlaceType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      },
    ];
  };
}

/**
 * Represents a timezone object returned from the Google API.
 */
declare interface Timezone {
  /**
   * The status of whether this timezone was successfully found.
   */
  status: string;
  /**
   * The timezone id.
   */
  timeZoneId: string;
  /**
   * The timezone name.
   */
  timeZoneName: string;
  /**
   * The daylight savings time offset in milliseconds for this time zone.
   */
  dstOffset: number;
  /**
   * The offset in milliseconds for this time zone.
   */
  rawOffset: number;
}

declare interface LocationHook {
  /**
   * The current autocomplete options based on the search value.
   */
  options: PlaceType[];

  /**
   * The place that is currently selected.
   */
  place: PlaceType | null;

  /**
   * Callback to update the place to a new value.
   *
   * @param event - A change event.
   * @param newValue - The new place value selected.
   */
  onChange(event: any, newValue: PlaceType | null): void;

  /**
   * Callback to update the input text to a new value.
   *
   * @param event - A change event.
   * @param newInputValue - The new input value typed.
   */
  onInputChange(event: any, newInputValue: string): void;
}
