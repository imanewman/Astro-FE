import { createContext } from "react";
import { createNewChart } from "@hooks";

export default createContext<ChartListHook>({
  charts: [],
  currentChartIndex: 0,
  currentChart: createNewChart(),
  saveCharts: () => {},
  createChart: () => {},
  switchChart: () => {},
  removeCurrentChart: () => {},
});