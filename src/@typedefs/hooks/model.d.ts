/**
 * A hook for tracking the state of an attribute within a model.
 */
declare interface AttributeHook<T> {
  /**
   * The value of the attribute.
   */
  value: T;

  /**
   * A callback to set the value of the attribute.
   *
   * @param newValue - The new value to set to.
   */
  setValue(newValue: T): void;
}

declare type TimeIncrement = "min" | "hour" | "day" | "mth" | "year";
declare type AmountIncrement = "oneDown" | "manyDown" | "oneUp" | "manyUp";

/**
 * A hook for tracking the state of a date within a model.
 */
declare interface DateHook {
  /**
   * The value of the attribute as a date object.
   */
  date: Date | null;

  /**
   * A callback to set the date of the attribute.
   *
   * @param newDate - The new date to set to.
   */
  setDate(newDate: Date | null): void;

  /**
   * Increments the current date.
   *
   * @param increment - The quantity to increment by.
   * @param amount - The amount to increment.
   */
  incrementDate(increment: TimeIncrement, amount: AmountIncrement): void;
}
