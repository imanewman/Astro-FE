import { createContext } from "react";
import { createNewEvent } from "@models";

export default createContext<ChartListHook>({
  events: [],
  currentEventIndex: 0,
  currentEvent: createNewEvent(),
  saveEvents: () => {},
  createEvent: () => {},
  updateEvent: () => {},
  switchEvent: () => {},
  removeCurrentEvent: () => {},
});
