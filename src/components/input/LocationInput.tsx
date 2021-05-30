import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import Geocode from "react-geocode";

import { LocationInputProps } from "@typedefs";

interface PlaceType {
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
 * Creates a new place with the given name, if the name is non-empty.
 *
 * @param description - The place description to start with.
 */
function createNewPlace(description: string): PlaceType | null {
  return description ? {
    description,
    structured_formatting: {
      main_text: "",
      secondary_text: "",
      main_text_matched_substrings: [{ offset: 0, length: 0 }],
    },
  } : null;
}

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

const apiKey = "AIzaSyDEwo4G5B-nYnfoMgvz5pqTUmE0s23sXAc";

Geocode.setApiKey(apiKey);

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function LocationInput(props: LocationInputProps) {
  const { location } = props;
  const locationName = location.value.name;
  const classes = useStyles();
  const [place, setPlace] = React.useState<PlaceType | null>(createNewPlace(locationName));
  const [inputValue, setInputValue] = React.useState(locationName);
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        // eslint-disable-next-line max-len
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
    let active = true;

    if (active) {
      setPlace(createNewPlace(locationName));
    }

    return () => {
      active = false;
    };
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

  return (
    <Autocomplete
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={place}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setPlace(newValue);

        if (newValue) {
          Geocode.fromAddress(newValue?.description).then((response) => {
            console.log(response);
            const { lat, lng } = response.results[0].geometry.location;

            location.setValue({
              name: newValue.description,
              latitude: lat,
              longitude: lng,
            });
          });
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Location" variant="filled" fullWidth />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={String(index)} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
