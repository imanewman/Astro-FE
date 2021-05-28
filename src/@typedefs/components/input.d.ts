import { KeyboardDateTimePickerProps } from "@material-ui/pickers";

/**
 * Props for rendering a location input field.
 */
declare interface LocationInputProps {
  /**
   * A hook for editing a location.
   */
  location: AttributeHook<ChartLocation>;
}

/**
 * Props for rendering a date and time input field.
 */
declare interface DateTimeInputProps {
  /**
   * A hook for editing a date string.
   */
  date: AttributeHook<string>;

  /**
   * The date view to open to.
   *
   * @default "year"
   */
  openTo?: KeyboardDateTimePickerProps["openTo"]
}

/**
 * Props for rendering a chart name, date, and location input set.
 */
declare interface ChartInputProps {
  /**
   * A hook for editing a name.
   */
  name?: AttributeHook<string>;
  /**
   * A hook for editing a date string.
   */
  date: AttributeHook<string>;
  /**
   * A hook for editing a location.
   */
  location: AttributeHook<ChartLocation>;
}
