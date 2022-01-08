import { PropsWithChildren, ReactNode } from "react";
import { AppBarProps } from "@mui/material";

/**
 * Props for rendering the navigation top and side bars.
 */
export interface NavProps extends PropsWithChildren<{}> {
  /**
   * The content to render within the top toolbar.
   */
  toolbar?: ReactNode;
  /**
   * The content to render within the left sidebar.
   */
  sidebar?: ReactNode;
}

export interface NavAppBarProps extends AppBarProps {
  /**
   * Whether the navigation drawer is open.
   */
  open?: boolean;
}
