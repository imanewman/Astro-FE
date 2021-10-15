import React from "react";
import { Box as MuiBox } from "@mui/material";

import { FullBoxProps } from "@typedefs";
import { useBoxStyles } from "@styles";

/**
 * Facilitates the bulk of structural formatting.
 *
 * @param props - Component Props.
 * @constructor
 */
export default function Box(props: FullBoxProps) {
  const {
    row, wrap, fullWidth, fullHeight, fitContent,
    spaceBetween, expandRow, alignX, alignY, gapY, gapX,
    ...muiProps
  } = props;

  const classes = useBoxStyles({
    row,
    wrap,
    fullWidth,
    fullHeight,
    fitContent,
    spaceBetween,
    expandRow,
    alignX,
    alignY,
    gapY,
    gapX,
  })();

  return (
    <MuiBox className={classes.root} {...muiProps} />
  );
}
