import { ThemeHook } from "./theme";
import { RouteHook } from "./route";

/**
 * A hook for managing all top level hooks.
 */
export interface BaseHook extends
  ThemeHook, RouteHook, SnackbarHook,
  ChartListHook, LiveChartHook, ToolsHook {}
