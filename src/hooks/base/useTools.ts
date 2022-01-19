import { useState } from "react";

/**
 * Creates a hook for managing the currently enabled chart tools.
 */
export default function useTools(): ToolsHook {
  const [enabledAspectTable, setEnabledAspectTable] = useState(true);

  return {
    enabledAspectTable,
    setEnabledAspectTable,
  };
}
