/**
 * Creates a new place with the given name, if the name is non-empty.
 *
 * @param description - The place description to start with.
 */
export function createNewPlace(description: string): PlaceType | null {
  return description ? {
    description,
    structured_formatting: {
      main_text: "",
      secondary_text: "",
      main_text_matched_substrings: [{ offset: 0, length: 0 }],
    },
  } : null;
}

export default { createNewPlace };
