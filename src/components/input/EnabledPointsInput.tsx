import React from "react";

import { Box } from "@components";
import { useArray, usePrimitive } from "@hooks";

/**
 * Props for rendering a list of enabled point sets.
 */
interface EnabledPointsInputProps {
  /**
   * The event settings to store the enabled points in.
   */
  eventSettings: EventSettingsModel;
}

/**
 * Renders a list of inputs for changing the enabled points.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Enabled Points Input
 */
export default function EnabledPointsInput(props: EnabledPointsInputProps) {
  const { eventSettings } = props;
  const enabled = useArray(usePrimitive(eventSettings, "enabled"));

  return (
    <Box />
  );
}
