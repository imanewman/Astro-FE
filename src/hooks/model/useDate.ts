import React, { useLayoutEffect } from "react";
import { add } from "date-fns";

import { isoDate, parseDate } from "@utils";

const incrementMap = {
  min: {
    oneUp: 1, manyUp: 10, oneDown: -1, manyDown: -10,
  },
  hour: {
    oneUp: 1, manyUp: 12, oneDown: -1, manyDown: -12,
  },
  day: {
    oneUp: 1, manyUp: 7, oneDown: -1, manyDown: -7,
  },
  mth: {
    oneUp: 1, manyUp: 6, oneDown: -1, manyDown: -6,
  },
  year: {
    oneUp: 1, manyUp: 5, oneDown: -1, manyDown: -5,
  },
};

/**
 * Creates a hook for editing a string attribute representing a date.
 *
 * @param attribute - The date attribute to edit.
 */
export default function useDate(attribute: AttributeHook<string>): DateHook {
  const [date, setJsDate] = React.useState<Date | null>(parseDate(attribute.value));

  useLayoutEffect(() => {
    setJsDate(parseDate(attribute.value));
  }, [attribute.value]);

  const setDate = (newDate: Date | null) => {
    if (newDate && newDate.toDateString() !== "Invalid Date") {
      attribute.setValue(isoDate(newDate));
    } else {
      attribute.setValue("");
    }
  };

  const incrementDate = (increment: TimeIncrement, amount: AmountIncrement) => {
    if (date) {
      switch (increment) {
        case "year":
          setDate(add(date, { years: incrementMap.year[amount] }));
          break;
        case "mth":
          setDate(add(date, { months: incrementMap.mth[amount] }));
          break;
        case "day":
          setDate(add(date, { days: incrementMap.day[amount] }));
          break;
        case "hour":
          setDate(add(date, { hours: incrementMap.hour[amount] }));
          break;
        default:
          setDate(add(date, { minutes: incrementMap.min[amount] }));
      }
    }
  };

  return { date, setDate, incrementDate };
}
