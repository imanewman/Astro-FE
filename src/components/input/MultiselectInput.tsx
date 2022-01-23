import React from "react";

import {
  Checkbox, Chip, TextField, Autocomplete,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { MultiselectInputProps } from "@typedefs";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    limitTags,
    ...rest
  } = props;

  const handleChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      attribute.setValue(value);
    }
  };

  return (
    <Autocomplete
      {...rest}
      multiple
      freeSolo
      disableCloseOnSelect
      clearOnBlur
      limitTags={limitTags}
      options={options}
      value={attribute.value || []}
      onChange={(e, value) => handleChange(value)}
      renderTags={(
        value: readonly string[],
        getTagProps,
      ) => value.map((option: string, index: number) => (
        (!limitTags || index < limitTags) ? (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            onDelete={undefined}
          />
        ) : null
      ))}
      renderOption={(optionProps, option, { selected }) => (
        <li {...optionProps}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
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
