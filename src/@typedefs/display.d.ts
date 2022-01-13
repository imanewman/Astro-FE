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
 * Props for rendering visible aspects and points.
 */
declare interface VisibleProps {
  /**
   * The collection of visible items.
   */
  attribute: AttributeHook<string[]>;
}
