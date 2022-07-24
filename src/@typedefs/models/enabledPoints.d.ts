/**
 * Represents a midpoint between points.
 */
declare interface MidpointModel extends JsonObject {
  /**
   * Defines the point to calculate a midpoint from.
   */
  fromPoint: Point;
  /**
   * Defines the point to calculate a midpoint to.
   */
  toPoint: Point;
}

/**
 * Represents enabled points and aspects.
 */
declare interface EnabledPointsModel extends JsonObject {
  /**
   * Defines what points should be enabled for calculations.
   */
  points: Point[];
  /**
   * Defines what midpoints should be enabled for calculations.
   */
  midpoints?: MidpointModel[];
  /**
   * The orbs to use for aspect calculations.
   */
  orbs?: AspectOrbsModel;
  /**
   * Defines what aspects should be enabled for calculations.
   */
  aspects?: AspectType[];
}
