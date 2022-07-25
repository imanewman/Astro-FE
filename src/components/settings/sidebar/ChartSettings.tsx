import React from "react";

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
  const eventSettings = liveBiwheel && isBiwheelSelected ? liveBiwheel : liveEvent;

  return (
    <Box gapY={2} mb={10}>
      <BiwheelToggle />
      <EventSettings eventSettings={eventSettings} />
      <EnabledTools />
    </Box>
  );
}
