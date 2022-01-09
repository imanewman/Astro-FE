import Geocode from "react-geocode";

import { dateToSeconds, geoCodeApiKey } from "@utils";
import { APIPath, buildEndpoint } from "./buildEndpoint";

Geocode.setApiKey(geoCodeApiKey);

/**
 * Finds the latitude and longitude of the location.
 *
 * @param location - The location to find.
 * @return The latitude and longitude of the location.
 */
export async function findGeocode(location: string): Promise<GeocodeLocation> {
  const geocode = await Geocode.fromAddress(location);
  const { lat, lng } = geocode.results[0].geometry.location;

  return { lat, lng };
}

/**
 * Finds the timezone of the date and location.
 *
 * @param date - The date to use.
 * @param location - The location to find.
 * @return The timezone for this location on this date.
 */
export async function findTimezone(date: Date, { lat, lng }: GeocodeLocation): Promise<Timezone> {
  const jsDate = new Date(date);
  const timestamp = dateToSeconds(jsDate);

  return buildEndpoint<{}, Timezone>("https://maps.googleapis.com/maps/api/timezone/json", false)
    .fillQuery({
      location: `${lat},${lng}`,
      timestamp: String(timestamp),
      key: geoCodeApiKey,
    })
    .get();
}

/**
 * Calculates a chart with the given events.
 *
 * @param events - The events to calculate the chart of.
 * @return The calculated chart.
 */
export function calculateChart(...events: EventModel[]): Promise<ChartCollectionModel> {
  return buildEndpoint<SettingsModel, ChartCollectionModel>(APIPath.chart)
    .post({
      events: events.map((event) => ({ event })),
    });
}

export default { calculateChart };
