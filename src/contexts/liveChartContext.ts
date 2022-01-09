import { createContext } from "react";
import { createNewEvent } from "@models";

export default createContext<LiveChartHook>({
  liveEvent: createNewEvent(),
  liveChartError: null,
  liveChartLoading: false,
  isBiwheelSelected: false,
  setSelectedSettings: () => {},
  resetLiveChart: () => {},
  reloadLiveChart: () => {},
  addBiwheel: () => {},
});
