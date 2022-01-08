import React, { useState } from "react";
import { cloneChart } from "@models";
import { useMutation } from "react-query";
import { calculateChart } from "@api";

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentChart: EventModel): LiveChartHook {
  const [liveChart, setChart] = React.useState(cloneChart(currentChart));
  const [liveData, setData] = useState<any>();

  const {
    mutate: updateLiveChart,
    error: liveChartError,
    isLoading: liveChartLoading,
  } = useMutation<ChartDataModel, Error, EventModel>(
    (chart: EventModel) => {
      setChart(chart);

      return calculateChart(chart);
    },
    {
      onSuccess: (res) => setData(res),
    },
  );

  const resetLiveChart = () => {
    const newChart = cloneChart(currentChart);

    if (newChart.utcDate) {
      updateLiveChart(newChart);
    } else {
      setChart(newChart);
      setData(null);
    }
  };

  React.useLayoutEffect(() => {
    resetLiveChart();
  }, [currentChart.id]);

  return {
    liveChart,
    liveChartError,
    liveChartLoading,
    liveData,
    resetLiveChart,
    reloadLiveChart() {
      updateLiveChart(liveChart);
    },
  };
}
