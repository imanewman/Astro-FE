import { APIPath, buildEndpoint } from "./buildEndpoint";

/**
 * Creates an endpoint to calculate a given chart.
 *
 * @param event - The event to calculate the chart of.
 */
export function calculateChart(event: EventModel) {
  return buildEndpoint<SettingsModel, ChartDataModel>(APIPath.chart)
    .post({
      events: [{ event }],
    });
}

export default {};
