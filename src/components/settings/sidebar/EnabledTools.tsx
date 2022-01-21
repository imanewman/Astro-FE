import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

import { useBaseContext } from "@hooks";
import { Box } from "@components";

/**
 * Dispays buttons for enabling different tools.
 *
 * @constructor
 * @visibleName Enabled Tools
 */
export default function EnabledTools() {
  const { enabledAspectTable, setEnabledAspectTable } = useBaseContext();

  return (
    <Box m={1}>
      <FormControlLabel
        control={(
          <Switch
            defaultChecked
            value={enabledAspectTable}
            onChange={() => setEnabledAspectTable(!enabledAspectTable)}
          />
        )}
        label="Display Aspect Table"
      />
    </Box>
  );
}
