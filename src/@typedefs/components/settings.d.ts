/**
 * Props for rendering the settings for an event.
 */
declare interface EventSettingsProps {
  /**
   * The event to edit settings for.
   */
  eventSettings: EventSettingsModel;
}

/**
 * Props for rendering the chart picker form for an event.
 */
declare interface ChartPickerFormProps {
  /**
   * Called when the picker is closed.
   */
  onClose(): void;
}

/**
 * Renders an event's details.
 */
declare interface EventItemProps {
  /**
   * The event to render.
   */
  event: EventModel;

  /**
   * Called when this item is selected.
   */
  selectEvent(): void;
}
