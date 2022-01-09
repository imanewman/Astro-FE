import { ThemeOptions } from "@mui/material";

/**
 * All possible theme modes. In "auto" the mode is chosen by the time of day.
 */
export type ThemeMode
  = "light"
  | "dark"
  | "auto";

/**
 * A hook for managing the current theme.
 */
export interface ThemeHook {
  /**
   * The current theme variables.
   * */
  theme: ThemeOptions;

  /**
   * The current theme mode.
   * */
  themeMode: ThemeMode;

  /**
   * A setter for changing the current theme mode.
   *
   * @param mode - The theme mode to switch to
   * */
  setThemeMode(mode: ThemeMode): void;
}
