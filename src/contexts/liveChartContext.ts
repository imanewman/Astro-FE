import { createContext } from "react";
import { createNewChart } from "@models";

export default createContext<LiveChartHook>({
  liveChart: createNewChart(),
  liveChartError: null,
  liveChartLoading: false,
  resetLiveChart: () => {},
  reloadLiveChart: () => {},
  liveData: "",
});
