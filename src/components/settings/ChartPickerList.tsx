import React, { useEffect, useState } from "react";

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { stringifyDateAndLocation } from "@utils";
import { useBaseContext, usePrimitive } from "@hooks";
import { Box } from "@components";

function EventItem(props: EventItemProps) {
  const { currentEvent } = useBaseContext();
  const {
    selectEvent,
    event,
  } = props;
  const name = usePrimitive(event, "name");
  const [place, setPlace] = useState(stringifyDateAndLocation(event.localDate, event.location));

  useEffect(() => {
    setPlace(stringifyDateAndLocation(event.localDate, event.location));
  }, [event]);

  return (
    <ListItem
      button
      onClick={selectEvent}
      selected={currentEvent.id === event.id}
    >
      <ListItemText
        primary={name.value || "New Chart"}
        secondary={place}
      />
    </ListItem>
  );
}

/**
 * Renders the list of events that can be picked from.
 *
 * @constructor
 * @visibleName Chart Picker List
 */
export default function ChartPickerList() {
  const {
    events,
    createEvent,
    switchEvent,
  } = useBaseContext();

  return (
    <Box gapY={1} minWidth={100} maxWidth={400}>
      <Typography variant="h6">Saved Charts</Typography>
      <List style={{ overflowY: "auto", maxHeight: 300 }}>
        {events.map((event, index) => (
          <EventItem
            key={event.id}
            event={event}
            selectEvent={() => switchEvent(index)}
          />
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
}
