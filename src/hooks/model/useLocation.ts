import Geocode from "react-geocode";
import axios, { AxiosResponse } from "axios";
import React from "react";
import throttle from "lodash/throttle";
import { dateToSeconds, isoDate } from "@utils";

const apiKey = "AIzaSyDEwo4G5B-nYnfoMgvz5pqTUmE0s23sXAc";

Geocode.setApiKey(apiKey);

/**
 * Stores an instance of google's autocomplete service.
 */
const autocompleteService = { current: null };

/**
 * Finds the latitude, longitude, and timezone of a location.
 *
 * @param chart - The chart object to store the found values in.
 * @param name - The name of the location.
 */
async function findLocation(chart: EventModel, name: string): Promise<EventModel> {
  const { localDate } = chart;
  const jsLocalDate = new Date(localDate);
  const timestamp = dateToSeconds(jsLocalDate);
  const geocode = await Geocode.fromAddress(name);
  const { lat, lng } = geocode.results[0].geometry.location;

  const timezone = await axios.get(
    "https://maps.googleapis.com/maps/api/timezone/json?"
    + `location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`,
  ) as AxiosResponse<Timezone>;

  const {
    dstOffset, rawOffset, timeZoneId,
  } = timezone.data;
  const offsets = dstOffset * 1000 + rawOffset * 1000;
  const jsUtcDate = new Date(jsLocalDate.getTime() - offsets);

  return {
    ...chart,
    localDate,
    utcDate: isoDate(jsUtcDate),
    timezone: timeZoneId,
    utcOffset: "",
    location: name,
    latitude: String(lat),
    longitude: String(lng),
  };
}

/**
 * Creates a new place with the given name, if the name is non-empty.
 *
 * @param description - The place description to start with.
 */
export function createNewPlace(description: string): PlaceType | null {
  return description ? {
    description,
    structured_formatting: {
      main_text: "",
      secondary_text: "",
      main_text_matched_substrings: [{ offset: 0, length: 0 }],
    },
  } : null;
}

/**
 * Creates a script element from the given source.
 *
 * @param src - The script source path.
 * @param position - The element position of the script.
 * @param id - The id of the script.
 */
function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
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

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
        document.querySelector("head"),
        "google-maps",
      );
    }

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
          .then((newChart) => onSearchComplete?.(newChart));
      }
    },
    onInputChange(event, newInputValue) {
      setInputValue(newInputValue);
    },
  };
}
