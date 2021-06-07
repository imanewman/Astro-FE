import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";

import { LocationInputProps } from "@typedefs";
import { useLocation } from "@hooks";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

/**
 * Creates an input that allows looking up a location by name, and finding the
 * latitude, longitude, and timezone.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Location Input
 */
export default function LocationInput(props: LocationInputProps) {
  const { location, onSearchComplete } = props;
  const {
    options, place, onChange, onInputChange,
  } = useLocation(location, onSearchComplete);
  const classes = useStyles();

  return (
    <Autocomplete
      disabled={!location.value.localDate}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options.length === 0 && place ? [place] : options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={place}
      onChange={onChange}
      onInputChange={onInputChange}
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
