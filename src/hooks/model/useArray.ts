/**
 * Creates a hook for persisting the state of an arrAY attribute within a model.
 *
 * @param attribute - The array attribute.
 * @param undefinedIfEmpty - If true, the array will be set to undefined when empty.
 */
export default function useArray<T>(
  attribute: AttributeHook<T[] | undefined>,
  undefinedIfEmpty = false,
): ArrayHook<T> {
  const { value } = attribute;

  const addItem = (item: T) => {
    attribute.setValue([...(value || []), item]);
  };

  const removeItem = (index: number) => {
    const remainingItems = (value || []).filter((_, i) => i !== index);

    if (undefinedIfEmpty && remainingItems.length === 0) {
      attribute.setValue(undefined);
    } else {
      attribute.setValue(remainingItems);
    }
  };

  return {
    ...attribute,
    addItem,
    removeItem,
  };
}
