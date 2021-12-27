import React, { useState } from "react";
import { cloneChart } from "@models";
import { calculateChart } from "../../api";

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentChart: EventModel): LiveChartHook {
  const [liveChart, setChart] = React.useState(cloneChart(currentChart));
  const [liveData, setData] = useState<any>();

  // TODO: use react-query
  const updateLiveChart = () => {
    calculateChart(liveChart)
      .then((res) => setData(res))
      .catch((err) => setData(err));
  };

  React.useLayoutEffect(() => {
    updateLiveChart();
    setChart(cloneChart(currentChart));
  }, [currentChart.id]);

  return {
    liveChart,
    updateLiveChart,
    liveData,
  };
}
