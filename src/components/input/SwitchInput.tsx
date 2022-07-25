import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

import { SwitchInputProps } from "@typedefs";

/**
 * Dispays a togglable switch.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Switch Input
 */
export default function SwitchInput(props: SwitchInputProps) {
  const { label, checked, onChange } = props;

  return (
    <FormControlLabel
      control={(
        <Switch
          checked={checked}
          onChange={onChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      )}
      label={label}
    />
  );
}
