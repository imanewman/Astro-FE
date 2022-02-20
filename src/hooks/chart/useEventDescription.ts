import { useEffect, useState } from "react";
import { usePrimitive } from "@hooks";
import { stringifyDateAndLocation } from "@utils";

/**
 * Creates a hook for displaying the name, date, and location of an event.
 *
 * @param event - The event to display.
 */
export default function useEventDescription(event: EventModel): EventDescriptionHook {
  const name = usePrimitive(event, "name");
  const [place, setPlace] = useState(stringifyDateAndLocation(event.localDate, event.location));

  useEffect(() => {
    setPlace(stringifyDateAndLocation(event.localDate, event.location));
  }, [event]);

  return {
    name: name.value || "New Chart",
    place,
  };
}
