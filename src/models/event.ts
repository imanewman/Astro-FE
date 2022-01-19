import { generateUniqueId, getISODateStringFromOffset, isoDate } from "@utils";

/**
 * Creates a new event object.
 *
 * @param props - Any props to create the event with.
 * @return The created event.
 */
export function createNewEvent(props?: Partial<EventModel>): EventModel {
  return {
    id: generateUniqueId(),
    name: "",
    type: "Event",
    tags: [],
    localDate: "",
    utcDate: "",
    timezone: "",
    utcOffset: "",
    numericOffset: 0,
    location: "",
    latitude: "",
    longitude: "",
    ...(props || {}),
  };
}

/**
 * Clones the given event.
 *
 * @param chart - The event to clone.
 * @return The cloned event.
 */
export function cloneEvent(chart: EventModel): EventModel {
  return {
    ...chart,
    id: generateUniqueId(),
  };
}

/**
 * Returns the current transits event.
 *
 * @return The event for the current place and time.
 *
 * TODO: correctly set current local time and location.
 */
export function createCurrentTransitsEvent(): EventModel {
  const tz: "EST" | "PST" = "PST";
  const offset = tz === "PST" ? -8 : -5;

  return createNewEvent({
    name: "Transits",
    type: "Transit",
    utcDate: getISODateStringFromOffset(new Date(), offset * 60 * 60 * 1000),
    localDate: isoDate(new Date()),
    location: "Kirkland, WA, USA",
    latitude: "47.67",
    longitude: "-122.20",
  });
}
