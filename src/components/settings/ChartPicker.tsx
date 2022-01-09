import React from "react";

import {
  Accordion, AccordionDetails, AccordionSummary,
  Button,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore, KeyboardArrowDown, DonutLarge } from "@mui/icons-material";

import { getISODateStringFromOffset, stringifyDate } from "@utils";
import { useBaseContext, usePrimitive } from "@hooks";
import {
  Box, DateTimeInput, LocationInput, TextInput,
} from "@components";

/**
 * Renders the button and menu for changing the loaded chart.
 *
 * @constructor
 * @visibleName Chart Picker
 */
export default function ChartPicker() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "chart-menu" : undefined;
  const {
    events,
    currentEvent,
    saveEvents,
    createEvent,
    switchEvent,
    removeCurrentEvent,
    resetLiveChart,
  } = useBaseContext();
  const chartName = usePrimitive(currentEvent, "name");
  const localDate = usePrimitive(currentEvent, "localDate");
  const utcDate = usePrimitive(currentEvent, "utcDate");
  const chartLatitude = usePrimitive(currentEvent, "latitude");
  const chartLongitude = usePrimitive(currentEvent, "longitude");
  const [showDelete, setShowDelete] = React.useState(false);

  const handleConfirmDelete = () => {
    setShowDelete(false);
    removeCurrentEvent();
  };

  const handleOpenCharts = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCharts = () => {
    setAnchorEl(null);
    saveEvents();
    resetLiveChart();
  };

  const handleSearch = () => {
    saveEvents();
  };

  const handleLocalDateChange = (date: Date | null) => {
    utcDate.setValue(
      getISODateStringFromOffset(date, currentEvent.numericOffset),
    );
  };

  const chartForm = (
    <Box gapY={1} maxWidth={400}>
      <Typography variant="h6">Current Chart</Typography>
      <form noValidate autoComplete="off">
        <Box gapY={1}>
          <TextInput
            fullWidth
            label="Name"
            variant="filled"
            attribute={chartName}
          />
          <DateTimeInput date={localDate} label="Local Date" onSubmit={handleLocalDateChange} />
          <LocationInput chart={currentEvent} onSearchComplete={handleSearch} />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Calculated Fields</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box gapY={1}>
                <Box row gapX={1}>
                  <TextInput
                    label="Latitude"
                    variant="filled"
                    type="number"
                    attribute={chartLatitude}
                  />
                  <TextInput
                    label="Longitude"
                    variant="filled"
                    type="number"
                    attribute={chartLongitude}
                  />
                </Box>
                <DateTimeInput date={utcDate} label="Universal Date" />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box row justifyContent="space-between">
            {showDelete ? (
              <Box row gapX={1}>
                <Button color="error" variant="outlined" onClick={handleConfirmDelete}>
                  Confirm Delete
                </Button>
                <Button onClick={() => setShowDelete(false)}>
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button color="error" onClick={() => setShowDelete(true)}>
                Delete Chart
              </Button>
            )}
            <Button variant="contained" onClick={handleCloseCharts}>
              View Chart
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );

  const chartList = (
    <Box gapY={1} minWidth={100} maxWidth={400}>
      <Typography variant="h6">Saved Charts</Typography>
      <List style={{ overflowY: "auto", maxHeight: 300 }}>
        {events.map(({
          id, name, localDate: date, location,
        }, index) => (
          <ListItem
            button
            key={id}
            onClick={() => switchEvent(index)}
            selected={currentEvent.id === id}
          >
            <ListItemText
              primary={name || "New Chart"}
              secondary={
                `${stringifyDate(date) || "New Date"} in ${location || "New Location"}`
              }
            />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={() => createEvent()}
      >
        Create New Chart
      </Button>
    </Box>
  );

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
            {chartForm}
            <Divider orientation="vertical" flexItem />
            {chartList}
          </Box>
        </Hidden>
        <Hidden smDown>
          <Box row m={2} gapX={1}>
            {chartForm}
            <Divider orientation="vertical" flexItem />
            {chartList}
          </Box>
        </Hidden>
      </Popover>
    </>
  );
}
