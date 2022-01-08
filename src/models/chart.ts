import { generateUniqueId } from "@utils";

/**
 * Creates a new chart object.
 *
 * @param props - Any props to create the chart with.
 *
 * @return The created chart.
 */
export function createNewChart(props?: Partial<EventModel>): EventModel {
  return {
    id: generateUniqueId(),
    name: "",
    type: "Event",
    tags: [],
    localDate: "",
    utcDate: "",
    timezone: "",
    utcOffset: "",
    location: "",
    latitude: "",
    longitude: "",
    ...(props || {}),
  };
}

/**
 * Clones the given chart.
 *
 * @param chart - The chart to clone
 */
export function cloneChart(chart: EventModel): EventModel {
  return {
    ...chart,
    id: generateUniqueId(),
  };
}

/**
 * Returns the current transits chart.
 *
 * TODO: correctly set current time and location.
 */
export function createCurrentTransitsChart(): EventModel {
  return createNewChart({
    name: "Transits",
    localDate: new Date(Date.now()).toISOString(),
    utcDate: new Date(Date.now()).toISOString(),
    location: "Manhattan, NY",
    latitude: "40.78",
    longitude: "-73.97",
  });
}
