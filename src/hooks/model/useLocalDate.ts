import { usePrimitive } from "@hooks";
import { getISODateStringFromOffset, parseDate } from "@utils";
import { useEffect } from "react";

/**
 * Keeps a utc date in sync with the local date
 * when the local date or event timezone changes.
 *
 * @param event - The event being updated.
 * @param localDateKey - The key of the local date being updated (base or end date).
 * @param utcDateKey - The key of the utc date being updated (base or end date).
 * @param onChange - Ran when the local date changes.
 * @return A hook for updating the utc date when the local date changes.
 */
export default function useLocalDate<
  T extends EventModel,
  L extends keyof T,
  U extends keyof T,
>(
  event: T,
  localDateKey: L,
  utcDateKey: U,
  onChange?: () => void,
): LocalDateHook {
  const localDate = usePrimitive(event, localDateKey) as AttributeHook<string>;
  const utcDate = usePrimitive(event, utcDateKey) as AttributeHook<string>;

  const handleLocalDateChange = (date: Date | null) => {
    utcDate.setValue(
      getISODateStringFromOffset(date, event.numericOffset),
    );

    onChange?.();
  };

  useEffect(() => {
    handleLocalDateChange(parseDate(localDate.value));
  }, [event.numericOffset]);

  return {
    localDate,
    utcDate,
    handleLocalDateChange,
  };
}
