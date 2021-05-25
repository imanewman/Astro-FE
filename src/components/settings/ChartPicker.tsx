import React from "react";

import {
  Button, Divider, Menu, TextField, Tooltip, Typography,
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { Box, LocationInput } from "@components";

/**
 * Renders the button and menu for changing the loaded chart.
 *
 * @constructor
 * @visibleName Chart Picker
 */
export default function ChartPicker() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleOpenCharts = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // TODO: not accessible, tab closes menu instead of tabbing input
  const handleCloseCharts = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Change chart" enterDelay={300}>
        <Button
          color="inherit"
          aria-controls="chart-menu"
          aria-haspopup="true"
          startIcon={<DonutLargeIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          onClick={handleOpenCharts}
        >
          Current Chart
        </Button>
      </Tooltip>
      <Menu
        id="chart-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseCharts}
      >
        <Box row m={2} gapX={1}>
          <Box gapY={1}>
            <Typography variant="h6">Current Chart</Typography>

            <form noValidate autoComplete="off">
              <Box gapY={1}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="filled"
                />

                <KeyboardDateTimePicker
                  inputVariant="filled"
                  format="MM/dd/yyyy hh:mm a"
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={{ display: "flex" }}
                  views={["year", "month", "date", "hours", "minutes"]}
                  openTo="year"
                  hideTabs={false}
                />

                <LocationInput />
              </Box>
            </form>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box gapY={1}>
            <Typography variant="h6">Saved Charts</Typography>
          </Box>
        </Box>
      </Menu>
    </>
  );
}
