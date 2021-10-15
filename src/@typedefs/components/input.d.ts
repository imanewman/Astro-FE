import { TextFieldProps } from "@mui/material/TextField/TextField";
import { KeyboardDateTimePickerProps } from "@mui/lab";
/**
 * Props for rendering a location input field.
 */
export interface LocationInputProps {
  /**
   * A hook for editing a location.
   */
  location: AttributeHook<ChartLocation>;

  /**
   * Called when a location's latitude, longitude, and timezone have been looked up.
   *
   * @param location - The complete location object.
   */
  onSearchComplete?(location: ChartLocation): void;
}

/**
 * Props for rendering a date and time input field.
 */
export interface DateTimeInputProps {
  /**
   * A hook for editing a date string.
   */
  date: AttributeHook<string>;

  /**
   * The label of this input.
   *
   * @default "Date"
   */
  label?: string;

  /**
   * The date view to open to.
   *
   * @default "year"
   */
  openTo?: KeyboardDateTimePickerProps["openTo"]
}

/**
 * Props for rendering a text input
 */
declare type TextInputProps = TextFieldProps & {
  /**
   * A hook for editing a name.
   */
  attribute: AttributeHook<string>;
};
