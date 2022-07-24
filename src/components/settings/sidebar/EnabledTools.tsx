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
    <Box ml={2}>
      <FormControlLabel
        control={(
          <Switch
            checked={enabledAspectTable}
            onChange={() => setEnabledAspectTable(!enabledAspectTable)}
            inputProps={{ "aria-label": "controlled" }}
          />
        )}
        label="Display Aspect Table"
      />
    </Box>
  );
}
