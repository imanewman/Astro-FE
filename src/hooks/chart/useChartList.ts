import React from "react";

import { useLocalStorage } from "@hooks";
import { createNewEvent } from "@models";

/**
 * Creates a hook for managing a list of saved charts.
 */
export default function useChartList(): ChartListHook {
  const [events, setEvents] = useLocalStorage("charts", [createNewEvent()]);
  const [currentEventIndex, setCurrentEventIndex] = React.useState(0);
  const currentEvent = events[currentEventIndex];

  return {
    events,
    currentEventIndex,
    currentEvent,
    saveEvents() {
      setEvents([...events]);
    },
    createEvent(event: EventModel = createNewEvent({ type: "Natal" })) {
      setCurrentEventIndex(events.length);
      setEvents([...events, event]);
    },
    updateEvent(event) {
      events[currentEventIndex] = event;
    },
    switchEvent(index) {
      setCurrentEventIndex(index);
    },
    removeCurrentEvent() {
      const remainingEvents = events.filter(({ id }) => currentEvent.id !== id);

      if (remainingEvents.length === 0) {
        const emptyEvent = createNewEvent();

        setEvents([emptyEvent]);
        setCurrentEventIndex(0);
      } else {
        const newIndex = Math.max(0, currentEventIndex - 1);

        setEvents(remainingEvents);
        setCurrentEventIndex(newIndex);
      }
    },
  };
}
