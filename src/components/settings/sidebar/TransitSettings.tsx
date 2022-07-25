import React, { useState } from "react";

import { Button, FormControlLabel, Switch } from "@mui/material";

import {
  Box, DateTimeInput, LocationInput, SelectInput, Accordion, MultiselectInput,
} from "@components";
import { useBaseContext, useLocalDate, usePrimitive } from "@hooks";
import { createTransitSettings } from "@models";
import { transitGroupTypes, transitTypes } from "@utils";

/**
 * Renders inputs for calculating transits.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Transit Inputs
 */
function TransitInputs(props: TransitSettingsProps) {
  const { transitSettings } = props;
  const { reloadLiveChart } = useBaseContext();
  const type = usePrimitive(transitSettings, "type");
  const groupBy = usePrimitive(transitSettings, "groupBy");
  const {
    localDate: localStartDate,
    handleLocalDateChange: handleStartDateChange,
  } = useLocalDate(transitSettings.event, "localDate", "utcDate");
  const {
    localDate: localEndDate,
    handleLocalDateChange: handleEndDateChange,
  } = useLocalDate(transitSettings.event, "localEndDate", "utcEndDate");

  return (
    <Box gapY={2}>
      <SelectInput
        fullWidth
        label="Transit Type"
        options={transitTypes}
        attribute={type}
      />

      <DateTimeInput
        label="From Date"
        openTo="month"
        date={localStartDate}
        onSubmit={handleStartDateChange}
      />
      <DateTimeInput
        label="To Date"
        openTo="month"
        date={localEndDate}
        onSubmit={handleEndDateChange}
      />
      <LocationInput chart={transitSettings.event} />

      <MultiselectInput
        label="Group Transits"
        options={transitGroupTypes}
        attribute={groupBy}
      />

      {/* Toggles - Ecliptic, Declination, Corrected */}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={reloadLiveChart}
      >
        Calculate Transits
      </Button>
    </Box>
  );
}

/**
 * Renders settings for calculating transits.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Transit Settings
 */
export default function TransitSettings(props: EventSettingsProps) {
  const { eventSettings } = props;
  const [enabled, setEnabled] = useState(false);
  const transits = usePrimitive(eventSettings, "transits");

  const handleToggleEnable = () => {
    const newEnabled = !enabled;

    setEnabled(newEnabled);
    transits.setValue(newEnabled ? createTransitSettings() : undefined);
  };

  return (
    <Accordion name="Transit Settings">
      <Box gapY={1}>
        <FormControlLabel
          control={(
            <Switch
              checked={enabled}
              onChange={handleToggleEnable}
              inputProps={{ "aria-label": "controlled" }}
            />
          )}
          label="Calculate Transit Timing"
        />
        {transits.value && <TransitInputs transitSettings={transits.value} />}
      </Box>
    </Accordion>
  );
}
