import { ReactNode } from "react";

/**
 * Props for rendering the navigation top and side bars.
 */
export interface NavProps {
  /**
   * The content to render within the top toolbar.
   */
  toolbar?: ReactNode;
  /**
   * The content to render within the left sidebar.
   */
  sidebar?: ReactNode;
}
