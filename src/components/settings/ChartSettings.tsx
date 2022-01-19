import React from "react";

import { Divider } from "@mui/material";

import { useBaseContext } from "@hooks";
import { Box } from "@components";
import EventSettings from "./EventSettings";
import EnabledTools from "./EnabledTools";
import BiwheelToggle from "./BiwheelToggle";

/**
 * Renders the settings to edit the current chart view.
 *
 * @constructor
 * @visibleName Chart Settings
 */
export default function ChartSettings() {
  const { liveEvent, liveBiwheel, isBiwheelSelected } = useBaseContext();

  return (
    <Box gapY={2}>
      <BiwheelToggle />

      <EventSettings
        eventSettings={liveBiwheel && isBiwheelSelected ? liveBiwheel : liveEvent}
      />

      <Divider />

      <EnabledTools />
    </Box>
  );
}
