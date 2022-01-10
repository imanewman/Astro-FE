import React from "react";

import { Chip, TextField } from "@mui/material";

import { MultiselectInputProps } from "@typedefs";
import { Autocomplete } from "@mui/lab";

/**
 * Renders an input for multiselect options, bound to the given attribute.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Multiselect Input
 */
export default function MultiselectInput(props: MultiselectInputProps) {
  const {
    attribute,
    options,
    label,
  } = props;

  const handleChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      attribute.setValue(value);
    }
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={attribute.value}
      onChange={(e, value) => handleChange(value)}
      freeSolo
      renderTags={(
        value: readonly string[],
        getTagProps,
      ) => value.map((option: string, index: number) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      ))}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={label}
        />
      )}
    />
  );
}
