import { ThemeOptions } from "@material-ui/core";
import { isNightTime } from "@utils";
import { ThemeMode } from "@typedefs";

export const defaultBorderRadius = 4;

export const pink = "#e040fb";
export const lightPurple = "#9c27b0";
export const darkPurple = "#6a1b9a";
export const red = "#f63d1c";

export const lightTheme: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: lightPurple,
    },
    secondary: {
      main: darkPurple,
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
    primary: {
      main: pink,
    },
    secondary: {
      main: lightPurple,
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
