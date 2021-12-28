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

  const { mutate: updateLiveChart } = useMutation(
    () => calculateChart(liveChart),
    {
      onSuccess: (res) => setData(res),
      onError: (err) => setData(err),
    },
  );

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
