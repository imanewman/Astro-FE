import React, { useState } from "react";
import { useMutation } from "react-query";

import { RouteHook } from "@typedefs";
import {
  createCurrentTransitsEvent,
  createNatalEventSettings, createTransitEventSettings,
} from "@models";
import { calculateChart } from "@api";

/**
 * Creates a hook for managing the currently visible chart.
 *
 * @param currentEvent - The event to start with loading.
 * @param routeHook - A hook for changing the app history.
 */
export default function useLiveChart(
  currentEvent: EventModel,
  routeHook: RouteHook,
): LiveChartHook {
  const [liveEvent, setEvent] = React.useState(createNatalEventSettings(currentEvent, true));
  const [liveBiwheel, setBiwheel] = React.useState<EventSettingsModel | undefined>();
  const [liveData, setData] = useState<ChartCollectionModel | undefined>();
  const [isBiwheelSelected, setBiwheelSelected] = useState(false);
  const [timeIncrement, setTimeIncrement] = useState<TimeIncrement>("day");
  const { query, updateQuery } = routeHook;

  const {
    mutate: updateLiveChart,
    error: liveChartError,
    isLoading: liveChartLoading,
  } = useMutation<ChartCollectionModel, Error, EventSettingsModel[]>(
    calculateChart,
    { onSuccess: (res) => setData(res) },
  );

  const resetLiveChart = () => {
    const eventSettingsCopy = createNatalEventSettings(currentEvent, true);

    setEvent(eventSettingsCopy);
    setBiwheel(undefined);
    setBiwheelSelected(false);
    updateQuery({ biwheel: "false" });

    if (eventSettingsCopy.event.utcDate) {
      updateLiveChart([eventSettingsCopy]);
    } else {
      setData(undefined);
    }
  };

  const reloadLiveChart = () => {
    if (liveBiwheel?.event.utcDate && liveEvent.event.utcDate) {
      updateLiveChart([liveEvent, liveBiwheel]);
    } else if (liveEvent.event.utcDate) {
      updateLiveChart([liveEvent]);
    } else {
      setData(undefined);
    }
  };

  const addBiwheel = (biwheel?: EventModel) => {
    if (biwheel) {
      const biwheelSettings = createTransitEventSettings(biwheel);

      setBiwheel(biwheelSettings);
      updateLiveChart([liveEvent, biwheelSettings]);
      updateQuery({ biwheel: "true" });
    } else {
      setBiwheel(undefined);
      updateLiveChart([liveEvent]);
      updateQuery({ biwheel: "false" });
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

  // Re-load the chart whenever the main event changes.
  React.useLayoutEffect(() => {
    resetLiveChart();
  }, [currentEvent.id]);

  // Open a bi-wheel on startup if the query param is set.
  React.useLayoutEffect(() => {
    if (query.get("biwheel") === "true") {
      setSelectedSettings("biwheel");
    }
  }, []);

  return {
    liveEvent,
    liveBiwheel,
    liveChartError,
    liveChartLoading,
    liveData,
    isBiwheelSelected,
    timeIncrement,
    setSelectedSettings,
    resetLiveChart,
    reloadLiveChart,
    addBiwheel,
    setTimeIncrement,
  };
}
