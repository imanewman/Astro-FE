import React from "react";
import { format, parse } from "date-fns";
import {
  Button, Divider, Hidden, List, ListItem, ListItemText, Popover, TextField, Tooltip, Typography,
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { Box, LocationInput } from "@components";
import { useLocalStorage, usePrimitive } from "@hooks";

const formatString = "MM/dd/yyyy hh:mm a";

/**
 * Creates a new chart object.
 *
 * @return The created chart.
 */
function createNewChart() {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: "",
    date: "",
    location: { name: "", latitude: "", longitude: "" },
  };
}

/**
 * Converts the given date string into a date object, or null if empty.
 *
 * @param dateString - The date string to convert.
 */
function parseDate(dateString: string): Date | null {
  return dateString
    ? parse(dateString, formatString, new Date())
    : null;
}

/**
 * Renders the button and menu for changing the loaded chart.
 *
 * @constructor
 * @visibleName Chart Picker
 */
export default function ChartPicker() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [charts, setCharts] = useLocalStorage("charts", [createNewChart()]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentChart = charts[currentIndex];
  const name = usePrimitive(currentChart, "name", true);
  const date = usePrimitive(currentChart, "date", true);
  const location = usePrimitive(currentChart, "location", true);
  const open = Boolean(anchorEl);
  const popoverId = open ? "chart-menu" : undefined;
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(parseDate(currentChart.date));

  const handleOpenCharts = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCharts = () => {
    setAnchorEl(null);
    setCharts([...charts]);
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate && !newDate.toString().includes("Invalid")) {
      setSelectedDate(newDate);
      date.setValue(format(newDate, formatString));
    } else {
      setSelectedDate(null);
      date.setValue("");
    }
  };

  const handleNewChart = () => {
    const newChart = createNewChart();

    setCurrentIndex(charts.length);
    setCharts([...charts, newChart]);
    setSelectedDate(null);
  };

  const handleChangeChart = (chart: Chart, index: number) => {
    setCurrentIndex(index);
    setSelectedDate(parseDate(chart.date));
  };

  const handleRemoveChart = () => {
    const remainingCharts = charts.filter(({ id }) => currentChart.id !== id);

    if (remainingCharts.length === 0) {
      const emptyChart = createNewChart();

      setCharts([emptyChart]);
      handleChangeChart(emptyChart, 0);
    } else {
      const newIndex = Math.max(0, currentIndex - 1);

      setCharts(remainingCharts);
      handleChangeChart(charts[newIndex], newIndex);
    }
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
            value={name.value}
            onChange={(e) => name.setValue(e.target.value)}
          />
          <KeyboardDateTimePicker
            inputVariant="filled"
            format={formatString}
            label="Date"
            value={selectedDate}
            style={{ display: "flex" }}
            views={["year", "month", "date", "hours", "minutes"]}
            openTo="year"
            hideTabs={false}
            onChange={handleDateChange}
          />
          <LocationInput
            locationName={location.value.name}
            setLocation={location.setValue}
          />
          <Button onClick={handleRemoveChart}>
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
            onClick={() => handleChangeChart(chart, index)}
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
        onClick={handleNewChart}
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
          {name.value || "New Chart"}
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
