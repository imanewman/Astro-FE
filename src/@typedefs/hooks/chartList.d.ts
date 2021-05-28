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

/**
 * A hook for managing the settings around the currently visible chart.
 */
interface LiveChartHook {
  /**
   * The currently visible chart.
   */
  liveChart: Chart;
}
