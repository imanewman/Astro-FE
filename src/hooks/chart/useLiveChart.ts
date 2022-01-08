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
  } = useMutation<ChartDataModel, Error, EventModel>(
    (chart: EventModel) => {
      setChart(chart);

      return calculateChart(chart);
    },
    {
      onSuccess: (res) => setData(res),
    },
  );

  React.useLayoutEffect(() => {
    const newChart = cloneChart(currentChart);

    if (newChart.utcDate) {
      updateLiveChart(newChart);
    } else {
      setChart(newChart);
      setData(null);
    }
  }, [currentChart.id]);

  return {
    liveChart,
    liveChartError,
    liveData,
    updateLiveChart,
    reloadLiveChart() {
      updateLiveChart(liveChart);
    },
  };
}
