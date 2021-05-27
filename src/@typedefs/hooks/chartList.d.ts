/**
 * A hook for keeping track of a list of saved charts.
 */
declare interface ChartListHook {
  /**
   * A list of all current charts.
   */
  charts: Chart[];

  /**
   * The currently selected chart's index within the list.
   */
  currentChartIndex: number;

  /**
   * The currently selected chart.
   */
  currentChart: Chart;

  /**
   * A hook for the current chart's name.
   */
  chartName: AttributeHook<Chart, "name">;

  /**
   * A hook for the current chart's date.
   */
  chartDate: AttributeHook<Chart, "date">;

  /**
   * A hook for the current chart's location.
   */
  chartLocation: AttributeHook<Chart, "location">;

  /**
   * A callback to save the current charts in local storage.
   */
  saveCharts(): void;

  /**
   * A callback to create and select a new chart.
   */
  createChart(): void;

  /**
   * A callback to switch to a new chart index.
   *
   * @param index - The chart list index to switch to.
   */
  switchChart(index: number): void;

  /**
   * A callback to delete the current chart from the list.
   */
  removeCurrentChart(): void;
}
