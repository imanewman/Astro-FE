/**
 * A hook for managing rendered relationships.
 */
declare interface RelationshipsHook {
  /**
   * The current collection of relationships.
   */
  collection?: RelationshipCollectionModel;
  /**
   * The currently visible relationships.
   */
  visibleRelationships: RelationshipModel[];
  /**
   * The names of all relationships.
   */
  collectionNames: string[];
  /**
   * The currently selected relationship name.
   */
  selectedName: AttributeHook<string>;
  /**
   * The currently set visible points.
   */
  visiblePoints: AttributeHook<string[]>;
  /**
   * The currently set visible aspects.
   */
  visibleAspects: AttributeHook<string[]>;
}
