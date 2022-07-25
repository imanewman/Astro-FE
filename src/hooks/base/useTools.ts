import { useState } from "react";

/**
 * Creates a hook for managing the currently enabled chart tools.
 */
export default function useTools(): ToolsHook {
  const [enabledAspectTable, setEnabledAspectTable] = useState(false);
  const [enabledTransitTable, setEnabledTransitTable] = useState(false);

  return {
    enabledAspectTable,
    setEnabledAspectTable,
    enabledTransitTable,
    setEnabledTransitTable,
  };
}
