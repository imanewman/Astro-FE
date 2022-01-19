import { createContext } from "react";
import { createEventSettings } from "@models";

export default createContext<LiveChartHook>({
  liveEvent: createEventSettings(),
  liveChartError: null,
  liveChartLoading: false,
  isBiwheelSelected: false,
  setSelectedSettings: () => {},
  resetLiveChart: () => {},
  reloadLiveChart: () => {},
  addBiwheel: () => {},
});
