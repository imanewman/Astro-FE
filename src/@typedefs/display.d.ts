/**
 * Props for rendering an aspect table.
 */
declare interface AspectTableProps {
  /**
   * The aspects to render.
   */
  collection: RelationshipCollectionModel;
  /**
   * The currently visible relationships.
   */
  visibleRelationships: RelationshipModel[];
}

/**
 * Props for rendering aspects and points.
 */
declare interface GroupedMultiselectProps {
  /**
   * The input label.
   */
  label: string;
  /**
   * The collection of visible items.
   */
  attribute: AttributeHook<string[]>;
  /**
   * The possible options.
   */
  options: string[];
  /**
   * The possible grouped by type.
   */
  optionsByType: Record<string, string[]>;
}
