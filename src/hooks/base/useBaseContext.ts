import { useContext } from "react";

import { BaseHook } from "@typedefs";
import {
  ChartListContext, LiveChartContext, RouteContext, SnackbarContext, ThemeContext,
} from "@contexts";

/**
 * Creates a hook for interacting with all top level contexts.
 */
export default function useBaseContext(): BaseHook {
  return {
    ...useContext(ThemeContext),
    ...useContext(RouteContext),
    ...useContext(SnackbarContext),
    ...useContext(ChartListContext),
    ...useContext(LiveChartContext),
  };
}
