import React from "react";
import throttle from "lodash/throttle";

import {
  mountScript,
} from "@utils";
import { createNewPlace } from "@models";
import { calculateTimezone } from "@api";

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
  const localDate = new Date(event.localDate);
  const timezone = await calculateTimezone(localDate, locationName);

  event.utcDate = timezone.utcDate;
  event.timezone = timezone.timeZoneId;
  event.location = timezone.locationName;
  event.numericOffset = (timezone.rawOffset + timezone.dstOffset) * 1000;
  event.utcOffset = timezone.utcOffset;
  event.latitude = String(timezone.latitude);
  event.longitude = String(timezone.longitude);
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
  const key = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!loaded.current) {
    mountScript(
      `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`,
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
