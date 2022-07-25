/**
 * Defines all enabled chart viewing tools.
 */
declare interface ToolsHook {
  /**
   * Whether the aspect table is enabled.
   */
  enabledAspectTable: boolean;
  /**
   * Sets whether the aspect table is enabled.
   */
  setEnabledAspectTable(enabled: boolean): void;

  /**
   * Whether the transit table is enabled.
   */
  enabledTransitTable: boolean;
  /**
   * Sets whether the transit table is enabled.
   */
  setEnabledTransitTable(enabled: boolean): void;
}
