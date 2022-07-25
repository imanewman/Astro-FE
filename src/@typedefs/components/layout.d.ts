import { PropsWithChildren } from "react";

/**
 * Represents props for rendering a simple accordion.
 */
export interface AccordionProps extends PropsWithChildren<{}> {
  /**
   * The title to display on the accordion.
   */
  name: string;
  /**
   * Whether the accordion should default to expanded.
   */
  defaultExpanded?: boolean;
}
