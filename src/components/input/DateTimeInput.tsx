import React from "react";

import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { dateFormat } from "@utils";
import { useDate } from "@hooks";
import { DateTimeInputProps } from "../../@typedefs/components/input";

/**
 * Renders an input for date and time.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Date Time Input
 */
export default function DateTimeInput(props: DateTimeInputProps) {
  const { date, openTo = "year" } = props;
  const attribute = useDate(date);

  return (
    <KeyboardDateTimePicker
      variant="inline"
      inputVariant="filled"
      placeholder="MM/DD/YYYY HH:mm"
      format={dateFormat}
      label="Date"
      value={attribute.date}
      style={{ display: "flex" }}
      views={["year", "month", "date", "hours", "minutes"]}
      openTo={openTo}
      hideTabs={false}
      onChange={attribute.setDate}
    />
  );
}
