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
