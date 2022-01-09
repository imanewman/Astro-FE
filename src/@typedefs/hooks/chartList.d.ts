/**
 * A hook for keeping track of a list of saved charts.
 */
declare interface ChartListHook {
  /**
   * A list of all currently saved events.
   */
  events: EventModel[];

  /**
   * The currently selected event's index within the list.
   */
  currentEventIndex: number;

  /**
   * The currently selected event.
   */
  currentEvent: EventModel;

  /**
   * A callback to save the current events in local storage.
   */
  saveEvents(): void;

  /**
   * A callback to create and select a new event.
   *
   * @param event - An event to create and select. If none is given, an empty event is created.
   */
  createEvent(event?: EventModel): void;

  /**
   * A callback to update the current event.
   *
   * @param event - A new event to set.
   */
  updateEvent(event: EventModel): void;

  /**
   * A callback to switch to a new event index.
   *
   * @param index - The event list index to switch to.
   */
  switchEvent(index: number): void;

  /**
   * A callback to delete the current event from the list.
   */
  removeCurrentEvent(): void;
}

/**
 * A hook for managing the settings around the currently visible event chart.
 */
interface LiveChartHook {
  /**
   * The currently visible event.
   */
  liveEvent: EventModel;

  /**
   * The current biwheel added to the live chart, if there is one.
   */
  liveBiwheel?: EventModel;

  /**
   * Any errors from downloading the live chart.
   */
  liveChartError: Error | null;

  /**
   * Whether the live chart is currently loading.
   */
  liveChartLoading: boolean;

  /**
   * The calculated chart data.
   */
  liveData?: ChartCollectionModel;

  /**
   * Whether the biwheel event is selected.
   */
  isBiwheelSelected: boolean;

  /**
   * Called to set whether the base or biwheel chart is selected.
   * - If there is currently no biwheel, the current transits will be added as one.
   * - If the selected chart is cleared, the biwheel will be removed.
   */
  setSelectedSettings(selected: "base" | "biwheel" | "clear"): void;

  /**
   * Called to reset the live chart back to its default settings.
   */
  resetLiveChart(): void;

  /**
   * Called to pull an updated chart from the backend.
   */
  reloadLiveChart(): void;

  /**
   * Adds a biwheel chart and requests updated chart data.
   */
  addBiwheel(biwheel?: EventModel): void;
}
