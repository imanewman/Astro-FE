/**
 * Creates a hook for persisting the state of an arrAY attribute within a model.
 *
 * @param attribute - The array attribute.
 */
export default function useArray<T>(
  attribute: AttributeHook<T[] | undefined>,
): ArrayHook<T> {
  const { value } = attribute;

  const addItem = (item: T) => {
    attribute.setValue([...(value || []), item]);
  };

  const removeItem = (index: number) => {
    attribute.setValue(
      (value || []).filter((_, i) => i !== index),
    );
  };

  return {
    ...attribute,
    addItem,
    removeItem,
  };
}
