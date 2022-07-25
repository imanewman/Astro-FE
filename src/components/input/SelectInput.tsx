import React from "react";

import {
  FormControl, InputLabel, MenuItem, Select,
} from "@mui/material";

import { SelectInputProps } from "@typedefs";

/**
 * Renders an input for text options, bound to the given attribute.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Select Input
 */
export default function SelectInput(props: SelectInputProps) {
  const {
    attribute, displayEmpty,
    options, label, fullWidth, ...rest
  } = props;

  return (
    <FormControl variant="filled" sx={{ minWidth: 110 }} fullWidth={fullWidth}>
      <InputLabel id={`select-${label}`}>{label}</InputLabel>
      <Select
        {...rest}
        fullWidth={fullWidth}
        labelId={`select-${label}`}
        variant="filled"
        value={attribute.value}
        onChange={(e) => attribute.setValue(e.target.value)}
      >
        {displayEmpty && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
