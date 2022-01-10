import React from "react";

import {
  Accordion, AccordionDetails, AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { storableEventTypes, getISODateStringFromOffset } from "@utils";
import { useBaseContext, usePrimitive } from "@hooks";
import {
  Box, DateTimeInput, LocationInput, MultiselectInput, SelectInput, TextInput,
} from "@components";

/**
 * Renders the form for editing an event.
 *
 * @constructor
 * @visibleName Chart Picker Form
 */
export default function ChartPickerForm(props: ChartPickerFormProps) {
  const { onClose } = props;
  const {
    currentEvent,
    saveEvents,
    removeCurrentEvent,
  } = useBaseContext();
  const chartName = usePrimitive(currentEvent, "name");
  const chartType = usePrimitive(currentEvent, "type");
  const chartTags = usePrimitive(currentEvent, "tags");
  const localDate = usePrimitive(currentEvent, "localDate");
  const utcDate = usePrimitive(currentEvent, "utcDate");
  const chartLatitude = usePrimitive(currentEvent, "latitude");
  const chartLongitude = usePrimitive(currentEvent, "longitude");
  const [showDelete, setShowDelete] = React.useState(false);

  const handleConfirmDelete = () => {
    setShowDelete(false);
    removeCurrentEvent();
  };

  const handleLocalDateChange = (date: Date | null) => {
    utcDate.setValue(
      getISODateStringFromOffset(date, currentEvent.numericOffset),
    );
    saveEvents();
  };

  return (
    <Box gapY={1} maxWidth={400}>
      <Typography variant="h6">Current Chart</Typography>
      <form noValidate autoComplete="off">
        <Box gapY={1}>
          <Box row>
            <TextInput
              fullWidth
              label="Name"
              attribute={chartName}
              onBlur={saveEvents}
              style={{ marginRight: 10 }}
            />
            <SelectInput
              label="Type"
              options={storableEventTypes}
              attribute={chartType}
            />
          </Box>
          <DateTimeInput
            label="Local Date"
            date={localDate}
            onSubmit={handleLocalDateChange}
          />
          <LocationInput chart={currentEvent} onSearchComplete={saveEvents} />
          <MultiselectInput
            label="Tags"
            options={[]}
            attribute={chartTags}
          />

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Calculated Fields</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box gapY={1}>
                <Box row gapX={1}>
                  <TextInput
                    label="Latitude"
                    type="number"
                    attribute={chartLatitude}
                  />
                  <TextInput
                    label="Longitude"
                    type="number"
                    attribute={chartLongitude}
                  />
                </Box>
                <DateTimeInput label="Universal Date" date={utcDate} />
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
            <Button variant="contained" onClick={onClose}>
              View Chart
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
