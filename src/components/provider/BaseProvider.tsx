import React, { PropsWithChildren } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import {
  useChartList, useLiveChart, useRouting, useSnackbar, useTools,
} from "@hooks";
import {
  RouteContext, SnackbarContext, ChartListContext, LiveChartContext, ToolsContext,
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
  const toolsHook = useTools();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <RouteContext.Provider value={routeHook}>
          <ChartListContext.Provider value={chartListHook}>
            <LiveChartContext.Provider value={liveChartHook}>
              <SnackbarContext.Provider value={snackbarHook}>
                <ToolsContext.Provider value={toolsHook}>
                  {children}
                </ToolsContext.Provider>
                <SnackbarManager />
              </SnackbarContext.Provider>
            </LiveChartContext.Provider>
          </ChartListContext.Provider>
        </RouteContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
