import React from "react";

import { Button, ButtonGroup, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useBaseContext } from "@hooks";
import { Box } from "@components";
import EventSettings from "./EventSettings";

/**
 * Renders the settings to edit the current chart view.
 *
 * @constructor
 * @visibleName Chart Settings
 */
export default function ChartSettings() {
  const {
    liveEvent, liveBiwheel, isBiwheelSelected, setSelectedSettings,
  } = useBaseContext();

  const BiwheelIcon = () => {
    if (!liveBiwheel) {
      return <AddIcon />;
    } if (isBiwheelSelected) {
      return <DeleteIcon />;
    }
    return <EditIcon />;
  };

  return (
    <Box gapY={2}>
      <ButtonGroup fullWidth>
        <Tooltip title="Edit base chart" enterDelay={300}>
          <Button
            variant={!isBiwheelSelected ? "contained" : "outlined"}
            onClick={() => setSelectedSettings("base")}
          >
            Base
          </Button>
        </Tooltip>
        <Tooltip
          title={`${isBiwheelSelected ? "Delete" : "Edit"} biwheel chart`}
          enterDelay={300}
        >
          <Button
            variant={isBiwheelSelected ? "contained" : "outlined"}
            onClick={() => setSelectedSettings(isBiwheelSelected ? "clear" : "biwheel")}
            startIcon={<BiwheelIcon />}
          >
            Biwheel
          </Button>
        </Tooltip>
      </ButtonGroup>
      <EventSettings event={liveBiwheel && isBiwheelSelected ? liveBiwheel : liveEvent} />
    </Box>
  );
}
