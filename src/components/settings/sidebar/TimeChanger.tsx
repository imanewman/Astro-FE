import React, { useState } from "react";

import { Button, ButtonGroup } from "@mui/material";
import {
  ChevronLeft, ChevronRight, FirstPage, LastPage,
} from "@mui/icons-material";

import { useBaseContext, useDate, usePrimitive } from "@hooks";
import { Box } from "@components";

const increments: TimeIncrement[] = ["min", "hour", "day", "mth", "year"];

/**
 * Renders buttons for going forward and backward in time.
 *
 * @constructor
 * @visibleName Time Changer
 */
export default function TimeChanger(props: EventSettingsProps) {
  const { eventSettings } = props;
  const { event } = eventSettings;
  const { reloadLiveChart, createEvent } = useBaseContext();
  const [selected, setSelected] = useState(increments[1]);
  const localDate = usePrimitive(event, "localDate");
  const utcDate = usePrimitive(event, "utcDate");
  const { incrementDate } = useDate(localDate);
  const { incrementDate: incrementUtcDate } = useDate(utcDate);

  const handleIncrement = (size: AmountIncrement) => {
    incrementDate(selected, size);
    incrementUtcDate(selected, size);
    reloadLiveChart();
  };

  const handleSaveChart = () => {
    createEvent(event);
  };

  return (
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
  );
}
