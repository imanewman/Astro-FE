import { APIPath, buildEndpoint } from "./buildEndpoint";

/**
 * Creates an endpoint to calculate a given chart.
 *
 * @param events - The events to calculate the chart of.
 */
export function calculateChart(...events: EventModel[]) {
  return buildEndpoint<SettingsModel, ChartDataModel>(APIPath.chart)
    .post({
      events: events.map((event) => ({ event })),
    });
}

export default { calculateChart };
