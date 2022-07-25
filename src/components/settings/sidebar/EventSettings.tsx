import React from "react";

import { Box, EnabledPointsInput } from "@components";
import BaseEventSettings from "./BaseEventSettings";
import TransitSettings from "./TransitSettings";

/**
 * Renders the settings to edit an event's settings.
 *
 * @constructor
 * @visibleName Event Settings
 */
export default function EventSettings(props: EventSettingsProps) {
  const { eventSettings } = props;

  return (
    <Box>
      <BaseEventSettings eventSettings={eventSettings} />
      <EnabledPointsInput eventSettings={eventSettings} />
      <TransitSettings eventSettings={eventSettings} />
    </Box>
  );
}
