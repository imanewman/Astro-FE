import React from "react";
import throttle from "lodash/throttle";

import {
  geoCodeApiKey, getUTCDateAndOffset, isoDate, mountScript,
} from "@utils";
import { createNewPlace } from "@models";
import { findGeocode, findTimezone } from "@api";

/**
 * Stores an instance of google's autocomplete service.
 */
const autocompleteService = { current: null };

/**
 * Finds the latitude, longitude, and timezone of a location.
 *
 * @param event - The chart object to store the found values in.
 * @param locationName - The name of the location.
 */
async function findLocation(event: EventModel, locationName: string): Promise<void> {
  const jsLocalDate = new Date(event.localDate);
  const geocode = await findGeocode(locationName);
  const timezone = await findTimezone(jsLocalDate, geocode);
  const [utcDate, offset] = getUTCDateAndOffset(jsLocalDate, timezone);
  const offsetHours = offset / 1000 / 60 / 60;

  event.utcDate = isoDate(utcDate);
  event.timezone = timezone.timeZoneId;
  event.location = locationName;
  event.numericOffset = offset;
  event.utcOffset = `UTC${offsetHours}.00`;
  event.latitude = String(geocode.lat);
  event.longitude = String(geocode.lng);
}

/**
 * Returns a hook for storing a location object that uses the google API for autocomplete
 * suggestions, latitude and longitude, and timezone information.
 *
 * @param chart - The chart object to store values within.
 * @param onSearchComplete - A callback called once the current location's latitude, longitude,
 * and timezone have all been looked up.
 */
export default function useLocation(
  chart: EventModel,
  onSearchComplete?: (location: EventModel) => void,
): LocationHook {
  const locationName = chart.location;
  const [inputValue, setInputValue] = React.useState(locationName);
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const [place, setPlace] = React.useState<PlaceType | null>(createNewPlace(locationName));
  const loaded = React.useRef(false);

  if (!loaded.current) {
    mountScript(
      `https://maps.googleapis.com/maps/api/js?key=${geoCodeApiKey}&libraries=places`,
      "google-maps",
    );

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () => throttle((request: { input: string }, callback: (results?: PlaceType[]) => void) => {
      (autocompleteService.current as any).getPlacePredictions(request, callback);
    }, 200),
    [],
  );

  React.useEffect(() => {
    setPlace(createNewPlace(locationName));
  }, [locationName]);

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(place ? [place] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[];

        if (place) {
          newOptions = [place];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [place, inputValue, fetch]);

  return {
    options,
    place,
    onChange(event, newValue) {
      setOptions(newValue ? [newValue, ...options] : options);
      setPlace(newValue);

      if (newValue) {
        findLocation(chart, newValue.description)
          .then(() => onSearchComplete?.(chart));
      }
    },
    onInputChange(event, newInputValue) {
      setInputValue(newInputValue);
    },
  };
}
