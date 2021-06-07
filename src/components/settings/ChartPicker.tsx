import React from "react";
import {
  Button,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import {
  Box, DateTimeInput, LocationInput, TextInput,
} from "@components";
import { useBaseContext, usePrimitive } from "@hooks";

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
    charts,
    currentChart,
    saveCharts,
    createChart,
    switchChart,
    removeCurrentChart,
  } = useBaseContext();
  const chartName = usePrimitive(currentChart, "name");
  const chartDate = usePrimitive(currentChart.location, "localDate");
  const chartLocation = usePrimitive(currentChart, "location");
  const chartLatitude = usePrimitive(currentChart.location, "latitude");
  const chartLongitude = usePrimitive(currentChart.location, "longitude");

  const handleOpenCharts = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCharts = () => {
    setAnchorEl(null);
    saveCharts();
  };

  const chartForm = (
    <Box gapY={1}>
      <Typography variant="h6">Current Chart</Typography>
      <form noValidate autoComplete="off">
        <Box gapY={1}>
          <TextInput
            fullWidth
            label="Name"
            variant="filled"
            attribute={chartName}
          />
          <DateTimeInput date={chartDate} />
          <LocationInput location={chartLocation} />
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
          <Button onClick={removeCurrentChart}>
            <Typography color="error">Delete Chart</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );

  const chartList = (
    <Box gapY={1} minWidth={100} maxWidth={500}>
      <Typography variant="h6">Saved Charts</Typography>
      <List style={{ overflowY: "auto", maxHeight: 300 }}>
        {charts.map(({ id, name, location }, index) => (
          <ListItem
            button
            key={id}
            onClick={() => switchChart(index)}
            selected={currentChart.id === id}
          >
            <ListItemText
              primary={name || "New Chart"}
              secondary={
                `${location.localDate || "New Date"} in ${location.name || "New Location"}`
              }
            />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={() => createChart()}
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
          startIcon={<DonutLargeIcon />}
          endIcon={<KeyboardArrowDownIcon />}
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
        <Hidden xsDown>
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
