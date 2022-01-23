import React from "react";

import { IconButton, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

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
  const { reloadLiveChart, createEvent } = useBaseContext();
  const localDate = usePrimitive(event, "localDate");
  const utcDate = usePrimitive(event, "utcDate");

  const handleLocalDateChange = (date: Date | null) => {
    utcDate.setValue(
      getISODateStringFromOffset(date, event.numericOffset),
    );

    reloadLiveChart();
  };

  const handleSave = () => {
    createEvent(event);
  };

  return (
    <Box gapY={2}>
      <Box m={1} gapY={1}>
        <Box row alignY="center">
          <DateTimeInput
            date={localDate}
            openTo="month"
            onSubmit={handleLocalDateChange}
          />
          <Tooltip title="Save New Chart">
            <IconButton onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <LocationInput chart={event} onSearchComplete={reloadLiveChart} />

        <TimeChanger eventSettings={eventSettings} />
      </Box>

      <EnabledPointsInput eventSettings={eventSettings} />
    </Box>
  );
}
