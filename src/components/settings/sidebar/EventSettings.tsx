import React from "react";

import { getISODateStringFromOffset } from "@utils";
import { useBaseContext, usePrimitive } from "@hooks";
import {
  Box, DateTimeInput, LocationInput, EnabledPointsInput,
} from "@components";
import TimeChanger from "./TimeChanger";

/**
 * Renders the settings to edit an event's settings.
 *
 * @constructor
 * @visibleName Event Settings
 */
export default function EventSettings(props: EventSettingsProps) {
  const { eventSettings } = props;
  const { event } = eventSettings;
  const { reloadLiveChart } = useBaseContext();
  const localDate = usePrimitive(event, "localDate");
  const utcDate = usePrimitive(event, "utcDate");

  const handleLocalDateChange = (date: Date | null) => {
    utcDate.setValue(
      getISODateStringFromOffset(date, event.numericOffset),
    );

    reloadLiveChart();
  };

  return (
    <Box>
      <Box m={1} gapY={2}>
        <DateTimeInput date={localDate} openTo="month" onSubmit={handleLocalDateChange} />

        <LocationInput chart={event} onSearchComplete={reloadLiveChart} />

        <TimeChanger eventSettings={eventSettings} />
      </Box>

      <EnabledPointsInput eventSettings={eventSettings} />
    </Box>
  );
}
