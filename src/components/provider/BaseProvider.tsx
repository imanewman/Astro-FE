import React, { PropsWithChildren } from "react";

// import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

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
  const liveChartHook = useLiveChart(chartListHook.currentChart);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
    </MuiPickersUtilsProvider>
  );
}
