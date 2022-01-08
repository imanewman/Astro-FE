/**
 * A hook for keeping track of a list of saved charts.
 */
declare interface ChartListHook {
  /**
   * A list of all current charts.
   */
  charts: EventModel[];

  /**
   * The currently selected chart's index within the list.
   */
  currentChartIndex: number;

  /**
   * The currently selected chart.
   */
  currentChart: EventModel;

  /**
   * A callback to save the current charts in local storage.
   */
  saveCharts(): void;

  /**
   * A callback to create and select a new chart.
   *
   * @param chart - A chart to create and select. If none is given, an empty chart is created.
   */
  createChart(chart?: EventModel): void;

  /**
   * A callback to update the current chart
   *
   * @param chart - A new chart to set.
   */
  updateChart(chart: EventModel): void;

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
  liveChart: EventModel;

  /**
   * Called to reset the live chart back to its default settings.
   */
  resetLiveChart(): void;

  /**
   * Called to pull an updated chart from the backend.
   */
  reloadLiveChart(): void;

  /**
   * The calculated chart data.
   */
  liveData: any;

  /**
   * Any errors from downloading the live chart.
   */
  liveChartError: Error | null;

  /**
   * Whether the live chart is currently loading.
   */
  liveChartLoading: boolean;
}
