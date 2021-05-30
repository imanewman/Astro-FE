import { KeyboardDateTimePickerProps } from "@material-ui/pickers";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

/**
 * Props for rendering a location input field.
 */
export interface LocationInputProps {
  /**
   * A hook for editing a location.
   */
  location: AttributeHook<ChartLocation>;
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
