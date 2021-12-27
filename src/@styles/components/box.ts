import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

import { InternalBoxProps } from "@typedefs";

/**
 * Creates added styles for the box component.
 *
 * @param props - Box properties to determine styling.
 */
export default function useBoxStyles(props: InternalBoxProps) {
  const {
    row, wrap, fullWidth, fullHeight, fitContent,
    spaceBetween, expandRow, alignX, alignY, gapY, gapX,
  } = props;
  const justifyContent = row ? alignX : alignY;
  const width = fitContent ? "max-content" : undefined;

  return makeStyles(() => createStyles({
    root: {
      display: row || alignX || alignY || spaceBetween ? "flex" : undefined,
      flexDirection: row ? "row" : "column",
      flexWrap: wrap ? "wrap" : undefined,

      width: fullWidth ? "100%" : width,
      height: fullHeight ? "100%" : undefined,

      justifyContent: spaceBetween ? "space-between" : justifyContent,
      alignItems: row ? alignY : alignX,

      "& > *": {
        flexGrow: expandRow ? 1 : undefined,
        marginBottom: gapY ? gapY * 8 : undefined,
        marginRight: gapX ? gapX * 8 : undefined,
      },
      "& > *:last-child": {
        marginBottom: gapY ? 0 : undefined,
        marginRight: gapX ? 0 : undefined,
      },
    },
  }));
}
