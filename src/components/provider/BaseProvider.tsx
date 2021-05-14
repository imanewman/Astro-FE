import React, { PropsWithChildren } from "react";

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
    <ThemeProvider>
      <RouteContext.Provider value={routeHook}>
        <SnackbarContext.Provider value={snackbarHook}>
          <SnackbarManager />
          {children}
        </SnackbarContext.Provider>
      </RouteContext.Provider>
    </ThemeProvider>
  );
}
