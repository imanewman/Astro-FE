import { createContext } from "react";
import { createNewChart } from "@hooks";

export default createContext<LiveChartHook>({
  liveChart: createNewChart(),
});
