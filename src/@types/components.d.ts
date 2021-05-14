import { BoxProps } from "@material-ui/core";

declare type Alignment = "flex-start" | "center" | "flex-end";

/**
 * Internal additional props for the Box component
 * that facilitates the bulk of structural formatting.
 */
declare interface InternalBoxProps {
  /**
   * If true, children will be rendered in a row.
   */
  row?: boolean;

  /**
   * If true, children will expand to fit all available space.
   */
  expandRow?: boolean;

  /**
   * If true, children will flex wrap.
   */
  wrap?: boolean;

  /**
   * If set, will align horizontally.
   */
  alignX?: Alignment;

  /**
   * If set, will align vertically.
   */
  alignY?: Alignment;

  /**
   * If true, width is set to max-content.
   */
  fitContent?: boolean;

  /**
   * If true, justify-content is set to space-between.
   */
  spaceBetween?: boolean;

  /**
   * If true, set width to 100%.
   */
  fullWidth?: boolean;

  /**
   * If true, set height to 100%.
   */
  fullHeight?: boolean;

  /**
   * Vertical gap between children
   */
  gapY?: number | false;

  /**
   * Horizontal gap between children
   */
  gapX?: number | false;
}

export type FullBoxProps = InternalBoxProps & BoxProps;
