import React from "react";

import { Button, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ResetIcon from "@mui/icons-material/Restore";

import { useBaseContext, useLocalDate } from "@hooks";
import {
  Box, DateTimeInput, LocationInput, Accordion,
} from "@components";
import { createCurrentTransitsEvent } from "@models";
import TimeChanger from "./TimeChanger";

/**
 * Renders the settings to edit an event's location and time settings.
 *
 * @constructor
 * @visibleName Event Settings
 */
export default function BaseEventSettings(props: EventSettingsProps) {
  const { eventSettings } = props;
  const { event } = eventSettings;
  const {
    reloadLiveChart, createEvent, isBiwheelSelected,
    addBiwheel, resetLiveChart,
  } = useBaseContext();
  const {
    localDate,
    handleLocalDateChange,
  } = useLocalDate(event, "localDate", "utcDate", reloadLiveChart);

  const handleSave = () => {
    createEvent(event);
  };

  const handleReset = () => {
    if (isBiwheelSelected) {
      addBiwheel(createCurrentTransitsEvent());
    } else {
      resetLiveChart();
    }
  };

  return (
    <Accordion defaultExpanded name="Event Settings">
      <Box m={1} gapY={1}>
        <Box row alignY="center">
          <Tooltip title="Save New Chart">
            <Button fullWidth variant="text" onClick={handleSave} startIcon={<SaveIcon />}>
              Save
            </Button>
          </Tooltip>
          <Tooltip title={`Reset Date To ${isBiwheelSelected ? "Now" : "Saved Chart"}`}>
            <Button
              fullWidth
              color="secondary"
              variant="text"
              onClick={handleReset}
              startIcon={<ResetIcon />}
            >
              Reset
            </Button>
          </Tooltip>
        </Box>

        <DateTimeInput
          openTo="month"
          date={localDate}
          onSubmit={handleLocalDateChange}
        />

        <LocationInput chart={event} onSearchComplete={reloadLiveChart} />

        <TimeChanger eventSettings={eventSettings} />
      </Box>
    </Accordion>
  );
}
