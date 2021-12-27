import { createContext } from "react";
import { createNewChart } from "@models";

export default createContext<ChartListHook>({
  charts: [],
  currentChartIndex: 0,
  currentChart: createNewChart(),
  saveCharts: () => {},
  createChart: () => {},
  updateChart: () => {},
  switchChart: () => {},
  removeCurrentChart: () => {},
});
