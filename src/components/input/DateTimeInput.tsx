import React, { useState } from "react";

import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/lab";

import { DateTimeInputProps } from "@typedefs";
import { useDate } from "@hooks";
import { isDateValid } from "@utils";

/**
 * Renders an input for date and time.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Date Time Input
 */
export default function DateTimeInput(props: DateTimeInputProps) {
  const {
    onSubmit, date, label = "Date", openTo = "year",
  } = props;
  const attribute = useDate(date);
  const [error, setError] = useState(false);

  const handleChange = (newDate: Date | null) => {
    const isValid = isDateValid(newDate);

    if (isValid) {
      onSubmit?.(newDate);
    }

    attribute.setDate(newDate);
    setError(!isValid);
  };

  return (
    <DateTimePicker
      label={label}
      value={attribute.date}
      views={["year", "month", "day", "hours", "minutes"]}
      openTo={openTo}
      hideTabs={false}
      onChange={handleChange}
      renderInput={(inputProps) => (
        <TextField
          {...inputProps}
          variant="filled"
          error={error}
          style={{ display: "flex" }}
        />
      )}
    />
  );
}
