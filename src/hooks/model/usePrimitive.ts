import { useLayoutEffect, useState } from "react";

/**
 * Creates a hook for persisting the state of an attribute within a model.
 * @param model - The model that contains the attribute.
 * @param key - The key in the model for the attribute.
 * @param doSync - If true, the hook for this value will update when
 * the attribute is updated from other sources.
 */
export default function usePrimitive<M extends JsonObject, K extends keyof M>(
  model: M,
  key: K,
  doSync = true,
): AttributeHook<M[K]> {
  const [value, setState] = useState(model[key]);

  const setValue = (newValue: M[K]) => {
    // eslint-disable-next-line no-param-reassign
    model[key] = newValue;

    setState(newValue);
  };

  useLayoutEffect(() => {
    if (doSync && model[key] !== value) {
      setValue(model[key]);
    }
  }, [model, model[key]]);

  return { value, setValue };
}
