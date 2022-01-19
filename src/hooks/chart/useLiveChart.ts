import React, { useState } from "react";
import { useMutation } from "react-query";

import {
  createCurrentTransitsEvent,
  createNatalSettings, createTransitSettings,
} from "@models";
import { calculateChart } from "@api";

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentEvent: EventModel): LiveChartHook {
  const [liveEvent, setEvent] = React.useState(createNatalSettings(currentEvent, true));
  const [liveBiwheel, setBiwheel] = React.useState<EventSettingsModel | undefined>();
  const [liveData, setData] = useState<ChartCollectionModel | undefined>();
  const [isBiwheelSelected, setBiwheelSelected] = useState(false);

  const {
    mutate: updateLiveChart,
    error: liveChartError,
    isLoading: liveChartLoading,
  } = useMutation<ChartCollectionModel, Error, EventSettingsModel[]>(
    (events) => calculateChart(...events),
    {
      onSuccess: (res) => setData(res),
    },
  );

  const resetLiveChart = () => {
    const eventSettingsCopy = createNatalSettings(currentEvent, true);

    setEvent(eventSettingsCopy);
    setBiwheel(undefined);
    setBiwheelSelected(false);

    if (eventSettingsCopy.event.utcDate) {
      updateLiveChart([eventSettingsCopy]);
    } else {
      setData(undefined);
    }
  };

  const reloadLiveChart = () => {
    updateLiveChart(liveBiwheel
      ? [liveEvent, liveBiwheel]
      : [liveEvent]);
  };

  const addBiwheel = (biwheel?: EventModel) => {
    if (biwheel) {
      const biwheelSettings = createTransitSettings(biwheel);

      setBiwheel(biwheelSettings);
      updateLiveChart([liveEvent, biwheelSettings]);
    } else {
      setBiwheel(undefined);
      updateLiveChart([liveEvent]);
    }
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
