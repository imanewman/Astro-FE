import React from "react";

import { Button, ButtonGroup, Tooltip } from "@mui/material";
import {
  ChevronLeft, ChevronRight, FirstPage, LastPage,
} from "@mui/icons-material";

import { useBaseContext, useDate, usePrimitive } from "@hooks";
import { Box } from "@components";
import { incrementMap } from "../../../hooks/model/useDate";

const increments: TimeIncrement[] = ["min", "hour", "day", "mth", "year"];

const icons: { size: AmountIncrement, icon: JSX.Element }[] = [
  { size: "manyDown", icon: <FirstPage /> },
  { size: "oneDown", icon: <ChevronLeft /> },
  { size: "oneUp", icon: <ChevronRight /> },
  { size: "manyUp", icon: <LastPage /> },
];

/**
 * Renders buttons for going forward and backward in time.
 *
 * @constructor
 * @visibleName Time Changer
 */
export default function TimeChanger(props: EventSettingsProps) {
  const { eventSettings } = props;
  const { event } = eventSettings;
  const { reloadLiveChart, timeIncrement, setTimeIncrement } = useBaseContext();
  const localDate = usePrimitive(event, "localDate");
  const utcDate = usePrimitive(event, "utcDate");
  const { incrementDate } = useDate(localDate);
  const { incrementDate: incrementUtcDate } = useDate(utcDate);

  const handleIncrement = (size: AmountIncrement) => {
    incrementDate(timeIncrement, size);
    incrementUtcDate(timeIncrement, size);
    reloadLiveChart();
  };

  const getTitle = (size: AmountIncrement) =>
    `${incrementMap[timeIncrement][size]} ${timeIncrement}(s)`;

  return (
    <Box alignX="center" gapY={1} mx={1}>
      <ButtonGroup
        fullWidth
        color="primary"
        aria-label="edit current time increment"
      >
        {increments.map((increment) => (
          <Tooltip key={increment} title={`Increment by ${increment}`}>
            <Button
              variant={timeIncrement === increment ? "contained" : "outlined"}
              onClick={() => setTimeIncrement(increment)}
            >
              {increment}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>

      <ButtonGroup
        fullWidth
        color="primary"
        aria-label="increment current time"
      >
        {icons.map(({ size, icon }) => (
          <Tooltip key={size} title={getTitle(size)}>
            <Button onClick={() => handleIncrement(size)}>
              {icon}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    </Box>
  );
}
