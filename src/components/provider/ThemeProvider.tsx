import React, { PropsWithChildren } from "react";
import { createMuiTheme, MuiThemeProvider, StylesProvider } from "@material-ui/core";

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
export default function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const themeHook = useTheme();
  const muiTheme = createMuiTheme(themeHook.theme);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeContext.Provider value={themeHook}>
          <Background>
            {children}
          </Background>
        </ThemeContext.Provider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
