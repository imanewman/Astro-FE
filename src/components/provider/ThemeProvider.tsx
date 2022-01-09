import React, { PropsWithChildren } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { useTheme } from "@hooks";
import { ThemeContext } from "@contexts";

/**
 * Provides the app's theme contexts.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Theme Provider
 */
export default function ThemeProvider({ children }: PropsWithChildren<{ }>) {
  const themeHook = useTheme();
  const muiTheme = createTheme(themeHook.theme);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <EmotionThemeProvider theme={muiTheme}>
          <ThemeContext.Provider value={themeHook}>
            {children}
          </ThemeContext.Provider>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
