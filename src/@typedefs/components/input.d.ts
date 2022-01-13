import { TextFieldProps } from "@mui/material/TextField/TextField";
import { KeyboardDateTimePickerProps } from "@mui/lab";
import { AutocompleteProps, SelectProps } from "@mui/material";
/**
 * Props for rendering a location input field.
 */
export interface LocationInputProps {
  /**
   * A hook for editing a location.
   */
  chart: EventModel;

  /**
   * Called when a location's latitude, longitude, and timezone have been looked up.
   *
   * @param location - The complete location object.
   */
  onSearchComplete?(location: EventModel): void;
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
  openTo?: KeyboardDateTimePickerProps["openTo"];

  /**
   * Called when the date is submitted.
   *
   * @param date - The new date.
   */
  onSubmit?: (date: Date | null) => void;
}

/**
 * Props for rendering a text input.
 */
declare type TextInputProps = TextFieldProps & {
  /**
   * A hook for editing an attribute.
   */
  attribute: AttributeHook<string>;
};

/**
 * Props for rendering a select input.
 */
declare type SelectInputProps = SelectProps<string> & {
  /**
   * The input label.
   */
  label: string;
  /**
   * The options to select from.
   */
  options: string[];
  /**
   * Whether to include an option of none.
   *
   * @default False
   */
  includeNone?: boolean;
  /**
   * A hook for editing an attribute.
   */
  attribute: AttributeHook<string>;
};

/**
 * Props for rendering a multiselect input.
 */
declare interface MultiselectInputProps
  extends Partial<AutocompleteProps<string, true, false, true>> {
  /**
   * The input label.
   */
  label: string;
  /**
   * The options to select from.
   */
  options: string[];
  /**
   * A hook for editing an attribute.
   */
  attribute: AttributeHook<string[]>;
}
