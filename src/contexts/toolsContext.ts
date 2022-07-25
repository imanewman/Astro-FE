import { createContext } from "react";

export default createContext<ToolsHook>({
  enabledAspectTable: false,
  setEnabledAspectTable: () => {},
  enabledTransitTable: false,
  setEnabledTransitTable: () => {},
});
