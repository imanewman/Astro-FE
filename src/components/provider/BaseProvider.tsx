import React, { PropsWithChildren } from "react";

// import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { useRouting, useSnackbar } from "@hooks";
import { RouteContext, SnackbarContext } from "@contexts";
import { SnackbarManager } from "@components";
import ThemeProvider from "./ThemeProvider";

/**
 * Provides all of the top level contexts.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Base Provider
 */
export default function BaseProvider({ children }: PropsWithChildren<{}>) {
  const snackbarHook = useSnackbar();
  const routeHook = useRouting();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider>
        <RouteContext.Provider value={routeHook}>
          <SnackbarContext.Provider value={snackbarHook}>
            <SnackbarManager />
            {children}
          </SnackbarContext.Provider>
        </RouteContext.Provider>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
