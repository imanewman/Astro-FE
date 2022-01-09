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
  return createNewEvent({
    name: "Transits",
    type: "Event",
    utcDate: getISODateStringFromOffset(new Date(), -18000000),
    localDate: isoDate(new Date()),
    location: "Manhattan, NY",
    latitude: "40.78",
    longitude: "-73.97",
  });
}
