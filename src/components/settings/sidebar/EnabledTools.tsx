import React from "react";

import { useBaseContext } from "@hooks";
import { Accordion, Box, SwitchInput } from "@components";

/**
 * Dispays buttons for enabling different tools.
 *
 * @constructor
 * @visibleName Enabled Tools
 */
export default function EnabledTools() {
  const {
    enabledAspectTable, setEnabledAspectTable,
    enabledTransitTable, setEnabledTransitTable,
  } = useBaseContext();

  return (
    <Accordion name="Tools" defaultExpanded>
      <Box>
        <SwitchInput
          label="Display Aspect Table"
          checked={enabledAspectTable}
          onChange={() =>
            setEnabledAspectTable(!enabledAspectTable)}
        />
        <SwitchInput
          label="Display Transit Table"
          checked={enabledTransitTable}
          onChange={() =>
            setEnabledTransitTable(!enabledTransitTable)}
        />
      </Box>
    </Accordion>
  );
}
