import { ClassNameMap, createStyles, makeStyles } from "@mui/styles";

import { InternalBoxProps } from "@typedefs";

/**
 * Creates added styles for the box component.
 *
 * @param props - Box properties to determine styling.
 * @return Styles classes.
 */
export default function useBoxStyles(
  props: InternalBoxProps,
): (props?: any) => ClassNameMap<"root"> {
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
