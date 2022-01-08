import React, { useState } from "react";
import { cloneChart, createCurrentTransitsChart } from "@models";
import { useMutation } from "react-query";
import { calculateChart } from "@api";

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentChart: EventModel): LiveChartHook {
  const [liveChart, setChart] = React.useState(cloneChart(currentChart));
  const [liveBiwheel, setBiwheel] = React.useState<EventModel | undefined>();
  const [liveData, setData] = useState<any>();
  const [isBiwheelSelected, setBiwheelSelected] = useState(false);

  const {
    mutate: updateLiveChart,
    error: liveChartError,
    isLoading: liveChartLoading,
  } = useMutation<ChartDataModel, Error, EventModel[]>(
    (events) => calculateChart(...events),
    {
      onSuccess: (res) => setData(res),
    },
  );

  const resetLiveChart = () => {
    const newChart = cloneChart(currentChart);

    setChart(newChart);
    setBiwheel(undefined);
    setBiwheelSelected(false);

    if (newChart.utcDate) {
      updateLiveChart([newChart]);
    } else {
      setData(null);
    }
  };

  const reloadLiveChart = () => {
    updateLiveChart(liveBiwheel ? [liveChart, liveBiwheel] : [liveChart]);
  };

  const addBiwheel = (biwheel?: EventModel) => {
    setBiwheel(biwheel);
    updateLiveChart(biwheel ? [liveChart, biwheel] : [liveChart]);
  };

  const setSelectedSettings = (selected: "base" | "biwheel" | "clear") => {
    switch (selected) {
      case "base":
        setBiwheelSelected(false);
        break;
      case "biwheel":
        if (!liveBiwheel) {
          addBiwheel(createCurrentTransitsChart());
        }
        setBiwheelSelected(true);
        break;
      default:
        addBiwheel();
        setBiwheelSelected(false);
    }
  };

  React.useLayoutEffect(() => {
    resetLiveChart();
  }, [currentChart.id]);

  return {
    liveChart,
    liveBiwheel,
    liveChartError,
    liveChartLoading,
    liveData,
    isBiwheelSelected,
    setSelectedSettings,
    resetLiveChart,
    reloadLiveChart,
    addBiwheel,
  };
}
