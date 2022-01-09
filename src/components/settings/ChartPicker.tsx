import React from "react";

import {
  Button,
  Divider,
  Hidden,
  Popover,
  Tooltip,
} from "@mui/material";
import { KeyboardArrowDown, DonutLarge } from "@mui/icons-material";

import { useBaseContext, usePrimitive } from "@hooks";
import { Box } from "@components";
import ChartPickerForm from "./ChartPickerForm";
import ChartPickerList from "./ChartPickerList";

/**
 * Renders the button and menu for changing the loaded chart.
 *
 * @constructor
 * @visibleName Chart Picker
 */
export default function ChartPicker() {
  const {
    currentEvent,
    saveEvents,
    resetLiveChart,
  } = useBaseContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "chart-menu" : undefined;
  const chartName = usePrimitive(currentEvent, "name");

  const handleOpenCharts = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCharts = () => {
    setAnchorEl(null);
    saveEvents();
    resetLiveChart();
  };

  return (
    <>
      <Tooltip title="Change chart" enterDelay={300}>
        <Button
          aria-controls="chart-menu"
          aria-haspopup="true"
          startIcon={<DonutLarge />}
          endIcon={<KeyboardArrowDown />}
          onClick={handleOpenCharts}
        >
          {chartName.value || "New Chart"}
        </Button>
      </Tooltip>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseCharts}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Hidden smUp>
          <Box m={2} gapY={1}>
            <ChartPickerForm onClose={handleCloseCharts} />
            <Divider orientation="vertical" flexItem />
            <ChartPickerList />
          </Box>
        </Hidden>
        <Hidden smDown>
          <Box row m={2} gapX={1}>
            <ChartPickerForm onClose={handleCloseCharts} />
            <Divider orientation="vertical" flexItem />
            <ChartPickerList />
          </Box>
        </Hidden>
      </Popover>
    </>
  );
}
