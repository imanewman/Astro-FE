import React, { useState } from "react";
import { cloneEvent, createCurrentTransitsEvent } from "@models";
import { useMutation } from "react-query";
import { calculateChart } from "@api";

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentEvent: EventModel): LiveChartHook {
  const [liveEvent, setEvent] = React.useState(cloneEvent(currentEvent));
  const [liveBiwheel, setBiwheel] = React.useState<EventModel | undefined>();
  const [liveData, setData] = useState<any>();
  const [isBiwheelSelected, setBiwheelSelected] = useState(false);

  const {
    mutate: updateLiveChart,
    error: liveChartError,
    isLoading: liveChartLoading,
  } = useMutation<ChartModel, Error, EventModel[]>(
    (events) => calculateChart(...events),
    {
      onSuccess: (res) => setData(res),
    },
  );

  const resetLiveChart = () => {
    const eventCopy = cloneEvent(currentEvent);

    setEvent(eventCopy);
    setBiwheel(undefined);
    setBiwheelSelected(false);

    if (eventCopy.utcDate) {
      updateLiveChart([eventCopy]);
    } else {
      setData(null);
    }
  };

  const reloadLiveChart = () => {
    updateLiveChart(liveBiwheel
      ? [liveEvent, liveBiwheel]
      : [liveEvent]);
  };

  const addBiwheel = (biwheel?: EventModel) => {
    setBiwheel(biwheel);
    updateLiveChart(biwheel
      ? [liveEvent, biwheel]
      : [liveEvent]);
  };

  const setSelectedSettings = (selected: "base" | "biwheel" | "clear") => {
    switch (selected) {
      case "base":
        setBiwheelSelected(false);
        break;
      case "biwheel":
        if (!liveBiwheel) {
          addBiwheel(createCurrentTransitsEvent());
        }
        setBiwheelSelected(true);
        break;
      default: case "clear":
        addBiwheel();
        setBiwheelSelected(false);
    }
  };

  React.useLayoutEffect(() => {
    resetLiveChart();
  }, [currentEvent.id]);

  return {
    liveEvent,
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
