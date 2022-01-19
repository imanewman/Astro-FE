import { createContext } from "react";

export default createContext<ToolsHook>({
  enabledAspectTable: true,
  setEnabledAspectTable: () => {},
});
