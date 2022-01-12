/**
 * Summarizes a collection of relationships.
 */
interface RelationshipSummary {
  /**
   * The starting event.
   */
  fromEvent: EventModel;
  /**
   * The ending event.
   */
  toEvent: EventModel;
  /**
   * The summary name.
   */
  name: string
}
/**
 * Props for rendering an aspect table.
 */
declare interface AspectTableProps {
  /**
   * The aspects to render.
   */
  collection: RelationshipCollectionModel;
  /**
   * The summary of the aspects.
   */
  summary: RelationshipSummary
}
