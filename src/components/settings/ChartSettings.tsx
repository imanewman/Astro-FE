import React, { useState } from "react";

import {
  Box, DateTimeInput, LocationInput,
} from "@components";
import { useBaseContext, useDate, usePrimitive } from "@hooks";
import { Button, ButtonGroup } from "@mui/material";
import {
  ChevronLeft, ChevronRight, FirstPage, LastPage,
} from "@mui/icons-material";

const increments: TimeIncrement[] = ["min", "hour", "day", "mth", "year"];

/**
 * Renders the settings to edit the current chart view.
 *
 * @constructor
 * @visibleName Chart Settings
 */
export default function ChartSettings() {
  const [selected, setSelected] = useState(increments[1]);
  const { liveChart, reloadLiveChart, createChart } = useBaseContext();
  const localDate = usePrimitive(liveChart, "localDate");
  const utcDate = usePrimitive(liveChart, "utcDate");
  const { incrementDate } = useDate(localDate);
  const { incrementDate: incrementUtcDate } = useDate(utcDate);

  const handleIncrement = (size: AmountIncrement) => {
    incrementDate(selected, size);
    incrementUtcDate(selected, size);
    reloadLiveChart();
  };

  const handleSaveChart = () => {
    createChart(liveChart);
  };

  return (
    <Box gapY={2} m={1}>
      <DateTimeInput date={localDate} openTo="month" />
      <LocationInput chart={liveChart} onSearchComplete={reloadLiveChart} />
      <Box alignX="center" gapY={1} mx={2}>
        <ButtonGroup
          fullWidth
          color="primary"
          aria-label="edit current time increment"
        >
          {increments.map((increment) => (
            <Button
              key={increment}
              variant={selected === increment ? "contained" : "outlined"}
              onClick={() => setSelected(increment)}
            >
              {increment}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup
          fullWidth
          color="primary"
          aria-label="increment current time"
        >
          <Button onClick={() => handleIncrement("manyDown")}>
            <FirstPage />
          </Button>
          <Button onClick={() => handleIncrement("oneDown")}>
            <ChevronLeft />
          </Button>
          <Button onClick={() => handleIncrement("oneUp")}>
            <ChevronRight />
          </Button>
          <Button onClick={() => handleIncrement("manyUp")}>
            <LastPage />
          </Button>
        </ButtonGroup>
        <Button onClick={handleSaveChart}>
          Save As New Chart
        </Button>
      </Box>
    </Box>
  );
}
