import React, { PropsWithChildren } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import {
  useChartList, useLiveChart, useRouting, useSnackbar,
} from "@hooks";
import {
  RouteContext, SnackbarContext, ChartListContext, LiveChartContext,
} from "@contexts";
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
  const chartListHook = useChartList();
  const liveChartHook = useLiveChart(chartListHook.currentEvent);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <RouteContext.Provider value={routeHook}>
          <ChartListContext.Provider value={chartListHook}>
            <LiveChartContext.Provider value={liveChartHook}>
              <SnackbarContext.Provider value={snackbarHook}>
                {children}
                <SnackbarManager />
              </SnackbarContext.Provider>
            </LiveChartContext.Provider>
          </ChartListContext.Provider>
        </RouteContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
