import { generateUniqueId } from "@utils";

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
    localDate: new Date(Date.now()).toISOString(),
    utcDate: new Date(Date.now()).toISOString(),
    location: "Manhattan, NY",
    latitude: "40.78",
    longitude: "-73.97",
  });
}
