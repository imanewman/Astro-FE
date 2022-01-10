/**
 * The format to use by default for date strings.
 */
export const dateFormat = "M/d/yyyy h:mm a";

export const geoCodeApiKey = "AIzaSyDEwo4G5B-nYnfoMgvz5pqTUmE0s23sXAc";

export const storableEventTypes: EventType[] = [
  "Natal",
  "Event",
  "Horary",
  "Election",
];

export default { dateFormat, eventTypes: storableEventTypes };
