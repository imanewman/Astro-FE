import React from "react";
import { cloneChart } from "@models";

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentChart: Chart): LiveChartHook {
  const [liveChart, setChart] = React.useState(cloneChart(currentChart));

  const updateLiveChart = () => {
    console.log(liveChart);
  };

  React.useLayoutEffect(() => {
    updateLiveChart();
    setChart(cloneChart(currentChart));
  }, [currentChart.id]);

  return { liveChart, updateLiveChart };
}
