import { useLocalStorage } from "@hooks";
import React from "react";
import { createNewEvent } from "@models";

/**
 * Creates a hook for managing a list of saved charts.
 */
export default function useChartList(): ChartListHook {
  const [events, setEvents] = useLocalStorage("charts", [createNewEvent()]);
  const [currentEventIndex, setCurrentEventIndex] = React.useState(0);
  const [currentEvent, setCurrentEvent] = React.useState(events[currentEventIndex]);

  return {
    events,
    currentEventIndex,
    currentEvent,
    saveEvents() {
      setEvents([...events]);
    },
    createEvent(event: EventModel = createNewEvent()) {
      setCurrentEventIndex(events.length);
      setEvents([...events, event]);
      setCurrentEvent(event);
    },
    updateEvent(event) {
      events[currentEventIndex] = event;
      setCurrentEvent(event);
    },
    switchEvent(index) {
      setCurrentEventIndex(index);
      setCurrentEvent(events[index]);
    },
    removeCurrentEvent() {
      const remainingEvents = events.filter(({ id }) => currentEvent.id !== id);

      if (remainingEvents.length === 0) {
        const emptyEvent = createNewEvent();

        setEvents([emptyEvent]);
        setCurrentEventIndex(0);
        setCurrentEvent(emptyEvent);
      } else {
        const newIndex = Math.max(0, currentEventIndex - 1);

        setEvents(remainingEvents);
        setCurrentEventIndex(newIndex);
        setCurrentEvent(remainingEvents[newIndex]);
      }
    },
  };
}
