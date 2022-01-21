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
