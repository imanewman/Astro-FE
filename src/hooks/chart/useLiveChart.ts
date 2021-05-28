import React from "react";
import { generateUniqueId } from "@utils";

/**
 * Clones the given chart.
 *
 * @param chart - The chart to clone
 */
function cloneChart(chart: Chart): Chart {
  return {
    ...chart,
    id: generateUniqueId(),
    name: "",
    location: { ...chart.location },
  };
}

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentChart: Chart): LiveChartHook {
  const [liveChart, setChart] = React.useState(cloneChart(currentChart));

  React.useLayoutEffect(() => {
    setChart(cloneChart(currentChart));
  }, [currentChart]);

  return { liveChart };
}
