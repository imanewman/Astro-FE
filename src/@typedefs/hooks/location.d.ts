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
 * Represents a timezone for a date and location.
 */
declare interface LocationTimezoneQuery {
  /**
   * The name of the location for the timezone.
   */
  locationName: string;
  /**
   * The local time and date to convert into UTC.
   */
  localDate: string;
}

/**
 * Represents a timezone for a date and location.
 */
declare interface LocationTimezone extends LocationTimezoneQuery {
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
  /**
   * The UTC offset code for this time zone.
   */
  utcOffset: string;
  /**
   * The latitude of the location.
   */
  latitude: number;
  /**
   * The longitude of the location.
   */
  longitude: number;
  /**
   * The UTC time for the local date within this timezone.
   */
  utcDate: string;
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
