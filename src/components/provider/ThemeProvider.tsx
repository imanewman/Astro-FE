import React, { PropsWithChildren } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

import { useTheme } from "@hooks";
import { ThemeContext } from "@contexts";
import { useBackgroundStyles } from "@styles";

/**
 * Renders the app's background.
 *
 * @param props - Component Props.
 * @constructor
 */
function Background(props: PropsWithChildren<{}>) {
  const classes = useBackgroundStyles();

  return <div className={classes.root} {...props} />;
}

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
            <Background>
              {children}
            </Background>
          </ThemeContext.Provider>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
