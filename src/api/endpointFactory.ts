import { APIPath, buildEndpoint } from "./buildEndpoint";

/**
 * Finds the timezone of the date and location.
 *
 * @param localDate - The local date to use.
 * @param locationName - The name location to find.
 * @return The timezone for this location on this date.
 */
export async function calculateTimezone(
  localDate: Date,
  locationName: string,
): Promise<LocationTimezone> {
  return buildEndpoint<LocationTimezoneQuery, LocationTimezone>(APIPath.timezone)
    .post({
      locationName,
      localDate: localDate.toISOString(),
    });
}

/**
 * Calculates a chart with the given events.
 *
 * @param events - The events to calculate the chart of.
 * @return The calculated chart.
 */
export function calculateChart(events: EventSettingsModel[]): Promise<ChartCollectionModel> {
  return buildEndpoint<SettingsModel, ChartCollectionModel>(APIPath.chart)
    .post({ events });
}

export default {
  calculateTimezone,
  calculateChart,
};
