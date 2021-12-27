import React from "react";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/lab";

import { useDate } from "@hooks";
import { DateTimeInputProps } from "@typedefs";

/**
 * Renders an input for date and time.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Date Time Input
 */
export default function DateTimeInput(props: DateTimeInputProps) {
  const { date, label = "Date", openTo = "year" } = props;
  const attribute = useDate(date);

  return (
    <DateTimePicker
      label={label}
      value={attribute.date}
      views={["year", "month", "day", "hours", "minutes"]}
      openTo={openTo}
      hideTabs={false}
      onChange={attribute.setDate}
      renderInput={(inputProps) => (
        <TextField
          {...inputProps}
          variant="filled"
          style={{ display: "flex" }}
        />
      )}
    />
  );
}
