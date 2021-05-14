/**
 * A hook for tracking the state of an attribute within a model.
 */
declare interface PrimitiveHook<M extends JsonObject, K extends keyof M> {
  /**
   * The value of the attribute.
   */
  value: M[K];

  /**
   * A callback to set the value of the attribute.
   * @param newValue - The new value to set to.
   */
  setValue(newValue: M[K]): void;
}
