import React, { useState } from "react";
import { cloneEvent, createCurrentTransitsEvent } from "@models";
import { useMutation } from "react-query";
import { calculateChart } from "@api";
import { defaultNatalPoints, defaultTransitPoints } from "@utils";

/**
 * TODO: delete once event settings are editable.
 */
function createNatalSettings(event: EventModel): EventSettingsModel {
  return {
    event,
    enabled: [{ points: defaultNatalPoints }],
  };
}

/**
 * TODO: delete once event settings are editable.
 */
function createTransitSettings(event: EventModel): EventSettingsModel {
  return {
    event,
    enabled: [{ points: defaultTransitPoints }],
  };
}

/**
 * Creates a hook for managing the currently visible chart.
 */
export default function useLiveChart(currentEvent: EventModel): LiveChartHook {
  const [liveEvent, setEvent] = React.useState(cloneEvent(currentEvent));
  const [liveBiwheel, setBiwheel] = React.useState<EventModel | undefined>();
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
    const eventCopy = cloneEvent(currentEvent);

    setEvent(eventCopy);
    setBiwheel(undefined);
    setBiwheelSelected(false);

    if (eventCopy.utcDate) {
      updateLiveChart([createNatalSettings(eventCopy)]);
    } else {
      setData(undefined);
    }
  };

  const reloadLiveChart = () => {
    updateLiveChart(liveBiwheel
      ? [createNatalSettings(liveEvent), createTransitSettings(liveBiwheel)]
      : [createNatalSettings(liveEvent)]);
  };

  const addBiwheel = (biwheel?: EventModel) => {
    setBiwheel(biwheel);
    updateLiveChart(biwheel
      ? [createNatalSettings(liveEvent), createTransitSettings(biwheel)]
      : [createNatalSettings(liveEvent)]);
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
