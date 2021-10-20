import { generateUniqueId } from "@utils";

/**
 * Creates a new chart object.
 *
 * @param props - Any props to create the chart with.
 *
 * @return The created chart.
 */
export function createNewChart(props?: Partial<Chart>): Chart {
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
export function cloneChart(chart: Chart): Chart {
  return {
    ...chart,
    id: generateUniqueId(),
    name: "",
  };
}
