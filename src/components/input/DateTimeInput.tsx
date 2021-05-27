import React, { useLayoutEffect } from "react";

import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { dateFormat, parseDate } from "@utils";
import { format } from "date-fns";

/**
 * Renders an input for date and time.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Date Time Input
 */
export default function DateTimeInput(props: DateTimeInputProps) {
  const { date } = props;
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(parseDate(date.value));

  const handleDateChange = (newDate: Date | null) => {
    if (newDate && !newDate.toString().includes("Invalid")) {
      setSelectedDate(newDate);
      date.setValue(format(newDate, dateFormat));
    } else {
      setSelectedDate(null);
      date.setValue("");
    }
  };

  useLayoutEffect(() => {
    setSelectedDate(parseDate(date.value));
  }, [date.value]);

  return (
    <KeyboardDateTimePicker
      inputVariant="filled"
      format={dateFormat}
      label="Date"
      value={selectedDate}
      style={{ display: "flex" }}
      views={["year", "month", "date", "hours", "minutes"]}
      openTo="year"
      hideTabs={false}
      onChange={handleDateChange}
    />
  );
}
