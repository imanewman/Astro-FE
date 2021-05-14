import { ThemeOptions } from "@material-ui/core";
import { isNightTime } from "@utils";
import { ThemeMode } from "@typedefs";

export const defaultBorderRadius = 4;

export const textPrimary = "#0e2626";
export const textSecondary = "#4d5b5b";
export const lightGreen = "#4EC600";
export const green = "#007A06";
export const darkGreen = "#143F01";
export const grey = "#726E6D";
export const offWhite = "#F0F4EF";
export const yellow = "#E8EF80";
export const pink = "#F4D3C9";
export const terraCotta = "#B75024";
export const red = "#f63d1c";

export const lightTheme: ThemeOptions = {
  palette: {
    type: "light",
    background: {
      default: offWhite,
      paper: "#fff",
    },
    text: {
      primary: textPrimary,
    },
    primary: {
      main: green,
    },
    secondary: {
      main: terraCotta,
    },
    error: {
      main: red,
    },
  },
  shape: {
    borderRadius: defaultBorderRadius,
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    type: "dark",
    background: {
      default: "#222",
      paper: "#2A2A2A",
    },
    text: {
      primary: "#eee",
    },
    primary: {
      main: lightGreen,
    },
    secondary: {
      main: yellow,
    },
    error: {
      main: red,
    },
  },
  shape: {
    borderRadius: defaultBorderRadius,
  },
};

/**
 * Returns the theme values for the given type.
 * If no type is given, light theme will be returned.
 * @param type - The theme type to return the values for.
 */
export function defaultTheme(type?: ThemeMode): ThemeOptions {
  switch (type) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return isNightTime() ? darkTheme : lightTheme;
  }
}
