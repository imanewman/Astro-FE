import React from "react";
import {
  Button,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { Box, DateTimeInput, LocationInput } from "@components";
import { useChartList } from "@hooks";

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
    chartName,
    chartDate,
    chartLocation,
    saveCharts,
    createChart,
    switchChart,
    removeCurrentChart,
  } = useChartList();

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
          <TextField
            fullWidth
            label="Name"
            variant="filled"
            value={chartName.value}
            onChange={(e) => chartName.setValue(e.target.value)}
          />
          <DateTimeInput date={chartDate} />
          <LocationInput location={chartLocation} />
          <Button onClick={removeCurrentChart}>
            <Typography color="error">Delete Chart</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );

  const chartList = (
    <Box gapY={1} minWidth={100}>
      <Typography variant="h6">Saved Charts</Typography>
      <List style={{ overflowY: "auto", maxHeight: 300 }}>
        {charts.map((chart, index) => (
          <ListItem
            button
            key={chart.id}
            onClick={() => switchChart(index)}
            selected={currentChart.id === chart.id}
          >
            <ListItemText
              primary={chart.name || "New Chart"}
              secondary={`${chart.date || "New Date"} in ${chart.location.name || "New Location"}`}
            />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={createChart}
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
          horizontal: "center",
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
