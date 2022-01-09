/**
 * Represents a calculated set of chart points and aspects.
 */
declare interface ChartCollectionModel extends JsonObject {
  /**
   * TODO: A list of calculated chart points for given events.
   */
  charts: Record<any, any>[];
  /**
   * A list of sets of relationships within and between each chart.
   */
  relationships: RelationshipCollectionModel[];
}
