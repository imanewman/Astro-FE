import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { styled } from "@mui/styles";

import { LocationInputProps } from "@typedefs";
import { useLocation } from "@hooks";

const Icon = styled(LocationOnIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(2),
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
  const { chart, onSearchComplete } = props;
  const {
    options, place, onChange, onInputChange,
  } = useLocation(chart, onSearchComplete);

  return (
    <Autocomplete
      disabled={!chart.localDate}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      isOptionEqualToValue={(option, value) => option.description === value.description}
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
      renderOption={(optionProps, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...optionProps}>
            <Grid container alignItems="center">
              <Grid item>
                <Icon />
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
          </li>
        );
      }}
    />
  );
}
