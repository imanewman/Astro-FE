import React from "react";
import { TextField } from "@mui/material";

import { TextInputProps } from "@typedefs";

/**
 * Renders an input for text, bound to the given attribute.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Text Input
 */
export default function TextInput(props: TextInputProps) {
  const { attribute, ...rest } = props;

  return (
    <TextField
      {...rest}
      variant="filled"
      value={attribute.value}
      onChange={(e) => attribute.setValue(e.target.value)}
    />
  );
}
