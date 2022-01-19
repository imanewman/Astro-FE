import { useState } from "react";

/**
 * Creates a hook for persisting the state of a value in a consistent form with
 * how model attributes are persisted.
 *
 * @param baseValue - The value to create a hook for.
 */
export default function usePrimitive<V>(baseValue: V): AttributeHook<V> {
  const [value, setValue] = useState(baseValue);

  return { value, setValue };
}
